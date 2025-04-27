import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/par-user";
import dbConnect from "@/config/dbconnect";
import { NewSignupGoogleMail, sendLoginAlertEmail } from "@/lib/helper";

// Centralized error handler
const handleError = (context, error) => {
  console.error(`${context} error:`, error);
  throw new Error(typeof error === "string" ? error : "Authentication failed");
};

// Credentials authentication logic
const authorizeCredentials = async (credentials) => {
  try {
    await dbConnect();
    const { email, phone, password } = credentials;

    // Validate input
    if ((!email && !phone) || !password) {
      console.log("Missing credentials");
      return null;
    }

    // Find user with email or phone
    const user = await User.findOne({ $or: [{ email }, { phone }] })
      .select("+password")
      .lean();

    if (!user?.password) {
      console.log("User not found");
      return null;
    }

    // Verify password
    if (!(await bcrypt.compare(password, user.password))) {
      console.log("Invalid password");
      return null;
    }

    return {
      ...user,
      id: user._id.toString(),
      requiresProfileCompletion: user.requiresProfileCompletion ?? false,
    };
  } catch (error) {
    handleError("Credentials authentication", error);
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

// Google sign-in handler
const handleGoogleSignIn = async ({ user, profile }) => {
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email: profile.email });

    if (!existingUser) {
      const newUser = await User.create({
        name: profile.name,
        email: profile.email,
        provider: "google",
        isVerified: true,
        requiresProfileCompletion: true,
      });
      user.id = newUser._id.toString();
      user.requiresProfileCompletion = newUser.requiresProfileCompletion;
      await NewSignupGoogleMail(profile.name, profile.email);
    } else {
      Object.assign(user, {
        id: existingUser._id.toString(),
        requiresProfileCompletion: existingUser.requiresProfileCompletion,
        phone: existingUser.phone,
        role: existingUser.role,
      });

      if (!existingUser.name && profile.name) {
        existingUser.name = profile.name;
        await existingUser.save();
        console.log("Updated name for existing user");
      }
    }
  } catch (error) {
    handleError("Google sign-in", error);
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
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          sub: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          provider: account?.provider || "credentials",
          requiresProfileCompletion: user.requiresProfileCompletion ?? false,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        name: token.name,
        email: token.email,
        phone: token.phone,
        role: token.role,
        provider: token.provider,
        requiresProfileCompletion: token.requiresProfileCompletion,
      };
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google") {
          await sendLoginAlertEmail(profile.name, profile.email);
          await handleGoogleSignIn({ user, profile });
        } else {
          await sendLoginAlertEmail(user.name, user.email);
        }
      } catch (error) {
        handleError("SignIn event", error);
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/settings?profile",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
