// pages/api/auth/verify-account.js
import dbConnect from "@/config/dbconnect";
import UserTemp from "@/model/user-temp";
import User from "@/model/par-user";
import { NextResponse } from "next/server";

const CODE_EXPIRY_TIME = 60 * 60 * 1000; // 60 minutes
const MAX_ATTEMPTS = 3;

export async function POST(req) {
  try {
    await dbConnect();
    const { code, email } = await req.json();

    if (!code || !email) {
      return NextResponse.json(
        { message: "Both code and email are required" },
        { status: 400 }
      );
    }

    // Check if permanent user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Optional: Clean up the temp record
      await UserTemp.deleteOne({ email });

      return NextResponse.json(
        {
          message: "Account already exists. Please log in.",
          success: true,
          user: { email },
        },
        { status: 200 }
      );
    }

    const tempUser = await UserTemp.findOne({ email });
    if (!tempUser) {
      return NextResponse.json(
        {
          message: "No verification request found.",
          errorType: "EMAIL_NOT_FOUND",
        },
        { status: 404 }
      );
    }

    const codeAge = Date.now() - new Date(tempUser.createdAt).getTime();
    if (codeAge > CODE_EXPIRY_TIME) {
      await UserTemp.deleteOne({ email });
      return NextResponse.json(
        { message: "Verification code expired", errorType: "EXPIRED_CODE" },
        { status: 410 }
      );
    }

    if (tempUser.attemptsRemaining <= 0) {
      await UserTemp.deleteOne({ email });
      return NextResponse.json(
        {
          message: "Too many failed attempts",
          errorType: "ATTEMPTS_EXHAUSTED",
        },
        { status: 429 }
      );
    }

    if (tempUser.verificationCode !== code) {
      const updatedAttempts = tempUser.attemptsRemaining - 1;
      await UserTemp.updateOne(
        { email },
        { $set: { attemptsRemaining: updatedAttempts } }
      );

      return NextResponse.json(
        {
          message: "Invalid verification code",
          errorType: "INVALID_CODE",
          attemptsRemaining: updatedAttempts,
        },
        { status: 400 }
      );
    }

    const newUser = new User({
      email: tempUser.email,
      password: tempUser.password,
      name: tempUser.name,
    });

    await newUser.save();
    await UserTemp.deleteOne({ email });

    return NextResponse.json(
      {
        message: "Account verified successfully",
        success: true,
        user: { email },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json(
      {
        message: "Server error during verification",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
