import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/user/par-user";
import dbConnect from "@/config/dbconnect";
import { NewSignupGoogleMail, sendLoginAlertEmail } from "@/lib/helper";

// Enhanced trackUserLogin function
const trackUserLogin = async (userId, req) => {
  try {
    await dbConnect();

    // Get the real IP address from multiple possible locations
    let ip = "Unknown";
    if (req) {
      ip =
        req.headers?.["x-real-ip"] ||
        req.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.socket?.remoteAddress ||
        req.connection?.remoteAddress ||
        "Unknown";
    }

    // Get location information
    let location = { country: "Unknown", region: "Unknown", city: "Unknown" };
    try {
      if (ip !== "Unknown") {
        location = await User.getIpLocation(ip);
      }
    } catch (err) {
      console.error("Location lookup failed:", err);
    }

    // Get detailed device info from user agent
    const userAgent = req?.headers?.["user-agent"] || "Unknown";
    let deviceType = "Unknown";

    if (userAgent) {
      if (/mobile/i.test(userAgent)) deviceType = "Mobile";
      else if (/tablet/i.test(userAgent)) deviceType = "Tablet";
      else if (/android/i.test(userAgent)) deviceType = "Android";
      else if (/iphone|ipad|ipod/i.test(userAgent)) deviceType = "iOS";
      else if (/windows/i.test(userAgent)) deviceType = "Windows";
      else if (/macintosh/i.test(userAgent)) deviceType = "Mac";
      else if (/linux/i.test(userAgent)) deviceType = "Linux";
    }

    // Update user record with login history
    await User.updateOne(
      { _id: userId },
      {
        $set: { lastLogin: new Date() },
        $push: {
          loginHistory: {
            timestamp: new Date(),
            ip,
            country: location.country,
            region: location.region,
            city: location.city,
            device: deviceType,
            userAgent,
          },
        },
        $slice: { loginHistory: -10 }, // Keep only last 10 logins
      }
    );
  } catch (error) {
    console.error("Login tracking failed:", error);
  }
};

// Credentials authentication
const authorizeCredentials = async (credentials, req) => {
  try {
    await dbConnect();
    const { email, phone, password } = credentials;

    if ((!email && !phone) || !password) return null;

    const user = await User.findOne({
      $or: [{ email: email?.trim().toLowerCase() }, { phone: phone?.trim() }],
    })
      .select("+password +failedLoginAttempts +accountLockedUntil")
      .lean();

    if (!user?.password) return null;

    // Check account lock
    if (
      user.accountLockedUntil &&
      new Date(user.accountLockedUntil) > new Date()
    ) {
      return null;
    }

    // Verify password
    if (!(await bcrypt.compare(password, user.password))) {
      await User.updateOne(
        { _id: user._id },
        {
          $inc: { failedLoginAttempts: 1 },
          ...(user.failedLoginAttempts >= 4
            ? {
                accountLockedUntil: new Date(Date.now() + 60 * 60 * 1000),
              }
            : {}),
        }
      );
      return null;
    }

    // Reset failed attempts
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
      requiresProfileCompletion: user.requiresProfileCompletion ?? false,
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

// Google sign-in handler
const handleGoogleSignIn = async ({ user, profile, req }) => {
  try {
    await dbConnect();
    let userData;

    const existingUser = await User.findOne({ email: profile.email });

    if (!existingUser) {
      // Create new user
      userData = await User.create({
        name: profile.name,
        email: profile.email,
        provider: "google",
        isVerified: true,
        role: "user",
        image: profile.picture || "",
        website: "",
        phone: "",
        plan: "pro",
        requiresProfileCompletion: true,
        lastLogin: new Date(),
      });

      await NewSignupGoogleMail(profile.name, profile.email);
    } else {
      // Update existing user
      const updates = {
        name: profile.name,
        image: existingUser.image || profile.picture,
        lastLogin: new Date(),
        provider: "google",
      };

      await User.updateOne({ _id: existingUser._id }, updates);
      userData = { ...existingUser.toObject(), ...updates };
    }

    return {
      id: userData._id.toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || null,
      image: userData.image || null,
      role: userData.role || "user",
      requiresProfileCompletion: userData.requiresProfileCompletion ?? false,
      provider: "google",
    };
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
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
      async authorize(credentials, req) {
        const user = await authorizeCredentials(credentials, req);
        if (user) {
          await trackUserLogin(user.id, req);
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token = {
          ...token,
          sub: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          role: user.role || "user",
          provider: account.provider || "credentials",
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
        phone: token.phone || null,
        role: token.role || "user",
        provider: token.provider,
        requiresProfileCompletion: token.requiresProfileCompletion,
        image: token.image,
      };
      return session;
    },
    async signIn({ user, account, profile, request }) {
      try {
        if (account.provider === "google") {
          await sendLoginAlertEmail(profile.name, profile.email);
          const userData = await handleGoogleSignIn({
            user,
            profile,
            req: request,
          });
          Object.assign(user, userData);
        } else {
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
    async signIn({ user, request }) {
      if (user?.id) {
        await trackUserLogin(user.id, request);
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
