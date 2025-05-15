// Server-side: app/api/subscription/create-payment-order/route.js
import dbConnect from "@/config/dbconnect";
import { PLANS, TAX_RATES } from "@/config/pricing.config";
import { validateSession } from "@/lib/auth";
import { razorpay } from "@/lib/payment_gt";
import { PaymentHistory } from "@/models/payment/payment_history";
import { NextResponse } from "next/server";

// Enhanced create-payment-order API route
export async function POST(request) {
  try {
    await dbConnect();
    const session = await validateSession();

    // Verify Razorpay instance
    if (!razorpay) {
      throw new Error("Razorpay not initialized");
    }
    const user = session.user;
    const body = await request.json();
    const { planId, amount, currency, period } = body;

    // Validate plan exists
    const plan = PLANS[planId];
    if (!plan || !plan.prices) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency,
      receipt: `order_${Date.now()}`,
      notes: {
        planId,
        period,
        userId: user.id,
      },
    });

    // Create payment history record
    const paymentHistory = new PaymentHistory({
      user: user.id,
      plan: planId,
      amount: {
        total: amount / 100,
        subtotal: amount / 100 / (1 + TAX_RATES[currency]),
        tax: (amount / 100) * TAX_RATES[currency],
        discount: 0,
      },
      razorpay: {
        orderId: order.id,
        paymentId: null,
      },
      status: "pending",
      currency,
      period,
    });

    await paymentHistory.save();

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Payment order error:", err);
    return NextResponse.json(
      { message: "Payment processing failed", error: err.message },
      { status: 500 }
    );
  }
}
