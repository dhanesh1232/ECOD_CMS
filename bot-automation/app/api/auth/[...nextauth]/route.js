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
// Credentials authentication
const authorizeCredentials = async (credentials, req) => {
  try {
    await dbConnect();
    const { email, phone, password } = credentials;

    if ((!email && !phone) || !password) return null;

    if (email && !validator.isEmail(email)) {
      return null;
    }

    const user = await User.findOne({
      $or: [{ email: email?.trim().toLowerCase() }, { phone: phone?.trim() }],
    }).select(
      "+password +failedLoginAttempts +accountLockedUntil +mfa.enabled"
    );

    if (!user?.password) return null;

    if (
      user.accountLockedUntil &&
      new Date(user.accountLockedUntil) > new Date()
    ) {
      return null;
    }

    if (!(await user.correctPassword(password))) {
      await user.handleFailedLogin();
      return null;
    }

    await User.updateOne(
      { _id: user._id },
      {
        failedLoginAttempts: 0,
        accountLockedUntil: null,
        lastLogin: new Date(),
      }
    );

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
    console.error("Credentials auth error:", error);
    return null;
  }
};

// Google provider configuration
const googleProvider = GoogleProvider({
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT,
  clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      provider: "google",
    };
  },
});

// Update the handleGoogleSignIn function
const handleGoogleSignIn = async ({ profile }) => {
  const session = await mongoose.startSession();

  try {
    await dbConnect();
    await session.startTransaction();

    const existingUser = await User.findOne({ email: profile.email }).session(
      session
    );
    let userData;

    if (!existingUser) {
      // 🔹 Create new user
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

      // 🔧 Create default workspace for the user
      await userData.createDefaultWorkspace();

      // 📩 Send welcome email
      await NewSignupGoogleMail(profile.name, profile.email);
    } else {
      // 🔹 Update user login info and Google image if needed
      const updates = {
        name: profile.name,
        lastLogin: new Date(),
        provider: "google",
      };

      if (profile.picture && !existingUser.image) {
        updates.image = profile.picture;
      }

      await User.updateOne({ _id: existingUser._id }, updates).session(session);

      userData = await User.findById(existingUser._id).session(session);

      // 🏗️ Ensure at least one workspace exists for the user
      const workspaces = await Workspace.find({
        "members.user": existingUser._id,
      }).session(session);

      if (workspaces.length === 0) {
        await Workspace.createWithOwner(
          existingUser._id,
          {
            name: `${profile.name}'s Workspace`,
            slug: generateRandomSlug(await User.countDocuments()),
            subscription: {
              plan: "free",
              billingCycle: "lifetime",
              status: "active",
            },
          },
          session
        );
      }
    }

    // ✅ Commit all operations
    await session.commitTransaction();

    return {
      id: userData._id.toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || null,
      image: userData.image || null,
      role: userData.role || "user",
      requiresProfileCompletion: userData.requiresProfileCompletion ?? true,
      provider: "google",
    };
  } catch (error) {
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }

    console.error("Google sign-in error:", error);
    throw new Error("Google sign-in failed.");
  } finally {
    session?.endSession();
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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        console.log(user);
        const dbUser = await User.findById(user.id)
          .select("currentWorkspace")
          .populate("currentWorkspace", "slug");

        token = {
          ...token,
          sub: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          role: user.role,
          provider: account.provider,
          requiresProfileCompletion: user.requiresProfileCompletion,
          workspaceSlug: dbUser?.currentWorkspace?.slug,
        };
      }
      return token;
    },

    async session({ session, token }) {
      await dbConnect();
      session.user = {
        id: token.sub,
        name: token.name,
        email: token.email,
        phone: token.phone,
        role: token.role,
        provider: token.provider,
        requiresProfileCompletion: token.requiresProfileCompletion,
        image: token.image,
        workspaceSlug: token.workspaceSlug,
      };

      // Add user's workspaces to session
      if (token.sub) {
        const workspaces = await Workspace.find({
          "members.user": token.sub,
        }).select("name slug subscription");

        session.user.workspaces = workspaces;
        session.user.defaultWorkspace = workspaces[0]?.slug || null;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google") {
          await dbConnect();
          const existingUser = await User.findOne({ email: profile.email });

          // If user exists but with different provider, allow linking
          if (existingUser && existingUser.provider !== "google") {
            // Update provider to google and merge accounts
            await User.updateOne(
              { _id: existingUser._id },
              {
                provider: "google",
                image: profile.picture || existingUser.image,
                isVerified: true,
              }
            );
            return true;
          }

          const userData = await handleGoogleSignIn({ profile });
          Object.assign(user, userData);
        }

        if (user.email) {
          await sendLoginAlertEmail(user.name, user.email);
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser && user.provider === "google") {
        await NewSignupGoogleMail(user.name, user.email);
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
