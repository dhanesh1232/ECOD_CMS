// /api/auth/send-otp/route.js
import { NextResponse } from "next/server";
import { generateOTP } from "@/lib/authHelpers";
import User from "@/models/User";
import connectDB from "@/config/db";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(request) {
  try {
    await connectDB();
    const { email, name } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    // Generate OTP
    const otp = generateOTP(6);

    // Send verification email
    await sendVerificationEmail(email, otp, name);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully",
        otp, // In production, you might not want to send this back
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP sending error:", error);
    return NextResponse.json(
      { message: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
