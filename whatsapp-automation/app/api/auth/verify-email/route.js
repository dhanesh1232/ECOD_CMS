// app/api/auth/verify/route.js
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/config/db";

export async function POST(request) {
  try {
    await connectDB();
    const { email, token } = await request.json();

    if (!email || !token) {
      return NextResponse.json(
        { message: "Email and token are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email,
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: true,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify email",
      },
      { status: 500 }
    );
  }
}
