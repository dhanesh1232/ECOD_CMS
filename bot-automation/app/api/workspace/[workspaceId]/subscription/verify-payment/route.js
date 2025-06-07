// app/api/subscriptions/verify/route.js
import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { razorpay } from "@/lib/payment_gt";
import crypto from "crypto";
import { SuccessHandle } from "@/lib/server/success";
import { Subscription } from "@/models/payment/subscription";
import { PLANS } from "@/config/pricing.config";
import { Workspace } from "@/models/user/workspace";

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { workspaceId: slug } = await params;
    const body = await req.json();
    const {
      razorpay_subscription_id,
      razorpay_payment_id,
      razorpay_signature,
      plan_name,
      interval,
      amount,
    } = body;
    if (
      !razorpay_subscription_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return ErrorHandles.BadRequest("Missing verification data");
    }
    const workspace = await Workspace.findOne({ slug });
    // Verify the signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");
    if (generatedSignature !== razorpay_signature) {
      console.log("Invalid Signature");
      return ErrorHandles.BadRequest("Invalid signature");
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      return ErrorHandles.BadRequest("Payment not captured");
    }

    // Get subscription details from Razorpay
    const subscription = await razorpay.subscriptions.fetch(
      razorpay_subscription_id
    );

    if (subscription.status !== "active") {
      return ErrorHandles.BadRequest("Subscription is not active");
    }

    const sub = await Workspace.findOne(workspace._id);
    const now = new Date();
    const trialEnd = sub.trialEnd;
    const status = trialEnd && trialEnd > now ? "trialing" : "active";
    const dbSubscription = await Subscription.findOneAndUpdate(
      {
        gatewaySubscriptionId: razorpay_subscription_id,
        workspace: workspace._id,
        status: "pending",
      },
      {
        status: status,
        latestInvoice: {
          id: razorpay_payment_id,
          amount: amount / 100,
          currency: payment.currency,
          status: "paid",
          date: new Date(payment.created_at * 1000),
        },
        $push: {
          invoiceHistory: {
            id: razorpay_payment_id,
            date: new Date(payment.created_at * 1000),
            amount: amount / 100,
            currency: payment.currency,
            status: "paid",
          },
        },
      },
      { new: true }
    );

    if (!dbSubscription) {
      return ErrorHandles.UserNotFound("Subscription record not found");
    }

    await Workspace.findByIdAndUpdate(workspace._id, {
      limits: PLANS[plan_name]?.limits || {},
      subscription: {
        plan: dbSubscription.plan,
        status: status,
        billingCycle: interval,
        currentPeriodStart: dbSubscription.currentPeriodStart,
        currentPeriodEnd: dbSubscription.currentPeriodEnd,
        paymentGateway: dbSubscription.paymentGateway,
        gatewaySubscriptionId: razorpay_subscription_id,
      },
    });

    return SuccessHandle.SubscriptionSuccess(
      dbSubscription,
      "Subscription verified successfully"
    );
  } catch (err) {
    console.error("Verification error:", err);
    return ErrorHandles.InternalServer(err.message || "Verification failed");
  }
}
