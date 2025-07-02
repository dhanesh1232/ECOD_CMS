// app/api/register/route.js
import { NextResponse } from "next/server";
import {
  generateStrongVerificationCode,
  validateAll,
  validateEmail,
} from "@/lib/validator";
import { VerificationMail } from "@/lib/helper";
import dbConnect from "@/config/dbconnect";
import UserTemp from "@/models/user/user-temp";
import { User } from "@/models/user/user";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, password, name, phone, terms } = body;

    const errors = validateAll({ email, password, name, phone, terms });
    const hasErrors = Object.values(errors).some((err) => err !== null);
    if (hasErrors) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (user) {
      return NextResponse.json(
        { message: "User phone/email already exist please login" },
        { status: 400 }
      );
    }
    //Temp Creation
    const verificationCode = generateStrongVerificationCode(6);
    await VerificationMail(verificationCode, email);
    await UserTemp.create({
      email,
      password: password,
      name,
      phone,
      verificationCode,
      termsAccepted: terms,
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    const body = await req.json();
    const { email } = body;
    const error = validateEmail(email);
    if (error) {
      return NextResponse.json(
        { message: "Please enter valid email" },
        { status: 400 }
      );
    }

    const verificationCode = generateStrongVerificationCode(6);
    await VerificationMail(verificationCode, email);
    const user = await UserTemp.findOne({ email });
    user.verificationCode = verificationCode;
    await user.save();
    return NextResponse.json(
      {
        message: "Resend verification code successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Resend failed please try again later",
      },
      { status: 400 }
    );
  }
}
