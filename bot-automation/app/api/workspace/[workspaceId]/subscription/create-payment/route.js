import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { razorpay } from "@/lib/payment_gt";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { BillingDetails } from "@/models/payment/billingDetails";
import { Subscription } from "@/models/payment/subscription";
import { SubscriptionHistory } from "@/models/payment/subscriptionHistory";
import { Plan } from "@/models/user/schema";
import { Workspace } from "@/models/user/workspace";

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const session = await validateSession(req);
    const { workspaceId: slug } = await params;
    const body = await req.json();
    const { amount, cycle = "monthly", planId, currency = "INR" } = body;

    if (!amount || !slug || !cycle || !planId) {
      return ErrorHandles.BadRequest(
        "Missing required fields: amount, cycle, planId and slug are required"
      );
    }
    const plan = await Plan.findById(planId);
    if (!plan) {
      return ErrorHandles.UserNotFound(
        "Plan not exist please choose valida plan"
      );
    }
    const workspace = await Workspace.findOne({
      slug,
      members: {
        $elemMatch: {
          user: session.user.id,
          $or: [
            { role: { $in: ["admin", "owner"] } },
            { "permissions.resource": { $in: ["billing", "all"] } },
          ],
        },
      },
    });
    if (!workspace) {
      return ErrorHandles.Conflict(
        "Access denied. You must be an admin, owner, or have billing permissions."
      );
    }
    const billing = await BillingDetails.findOne({
      workspace: workspace._id,
    });
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
    const sub = await Subscription.findOne({ workspace: workspace._id });
    if (!sub) {
      return ErrorHandles.UserNotFound("Subscritpion not found");
    }

    const isDev = process.env.NODE_ENV === "development";
    const trialDays = plan.metadata.trialDays || 0;
    const currentDate = new Date();

    const timePeriod = 1;
    const periodCount = cycle === "monthly" ? "monthly" : "yearly";
    const trialEndDate =
      trialDays > 0
        ? new Date(currentDate.setDate(currentDate.getDate() + trialDays))
        : null;

    let customerId = workspace.gatewayCustomerId;
    /*if (!customerId) {
      const customer = await razorpay.customers.create({
        name: billing.companyName,
        email: billing.email,
        contact: billing.phone,
      });
      customerId = customer.id;
    }
    await razorpay.customers.edit(customerId, {
      name: billing.companyName,
      email: billing.email,
      contact: billing.phone,
    });
    const isValid = await razorpay.customers.fetch(customerId);
    if (!isValid) {
      return ErrorHandles.UserNotFound(
        "Failed to create customer. Please try again later."
      );
    }*/

    // Get all plans from Razorpay
    const existPlan = await razorpay.plans.all({
      count: 100,
    });
    let sub_plan = existPlan.items.find(
      (p) =>
        p.item.name === `${plan.name} Subscription` &&
        p.item.amount === amount * 100 &&
        p.period === periodCount &&
        p.interval === timePeriod
    );
    if (!sub_plan) {
      sub_plan = await razorpay.plans.create({
        period: periodCount, // 'monthly' or 'yearly'
        interval: timePeriod, // 1 or 12
        item: {
          name: `${plan.name} Subscription`,
          amount: amount * 100,
          currency: currency,
          description: `${plan.name} subscription plan ${periodCount}`,
        },
        notes: {
          plan_name: plan.name,
        },
      });
    }

    const subParams = {
      plan_id: sub_plan.id,
      ...(!isDev && { customer_id: customerId }),
      total_count: 12,
      customer_notify: 1,
      notify_info: {
        email: billing.email,
        contact: billing.phone,
      },
      ...(!isDev &&
        trialDays > 0 && {
          start_at: Math.floor(trialEndDate.getTime() / 1000),
        }),
      notes: {
        customer_id: session?.user?.id,
        workspace_id: workspace._id,
        plan_name: plan.name,
      },
    };

    const subscription = await razorpay.subscriptions.create(subParams);
    await SubscriptionHistory.create({
      workspace: workspace._id,
      user: session?.user?.id,
      subscription: sub._id,
      plan: plan.name.toLowerCase(),
      action: "create",
      billingCycle: cycle,
      status: "pending",
      gateway: {
        subscriptionId: subscription.id,
        customerId,
        name: "razorpay",
        planId: sub_plan.id,
      },
      amount: {
        subtotal: plan.prices[cycle],
        tax: plan.prices[cycle] * 0.18,
        total: amount,
        currency: currency,
      },
      metadata: {
        ipAddress: req.headers.get("X-Forwarded-For"),
        userAgent: req.headers.get("User-Agent"),
      },
    });
    return SuccessHandle.createSub({
      ...subscription,
    });
  } catch (err) {
    return ErrorHandles.InternalServer(
      err.message || "Failed to create subscription"
    );
  }
}
