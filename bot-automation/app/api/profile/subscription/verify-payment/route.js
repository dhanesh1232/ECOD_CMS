import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/config/dbconnect";
import { razorpay } from "@/lib/payment_gt";
import { User } from "@/models/user/par-user";
import { PaymentHistory } from "@/models/payment/payment_history";
import { PaymentMethod } from "@/models/payment/paymentMethod";
import { Subscription } from "@/models/payment/subscription";
import { validatePaymentRequest } from "@/utils/validators/payment.validator";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const crypto = require("crypto");

export async function POST(request) {
  const validationResult = await validatePaymentRequest(request);
  if (!validationResult.success) {
    return validationResult;
  }
  try {
    const { data } = validationResult;
    console.log(data);
    await dbConnect();
    const session = await getServerSession(authOptions);
    const body = await request.json();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const email = session?.user?.email;
    const user = await User.findOne({ email });
    const userId = data.userId;
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      planId,
    } = body;
    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.log("Signature mismatch", {
        received: razorpay_signature,
        generated: generatedSignature,
        input: `${razorpay_order_id}|${razorpay_payment_id}`,
        secret: process.env.RAZORPAY_KEY_SECRET ? "exists" : "missing",
      });
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Update payment history
    const paymentHistory = await PaymentHistory.findOneAndUpdate(
      {
        "razorpay.paymentId": razorpay_payment_id,
        user: userId,
        status: "pending",
      },
      {
        status: "paid",
        $set: {
          "razorpay.signature": razorpay_signature,
          "invoice.url": payment.invoice_url,
        },
      },
      { new: true }
    );

    if (!paymentHistory) {
      return NextResponse.json(
        { success: false, message: "Payment record not found" },
        { status: 400 }
      );
    }

    // Update subscription plan
    const subscription = await Subscription.findOneAndUpdate(
      { user: userId },
      {
        plan: planId,
        status: "active",
        paymentGateway: "razorpay",
        $push: { paymentHistory: paymentHistory._id },
      },
      { new: true }
    );

    if (!subscription) {
      return NextResponse.json(
        { success: false, message: "Subscription update failed" },
        { status: 400 }
      );
    }
    // Create/update payment method
    const paymentMethod = await PaymentMethod.findOneAndUpdate(
      {
        user: userId,
        "details.fingerprint": payment.card?.fingerprint,
      },
      {
        gateway: "razorpay",
        gatewayId: payment.card_id,
        type: "card",
        details: {
          brand: payment.card?.network,
          last4: payment.card?.last4,
          expMonth: payment.card?.expiry_month,
          expYear: payment.card?.expiry_year,
          country: payment.card?.issuer,
          funding: payment.card?.type,
          fingerprint: payment.card?.fingerprint,
          name: payment.card?.name,
        },
        isDefault: true,
      },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      subscription,
      paymentHistory,
      paymentMethod,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Internal server error please try again later",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
// Add this to block GET requests
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
