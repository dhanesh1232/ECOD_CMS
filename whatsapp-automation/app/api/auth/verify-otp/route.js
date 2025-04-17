import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/config/db";
import { sendVerificationSuccessEmail } from "@/lib/mail";

export async function POST(request) {
  try {
    await connectDB();
    const { otp, email } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Fetch user with selected OTP fields
    const user = await User.findOne({ email }).select(
      "+otp.code +otp.expiresAt +otp.attempts"
    );

    if (!user || !user.otp?.code) {
      return NextResponse.json(
        { message: "User or OTP not found" },
        { status: 404 }
      );
    }

    const now = new Date();
    if (new Date(user.otp.expiresAt) < now) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
    }

    if (user.otp.attempts >= 5) {
      return NextResponse.json(
        { message: "Too many invalid attempts. Please request a new OTP." },
        { status: 429 }
      );
    }

    const isMatch = await bcrypt.compare(otp, user.otp.code);
    if (!isMatch) {
      user.otp.attempts += 1;
      await user.save();
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    // OTP is valid
    user.otp.attempts = 0; // Reset attempts if needed
    await user.save();
    await sendVerificationSuccessEmail(email, user.name);

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    return NextResponse.json(
      { message: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
