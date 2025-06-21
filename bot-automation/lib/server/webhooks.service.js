import { SubscriptionHistory } from "@/models/payment/subscriptionHistory";
import { razorpay } from "../payment_gt";
import { Subscription } from "@/models/payment/subscription";

export const _webhooksHandles = {
  __webhooks__payment__authorized__: async (payload) => {
    try {
      const payment = await razorpay.payments.fetch(payload.id);
      console.log(`[Webhook] Payment authorized: ${payment.id}`);
      if (payment.status === "authorized" && !payment.captured) {
        await razorpay.payments.capture(payment.id, payment.amount);
        console.log("✅ Payment manually captured:", payment.id);
      } else {
        console.log("⚠️ Payment already captured or not in authorized state");
      }
    } catch (error) {
      console.error("❌ Error during manual capture:", error.message);
    }
  },
  __webhooks__payment__capture__: async (payload) => {
    try {
      const payment = await razorpay.payments.fetch(payload.id);
      console.log("payment:", payment);

      let subId = payment.subscription_id;

      if (
        !subId &&
        payment.invoice_id &&
        typeof payment.invoice_id === "string"
      ) {
        try {
          const invoice = await razorpay.invoices.fetch(payment.invoice_id);
          console.log("invoice:", invoice);
          subId = invoice.subscription_id;
        } catch (err) {
          console.error("❌ Invoice fetch error:", err.message);
          return;
        }
      }

      if (!subId) {
        console.error("❌ No subscription ID found from payment or invoice");
        return;
      }

      await SubscriptionHistory.findOneAndUpdate(
        { "gateway.subscriptionId": subId },
        {
          action: "payment_captured",
          status: "active",
          "gateway.paymentId": payment.id,
        }
      );
    } catch (err) {
      console.error("❌ Webhook payment capture error:", err.message);
    }
  },
  __webhooks__pyament__failed__: async (payload) => {
    const payment = await razorpay.payments.fetch(payload.id);
    let subId = payment.subscription_id;
    if (!subId && payment.invoice_id) {
      const invoice = await razorpay.invoices.fetch(payment.invoice_id);
      subId = invoice.subscription_id;
    }

    await Subscription.findOneAndUpdate(
      { gatewaySubscriptionId: subId },
      {
        status: "past_due",
        $inc: { "subscriptionLifecycle.billingRetryCount": 1 },
        "notifications.paymentFailed": {
          sent: true,
          sentAt: new Date(),
        },
        metadata: { updatedAt: new Date() },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": subId,
      },
      {
        action: "payment_failed",
        status: "failed",
        gateway: {
          paymentId: payment.id,
          invoiceId: payment.invoice_id,
        },
      }
    );
  },
  __webhooks__subscription__authenticated__: async (payload) => {
    const subscription = await razorpay.subscriptions.fetch(payload.id);
    const now = new Date();
    const history = await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": payload.id,
      },
      {
        action: "subscription_authenticated",
        status: "active",
      }
    );
    const hasTrial = !!payload.start_at && payload.start_at * 1000 > now;
    const periodStart = new Date(subscription.current_start * 1000);
    const periodEnd = new Date(subscription.current_end * 1000);
    const endDate = hasTrial && new Date(payload.start_at * 1000);
    const workspace_id = subscription.notes.workspace_id;
    const plan =
      history?.plan || payload.notes?.plan_name?.toLowerCase() || "free";

    const updateData = {
      gatewaySubscriptionId: payload.id,
      status: hasTrial ? "trialing" : "active",
      plan,
      billingCycle: history?.billingCycle || "monthly",
      trialStart: hasTrial ? now : null,
      trialEnd: hasTrial ? endDate : null,
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      paymentGateway: history?.gateway?.name || "razorpay",
      gatewayCustomerId: history?.gateway?.customerId,
      gatewayPlanId: history?.gateway?.planId,
      subscriptionLifecycle: {
        initialSignupDate: history?.createdAt || now,
        nextBillingDate: periodEnd,
      },
      metadata: {
        updatedAt: now,
      },
    };

    await Subscription.findOneAndUpdate(
      { workspace: workspace_id },
      updateData
    );
  },
  __webhooks__subscription__activated__: async (payload) => {
    const subscription = await razorpay.subscriptions.fetch(payload.id);
    const history = await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": subscription.id,
      },
      { action: "subscription_activated", status: "active" }
    );
    const periodStart = new Date(subscription.current_start * 1000);
    const periodEnd = new Date(subscription.current_end * 1000);
    const plan = payload.notes.plan_name.toLowerCase();
    const now = new Date.now();
    const workspace_id = payload.notes.workspace_id;

    await Subscription.findOneAndUpdate(
      {
        workspace: workspace_id,
      },
      {
        status: "active",
        plan,
        gatewaySubscriptionId: subscription.id,
        trialStart: null,
        trialEnd: null,
        currentPeriodStart: periodStart,
        billingCycle: history?.billingCycle || "monthly",
        currentPeriodEnd: periodEnd,
        paymentGateway: history?.gateway?.name || "razorpay",
        gatewayCustomerId: history?.gateway?.customerId,
        gatewayPlanId: history?.gateway?.planId,
        "subscriptionLifecycle.lastRenewalDate": now,
        "subscriptionLifecycle.nextBillingDate": periodEnd,
        metadata: { updatedAt: now },
      }
    );
  },
  __webhooks__subscription__charge__: async (payload) => {
    const subscription = await razorpay.subscriptions.fetch(payload.id);
    await Subscription.findOneAndUpdate(
      {
        workspace: payload.notes.workspace_id,
        gatewaySubscriptionId: subscription.id,
      },
      {
        $inc: { "subscriptionLifecycle.renewalAttempts": 1 },
        metadata: { updatedAt: new Date() },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": subscription.id,
      },
      {
        action: "subscription_charged",
        status: "active",
      }
    );
  },
  __webhooks__invoice__paid__: async (payload) => {
    const now = new Date(payload.paid_at * 1000);
    const subId = payload.subscription_id;

    await Subscription.findOneAndUpdate(
      { gatewaySubscriptionId: subId },
      {
        status: "active",
        "subscriptionLifecycle.lastRenewalDate": now,
        "subscriptionLifecycle.nextBillingDate": new Date(
          payload.period_end * 1000
        ),
        metadata: { updatedAt: now },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": subId,
      },
      {
        status: "active",
        amount: payload.amount_paid,
        gateway: {
          invoiceId: payload.id,
        },
      }
    );
  },
  __webhooks__invoice__partially_paid__: async (payload) => {
    const subId = payload.subscription_id;
    await Subscription.findOneAndUpdate(
      { gatewaySubscriptionId: subId },
      {
        status: "past_due",
        metadata: { updatedAt: new Date() },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      { "gateway.subscriptionId": subId },
      {
        action: "invoice_partially_paid",
        status: "past_due",
      }
    );
  },

  __webhooks__invoice__expired__: async (payload) => {
    const subId = payload.subscription_id;
    await Subscription.findOneAndUpdate(
      { gatewaySubscriptionId: subId },
      {
        status: "expired",
        metadata: { updatedAt: new Date() },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      { "gateway.subscriptionId": subId },
      {
        action: "invoice_expired",
        status: "expired",
      }
    );
  },
  __webhooks__subscription__cancelled__: async (payload) => {
    const workspace_id = payload.notes.workspace_id;
    await Subscription.findOneAndUpdate(
      {
        gatewaySubscriptionId: payload.id,
      },
      { status: "cancelled" }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        gatewaySubscriptionId: payload.id,
      },
      { action: "subscription_cancelled", status: "cancelled" }
    );
  },
  __webhooks__subscription__completed__: async (payload) => {
    const workspace_id = payload.notes.workspace_id;
    await Subscription.findOneAndUpdate(
      { gatewaySubscriptionId: payload.id },
      {
        status: "unpaid",
        endedAt: new Date(),
        metadata: { updatedAt: new Date() },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": payload.id,
      },
      { action: "subscription_completed", status: "unpaid" }
    );
  },
  __webhooks__subscription__resumed__: async (payload) => {
    const workspace_id = payload.notes.workspace_id;
    await Subscription.findOneAndUpdate(
      { gatewaySubscriptionId: payload.id },
      {
        status: "active",
        "subscriptionLifecycle.pauseStartDate": null,
        "subscriptionLifecycle.pauseEndDate": null,
        metadata: { updatedAt: new Date() },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": payload.id,
      },
      { action: "subscription_resumed", status: "active" }
    );
  },
  __webhooks__refunds__created__: async (payload) => {
    const refundId = payload?.id;
    const paymentId = payload?.payment_id;
    const amount = payload?.amount;
    const reason = payload?.notes?.reason || "not_provided";

    if (!refundId || !paymentId) {
      console.error("❌ Missing refund ID or payment ID in payload.");
      return;
    }
    await SubscriptionHistory.findOneAndUpdate(
      { "gateway.paymentId": paymentId },
      {
        $set: {
          status: "refunded",
          action: "refund_created",
          "gateway.refundId": refundId,
          "refund.amount": amount,
          "refund.reason": reason,
          "refund.date": new Date(),
        },
      }
    );
  },
  __webhooks__refunds__processed__: async (payload) => {
    await SubscriptionHistory.findOneAndUpdate(
      { "gateway.paymentId": payload.payment_id },
      {
        action: "refund_processed",
        status: payload.status,
        amount: payload.amount,
        gateway: {
          refundId: payload.id,
        },
      }
    );
  },
  __webhooks__refunds__failed__: async (payload) => {
    await SubscriptionHistory.findOneAndUpdate(
      { "gateway.paymentId": payload.payment_id },
      {
        action: "refund_failed",
        status: payload.status,
        amount: payload.amount,
        gateway: {
          refundId: payload.id,
        },
      }
    );
  },
};
