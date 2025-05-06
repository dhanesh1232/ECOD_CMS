import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/config/dbconnect";
import { razorpay } from "@/lib/payment_gt";
import { PaymentHistory } from "@/models/payment/payment_history";
import { PaymentMethod } from "@/models/payment/paymentMethod";
import { Subscription } from "@/models/payment/subscription";
import { User } from "@/models/user/par-user";
import { validatePaymentRequest } from "@/utils/validators/payment.validator";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { addMonths, addYears } from "date-fns";
import mongoose from "mongoose"; // Added mongoose import
import { PLANS } from "@/config/pricing.config";

export async function POST(request) {
  const validationResult = await validatePaymentRequest(request);
  if (!validationResult.success) return validationResult;

  const { data } = validationResult;
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, planId } =
    data;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let dbSession;
  try {
    // Initialize database connection and session
    await dbConnect();
    dbSession = await mongoose.startSession();
    dbSession.startTransaction();

    const user = await User.findOne({ email: session.user.email })
      .session(dbSession)
      .orFail(new Error("User not found"));

    // 1. Fix signature verification order (payment_id|order_id)
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`) // Maintain this order
      .digest("hex");

    console.log("Signature Verification:", {
      received: razorpay_signature,
      generated: generatedSignature, // Now shows actual hash string
      secretExists: !!process.env.RAZORPAY_KEY_SECRET,
      input: `${razorpay_order_id}|${razorpay_payment_id}`, // Fix input logging order
    });

    if (generatedSignature !== razorpay_signature) {
      console.error("Signature Mismatch Details:", {
        receivedLength: razorpay_signature?.length,
        generatedLength: generatedSignature?.length,
      });
      throw new Error("Invalid payment signature - Verification failed");
    }
    // 2. Check for duplicate payment before processing
    const existingPayment = await PaymentHistory.findOne({
      "razorpay.paymentId": razorpay_payment_id,
      status: "paid",
    }).session(dbSession);

    if (existingPayment) {
      await dbSession.commitTransaction();
      return NextResponse.json({
        success: true,
        message: "Payment already processed",
        paymentId: razorpay_payment_id,
      });
    }

    // 3. Fetch payment details with error handling
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      throw new Error(`Payment not captured - Status: ${payment.status}`);
    }
    // 4. Update payment history with proper session handling
    const paymentHistory = await PaymentHistory.findOneAndUpdate(
      {
        "razorpay.orderId": razorpay_order_id,
        user: user._id,
        status: "pending",
      },
      {
        status: "paid",
        $set: {
          "razorpay.paymentId": razorpay_payment_id,
          "razorpay.signature": razorpay_signature,
          "invoice.url": payment.invoice_url,
          currency: payment.currency,
          period: payment.notes.period,
          amount: {
            total: payment.amount / 100,
            subtotal: (payment.amount - payment.fee) / 100,
            tax: payment.tax / 100,
            discount: 0,
          },
        },
      },
      { new: true, session: dbSession }
    ).orFail(new Error("Pending payment record not found"));
    console.log("console data", paymentHistory.period);
    // 5. Payment method handling with transaction
    let paymentMethod;
    const basePaymentData = {
      user: user._id,
      gateway: "razorpay",
      gatewayId: payment.id,
      isDefault: true,
      status: "active",
      metadata: {
        clientIp: request.headers.get("x-forwarded-for")?.split(",")[0] || "",
        userAgent: request.headers.get("user-agent") || "",
      },
    };

    switch (payment.method.toLowerCase()) {
      case "card":
        if (!payment.card) throw new Error("Missing card details");
        paymentMethod = await PaymentMethod.findOneAndUpdate(
          { "details.fingerprint": payment.card.fingerprint },
          {
            ...basePaymentData,
            type: "card",
            details: {
              brand: payment.card.network,
              last4: payment.card.last4,
              expMonth: payment.card.expiry_month,
              expYear: payment.card.expiry_year,
              country: payment.card.issuer,
              funding: payment.card.type,
              fingerprint: payment.card.fingerprint,
            },
          },
          { upsert: true, new: true, session: dbSession }
        );
        break;

      case "upi":
        if (!payment.upi?.vpa) throw new Error("Missing UPI details");
        paymentMethod = await PaymentMethod.findOneAndUpdate(
          { "details.vpa": payment.upi.vpa },
          {
            ...basePaymentData,
            type: "upi",
            details: {
              vpa: payment.upi.vpa,
              provider: payment.upi.vpa.split("@")[1],
            },
          },
          { upsert: true, new: true, session: dbSession }
        );
        break;

      default:
        throw new Error(`Unsupported payment method: ${payment.method}`);
    }

    // 6. Subscription handling with proper date calculation
    const startDate = new Date();
    const endDate =
      paymentHistory.period === "monthly"
        ? addMonths(startDate, 1)
        : addYears(startDate, 1);
    const subscriptionPlan = PLANS[planId];
    if (!subscriptionPlan) {
      throw new Error(`Invalid plan ID: ${planId}`);
    }
    if (!["monthly", "yearly"].includes(paymentHistory.period)) {
      throw new Error("Invalid billing period");
    }
    const validatePlanConsistency = () => {
      if (paymentHistory.plan !== planId) {
        throw new Error("Plan ID mismatch between payment and request");
      }

      if (!PLANS[planId].prices?.[paymentHistory.period]) {
        throw new Error(
          `Plan ${planId} doesn't support ${paymentHistory.period} billing`
        );
      }
    };

    // Call this before processing payment
    validatePlanConsistency();
    const subscription = await Subscription.findOneAndUpdate(
      { user: user._id },
      {
        plan: planId,
        status: "active",
        paymentGateway: "razorpay",
        currentPaymentMethod: paymentMethod._id,
        $addToSet: { paymentHistory: paymentHistory._id },
        $set: {
          startDate,
          endDate,
          renewalInterval: paymentHistory.period,
          features: subscriptionPlan.features,
        },
      },
      {
        new: true,
        upsert: true,
        session: dbSession,
      }
    ).populate("currentPaymentMethod");
    console.log("Subscription Update:", {
      userId: user._id,
      planId,
      renewalInterval: paymentHistory.period,
      endDate,
      paymentMethod: paymentMethod._id,
    });
    if (subscription.renewalInterval !== paymentHistory.period) {
      console.error("Renewal interval mismatch:", {
        expected: paymentHistory.period,
        actual: subscription.renewalInterval,
      });
      throw new Error("Failed to update renewal interval");
    }

    await dbSession.commitTransaction();

    // 7. Sanitized response
    return NextResponse.json({
      success: true,
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        nextBillingDate: subscription.endDate,
        paymentMethod: {
          type: paymentMethod.type,
          maskedInfo: paymentMethod.maskedIdentifier,
          provider:
            paymentMethod.details.provider || paymentMethod.details.brand,
        },
      },
      payment: {
        id: razorpay_payment_id,
        amount: payment.amount / 100,
        currency: payment.currency,
        method: payment.method,
      },
    });
  } catch (err) {
    await dbSession?.abortTransaction();
    console.error("Payment Error:", {
      user: session?.user?.email,
      error: err.message,
      paymentId: razorpay_payment_id,
      stack: err.stack,
    });

    const statusCode = err.message.includes("not found")
      ? 404
      : err.message.includes("Invalid")
      ? 400
      : 500;

    return NextResponse.json(
      {
        success: false,
        message: "Payment processing failed",
        error: err.message,
        paymentId: razorpay_payment_id,
        documentation:
          "https://razorpay.com/docs/payments/server-integration/nodejs/verification",
      },
      { status: statusCode }
    );
  } finally {
    dbSession?.endSession();
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
