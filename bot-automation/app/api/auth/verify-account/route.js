import dbConnect from "@/config/dbconnect";
import UserTemp from "@/model/user-temp";
import User from "@/model/par-user";
import { NextResponse } from "next/server";
import rateLimit from "@/utils/rate-limit";

// Configure rate limiting (5 attempts per hour per IP)
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500, // Max users per interval
});

const CODE_EXPIRY_TIME = 60 * 60 * 1000; // 60 minutes
const MAX_ATTEMPTS = 3;

export async function POST(req) {
  try {
    // Get the mongoose connection instance
    const db = await dbConnect();
    const { code, email } = await req.json();

    // Validate input
    if (!code || !email) {
      return NextResponse.json(
        { message: "Both code and email are required" },
        { status: 400 }
      );
    }

    // Apply rate limiting
    try {
      await limiter.check(req, 5, "VERIFY_ACCOUNT_LIMITER");
    } catch {
      return NextResponse.json(
        { message: "Too many verification attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Start a transaction using the connection
    const session = await db.startSession();
    session.startTransaction();

    try {
      // Check if permanent user already exists
      const existingUser = await User.findOne({ email }).session(session);
      if (existingUser) {
        // Clean up the temp record
        await UserTemp.deleteOne({ email }).session(session);
        await session.commitTransaction();

        return NextResponse.json(
          {
            message: "Account already exists. Please log in.",
            success: true,
            user: { email },
          },
          { status: 200 }
        );
      }

      const tempUser = await UserTemp.findOne({ email }).session(session);
      if (!tempUser) {
        await session.abortTransaction();
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
        await UserTemp.deleteOne({ email }).session(session);
        await session.commitTransaction();

        return NextResponse.json(
          { message: "Verification code expired", errorType: "EXPIRED_CODE" },
          { status: 410 }
        );
      }

      if (tempUser.attemptsRemaining <= 0) {
        await UserTemp.deleteOne({ email }).session(session);
        await session.commitTransaction();

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
        ).session(session);
        await session.commitTransaction();

        return NextResponse.json(
          {
            message: "Invalid verification code",
            errorType: "INVALID_CODE",
            attemptsRemaining: updatedAttempts,
          },
          { status: 400 }
        );
      }

      // Check for existing accounts with same phone number if provided
      if (tempUser.phone) {
        const phoneExists = await User.findOne({
          phone: tempUser.phone,
        }).session(session);
        if (phoneExists) {
          await session.abortTransaction();
          return NextResponse.json(
            {
              message: "Phone number already in use",
              errorType: "PHONE_EXISTS",
            },
            { status: 409 }
          );
        }
      }

      // Create new user
      const newUser = new User({
        email: tempUser.email,
        password: tempUser.password,
        name: tempUser.name,
        phone: tempUser.phone,
        isVerified: true,
      });

      await newUser.save({ session });
      await UserTemp.deleteOne({ email }).session(session);
      await session.commitTransaction();

      return NextResponse.json(
        {
          message: "Account verified successfully",
          success: true,
          user: { email: newUser.email, name: newUser.name },
        },
        { status: 200 }
      );
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("Verification error:", err);

    // Handle duplicate key errors specifically
    if (err.code === 11000) {
      const key = Object.keys(err.keyPattern)[0];
      return NextResponse.json(
        {
          message: `${key} already in use`,
          errorType: "DUPLICATE_KEY",
          field: key,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Server error during verification",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
