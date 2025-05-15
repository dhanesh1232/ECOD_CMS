import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await dbConnect();
  try {
    await validateSession(req);

    const { email, currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await user.correctPassword(currentPassword);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different from current",
        },
        { status: 400 }
      );
    }
    user.password = newPassword;
    user.passwordChangedAt = Date.now(); // Ensure the password changed time is set correctly
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Password update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
