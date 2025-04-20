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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          // Find user by email
          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );
          if (!user) {
            throw new Error("No account found with this email");
          }

          // Check OAuth user trying to use password
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

          // Check email verification
          if (!user.isVerified) {
            throw new Error("Please verify your email first");
          }

          // Update last login and IP
          user.lastLogin = new Date();
          user.lastLoginIP = getClientIP();
          await user.save();

          // Send login notification (async)
          sendLoginNotification({
            email: user.email,
            method: "Email/Password",
            ip: user.lastLoginIP,
            timestamp: user.lastLogin,
          }).catch(console.error);

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Credentials auth error:", error);
          throw error; // Re-throw to show error on login page
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new OAuth user
            await User.create({
              name: user.name,
              email: user.email,
              isOAuthUser: true,
              isPasswordSet: false,
              oauthProvider: "google",
              isVerified: true,
              lastLogin: new Date(),
              lastLoginIP: getClientIP(),
              avatar: profile.picture,
            });
          } else {
            // Update existing user
            await User.updateOne(
              { email: user.email },
              {
                $set: {
                  lastLogin: new Date(),
                  lastLoginIP: getClientIP(),
                  isVerified: true,
                  avatar: profile.picture || existingUser.avatar,
                },
              }
            );
          }

          // Send login notification
          sendLoginNotification({
            email: user.email,
            method: "Google",
            ip: getClientIP(),
            timestamp: new Date(),
          }).catch(console.error);

          return true;
        } catch (error) {
          console.error("Google signIn error:", error);
          return `/auth/login?error=oauth_failed`;
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
      }

      // Update token with Google profile picture
      if (account?.provider === "google" && profile?.picture) {
        token.picture = profile.picture;
      }

      return token;
    },
    async session({ session, token }) {
      // Add token data to session
      session.user.id = token.sub || token.id;
      session.user.role = token.role;
      session.user.isVerified = token.isVerified;
      session.user.image = token.picture;

      // Fetch fresh user data from database
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.isOAuthUser = dbUser.isOAuthUser;
          session.user.isPasswordSet = dbUser.isPasswordSet;
          session.user.avatar = dbUser.avatar;
        }
      } catch (error) {
        console.error("Session DB error:", error);
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    newUser: "/auth/set-password",
  },
  events: {
    async signOut({ token }) {
      // Log logout event
      try {
        await connectDB();
        await User.updateOne(
          { _id: token.sub },
          { $set: { lastLogout: new Date() } }
        );
      } catch (error) {
        console.error("Logout tracking error:", error);
      }
    },
    async linkAccount({ user, account, profile }) {
      // Handle account linking
      if (account.provider === "google") {
        await connectDB();
        await User.updateOne(
          { email: user.email },
          {
            $set: {
              isOAuthUser: true,
              oauthProvider: "google",
              avatar: profile.picture,
            },
          }
        );
      }
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};

// Helper function to get client IP
function getClientIP() {
  // Implement your IP detection logic
  return "unknown";
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
