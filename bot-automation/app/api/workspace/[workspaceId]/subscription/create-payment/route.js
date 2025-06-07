import dbConnect from "@/config/dbconnect";
import { PLANS } from "@/config/pricing.config";
import { validateSession } from "@/lib/auth";
import { razorpay } from "@/lib/payment_gt";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Subscription } from "@/models/payment/subscription";
import { Workspace } from "@/models/user/workspace";

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const session = await validateSession(req);
    const { workspaceId: slug } = await params;
    const body = await req.json();
    const {
      planName,
      amount,
      currency = "INR",
      interval = "monthly",
      email,
      phone,
    } = body;

    if (!amount || !planName || !email || !phone || !slug) {
      return ErrorHandles.BadRequest(
        "Missing required fields: amount, planName, email, phone, and workspaceId are required"
      );
    }
    const workspace = await Workspace.findOne({ slug });
    if (!workspace) {
      return ErrorHandles.UserNotFound("Workspace not found");
    }

    const isOwner = workspace.members.some(
      (m) =>
        m.user.toString() === session.user.id &&
        (m.role === "owner" || m.role === "admin")
    );
    if (!isOwner) {
      return ErrorHandles.UnauthorizedAccess(
        "Only workspace owners can create subscriptions"
      );
    }

    const existingSub = await Subscription.findOne({
      workspace: workspace._id,
      status: { $in: ["active", "trialing"] },
      plan: { $ne: "free" },
    });

    if (existingSub) {
      return ErrorHandles.Conflict(
        "Workspace already has an active subscription"
      );
    }

    const isDev = process.env.NODE_ENV === "development";
    const trialMinute = isDev ? 5 : 0;
    const trialDays = isDev ? 0 : PLANS[planName].metadata.trialDays || 0;
    const currentDate = new Date();

    const timePeriod = 1;
    const periodCount = interval === "monthly" ? "monthly" : "yearly";
    let trialEndDate;
    if (isDev) {
      // For development: 5 minute trial
      trialEndDate = new Date(currentDate.getTime() + trialMinute * 60 * 1000);
    } else {
      // For production: use normal trial days from PLANS config
      trialEndDate =
        trialDays > 0
          ? new Date(currentDate.setDate(currentDate.getDate() + trialDays))
          : null;
    }
    // First check if plan already exists
    const existingPlans = await razorpay.plans.all({
      count: 100,
    });

    let plan = existingPlans.items.find(
      (p) =>
        p.item.name === `${planName} Subscription` &&
        p.item.amount === amount &&
        p.period === periodCount &&
        p.interval === timePeriod
    );

    // Create new plan only if it doesn't exist
    if (!plan) {
      plan = await razorpay.plans.create({
        period: periodCount, // 'monthly' or 'yearly'
        interval: timePeriod, // 1 or 12
        item: {
          name: `${planName} Subscription`,
          amount: amount,
          currency: currency,
          description: `${planName} subscription plan ${periodCount}`,
        },
        notes: {
          plan_name: planName,
        },
      });
    }

    const subPayload = {
      plan_id: plan.id,
      customer_notify: 1,
      total_count: 12,
      ...((isDev || trialDays > 0) && {
        start_at: Math.floor(trialEndDate.getTime() / 1000), // Unix timestamp
      }),
      notes: {
        customer_id: session?.user?.id,
        workspace_id: slug,
        plan_name: planName,
      },
    };

    const subscription = await razorpay.subscriptions.create(subPayload);
    return SuccessHandle.createSub({
      ...subscription,
    });
  } catch (err) {
    console.error("Razorpay error:", err);
    return ErrorHandles.InternalServer(
      err.message || "Failed to create subscription"
    );
  }
}
