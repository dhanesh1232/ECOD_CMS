// models/SubscriptionHistory.js
import mongoose from "mongoose";

const subscriptionHistorySchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    // What happened
    action: {
      type: String,
      required: true,
      enum: [
        "create",
        "update",
        "payment_captured",
        "payment_failed",
        "subscription_authenticated",
        "subscription_activated",
        "subscription_charged",
        "subscription_completed",
        "subscription_cancelled",
        "subscription_resumed",
        "subscription_renewed",
        "subscription_paused",
        "invoice_paid",
        "refund_created",
        "refund_processed",
        "refund_failed",
        "reactivate",
        "cancel",
      ],
    },

    // Plan & status snapshot
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "active",
        "trialing",
        "past_due",
        "paused",
        "canceled",
        "unpaid",
        "refunded",
        "failed",
        "refunded",
      ],
    },

    // Payment details
    paymentMethod: {
      type: {
        type: String,
        enum: ["card", "netbanking", "upi", "wallet"],
      },
      last4: String,
      brand: String,
      expiry: String,
    },

    // Refund info (if any)
    refund: {
      amount: Number,
      reason: String,
      date: Date,
      gatewayRefundId: String,
    },

    // Amount breakdown
    amount: {
      subtotal: { type: Number, min: 0 },
      tax: { type: Number, min: 0 },
      discount: { type: Number, default: 0 },
      total: { type: Number, min: 0 },
      currency: { type: String, default: "INR" },
    },
    usageSnapshot: {
      chatbots: Number,
      messages: Number,
      storage: Number,
      apiCalls: Number,
      teamMembers: Number,
    },
    // Gateway info
    gateway: {
      name: {
        type: String,
        enum: ["razorpay", "stripe", "paypal"],
        required: true,
      },
      subscriptionId: { type: String, required: true, index: true },
      customerId: String,
      invoiceId: String,
      paymentId: String,
      planId: String,
      refundId: String,
      eventId: String,
      eventType: String,
      rawResponse: Object,
      webhookTimestamp: Date,
    },

    // Extra metadata
    metadata: {
      ipAddress: String,
      userAgent: String,
      referrer: String,
      additional: mongoose.Schema.Types.Mixed,
      previousPlan: String,
      upgradePath: String,
      pauseReason: String,
      prorationDetails: {
        creditAmount: Number,
        adjustedDays: Number,
      },
      features: {
        added: [String],
        removed: [String],
      },
    },
    eventId: { type: String, index: true, unique: true, sparse: true },
    idempotencyKey: { type: String, index: true, unique: true, sparse: true },
    processedAt: Date,
    notes: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    toObject: { virtuals: true },
  }
);

subscriptionHistorySchema.virtual("userDisplay").get(function () {
  return `${this.user?.name || "Unknown User"} | ${this.plan}`;
});

export const SubscriptionHistory =
  mongoose.models.SubscriptionHistory ||
  mongoose.model("SubscriptionHistory", subscriptionHistorySchema);
