import { PasswordResetLinkGenerator } from "@/lib/helper";
import { User } from "@/models/user/user";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: `User not found` }, { status: 404 });
    }
    const verificationCode = user.createPasswordResetToken();
    await user.save();

    await PasswordResetLinkGenerator(verificationCode, user.name, email);
    return NextResponse.json(
      {
        message: "Password reset link sent to your email",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
