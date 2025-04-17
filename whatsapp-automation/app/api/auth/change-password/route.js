import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/config/db";
import { sendPasswordChangeConfirmation } from "@/lib/mail";

export async function PUT(request) {
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
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    user.password = password.trim();
    user.isPasswordSet = true;
    user.isOAuthUser = false;
    await user.save();

    await sendPasswordChangeConfirmation(email);
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
