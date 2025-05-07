import { PasswordResetLinkGenerator } from "@/lib/helper";
import { generateStrongVerificationCode } from "@/lib/validator";
import ForgotTemp from "@/models/user/for-temp";
import { User } from "@/models/user/par-user";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;
    const exist = await ForgotTemp.findOne({ email });
    if (exist) {
      await ForgotTemp.deleteOne({ email });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: `This email doesn't exist please enter valid email` },
        { status: 400 }
      );
    }
    const name = user.name;
    const verificationCode = generateStrongVerificationCode(6);
    await PasswordResetLinkGenerator(verificationCode, name, email);
    await ForgotTemp.create({ email, verificationCode });
    return NextResponse.json(
      {
        message: "Password reset link sent to your email ",
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
