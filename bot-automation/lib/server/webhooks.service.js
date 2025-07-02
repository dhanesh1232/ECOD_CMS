import { SubscriptionHistory } from "@/models/payment/subscriptionHistory";
import { razorpay } from "../payment_gt";
import { Subscription } from "@/models/payment/subscription";
import { PaymentMethod } from "@/models/payment/paymentMethod";

export const _webhooksHandles = {
  __webhooks__payment__authorized__: async (payload) => {
    try {
      const payment = await razorpay.payments.fetch(payload.id);
      console.log(`[Webhook] Payment authorized: ${payment.id} ${payment}`);
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

      let subId = payment.subscription_id;

      if (
        !subId &&
        payment.invoice_id &&
        typeof payment.invoice_id === "string"
      ) {
        try {
          const invoice = await razorpay.invoices.fetch(payment.invoice_id);
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

      const methodType = payment.method; // 'card', 'upi', 'wallet', etc.
      const paymentMethod = {
        type: methodType,
        last4: payment.card?.last4 || payment.wallet?.wallet || undefined,
        brand: payment.card?.network || payment.wallet?.provider,
        expiry:
          payment.card?.expiry_month && payment.card?.expiry_year
            ? `${payment.card.expiry_month}/${payment.card.expiry_year}`
            : undefined,
      };
      const methodPayload = {
        method: methodType, // e.g. "card", "upi", "netbanking", "wallet"
      };
      switch (payment.method) {
        case "card":
          methodPayload.card = {
            last4: payment.card?.last4,
            network: payment.card?.network,
            type: payment.card?.type,
            issuer: payment.card?.issuer,
            expiryMonth: payment.card?.expiry_month,
            expiryYear: payment.card?.expiry_year,
            isInternational: payment.card?.international || false,
          };
          break;
        case "upi":
          methodPayload.upi = {
            vpa: payment.vpa,
          };
          break;
        case "netbanking":
          methodPayload.netbanking = {
            bank: payment.bank,
          };
          break;
        case "wallet":
          methodPayload.wallet = {
            provider: payment.wallet,
          };
          break;
        default:
          break;
      }
      console.log(methodPayload);
      const history = await SubscriptionHistory.findOneAndUpdate(
        { "gateway.subscriptionId": subId },
        {
          action: "payment_captured",
          paymentMethod,
          status: "active",
          "gateway.paymentId": payment.id,
        },
        { new: true }
      );
      if (
        !history.workspace ||
        !history.subscription ||
        !history.gateway?.name
      ) {
        console.error("❌ Missing fields in history:", {
          workspace: history.workspace,
          subscription: history.subscription,
          gateway: history.gateway,
        });
        return;
      }
      const pay_method = await PaymentMethod.findOne({
        workspace: history.workspace,
        subscription: history.subscription,
      });
      if (!pay_method) {
        await PaymentMethod.create({
          workspace: history.workspace,
          subscription: history.subscription,
          provider: history.gateway.name,
          method: methodPayload,
        });
      } else {
        await PaymentMethod.findOneAndUpdate(
          {
            workspace: history.workspace,
            subscription: history.subscription,
          },
          {
            provider: history.gateway.name,
            method: methodPayload,
            updatedAt: new Date(),
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    } catch (err) {
      console.error("❌ Webhook payment capture error:", err.message);
    }
  },

  __webhooks__pyament__failed__: async (payload) => {
    const payment = await razorpay.payments.fetch(payload.id);
    let subId = payment.subscription_id;
    if (!subId && payment.invoice_id) {
      const invoice = await razorpay.invoices.fetch(payment.invoice_id);
      console.log(invoice);
      subId = invoice.subscription_id;
    }
    console.log(payment);
    const sub = await Subscription.findOne({ "gateway.subscriptionId": subId });
    if (!sub) {
      await Subscription.findOneAndUpdate(
        { "gateway.subscriptionId": subId },
        {
          status: "past_due",
          $inc: { "lifeCycle.billingRetryCount": 1 },
          "notifications.paymentFailed": {
            sent: true,
            sentAt: new Date(),
          },
          metadata: { updatedAt: new Date() },
        }
      );
    }
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
    ).populate("plan");
    console.log(history);
    const hasTrial = !!payload.start_at && payload.start_at * 1000 > now;
    const periodStart = new Date(subscription.current_start * 1000);
    const periodEnd = new Date(subscription.current_end * 1000);
    const endDate = hasTrial && new Date(payload.start_at * 1000);
    const workspace_id = subscription.notes.workspace_id;
    const planName =
      history?.plan.name.toLowerCase() ||
      payload.notes?.plan_name?.toLowerCase() ||
      "free";
    const updateData = {
      "gateway.subscriptionId": payload.id,
      status: hasTrial ? "trialing" : "active",
      plan: planName,
      billingCycle: history?.billingCycle || "monthly",
      trial: { start: hasTrial ? now : null, end: hasTrial ? endDate : null },
      "currentPeriod.start": periodStart,
      "currentPeriod.end": periodEnd,
      paymentGateway: history?.gateway?.name || "razorpay",
      "gateway.customerId": history?.gateway?.customerId,
      "gateway.planId": history?.gateway?.planId,
      lifeCycle: {
        createdAt: history?.createdAt || now,
        nextBilling: periodEnd,
      },
      limits: Subscription.prototype.transformPlanLimits(
        history.plan.limits[history?.billingCycle || "monthly"]
      ),
      features: Subscription.prototype.transformPlanFeatures(
        history.plan.features
      ),
      metadata: {
        updatedAt: now,
      },
    };

    await Subscription.findOneAndUpdate(
      { workspace: workspace_id },
      updateData,
      { new: true }
    );
  },

  __webhooks__subscription__activated__: async (payload) => {
    const subscription = await razorpay.subscriptions.fetch(payload.id);
    const history = await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": subscription.id,
      },
      { action: "subscription_activated", status: "active" }
    ).populate("plan");
    const periodStart = new Date(subscription.current_start * 1000);
    const periodEnd = new Date(subscription.current_end * 1000);
    const planName = payload.notes.plan_name.toLowerCase();
    const now = new Date();
    const workspace_id = payload.notes.workspace_id;

    await Subscription.findOneAndUpdate(
      {
        workspace: workspace_id,
      },
      {
        status: "active",
        plan: planName,
        "gateway.subscriptionId": subscription.id,
        trialStart: null,
        trialEnd: null,
        "currentPeriod.start": periodStart,
        billingCycle: history?.billingCycle || "monthly",
        "currentPeriod.end": periodEnd,
        paymentGateway: history?.gateway?.name || "razorpay",
        "gateway.customerId": history?.gateway?.customerId,
        "gateway.planId": history?.gateway?.planId,
        "lifeCycle.lastRenewal": now,
        "lifeCycle.nextBilling": periodEnd,
        limits: Subscription.prototype.transformPlanLimits(
          history.plan.limits[history?.billingCycle || "monthly"]
        ),
        features: Subscription.prototype.transformPlanFeatures(
          history.plan.features
        ),
        metadata: { updatedAt: now },
      },
      { new: true }
    );
  },

  __webhooks__subscription__updated__: async (payload) => {
    const subscription = await razorpay.subscriptions.fetch(payload.id);
    const subDoc = await Subscription.findOne({
      "gateway.subscriptionId": payload.id,
    });
    if (!subDoc) {
      console.error("Subscription not found for update");
      return;
    }
    await Subscription.findOneAndUpdate(
      { "gateway.subscriptionId": payload.id },
      {
        status: subscription.status,
        "currentPeriod.end": new Date(subscription.current_end * 1000),
        metadata: { updatedAt: new Date() },
      }
    );
  },

  __webhooks__subscription__charged__: async (payload) => {
    const subscription = await razorpay.subscriptions.fetch(payload.id);
    await Subscription.findOneAndUpdate(
      {
        "gateway.subscriptionId": subscription.id,
      },
      {
        status: "active",
        "currentPeriod.start": new Date(subscription.current_start * 1000),
        "currentPeriod.end": new Date(subscription.current_end * 1000),
        $inc: { "lifeCycle.renewalAttempts": 1 },
        "lifeCycle.lastCharge": new Date(),
        "lifeCycle.billingRetry": 0,
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

  __webhooks__subscription__pending__: async (payload) => {
    await Subscription.findOneAndUpdate(
      { "gateway.subscriptionId": payload.id },
      {
        status: "past_due",
        "notifications.paymentPending": {
          sent: true,
          sentAt: new Date(),
        },
      }
    );
  },

  __webhooks__subscription__renewed__: async (payload) => {
    try {
      const subscription = await razorpay.subscriptions.fetch(payload.id);
      const sub = await Subscription.findOne({
        "gateway.subscriptionId": payload.id,
      });
      if (!sub) return;
      await sub.updateOne({
        "currentPeriod.start": new Date(subscription.current_start * 1000),
        "currentPeriod.end": new Date(subscription.current_end * 1000),
        status: "active",
        "metadata.lastRenewal": new Date(),
      });
      await SubscriptionHistory.create({
        workspace: sub.workspace,
        subscription: sub._id,
        user: sub.user,
        action: "subscription_renewed",
        plan: sub.plan,
        billingCycle: sub.billingCycle,
        status: "active",
        usageSnapshot: sub.usage,
        gateway: {
          name: "razorpay",
          eventId: payload.id,
          eventType: "subscription.renewed",
          webhookTimestamp: new Date(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  __webhooks__subscription__paused__: async (payload) => {
    try {
      const sub = await Subscription.findOne({
        "gateway.subscriptionId": payload.id,
      });
      if (!sub) return;
      await sub.updateOne({
        status: "paused",
        "lifeCycle.pause.start": new Date(),
        "lifeCycle.pause.end": new Date(),
        "lifeCycle.pause.reason": payload.pause_reason,
        "metadata.pausedAt": new Date(),
        "metadata.pauseReson": payload.pause_reason,
      });
      await SubscriptionHistory.create({
        workspace: sub.workspace,
        subscription: sub._id,
        user: sub.user,
        action: "subscription_paused",
        plan: sub.plan,
        status: "paused",
        usageSnapshot: sub.usage,
        metadata: {
          pauseReason: payload.pause_reason,
        },
        gateway: {
          name: "razorpay",
          eventId: payload.id,
          eventType: "subscription.paused",
          webhookTimestamp: new Date(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  __webhooks__subscription__cancelled__: async (payload) => {
    const workspace_id = payload.notes.workspace_id;
    await Subscription.findOneAndUpdate(
      {
        workspace: workspace_id,
        "gateway.subscriptionId": payload.id,
      },
      { status: "cancelled" }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": payload.id,
      },
      { action: "subscription_cancelled", status: "cancelled" }
    );
  },

  __webhooks__subscription__completed__: async (payload) => {
    const workspace_id = payload.notes.workspace_id;
    const now = new Date();
    await Subscription.findOneAndUpdate(
      { "gateway.subscriptionId": payload.id, workspace: workspace_id },
      {
        status: "completed",
        endedAt: now,
        "currentPeriod.end": now,
        "lifeCycle.updatedAt": now,
        metadata: {
          updatedAt: now,
          canceledAt: now,
        },
      }
    );
    await SubscriptionHistory.findOneAndUpdate(
      {
        "gateway.subscriptionId": payload.id,
      },
      {
        action: "subscription_completed",
        status: "completed",
        processedAt: now,
      }
    );
  },

  __webhooks__subscription__resumed__: async (payload) => {
    const workspace_id = payload.notes.workspace_id;
    await Subscription.findOneAndUpdate(
      { "gateway.subscriptionId": payload.id, workspace: workspace_id },
      {
        status: "active",
        "lifeCycle.pause.start": null,
        "lifeCycle.pause.end": null,
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

  __webhooks__subscription__halted__: async (payload) => {
    try {
      const subscriptionId = payload.id;

      // Find the subscription document
      const sub = await Subscription.findOneAndUpdate(
        { "gateway.subscriptionId": subscriptionId },
        {
          status: "paused",
          "lifeCycle.pause.start": new Date(),
          "lifeCycle.pause.reason": "Subscription halted by system/webhook",
          "lifeCycle.updatedAt": new Date(),
          "notifications.paymentFailed.sent": true,
          "notifications.paymentFailed.sentAt": new Date(),
        },
        { new: true }
      );

      if (!sub) return;

      // Create subscription history log
      await SubscriptionHistory.create({
        workspace: sub.workspace,
        subscription: sub._id,
        user: sub.user,
        action: "subscription_paused",
        plan: sub.plan,
        billingCycle: sub.billingCycle,
        status: "paused",
        usageSnapshot: sub.usage,
        gateway: {
          name: "razorpay",
          eventId: payload.id,
          eventType: "subscription.halted",
          webhookTimestamp: new Date(),
          rawResponse: payload,
        },
        metadata: {
          pauseReason: "Halted due to system trigger or webhook",
        },
        processedAt: new Date(),
        idempotencyKey: `${subscriptionId}-halted-${Date.now()}`,
      });
    } catch (err) {
      console.error("Halted subscription error:", err);
    }
  },

  __webhooks__invoice__paid__: async (payload) => {
    try {
      // Validate and create dates safely
      const paidAt = payload.paid_at
        ? new Date(payload.paid_at * 1000)
        : new Date();
      const periodEnd = payload.period_end
        ? new Date(payload.period_end * 1000)
        : null;

      if (isNaN(paidAt.getTime())) {
        throw new Error(`Invalid paid_at timestamp: ${payload.paid_at}`);
      }

      if (periodEnd && isNaN(periodEnd.getTime())) {
        console.warn(`Invalid period_end timestamp: ${payload.period_end}`);
        periodEnd = null;
      }

      const subId = payload.subscription_id;
      if (!subId) {
        throw new Error("Missing subscription_id in payload");
      }

      const updateData = {
        status: "active",
        "lifeCycle.lastRenewal": paidAt,
        metadata: { updatedAt: new Date() }, // Always use fresh date for metadata update
      };

      if (periodEnd) {
        updateData["lifeCycle.nextBilling"] = periodEnd;
      }

      await Subscription.findOneAndUpdate(
        { "gateway.subscriptionId": subId },
        updateData
      );

      await SubscriptionHistory.findOneAndUpdate(
        { "gateway.subscriptionId": subId },
        {
          status: "active",
          amount: payload.amount_paid,
          gateway: {
            invoiceId: payload.id,
          },
        }
      );
    } catch (error) {
      console.error("Error in invoice_paid webhook:", error);
      throw error; // Re-throw to ensure the webhook fails visibly
    }
  },

  __webhooks__invoice__partially_paid__: async (payload) => {
    const subId = payload.subscription_id;
    await Subscription.findOneAndUpdate(
      { "gateway.subscriptionId": subId },
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
      { "gateway.subscriptionId": subId },
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
