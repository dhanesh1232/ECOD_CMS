import dbConnect from "@/config/dbconnect";
import { PasswordResetSuccessfulMail } from "@/lib/helper";
import { User } from "@/models/user/par-user";
import crypto from "crypto";
const { NextResponse } = require("next/server");

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); // Await was missing
    const { password, token, email } = body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email,
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Token has expired, please reset again" },
        { status: 400 }
      );
    }
    if (user.passwordHistory.map((item) => item.password).includes(password)) {
      return NextResponse.json(
        { message: "Password already used, please choose a new one" },
        { status: 400 }
      );
    }

    // Update password history
    user.passwordHistory.push({
      password: user.password,
      changedAt: Date.now(),
    }); // Store the old password in history

    user.password = password;
    user.passwordChangedAt = Date.now(); // Ensure the password changed time is set correctly
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    await PasswordResetSuccessfulMail(user.name, user.email);

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Password reset error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
