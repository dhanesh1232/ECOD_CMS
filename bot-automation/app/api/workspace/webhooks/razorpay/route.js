import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import crypto from "crypto";
import { SuccessHandle } from "@/lib/server/success";
import { razorpay } from "@/lib/payment_gt";
import { _webhooksHandles } from "@/lib/server/webhooks.service";

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
        await _webhooksHandles.__webhooks__payment__authorized__(payload);
        break;

      case "payment.captured":
        await _webhooksHandles.__webhooks__payment__capture__(payload);
        break;

      case "payment.failed":
        await _webhooksHandles.__webhooks__pyament__failed__(payload);
        break;

      case "subscription.authenticated":
        console.log("subscription authenticated");
        await _webhooksHandles.__webhooks__subscription__authenticated__(
          payload
        );
        break;

      case "subscription.paused":
        console.log("subscription paused");
        await _webhooksHandles.__webhooks__subscription__paused__(payload);
        break;

      case "subscription.resumed":
        console.log("subscription resumed");
        await _webhooksHandles.__webhooks__subscription__resumed__(payload);
        break;

      case "subscription.activated":
        console.log("subscription activated");
        await _webhooksHandles.__webhooks__subscription__activated__(payload);
        break;

      case "subscription.pending":
        console.log("subscription pending");
        await _webhooksHandles.__webhooks__subscription__pending__(payload);
        break;

      case "subscription.halted":
        console.log("Subscription Halted");
        await _webhooksHandles.__webhooks__subscription__halted__(payload);
        break;

      case "subscription.charged":
        console.log("subscription charged");
        await _webhooksHandles.__webhooks__subscription__charged__(payload);
        break;

      case "subscription.cancelled":
        console.log("subscription cancelled");
        await _webhooksHandles.__webhooks__subscription__cancelled__(payload);
        break;

      case "subscription.completed":
        console.log("subscription completed");
        await _webhooksHandles.__webhooks__subscription__completed__(payload);
        break;

      case "subscription.updated":
        console.log("subscription updated");
        await _webhooksHandles.__webhooks__subscription__updated__(payload);
        break;

      case "invoice.paid":
        console.log("invoice paid");
        await _webhooksHandles.__webhooks__invoice__paid__(payload);
        break;

      case "invoice.partially_paid":
        console.log("invoice partially paid");
        await _webhooksHandles.__webhooks__invoice__partially_paid__(payload);
        break;

      case "invoice.expired":
        console.log("invoice expired");
        await _webhooksHandles.__webhooks__invoice__expired__(payload);
        break;

      case "refund.created":
        console.log("refund created");
        await _webhooksHandles.__webhooks__refunds__created__(payload);
        break;

      case "refund.processed":
        console.log("refund processed");
        await _webhooksHandles.__webhooks__refunds__processed__(payload);
        break;

      case "refund.failed":
        console.log("refund failed");
        await _webhooksHandles.__webhooks__refunds__failed__(payload);
        break;

      default:
        console.log(
          `Unhandled event: ${eventType} ${new Date().toLocaleString()}`
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
