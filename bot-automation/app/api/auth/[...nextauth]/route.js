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
    let workspaceSlug = user.currentWorkspace?.slug;
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
      role: user.role || "member",
      requiresProfileCompletion: user.requiresProfileCompletion ?? true,
      provider: "credentials",
      workspaceSlug,
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
        role: "owner",
        image: profile.picture || "",
        requiresProfileCompletion: true,
        lastLogin: new Date(),
      });

      userData = await user.save({ session });

      // Create workspace
      const workspace = await Workspace.createWithOwner(
        userData._id,
        {
          name: `${profile.name}'s Workspace`,
          slug: generateRandomSlug(),
        },
        session
      );

      workspaceSlug = workspace.slug;

      // Add workspace to user - pass just the ID
      await userData.addToWorkspace(workspace._id, "owner", null, session);

      // Set current workspace - just the ID
      userData.currentWorkspace = workspace._id;
      await userData.save({ session });
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
      workspaceSlug,
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
  cookies:
    process.env.NODE_ENV === "production"
      ? {
          sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              secure: process.env.NODE_ENV === "production",
              domain:
                process.env.NODE_ENV === "production"
                  ? "bot-automation.vercel.app/"
                  : undefined,
            },
          },
        }
      : undefined,
  useSecureCookies: process.env.NODE_ENV === "production",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
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

        if (user.email) {
          await sendLoginAlertEmail(user.name, user.email);
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = user.role;
        token.provider = account?.provider || "credentials";
        token.workspaceSlug = user.workspaceSlug;
      }
      if (token.userId && !token.workspaceSlug) {
        const dbUser = await User.findById(token.userId)
          .select("currentWorkspace")
          .populate("currentWorkspace", "slug");

        token.workspaceSlug = dbUser?.currentWorkspace?.slug;

        if (!token.workspaceSlug) {
          const workspace = await Workspace.findOne({
            "members.user": token.userId,
          }).select("slug");
          token.workspaceSlug = workspace?.slug || null;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.userId,
        name: token.name,
        email: token.email,
        image: token.picture,
        role: token.role,
        provider: token.provider,
        workspaceSlug: token.workspaceSlug,
      };

      // Ensure we always have a workspace slug
      if (!session.user.workspaceSlug && token.userId) {
        const workspaces = await Workspace.findOne({
          "members.user": token.userId,
        }).select("slug");

        session.user.workspaceSlug = workspaces[0]?.slug || null;
      }

      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser && user.provider === "google") {
        await NewSignupGoogleMail(user.name, user.email);
      }
    },
    async signOut() {
      // Optional: Add cleanup logic
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
