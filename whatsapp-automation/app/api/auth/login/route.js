// app/api/auth/login/route.js

import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { sendLoginNotification } from "@/lib/mail";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 404 }
      );
    }

    // Check if this is a Google-created account
    if (user.isOAuthUser && !user.password) {
      return NextResponse.json(
        {
          message:
            "This account was created with Google. Please sign in with Google instead.",
          isOAuthUser: true,
        },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    user.lastLogin = new Date();
    await user.save();
    await sendLoginNotification(email, "Email/Password");

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
