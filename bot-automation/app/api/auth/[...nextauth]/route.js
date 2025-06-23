import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/user/user";
import dbConnect from "@/config/dbconnect";
import { NewSignupGoogleMail, sendLoginAlertEmail } from "@/lib/helper";
import validator from "validator";
import { Workspace } from "@/models/user/workspace";
import mongoose from "mongoose";
import { generateRandomSlug } from "@/lib/slugGenerator";
const isProd = process.env.NODE_ENV === "production";
const isAdmin = process.env.SUPER_ADMIN_EMAIL;
const getCookiesSettings = () => {
  const ecodDomain = process.env.NEXTAUTH_URL?.includes(
    process.env.AUTH_DOMAIN
  );
  const domain = process.env.AUTH_DOMAIN;
  return {
    sessionToken: {
      name: isProd
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProd,
        domain:
          isProd && ecodDomain
            ? domain // Root domain for production
            : undefined,
      },
    },
    workspaceToken: {
      name: isProd
        ? "__Secure-next-auth.workspace-token"
        : "next-auth.workspace-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProd,
        domain: isProd && ecodDomain ? domain : undefined,
      },
    },
  };
};

// Enhanced credentials authentication
const authorizeCredentials = async (credentials) => {
  await dbConnect();

  try {
    const { email, phone, password } = credentials;
    if ((!email && !phone) || !password) return null;

    if (email && !validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const user = await User.findOne({
      $or: [{ email: email?.trim().toLowerCase() }, { phone: phone?.trim() }],
    })
      .select("+password +failedLoginAttempts +accountLockedUntil")
      .populate("currentWorkspace", "slug");

    if (!user?.password) throw new Error("User not found");

    if (
      user.accountLockedUntil &&
      new Date(user.accountLockedUntil) > new Date()
    ) {
      throw new Error("Account temporarily locked");
    }

    const isPasswordValid = await user.correctPassword(password);
    if (!isPasswordValid) {
      await user.handleFailedLogin();
      throw new Error("Invalid credentials");
    }

    // Reset failed attempts on successful login
    await User.findByIdAndUpdate(user._id, {
      failedLoginAttempts: 0,
      accountLockedUntil: null,
      lastLogin: new Date(),
    });

    // Get workspace slug
    let workspaceSlug = isAdmin !== user.email && user.currentWorkspace?.slug;
    if (!workspaceSlug) {
      const workspace = await Workspace.findOne({
        "members.user": user._id,
      }).select("slug");
      workspaceSlug = workspace?.slug || null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      image: user.image || null,
      role: user.email === isAdmin ? "super_admin" : user.role || "member",
      requiresProfileCompletion: user.requiresProfileCompletion ?? true,
      provider: "credentials",
      ...(isAdmin !== user.email && { workspaceSlug }),
    };
  } catch (error) {
    console.error("Credentials auth error:", error.message);
    return null;
  }
};

// Secure Google provider configuration
const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
  profile: async (profile) => {
    try {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        provider: "google",
      };
    } catch (error) {
      console.error("Google profile error:", error);
      throw new Error("Failed to process Google profile");
    }
  },
});

// Simplified Google sign-in handler
const handleGoogleSignIn = async (profile) => {
  await dbConnect();
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const existingUser = await User.findOne({ email: profile.email })
      .session(session)
      .populate("currentWorkspace", "slug");

    let userData;
    let workspaceSlug = null;

    if (!existingUser) {
      // Create new user
      const user = new User({
        name: profile.name,
        email: profile.email,
        provider: "google",
        isVerified: true,
        role: profile.email === isAdmin ? "super_admin" : "user",
        image: profile.picture || "",
        requiresProfileCompletion: true,
        lastLogin: new Date(),
      });

      userData = await user.save({ session });

      if (profile.email !== isAdmin) {
        // Create workspace
        const workspace = await Workspace.createWithOwner(
          userData._id,
          {
            name: `${profile.name.split(" ")[0]}'s Workspace`,
            slug: generateRandomSlug(),
          },
          session
        );
        workspaceSlug = workspace.slug;
        await userData.addToWorkspace(workspace._id, "owner", null, session);
        userData.currentWorkspace = workspace._id;
        await userData.save({ session });
      }
    } else {
      // Update existing user
      userData = await User.findOneAndUpdate(
        { _id: existingUser._id },
        {
          $set: {
            lastLogin: new Date(),
          },
        },
        { new: true, session }
      ).populate("currentWorkspace", "slug");

      workspaceSlug = userData.currentWorkspace?.slug;
    }

    await session.commitTransaction();

    return {
      id: userData._id.toString(),
      name: userData.name,
      email: userData.email,
      image: userData.image,
      role: userData.role,
      provider: "google",
      requiresProfileCompletion: userData.requiresProfileCompletion ?? true,
      workspaceSlug: isAdmin !== userData.email ? workspaceSlug : undefined,
    };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    console.error("Google sign-in transaction failed:", error);
    throw error;
  } finally {
    await session.endSession();
  }
};

export const authOptions = {
  providers: [
    googleProvider,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeCredentials,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: getCookiesSettings(),
  useSecureCookies: isProd,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-account",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google") {
          const userData = await handleGoogleSignIn(profile);
          Object.assign(user, userData);
        }

        if (user.email && user.email !== isAdmin) {
          await sendLoginAlertEmail(user.name, user.email);
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      await dbConnect();
      if (user) {
        token.userId = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = user.role;
        token.provider = account?.provider || "credentials";
        token.workspaceSlug =
          user.email === isAdmin ? undefined : user.workspaceSlug;
      }

      // Only lookup workspace if not already set and not admin
      if (!token.workspaceSlug && token.userId && token.email !== isAdmin) {
        const dbUser = await User.findById(token.userId)
          .select("currentWorkspace")
          .populate("currentWorkspace", "slug");

        token.workspaceSlug = dbUser?.currentWorkspace?.slug || null;
      }

      return token;
    },
    async session({ session, token }) {
      await dbConnect();
      const isSuperAdmin =
        token.email === isAdmin && token.role === "super_admin";
      session.user = {
        id: token.userId,
        name: token.name,
        email: token.email,
        image: token.picture,
        role: token.role,
        provider: token.provider,
        workspaceSlug:
          token.email === isAdmin ? undefined : token.workspaceSlug,
      };

      if (!isSuperAdmin && !session.user.workspaceSlug && token.userId) {
        const workspace = await Workspace.findOne({
          "members.user": token.userId,
        }).select("slug");

        session.user.workspaceSlug = workspace?.slug || null;
      }

      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser && user.provider === "google") {
        if (user.email !== isAdmin) {
          await NewSignupGoogleMail(user.name, user.email);
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
