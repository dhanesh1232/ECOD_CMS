import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/config/db";
import { generateOTP, sendPasswordResetEmail } from "@/lib/authHelpers";

export async function PUT(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "If an account exists with this email, a reset link has been sent",
        },
        { status: 200 }
      );
    }

    // Generate OTP
    const otp = generateOTP(6);
    const otpExpires = new Date(Date.now() + 900000); // 15 minutes

    // Save OTP to user
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = otpExpires;
    await user.save();

    // Send email with OTP
    await sendPasswordResetEmail(email, otp);

    return NextResponse.json(
      {
        message: "Password reset OTP sent to your email",
        otp, // In development only - remove in production
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
