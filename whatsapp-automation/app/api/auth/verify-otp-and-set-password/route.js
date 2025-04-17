import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/config/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendPasswordSetSuccessEmail } from "@/lib/mail";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email, otp, password } = await request.json();

    if (!email || !otp || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    // Select nested otp fields explicitly
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
        { message: "Too many invalid attempts" },
        { status: 429 }
      );
    }

    const isMatch = await bcrypt.compare(otp, user.otp.code);
    if (!isMatch) {
      user.otp.attempts += 1;
      await user.save();
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    user.password = password.trim();
    user.isPasswordSet = true;
    user.otp = undefined;

    await user.save();
    await sendPasswordSetSuccessEmail(email, user.name);

    return NextResponse.json({
      success: true,
      message: "Password set successfully",
    });
  } catch (error) {
    console.error("Verify OTP & Set Password Error:", error);
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
/// No changes are required for this, this route only applicable for verify otp and set-password, its applicable only, user doesn't set password that time its work
