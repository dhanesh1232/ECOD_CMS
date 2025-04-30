import dbConnect from "@/config/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const { NextResponse } = require("next/server");
export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const body = await req.json();
    console.log(session?.user?.email);
    const { type, id } = body;
    console.log(type, id);
    return NextResponse.json({ message: "None" }, { status: 200 });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { message: "Internal server error please try again" },
      { status: 500 }
    );
  }
}
