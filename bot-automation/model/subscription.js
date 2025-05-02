import mongoose from "mongoose";
import { PLANS } from "@/config/pricing.config";
import {
  SubscriptionDowngradedMail,
  SubscriptionExpiryWarningMail,
  SubscriptionPaymentFailedMail,
  SubscriptionReactivatedMail,
} from "@/lib/helper";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      required: true,
      enum: Object.keys(PLANS),
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "past_due", "grace_period", "canceled", "unpaid"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    paymentGateway: {
      type: String,
      enum: ["razorpay", "none"],
      default: "none",
    },
    razorpaySubscriptionId: String,
    currentPaymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    renewalInterval: {
      type: String,
      enum: ["month", "year", "lifetime"],
      default: "lifetime",
    },
    features: {
      channels: [String],
      chatbots: Number,
      monthlyMessages: Number,
      teamMembers: Number,
      bandwidth: String,
      fileAttachments: Boolean,
      analyticsDashboard: Boolean,
      customBranding: Boolean,
      apiAccess: Boolean,
      prioritySupport: Boolean,
      whiteLabel: Boolean,
    },
    usage: {
      messagesUsed: {
        type: Number,
        default: 0,
      },
      chatbotsCreated: {
        type: Number,
        default: 0,
      },
      lastReset: {
        type: Date,
        default: () =>
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    paymentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentHistory",
      },
    ],
    notifications: {
      expiryNotified: Boolean,
      downgradeNotified: Boolean,
      paymentFailedNotified: Boolean,
      lastNotified: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
subscriptionSchema.index({ endDate: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ user: 1 });
subscriptionSchema.index({ renewalInterval: 1 });

// Virtual Properties
subscriptionSchema.virtual("isActive").get(function () {
  if (this.renewalInterval === "lifetime") {
    return this.status === "active";
  }
  return (
    ["active", "grace_period"].includes(this.status) &&
    (!this.endDate || this.endDate > new Date())
  );
});

subscriptionSchema.virtual("messagesRemaining").get(function () {
  return Math.max(
    this.features.monthlyMessages - (this.usage.messagesUsed || 0),
    0
  );
});

subscriptionSchema.virtual("daysUntilRenewal").get(function () {
  if (!this.endDate) return null;
  return Math.ceil((this.endDate - new Date()) / (1000 * 60 * 60 * 24));
});

// Pre-save Hooks
subscriptionSchema.pre("save", async function (next) {
  const now = new Date();

  if (this.isNew) {
    this.startDate = now;
    if (this.plan === "free") {
      this.renewalInterval = "lifetime";
      this.endDate = null;
    }
  }

  if (this.isModified("plan")) {
    const planConfig = PLANS[this.plan];
    this.features = planConfig.features;
    this.usage.messagesUsed = 0;
    this.usage.chatbotsCreated = Math.min(
      this.usage.chatbotsCreated,
      planConfig.features.chatbots
    );
  }

  if (
    this.usage.lastReset.getMonth() !== now.getMonth() ||
    this.usage.lastReset.getFullYear() !== now.getFullYear()
  ) {
    this.usage.messagesUsed = 0;
    this.usage.lastReset = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  next();
});

// Methods
subscriptionSchema.methods = {
  async createRazorpaySubscription(paymentMethod) {
    const plan = PLANS[this.plan];
    const subscription = await razorpay.subscriptions.create({
      plan_id: plan.razorpayIds[this.renewalInterval],
      customer_id: this.user.razorpayCustomerId,
      payment_method: paymentMethod,
      total_count: this.renewalInterval === "lifetime" ? 1 : 12,
    });

    this.razorpaySubscriptionId = subscription.id;
    this.paymentGateway = "razorpay";
    return this.save();
  },

  async sendExpiryNotification(user) {
    if (!this.notifications.expiryNotified && this.daysUntilRenewal <= 3) {
      await SubscriptionExpiryWarningMail(user, this.endDate, this.plan);
      this.notifications.expiryNotified = true;
      this.notifications.lastNotified = new Date();
      await this.save();
    }
  },

  async sendPaymentFailedNotification(user) {
    if (
      !this.notifications.paymentFailedNotified &&
      this.status === "past_due"
    ) {
      await SubscriptionPaymentFailedMail(user, this.plan);
      this.notifications.paymentFailedNotified = true;
      this.notifications.lastNotified = new Date();
      await this.save();
    }
  },
  sendDowngradeNotification: async function (user) {
    if (!this.notifications.downgradeNotified) {
      try {
        await SubscriptionDowngradedMail(user, this.archivedData.lastPaidPlan);
        this.notifications.downgradeNotified = true;
        this.notifications.lastNotified = new Date();
        await this.save();
      } catch (error) {
        console.error("Failed to send downgrade notification:", error);
        throw error;
      }
    }
  },

  sendReactivatedNotification: async function (user) {
    try {
      await SubscriptionReactivatedMail(user, this.plan);
      this.notifications.lastNotified = new Date();
      await this.save();
    } catch (error) {
      console.error("Failed to send reactivation notification:", error);
      throw error;
    }
  },
  async downgradeToFree() {
    this.plan = "free";
    this.status = "active";
    this.renewalInterval = "lifetime";
    this.endDate = null;
    this.notifications.downgradeNotified = true;
    await this.save();
    return this;
  },
};

// Static Methods
subscriptionSchema.statics = {
  findByUserId: function (userId) {
    return this.findOne({ user: userId }).populate("currentPaymentMethod");
  },
  findActiveSubscriptions: function () {
    return this.find({ status: "active" });
  },
  findExpiringSubscriptions: function (days = 3) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return this.find({ endDate: { $lte: date }, status: "active" });
  },
};

export const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
