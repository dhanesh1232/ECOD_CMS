import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/config/db";
import { generateOTP } from "@/lib/authHelpers";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+otp");
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate OTP
    const otp = generateOTP(6);
    const hashedOtp = await bcrypt.hash(otp, 10);
    await sendPasswordResetEmail(email, otp, user.name);
    user.otp = {
      code: hashedOtp, // only hashed version is stored
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0,
    };

    await user.save();

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
