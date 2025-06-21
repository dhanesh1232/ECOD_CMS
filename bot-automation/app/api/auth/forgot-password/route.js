import { PasswordResetLinkGenerator } from "@/lib/helper";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";

export async function POST(req) {
  try {
    // Connect to database
    await dbConnect();

    // Validate request content type
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { message: "Invalid content type" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    if (!body?.email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const { email } = body;

    // Find user
    const user = await User.findOne({ email }).select(
      "+passwordResetToken +passwordResetExpires"
    );
    if (!user) {
      // Don't reveal whether email exists in system
      return NextResponse.json(
        { message: "If this email exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const verificationCode = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send email
    await PasswordResetLinkGenerator(verificationCode, user.name, email);

    // Return success response
    return NextResponse.json(
      {
        message: "If this email exists, a reset link has been sent",
      },
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
