import dbConnect from "../lib/mongodb";
import TeamMember from "../models/team";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await dbConnect();
  const existingUser = await TeamMember.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await TeamMember.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
    isActive: true,
    bio: "",
    skills: [],
    socialLinks: {},
    expertize: 0,
    location: "",
    rating: 0,
    joinedAt: new Date(),
  });

  // Generate JWT Token
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role },
    process.env.NEXTAUTH_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(201).json({
    message: "User registered successfully!",
    token, // ✅ Send token in response
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
    },
  });
}
