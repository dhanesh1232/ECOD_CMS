import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/config/dbconnect";
import { PaymentHistory } from "@/models/payment/payment_history";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url);
  const userId = url.searchParams.get("user");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    console.log("Fetching payment history for user:", userId);

    const paymentHistory = await PaymentHistory.find({
      user: userId,
    })
      .populate("userInfo")
      .exec();
    return NextResponse.json(
      { paymentHistory, message: "Payment history fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
