// app/api/register/route.js
import { NextResponse } from "next/server";
import { generateStrongVerificationCode, validateAll } from "@/lib/validator";
import { VerificationMail } from "@/lib/helper";
import dbConnect from "@/config/dbconnect";
import UserTemp from "@/model/user-temp";
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

    //Temp Creation
    const verificationCode = generateStrongVerificationCode(6);
    await VerificationMail(verificationCode, email);
    await UserTemp.create({ email, password, name, phone, verificationCode });

    return NextResponse.json(
      {
        message: "Registration successful",
        data: { verificationCode, email, password, name, phone },
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
