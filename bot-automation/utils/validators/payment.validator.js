// utils/validators/payment.validator.js
import { NextResponse } from "next/server";
import { PaymentHistory } from "@/models/payment/payment_history";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import crypto from "crypto";
import { PLANS } from "@/config/pricing.config";
import { User } from "@/models/user/user";
import dbConnect from "@/config/dbconnect";

export const validatePaymentRequest = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    // 1. Validate HTTP method
    if (req.method !== "POST") {
      return NextResponse.json(
        { success: false, message: "Method not allowed" },
        { status: 405 }
      );
    }

    // 2. Validate session and authentication
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 3. Validate request body format
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    // 4. Validate required fields
    const requiredFields = [
      "razorpay_payment_id",
      "razorpay_order_id",
      "razorpay_signature",
      "planId",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // 5. Validate Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== body.razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
          debug: {
            received: body.razorpay_signature,
            generated: generatedSignature,
            secretExists: !!process.env.RAZORPAY_KEY_SECRET,
          },
        },
        { status: 400 }
      );
    }

    // 6. Validate payment record existence
    const paymentRecord = await PaymentHistory.findOne({
      "razorpay.orderId": body.razorpay_order_id,
      user: user._id,
      status: "pending",
    });

    if (!paymentRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment record not found or already processed",
          debug: {
            orderId: body.razorpay_order_id,
            userId: user._id,
          },
        },
        { status: 400 }
      );
    }

    // 7. Validate plan ID
    if (!PLANS[body.planId]) {
      return NextResponse.json(
        { success: false, message: "Invalid plan ID" },
        { status: 400 }
      );
    }

    // If all validations pass, return cleaned data
    return {
      success: true,
      data: {
        ...body,
        userId: user._id,
        paymentRecord,
      },
    };
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
