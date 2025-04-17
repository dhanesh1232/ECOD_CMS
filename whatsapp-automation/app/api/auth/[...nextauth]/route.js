import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { sendLoginNotification } from "@/lib/mail";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        // Find user by email
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        // If no user found
        if (!user) {
          throw new Error("No account found with this email");
        }
        if (user.isOAuthUser && !user.password) {
          throw new Error(
            "This account was created with Google. Please sign in with Google instead."
          );
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        // Check if email is verified
        if (!user.isVerified) {
          throw new Error("Please verify your email first");
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();
        // Send login notification (don't await to avoid blocking login)
        sendLoginNotification(user.email, "Google").catch((error) =>
          console.error("Login email failed:", error)
        );

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await connectDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user for Google OAuth
            await User.create({
              name: user.name,
              email: user.email,
              isOAuthUser: true,
              isPasswordSet: false,
              oauthProvider: "google",
              isVerified: true,
              lastLogin: new Date(),
            });
          } else {
            // Update existing user
            await User.updateOne(
              { email: user.email },
              {
                lastLogin: new Date(),
                isVerified: true, // Ensure Google users are marked as verified
              }
            );
          }
          // Send login notification (don't await to avoid blocking login)
          sendLoginNotification(user.email, "Email/Password").catch((error) =>
            console.error("Login email failed:", error)
          );
          return true;
        } catch (error) {
          console.error("Google signIn error:", error);
          return false;
        }
      }
      return true; // For credentials provider
    },
    async session({ session, token }) {
      // Add user ID to session
      session.user.id = token.sub || token.id;

      // Fetch additional user data from database
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.isOAuthUser = dbUser.isOAuthUser;
        session.user.isPasswordSet = dbUser.isPasswordSet;
        session.user.isVerified = dbUser.isVerified;
      }

      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects after sign in
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Error code passed in query string as ?error=
    newUser: "/auth/set-password", // New users will be directed here
  },
  events: {
    async signOut({ session }) {
      // Optional: Handle any cleanup on sign out
    },
  },
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === "production", // Only use HTTPS in production
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
