import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/user/user";
import dbConnect from "@/config/dbconnect";
import { NewSignupGoogleMail, sendLoginAlertEmail } from "@/lib/helper";
import validator from "validator";
import { Workspace } from "@/models/user/workspace";
import { generateRandomSlug } from "@/lib/slugGenerator";
import mongoose from "mongoose";

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
    }).select("+password +failedLoginAttempts +accountLockedUntil");

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

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      image: user.image || null,
      role: user.role || "user",
      requiresProfileCompletion: user.requiresProfileCompletion ?? true,
      provider: "credentials",
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
  await session.startTransaction();

  try {
    const existingUser = await User.findOne({ email: profile.email }).session(
      session
    );
    let userData;

    if (!existingUser) {
      // Create new user
      userData = await User.create(
        [
          {
            name: profile.name,
            email: profile.email,
            provider: "google",
            isVerified: true,
            role: "user",
            image: profile.picture || "",
            requiresProfileCompletion: true,
            lastLogin: new Date(),
          },
        ],
        { session }
      );

      userData = userData[0];
      await userData.createDefaultWorkspace(session);
    } else {
      // Update existing user
      const updates = {
        name: profile.name,
        lastLogin: new Date(),
        provider: "google",
        ...(!existingUser.image && profile.picture
          ? { image: profile.picture }
          : {}),
      };

      await User.updateOne({ _id: existingUser._id }, updates).session(session);
      userData = existingUser;
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
    };
  } catch (error) {
    await session.abortTransaction();
    console.error("Google sign-in transaction failed:", error);
    throw error;
  } finally {
    session.endSession();
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
    cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production" &&
          "https://bot-automation.vercel.app/",
      },
    },
  },
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
        token.role = user.role;
        token.provider = account?.provider || "credentials";

        // Only fetch workspace if not already in token
        if (!token.workspaceSlug) {
          const dbUser = await User.findById(user.id)
            .select("currentWorkspace")
            .populate("currentWorkspace", "slug")
            .populate("workspaces.workspace", "slug name");
          token.workspaceSlug = dbUser?.currentWorkspace?.slug;
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

      // Only fetch workspaces if needed
      if (!session.user.workspaces && token.userId) {
        const workspaces = await Workspace.find({
          "members.user": token.userId,
        }).select("name slug");

        session.user.workspaces = workspaces;
        session.user.defaultWorkspace = workspaces[0]?.slug || null;
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
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
