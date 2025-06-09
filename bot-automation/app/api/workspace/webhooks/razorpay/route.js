import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import crypto from "crypto";
import { SuccessHandle } from "@/lib/server/success";
import { Subscription } from "@/models/payment/subscription";
import { Workspace } from "@/models/user/workspace";
import { PLANS } from "@/config/pricing.config";
import { razorpay } from "@/lib/payment_gt";

// Grace period in days
const GRACE_PERIOD_DAYS = 2;
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle raw request
  },
};
export async function POST(req) {
  await dbConnect();

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const body = JSON.parse(rawBody);

    const eventType = body.event;
    const payload =
      body.payload.subscription?.entity || body.payload.payment?.entity;

    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");
    // Verify the signature
    if (generatedSignature !== signature) {
      return ErrorHandles.UnauthorizedAccess("Invalid webhook signature");
    }
    if (!payload) {
      return ErrorHandles.BadRequest("Invalid payload structure");
    }

    // Handle different event types
    switch (eventType) {
      case "payment.authorized":
        console.log(
          `Payment authorized at ${new Date().toLocaleString()}: ${payload.id}`
        );
        const payment = body.payload?.payment?.entity;
        console.log(payment);
        await razorpay.payments.capture(payment.id, payment.amount);
        break;

      case "payment.captured":
        console.log(
          `Payment captured at ${new Date().toLocaleString()}: ${payload.id}`
        );
        break;
      case "payment.failed":
        console.log(
          `Payment failed at ${new Date().toLocaleString()}: ${payload.id}`
        );
        break;
      case "subscription.activated":
        //await handleSubscriptionActivated(subscription, workspace, payload);
        console.log(
          `Subscription activated at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;

      case "invoice.paid":
        //await handleInvoicePaid(subscription, workspace, payload);
        console.log(
          `Invoice paid at ${new Date().toLocaleString()}: ${payload.id}`
        );
        break;

      case "invoice.payment_failed":
        //await handlePaymentFailed(subscription, workspace, payload);
        console.log(
          `Payment failed at ${new Date().toLocaleString()}: ${payload.id}`
        );
        break;

      case "subscription.cancelled":
        //await handleSubscriptionCancelled(subscription, workspace, payload);
        console.log(
          `Subscription cancelled at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;
      case "subscription.authenticated":
        console.log(
          `Subscription authenticated at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;
      case "subscription.completed":
        console.log(
          `Subscription completed at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;
      case "refund.processed":
        console.log(
          `Refund processed at ${new Date().toLocaleString()}: ${payload.id}`
        );
        break;
      case "refund.failed":
        console.log(
          `Refund failed at ${new Date().toLocaleString()}: ${payload.id}`
        );
        break;
      case "subscription.renewed":
        console.log(
          `Subscription renewed at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;
      case "subscription.upgraded":
        console.log(
          `Subscription upgraded at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;
      case "subscription.downgraded":
        console.log(
          `Subscription downgraded at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;
      case "refund.created":
        console.log(
          `Refund created at ${new Date().toLocaleString()}: ${payload.id}`
        );
        break;
      case "subscription.charged":
        console.log(
          `Subscription charged at ${new Date().toLocaleString()}: ${
            payload.id
          }`
        );
        break;

      default:
        console.log(
          `Unhandled event type ${new Date().toLocaleString()}: ${eventType}`
        );
        return SuccessHandle.DefaultSuccess("Event not handled");
    }

    return SuccessHandle.DefaultSuccess("Webhook processed");
  } catch (err) {
    console.error("Webhook error:", err);
    return ErrorHandles.InternalServer(
      err.message || "Webhook processing failed"
    );
  }
}

// Handle subscription activation
async function handleSubscriptionActivated(subscription, workspace, payload) {
  const currentPeriodStart = new Date(payload.current_start * 1000);
  const currentPeriodEnd = new Date(payload.current_end * 1000);

  subscription.status = payload.status;
  subscription.currentPeriodStart = currentPeriodStart;
  subscription.currentPeriodEnd = currentPeriodEnd;

  if (payload.start_at) {
    subscription.trialStart = new Date(payload.start_at * 1000);
  }

  if (payload.end_at) {
    subscription.trialEnd = new Date(payload.end_at * 1000);
  }

  await subscription.save();

  workspace.subscription.status = payload.status;
  workspace.subscription.plan = subscription.plan;
  workspace.subscription.currentPeriodStart = currentPeriodStart;
  workspace.subscription.currentPeriodEnd = currentPeriodEnd;
  workspace.subscription.trialEnd = subscription.trialEnd;
  workspace.limits = PLANS[subscription.plan]?.limits || {};

  await workspace.save();
}

// Handle successful payment
async function handleInvoicePaid(subscription, workspace, payload) {
  const payment = payload.payments[0];
  const periodStart = new Date(payload.current_start * 1000);
  const periodEnd = new Date(payload.current_end * 1000);

  // Update subscription
  subscription.status = "active";
  subscription.currentPeriodStart = periodStart;
  subscription.currentPeriodEnd = periodEnd;

  // Add to invoice history
  subscription.invoiceHistory.push({
    id: payload.id,
    date: new Date(),
    amount: payment.amount / 100,
    currency: payment.currency,
    status: "paid",
  });

  await subscription.save();

  // Update workspace
  workspace.subscription.status = "active";
  workspace.subscription.currentPeriodStart = periodStart;
  workspace.subscription.currentPeriodEnd = periodEnd;
  workspace.subscription.nextBillingAt = periodEnd;

  // Reset grace period if any
  if (workspace.subscription.gracePeriodEnd) {
    workspace.subscription.gracePeriodEnd = null;
  }

  await workspace.save();
}

// Handle payment failure
async function handlePaymentFailed(subscription, workspace, payload) {
  // Calculate grace period end
  const gracePeriodEnd = new Date();
  gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIOD_DAYS);

  // Update subscription
  subscription.status = "past_due";
  subscription.latestInvoice = {
    status: "failed",
    amount: payload.amount_due / 100,
    currency: payload.currency,
  };

  await subscription.save();

  // Update workspace
  workspace.subscription.status = "past_due";
  workspace.subscription.gracePeriodEnd = gracePeriodEnd;
  await workspace.save();

  // TODO: Send payment failure notification
}

// Handle subscription cancellation
async function handleSubscriptionCancelled(subscription, workspace, payload) {
  const cancelledAt = new Date(payload.ended_at * 1000);

  // Update subscription
  subscription.status = "canceled";
  subscription.canceledAt = cancelledAt;
  subscription.endedAt = cancelledAt;
  await subscription.save();

  // Update workspace
  workspace.subscription.status = "canceled";
  workspace.subscription.canceledAt = cancelledAt;

  // Downgrade to free plan
  workspace.subscription.plan = "free";
  workspace.limits = PLANS.free.limits;

  await workspace.save();
}
