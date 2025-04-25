import { NextResponse } from "next/server";

const { default: dbConnect } = require("@/config/dbconnect");
const { default: User } = require("@/model/par-user");

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: `This email doesn't exist please enter valid email` },
        { status: 400 }
      );
    }
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
