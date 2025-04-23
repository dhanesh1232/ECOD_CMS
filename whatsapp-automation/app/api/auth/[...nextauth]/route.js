import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { sendLoginNotification } from "@/lib/mail";
import mongoose from "mongoose";

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
          throw error;
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
            // Create new OAuth user with Google ID
            await User.create({
              name: user.name,
              email: user.email,
              googleId: account.providerAccountId, // Store Google ID
              isOAuthUser: true,
              isPasswordSet: false,
              oauthProvider: "google",
              isVerified: true,
              lastLogin: new Date(),
              lastLoginIP: getClientIP(),
              avatar: profile.picture,
            });
          } else {
            // Update existing user with Google ID if not set
            const updateData = {
              lastLogin: new Date(),
              lastLoginIP: getClientIP(),
              isVerified: true,
              avatar: profile.picture || existingUser.avatar,
            };

            if (!existingUser.googleId) {
              updateData.googleId = account.providerAccountId;
            }

            await User.updateOne({ email: user.email }, { $set: updateData });
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
        const isValidObjectId = mongoose.Types.ObjectId.isValid(
          session.user.id
        );

        const dbUser = await User.findOne({
          $or: [
            ...(isValidObjectId
              ? [{ _id: new mongoose.Types.ObjectId(session.user.id) }]
              : []),
            { googleId: session.user.id },
          ],
        });

        if (dbUser) {
          session.user.isOAuthUser = dbUser.isOAuthUser;
          session.user.isPasswordSet = dbUser.isPasswordSet;
          session.user.avatar = dbUser.avatar;
          // Ensure session ID matches the database ID
          session.user.id = dbUser._id.toString();
        }
      } catch (error) {
        console.error("Session DB error:", error);
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: undefined,
  events: {
    async signOut({ token }) {
      try {
        await connectDB();

        // Find user by either MongoDB _id or Google ID
        const user = await User.findOne({
          $or: [{ _id: token.sub }, { googleId: token.sub }],
        });

        if (user) {
          await User.updateOne(
            { _id: user._id }, // Use the found user's _id
            { $set: { lastLogout: new Date() } }
          );
        }
      } catch (error) {
        console.error("Logout tracking error:", error);
      }
    },
    async linkAccount({ user, account, profile }) {
      if (account.provider === "google") {
        await connectDB();
        await User.updateOne(
          { email: user.email },
          {
            $set: {
              isOAuthUser: true,
              oauthProvider: "google",
              googleId: account.providerAccountId,
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

function getClientIP() {
  // Implement your IP detection logic
  return "unknown";
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
