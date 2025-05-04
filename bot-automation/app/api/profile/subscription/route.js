// app/api/profile/subscription/route.js
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/config/dbconnect";
import { User } from "@/models/user/par-user";

export async function GET(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existUser = await User.findOne({ email: session.user.email })
      .populate({
        path: "subscription",
        match: {
          status: {
            $in: ["active", "past_due", "grace_period", "canceled", "unpaid"],
          },
        },
        populate: { path: "paymentMethod" },
      })
      .lean();

    return NextResponse.json(
      { message: "Success", user: existUser },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (err) {
    console.error("Subscription error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
