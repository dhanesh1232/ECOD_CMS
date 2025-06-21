import { PasswordResetLinkGenerator } from "@/lib/helper";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";

export async function POST(req) {
  try {
    await dbConnect();

    // Verify content type
    const contentType = req.headers.get("content-type");
    if (contentType !== "application/json") {
      return NextResponse.json(
        { message: "Invalid content type" },
        { status: 400 }
      );
    }

    // Parse and validate body
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { email } = body;
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Generic response for security
      return NextResponse.json(
        { message: "If this email exists, a reset link will be sent" },
        { status: 200 }
      );
    }

    // Generate token
    const verificationCode = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Ensure PasswordResetLinkGenerator returns a Promise
    await PasswordResetLinkGenerator(
      verificationCode.toString(), // Explicit string conversion
      user.name,
      email
    );

    return NextResponse.json(
      { message: "If this email exists, a reset link will be sent" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Password reset error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
