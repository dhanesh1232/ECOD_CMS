import dbConnect from "@/config/dbconnect";
import ForgotTemp from "@/model/for-temp";
import User from "@/model/par-user";
import bcrypt from "bcryptjs";

const { NextResponse } = require("next/server");

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); // Await was missing
    const { password, token, email } = body;

    const user = await ForgotTemp.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Token has expired, please reset again" },
        { status: 400 }
      );
    }
    console.log(user);
    if (user.verificationCode !== token) {
      return NextResponse.json(
        { message: "Invalid token, please send reset link again" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    existingUser.password = hashedPassword;
    await existingUser.save();

    // Optionally delete the temp token after use
    await ForgotTemp.deleteOne({ email });

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
