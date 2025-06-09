import mongoose from "mongoose";
import { PLANS, PricingUtils, TAX_RATES } from "@/config/pricing.config";
import { razorpay } from "@/lib/payment_gt";
import validator from "validator";

const subscriptionSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      immutable: true,
      index: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: Object.keys(PLANS),
      required: true,
      index: true,
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
      ],
      default: "active",
      index: true,
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly", "lifetime"],
      required: true,
      default: "lifetime",
    },
    currentPeriodStart: {
      type: Date,
      required: true,
      default: Date.now,
    },
    currentPeriodEnd: {
      type: Date,
      required: function () {
        return this.plan !== "free";
      },
    },

    trialStart: Date,
    trialEnd: Date,
    canceledAt: Date,
    endedAt: Date,
    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe", "paypal"],
      default: "razorpay",
    },
    gatewaySubscriptionId: {
      type: String,
      index: true,
    },
    gatewayCustomerId: String,
    gatewayPlanId: String,
    discount: {
      code: String,
      type: String,
      value: Number,
      appliesFor: { type: Number },
    },
    billingDetails: {
      contact: {
        name: String,
        email: {
          type: String,
          validate: [validator.isEmail, "Please provide a valid email"],
        },
        phone: String,
      },
      address: {
        line1: { type: String, required: true },
        line2: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      taxInfo: {
        taxId: String,
        vatId: String,
        companyName: String,
      },
      billingEmail: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
      },
    },
    // Subscription lifecycle management
    subscriptionLifecycle: {
      initialSignupDate: { type: Date, required: true },
      lastRenewalDate: Date,
      nextBillingDate: Date,
      cancellationRequestDate: Date,
      cancellationEffectiveDate: Date,
      pauseStartDate: Date,
      pauseEndDate: Date,
      renewalAttempts: { type: Number, default: 0 },
      billingRetryCount: { type: Number, default: 0 },
    },
    // Invoice history
    latestInvoice: {
      id: String,
      amount: Number,
      currency: String,
      status: String,
      pdfUrl: String,
      hostedInvoiceUrl: String,
    },
    invoiceHistory: [
      {
        id: String,
        date: Date,
        amount: Number,
        currency: String,
        status: String,
        pdfUrl: String,
      },
    ],
    // Usage tracking
    usage: {
      chatbots: { type: Number, default: 0 },
      messages: { type: Number, default: 0 },
      members: { type: Number, default: 1 },
      storage: { type: Number, default: 0 },
    },
    limits: {
      chatbots: { type: Number, required: true },
      messages: { type: Number, required: true },
      members: { type: Number, required: true },
      storage: { type: Number, required: true },
      conversations: { type: Number, required: true },
      integrations: { type: Number, required: true },
    },
    features: {
      channels: [String],
      analytics: Boolean,
      apiAccess: Boolean,
      customBranding: Boolean,
      prioritySupport: Boolean,
      whiteLabel: Boolean,
    },
    // Notifications
    notifications: {
      upcomingRenewal: { sent: Boolean, sentAt: Date },
      paymentFailed: { sent: Boolean, sentAt: Date },
      subscriptionEnding: { sent: Boolean, sentAt: Date },
    },
    // Usage overage tracking
    usageOverage: {
      chatbots: { type: Number, default: 0 },
      messages: { type: Number, default: 0 },
      members: { type: Number, default: 0 },
      storage: { type: Number, default: 0 },
      lastCalculated: Date,
    },
    metadata: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
      canceledAt: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Clean up sensitive data
        delete ret.gatewaySubscriptionId;
        delete ret.gatewayCustomerId;
        delete ret.gatewayPlanId;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Indexes
subscriptionSchema.index({ currentPeriodEnd: 1 });
subscriptionSchema.index({ "metadata.createdAt": 1 });
subscriptionSchema.index({ status: 1, currentPeriodEnd: 1 });

// Virtuals
subscriptionSchema.virtual("isActive").get(function () {
  return (
    ["active", "trialing"].includes(this.status) &&
    this.currentPeriodEnd > new Date()
  );
});

subscriptionSchema.virtual("isTrial").get(function () {
  return this.trialEnd && this.trialEnd > new Date();
});

subscriptionSchema.virtual("daysUntilRenewal").get(function () {
  return Math.ceil(
    (this.currentPeriodEnd - new Date()) / (1000 * 60 * 60 * 24)
  );
});

subscriptionSchema.virtual("usagePercentage").get(function () {
  return {
    chatbots: Math.min(
      Math.round((this.usage.chatbots / this.limits.chatbots) * 100),
      100
    ),
    messages: Math.min(
      Math.round((this.usage.messages / this.limits.messages) * 100),
      100
    ),
    members: Math.min(
      Math.round((this.usage.members / this.limits.members) * 100),
      100
    ),
    storage: Math.min(
      Math.round((this.usage.storage / this.limits.storage) * 100),
      100
    ),
  };
});

// Hooks
subscriptionSchema.pre("save", function (next) {
  const plan = PLANS[this.plan];
  // Check if plan is valid
  if (!plan) {
    return next(new Error(`Invalid plan: ${this.plan}`));
  }

  if (this.isModified("plan")) {
    this.limits = plan.limits;
    this.features = plan.features;
  }

  if (this.isModified("status") && this.status === "canceled") {
    this.metadata.canceledAt = new Date();
  }

  if (plan.metadata.trialDays > 0 && !this.trialEnd) {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + plan.metadata.trialDays);
    this.trialEnd = trialEnd;
    this.status = "trialing";
  }

  this.metadata.updatedAt = new Date();
  next();
});

// Methods
subscriptionSchema.methods = {
  checkUsageOverage: async function () {
    const overages = {};
    const resources = ["chatbots", "messages", "members", "storage"];

    resources.forEach((resource) => {
      const overage = this.usage[resource] - this.limits[resource];
      if (overage > 0) {
        overages[resource] = overage;
      }
    });

    this.usageOverage = overages;
    this.usageOverage.lastCalculated = new Date();
    return overages;
  },
  generateInvoice: async function () {
    const plan = PLANS[this.plan];
    const priceInfo = PricingUtils.calculatePrice(
      this.plan,
      this.billingCycle,
      this.discount.value
    );

    return {
      invoiceNumber: `INV-${this._id.toString().substring(0, 8).toUpperCase()}`,
      date: new Date().toISOString().split("T")[0],
      plan: plan.name,
      billingCycle: this.billingCycle,
      periodStart: this.currentPeriodStart.toISOString().split("T")[0],
      periodEnd: this.currentPeriodEnd.toISOString().split("T")[0],
      basePrice: PricingUtils.formatPrice(priceInfo.base),
      taxRate: `${TAX_RATES.INR * 100}%`,
      taxAmount: PricingUtils.formatPrice(priceInfo.tax),
      total: PricingUtils.formatPrice(priceInfo.total),
      currency: priceInfo.currency,
      features: Object.entries(plan.features)
        .filter(([_, value]) => value === true)
        .map(([key]) => key),
      limits: plan.limits,
    };
  },

  hasFeature: function (feature) {
    return PLANS[this.plan].features[feature] || false;
  },

  getUsageDashboard: function () {
    const plan = PLANS[this.plan];
    return {
      chatbots: {
        used: this.usage.chatbots,
        limit: plan.limits.chatbots,
        percentage: Math.min(
          Math.round((this.usage.chatbots / plan.limits.chatbots) * 100),
          100
        ),
      },
      messages: {
        used: this.usage.messages,
        limit: plan.limits.messages,
        percentage: Math.min(
          Math.round((this.usage.messages / plan.limits.messages) * 100),
          100
        ),
      },
      members: {
        used: this.usage.members,
        limit: plan.limits.members,
        percentage: Math.min(
          Math.round((this.usage.members / plan.limits.members) * 100),
          100
        ),
      },
    };
  },

  async cancel(atPeriodEnd = true) {
    if (this.status === "canceled") return this;

    if (this.paymentGateway === "razorpay") {
      await razorpay.subscriptions.cancel(this.gatewaySubscriptionId, {
        cancel_at_period_end: atPeriodEnd,
      });
    }

    this.status = atPeriodEnd ? "active" : "canceled";
    this.canceledAt = new Date();

    if (!atPeriodEnd) {
      this.endedAt = new Date();
    }

    await this.save();

    // Update workspace status
    const Workspace = mongoose.model("Workspace");
    await Workspace.findByIdAndUpdate(this.workspace, {
      "subscription.status": this.status,
    });

    return this;
  },

  async reactivate() {
    if (this.status === "active") return this;

    if (this.paymentGateway === "razorpay") {
      await razorpay.subscriptions.reactivate(this.gatewaySubscriptionId);
    }

    this.status = "active";
    this.canceledAt = undefined;
    await this.save();

    // Update workspace status
    const Workspace = mongoose.model("Workspace");
    await Workspace.findByIdAndUpdate(this.workspace, {
      "subscription.status": "active",
    });

    return this;
  },

  updatePlan: async function (newPlan, billingCycle) {
    const planConfig = PLANS[newPlan];

    if (this.paymentGateway === "razorpay") {
      await razorpay.subscriptions.update(this.gatewaySubscriptionId, {
        plan_id: planConfig.razorpayIds[billingCycle],
        prorate: true,
      });
    }

    this.plan = newPlan;
    this.billingCycle = billingCycle;
    this.limits = planConfig.limits;
    this.features = planConfig.features;

    await this.save();

    const Workspace = mongoose.model("Workspace");
    await Workspace.findByIdAndUpdate(this.workspace, {
      "subscription.plan": newPlan,
      limits: planConfig.limits,
    });

    return this;
  },

  updateUsage: async function (resource, amount = 1) {
    this.usage[resource] = (this.usage[resource] || 0) + amount;
    await this.save();
    return this;
  },

  checkLimits: function () {
    return {
      chatbots: this.usage.chatbots >= this.limits.chatbots,
      messages: this.usage.messages >= this.limits.messages,
      members: this.usage.members >= this.limits.members,
      storage: this.usage.storage >= this.limits.storage,
    };
  },

  sendUpcomingRenewalNotification: async function () {
    if (
      this.daysUntilRenewal <= 7 &&
      !this.notifications.upcomingRenewal.sent
    ) {
      const Workspace = mongoose.model("Workspace");
      const workspace = await Workspace.findById(this.workspace).populate({
        path: "members.user",
        select: "email name",
      });

      const owners = workspace.members
        .filter((m) => m.role === "owner")
        .map((m) => m.user);

      for (const owner of owners) {
        await mongoose
          .model("User")
          .sendSubscriptionNotification(owner, "upcoming_renewal", {
            daysUntilRenewal: this.daysUntilRenewal,
            plan: this.plan,
            billingCycle: this.billingCycle,
          });
      }

      this.notifications.upcomingRenewal = {
        sent: true,
        sentAt: new Date(),
      };
      await this.save();
    }
  },
};

// Statics
subscriptionSchema.statics = {
  async createWithPricing(workspaceId, planId, billingCycle, session = null) {
    const options = session ? { session } : {};
    const plan = PLANS[planId];
    if (!plan) throw new Error("Invalid plan");

    const periodEnd = new Date();
    periodEnd.setMonth(
      periodEnd.getMonth() + (billingCycle === "yearly" ? 12 : 1)
    );

    const subscriptionData = {
      workspace: workspaceId,
      plan: planId,
      billingCycle,
      status: planId === "free" ? "active" : "trialing",
      currentPeriodStart: new Date(),
      currentPeriodEnd: planId === "free" ? null : periodEnd,
      limits: plan.limits,
      features: plan.features,
      paymentGateway: planId === "free" ? null : "razorpay",
    };

    if (planId !== "free") {
      const razorpaySub = await razorpay.subscriptions.create({
        plan_id: plan.razorpayIds[billingCycle],
        total_count: billingCycle === "yearly" ? 1 : 12,
        customer_notify: 1,
        notes: {
          workspaceId: workspaceId.toString(),
        },
      });

      subscriptionData.gatewaySubscriptionId = razorpaySub.id;
      subscriptionData.gatewayPlanId = plan.razorpayIds[billingCycle];
    }

    return await Subscription.create([subscriptionData], options).then(
      (res) => res[0]
    );
  },

  calculateProratedCost: async function (
    subscriptionId,
    newPlanId,
    newBillingCycle
  ) {
    const subscription = await this.findById(subscriptionId);
    if (!subscription) throw new Error("Subscription not found");

    const currentPlan = PLANS[subscription.plan];
    const newPlan = PLANS[newPlanId];

    if (!currentPlan || !newPlan) throw new Error("Invalid plan");

    const daysUsed = Math.ceil(
      (new Date() - subscription.currentPeriodStart) / (1000 * 60 * 60 * 24)
    );
    const daysTotal = Math.ceil(
      (subscription.currentPeriodEnd - subscription.currentPeriodStart) /
        (1000 * 60 * 60 * 24)
    );
    const unusedDays = daysTotal - daysUsed;

    const dailyRateCurrent =
      currentPlan.prices[subscription.billingCycle] / daysTotal;
    const credit = unusedDays * dailyRateCurrent;

    const dailyRateNew =
      newPlan.prices[newBillingCycle] /
      (newBillingCycle === "yearly" ? 365 : 30);
    const costNew = dailyRateNew * daysTotal;

    const proratedAmount = Math.max(costNew - credit, 0);

    return {
      currentPlan: currentPlan.name,
      newPlan: newPlan.name,
      daysUsed,
      daysTotal,
      credit: PricingUtils.formatPrice(credit),
      newCost: PricingUtils.formatPrice(costNew),
      proratedAmount: PricingUtils.formatPrice(proratedAmount),
      taxRate: `${TAX_RATES.INR * 100}%`,
      taxAmount: PricingUtils.formatPrice(proratedAmount * TAX_RATES.INR),
      total: PricingUtils.formatPrice(
        proratedAmount + proratedAmount * TAX_RATES.INR
      ),
    };
  },

  async handleWebhook(event, payload) {
    const subscription = await this.findOne({
      gatewaySubscriptionId: payload.subscription_id,
    });

    if (!subscription) return null;

    switch (event) {
      case "subscription.charged":
        return this._handlePaymentSuccess(subscription, payload);
      case "subscription.payment_failed":
        return this._handlePaymentFailed(subscription, payload);
      case "subscription.cancelled":
        return this._handleCancellation(subscription, payload);
      default:
        return null;
    }
  },

  async _handlePaymentSuccess(subscription, payload) {
    subscription.status = "active";
    subscription.latestInvoice = {
      id: payload.invoice_id,
      amount: payload.amount / 100,
      currency: payload.currency,
      status: "paid",
    };

    await subscription.save();

    // Update workspace
    const Workspace = mongoose.model("Workspace");
    await Workspace.findByIdAndUpdate(subscription.workspace, {
      "subscription.status": "active",
    });

    return subscription;
  },

  handlePaymentFailed: async function (payload) {
    const subscription = await this.findOne({
      gatewaySubscriptionId: payload.subscription_id,
    });

    if (!subscription) return null;

    subscription.status = "past_due";
    subscription.notifications.paymentFailed = {
      sent: true,
      sentAt: new Date(),
    };

    await subscription.save();

    const Workspace = mongoose.model("Workspace");
    const workspace = await Workspace.findById(subscription.workspace).populate(
      {
        path: "members.user",
        select: "email name",
      }
    );

    const owners = workspace.members
      .filter((m) => m.role === "owner")
      .map((m) => m.user);

    for (const owner of owners) {
      await mongoose
        .model("User")
        .sendSubscriptionNotification(owner, "payment_failed", {
          plan: subscription.plan,
          workspace: workspace.name,
        });
    }

    return subscription;
  },
};

export const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
