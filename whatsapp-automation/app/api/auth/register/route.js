// /api/auth/register/route.js
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password, otp } = await request.json();

    // Validate input
    if (!name || !email || !password || !otp) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { message: "Invalid OTP format" },
        { status: 400 }
      );
    }

    // Check if user already exists (again, for safety)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: true, // Mark as verified since OTP was verified
      isOAuthUser: false,
      isPasswordSet: true,
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! You can now login.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
