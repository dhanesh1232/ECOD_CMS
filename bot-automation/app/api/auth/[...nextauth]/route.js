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
      .select("+password +phone +image +role")
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
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || null, // Ensure phone is included
      image: user.image || null, // Ensure image is included
      role: user.role || "user", // Default role if not set
      requiresProfileCompletion: user.requiresProfileCompletion ?? false,
      provider: "credentials",
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
      console.log(profile); //google has returned picture but picture not save in db, i trying do many ways, unale to save googel provided image
      const newUser = await User.create({
        name: profile.name,
        email: profile.email,
        provider: "google",
        isVerified: true,
        role: "user",
        image: profile.picture, // Save Google profile picture
        requiresProfileCompletion: true,
      });
      user.id = newUser._id.toString();
      user.role = newUser.role;
      user.requiresProfileCompletion = newUser.requiresProfileCompletion;
      await NewSignupGoogleMail(profile.name, profile.email);
      console.log(newUser);
      return {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
        role: newUser.role,
        requiresProfileCompletion: newUser.requiresProfileCompletion,
        provider: "google",
      };
    } else {
      Object.assign(user, {
        id: existingUser._id.toString(),
        requiresProfileCompletion: existingUser.requiresProfileCompletion,
        phone: existingUser.phone,
        image: existingUser.image || profile.picture,
        role: existingUser.role || "user",
      });

      const updates = {
        image: profile.picture, // Always update with latest Google picture
        name: profile.name, // Always update with latest Google name
        lastLogin: new Date(),
      };

      await User.updateOne({ _id: existingUser._id }, updates);

      return {
        id: existingUser._id.toString(),
        name: existingUser.name || profile.name,
        email: existingUser.email,
        phone: existingUser.phone || null,
        image: existingUser.image,
        role: existingUser.role || "user",
        requiresProfileCompletion:
          existingUser.requiresProfileCompletion ?? false,
        provider: "google",
      };
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
    async jwt({ token, user, account, trigger, session: updateSession }) {
      if (user && account) {
        token = {
          ...token,
          sub: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          role: user.role || "user",
          provider: account?.provider || "credentials",
          requiresProfileCompletion: user.requiresProfileCompletion ?? false,
        };
      } else if (trigger === "update" && updateSession?.user) {
        token = {
          ...token,
          ...updateSession.user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        name: token.name,
        email: token.email,
        phone: token.phone || null,
        role: token.role || "user",
        provider: token.provider,
        requiresProfileCompletion: token.requiresProfileCompletion,
        image: token.image || token.picture,
      };
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google") {
          await sendLoginAlertEmail(profile.name, profile.email);
          const userData = await handleGoogleSignIn({ user, profile });
          Object.assign(user, {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            image: userData.image,
            role: userData.role,
            requiresProfileCompletion: userData.requiresProfileCompletion,
            provider: userData.provider,
          });
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
    newUser: "/settings?model",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
