import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/par-user";
import dbConnect from "@/config/dbconnect";

export const authOptions = {
  providers: [
    GoogleProvider({
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
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const { email, phone, password } = credentials;

          if ((!email && !phone) || !password) return null;

          const user = await User.findOne({
            $or: [{ email }, { phone }],
          }).select("+password");

          if (!user?.password) return null;
          if (!(await bcrypt.compare(password, user.password))) return null;

          return {
            id: user._id.toString(),
            ...user.toObject(),
            requiresProfileCompletion: user.requiresProfileCompletion,
          };
        } catch (error) {
          console.error("Credentials auth error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.provider = account?.provider || "credentials";
        token.requiresProfileCompletion =
          user.requiresProfileCompletion ?? false;
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
      if (account.provider === "google") {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            const newUser = await User.create({
              name: profile.name,
              email: profile.email,
              provider: "google",
              isVerified: true,
              requiresProfileCompletion: true,
            });

            // Update user object with database values
            user.id = newUser._id.toString();
            user.requiresProfileCompletion = newUser.requiresProfileCompletion;
          } else {
            // Merge existing data
            user.id = existingUser._id.toString();
            user.requiresProfileCompletion =
              existingUser.requiresProfileCompletion;
            user.phone = existingUser.phone;
            user.role = existingUser.role;

            // Update name if missing
            if (!existingUser.name && profile.name) {
              existingUser.name = profile.name;
              await existingUser.save();
            }
          }
        } catch (error) {
          console.error("Google signin error:", error);
          throw error;
        }
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/new/complete-profile", // Update this to your profile completion page
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
