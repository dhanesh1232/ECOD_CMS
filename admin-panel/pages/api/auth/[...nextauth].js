import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import TeamMember from "../models/team";
import dbConnect from "../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await TeamMember.findOne({
          email: credentials.email,
        }).select("+password");

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          image: user.image,
          bio: user.bio,
          location: user.location,
          skills: user.skills,
          expertize: user.expertize,
          rating: user.rating,
          socialLinks: user.socialLinks,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.image = user.image;
        token.bio = user.bio;
        token.location = user.location;
        token.skills = user.skills;
        token.expertize = user.expertize;
        token.rating = user.rating;
        token.socialLinks = user.socialLinks;

        token.accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            image: user.image,
          },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: "7d" }
        );
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
        name: token.name,
        image: token.image,
        bio: token.bio,
        location: token.location,
        skills: token.skills,
        expertize: token.expertize,
        rating: token.rating,
        socialLinks: token.socialLinks,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});
