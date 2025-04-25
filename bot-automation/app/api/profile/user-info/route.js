import { getServerSession } from "next-auth";
import dbConnect from "@/config/dbconnect";
import User from "@/model/par-user";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const email = session?.user?.email;
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: `Internal server error: ${err.message}` },
      { status: 500 }
    );
  }
}
