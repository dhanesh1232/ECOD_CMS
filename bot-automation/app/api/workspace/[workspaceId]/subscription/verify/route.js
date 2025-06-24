// app/api/subscriptions/verify/route.js
import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { razorpay } from "@/lib/payment_gt";
import crypto from "crypto";
import { SuccessHandle } from "@/lib/server/success";
import { Subscription } from "@/models/payment/subscription";
import { PLANS } from "@/config/pricing.config";
import { Workspace } from "@/models/user/workspace";
import { Plan } from "@/models/user/schema";
import { validateSession } from "@/lib/auth";
import { intersection } from "lodash";

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const session = await validateSession(req);
    const { workspaceId: slug } = await params;
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan_name,
      planId,
      cycle,
      amount,
      currency = "INR",
      couponCode,
      customer_id,
    } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return ErrorHandles.BadRequest("Missing verification data");
    }
    const workspace = await Workspace.findOne({ slug });
    // Verify the signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (generatedSignature !== razorpay_signature) {
      console.log("Invalid Signature");
      return ErrorHandles.BadRequest("Invalid signature");
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      return ErrorHandles.BadRequest("Payment not captured");
    }
    console.log("Payment status:", payment);

    // fetch plans from DB
    const plan = await Plan.findById(planId);
    const period = cycle === "monthly" ? "monthly" : "yearly";
    const planAmount = plan.prices[cycle] + plan.prices[cycle] * 0.18;
    console.log(planAmount * 100, planAmount);
    const exPlans = await razorpay.plans.all({ count: 100 });
    let ex_plan = exPlans.items.find(
      (p) =>
        p.item.name === `${plan.name} Subscription` &&
        p.item.amount === planAmount * 100 &&
        p.period === period
    );
    if (!ex_plan) {
      ex_plan = await razorpay.plans.create({
        period: period,
        interval: 1,
        item: {
          name: `${plan.name} Subscription`,
          amount: planAmount * 100,
          currency,
        },
      });
    }
    const inTest = 5 * 60;
    const durationSeconds =
      cycle === "yearly" ? 364 * 24 * 60 * 60 : 29 * 24 * 60 * 60;
    const start_date = Math.floor(Date.now() / 1000) + inTest;
    const subParams = {
      plan_id: ex_plan.id,
      start_at: start_date,
      total_count: 12,
      customer_notify: 1,
      customer_id: customer_id,
      notes: {
        customer_id: session?.user?.id,
        workspace_id: workspace._id,
        plan_name: plan_name,
        first_discount_payment_id: razorpay_payment_id,
        coupon: couponCode,
      },
    };
    const subscription = await razorpay.subscriptions.create(subParams);
    const formatUnix = (ts) =>
      ts
        ? new Date(ts * 1000).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })
        : null;

    // Enhance subscription with readable date fields
    const enhancedSubscription = {
      ...subscription,
      charge_at_readable: formatUnix(subscription.charge_at),
      start_at_readable: formatUnix(subscription.start_at),
      end_at_readable: formatUnix(subscription.end_at),
      created_at_readable: formatUnix(subscription.created_at),
      current_start_readable: formatUnix(subscription.current_start),
      current_end_readable: formatUnix(subscription.current_end),
      ended_at_readable: formatUnix(subscription.ended_at),
      expire_by_readable: formatUnix(subscription.expire_by),
      change_scheduled_at_readable: formatUnix(
        subscription.change_scheduled_at
      ),
    };
    console.log(enhancedSubscription);

    return SuccessHandle.SubscriptionSuccess(
      enhancedSubscription,
      "Subscription verified successfully"
    );
  } catch (err) {
    console.error("Verification error:", err);
    return ErrorHandles.InternalServer(err.message || "Verification failed");
  }
}
