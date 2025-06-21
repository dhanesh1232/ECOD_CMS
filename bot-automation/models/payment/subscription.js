import mongoose from "mongoose";
import { PLANS, PricingUtils, TAX_RATES } from "@/config/pricing.config";
import { razorpay } from "@/lib/payment_gt";

const GRACE_PERIOD_DAYS = 2;
const OVERAGE_BUFFER = 0.8;
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
      validate: {
        validator: function (v) {
          return PLANS.hasOwnProperty(v);
        },
        message: (props) => `${props.value} is not a valid plan`,
      },
    },
    status: {
      type: String,
      enum: [
        "active",
        "trialing",
        "past_due",
        "paused",
        "canceled",
        "unpaid",
        "completed",
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
    currentPeriod: {
      start: {
        type: Date,
        required: true,
        default: Date.now,
      },
      end: {
        type: Date,
        required: function () {
          return this.plan !== "free";
        },
        validate: {
          validator: function (v) {
            return !v || v > this.currentPeriod.start;
          },
          message: "End date must be after start date",
        },
      },
    },
    trial: {
      start: Date,
      end: {
        type: Date,
        validate: {
          validator: function (v) {
            return !v || v > this.trialStart;
          },
          message: "Trial end must be after trial start",
        },
      },
      converted: Boolean,
    },
    cancellation: {
      reason: String,
      request: Date,
      effectiveAt: Date,
      feedback: String,
    },
    endedAt: Date,
    gateway: {
      subscriptionId: {
        type: String,
        index: true,
        sparse: true,
      },
      customerId: { type: String, sparse: true },
      planId: { type: String, sparse: true },
      invoice: String,
    },
    invoiceHistory: [
      {
        date: Date,
        amount: Number,
        currency: String,
        invoiceId: String,
        status: String,
        pdfUrl: String,
      },
    ],
    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe", "paypal"],
      default: "razorpay",
    },
    // Discount information
    promotion: {
      code: String,
      name: String,
      type: {
        type: String,
        enum: ["trial", "percent", "fixed", "lifetime"],
      },
      value: Number,
      expireAt: Date,
      appliesTo: [String],
    },
    // Subscription lifecycle management
    lifeCycle: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
      lastRenewal: { date: Date, amount: Number, invoiceUrl: String },
      nextBilling: { date: Date, esimatedAmount: Number },
      renewalHistory: [
        { date: Date, amount: Number, invoiceUrl: String, status: String },
      ],
      pause: {
        start: Date,
        end: Date,
        reason: String,
      },
      renewalAttempts: { type: Number, default: 0 },
      billingRetry: { type: Number, default: 0 },
    },
    // Usage tracking
    usage: {
      chatbots: { type: Number, default: 0 },
      messages: { type: Number, default: 0 },
      members: { type: Number, default: 1 },
      storage: { type: Number, default: 0 },
      apiCalls: { type: Number, default: 0 },
      adCredits: { type: Number, default: 0 },
      lastReset: Date,
    },
    limits: {
      chatbots: { type: Number, required: true },
      messages: { type: Number, required: true },
      members: { type: Number, required: true },
      storage: { type: Number, required: true }, // in MB
      conversations: { type: Number, required: true },
      integrations: { type: Number, required: true },
      automationRules: { type: Number, required: true },
      dripCampaigns: { type: Number, required: true },
      landingPages: { type: Number, required: true },
      adCampaigns: { type: Number, required: true },
      teamRoles: { type: Number, required: true },
      aiModelTraining: { type: Number, required: true },
      apiCalls: { type: Number, required: true },
    },
    features: {
      // Chatbot features
      channels: [String],
      visualFlowBuilder: Boolean,
      multilingualSupport: Number,
      chatbotTemplates: Boolean,
      fileAttachments: Boolean,
      customFlows: Boolean,

      // Ads features
      adsAutomation: Boolean,
      adCopyGeneration: Boolean,
      targeting: Boolean,
      budgetManagement: Boolean,
      autoPublishing: Boolean,
      audienceSegmentation: Boolean,

      // SEO features
      seoTools: Boolean,
      keywordResearch: Boolean,
      longTailKeywords: Boolean,
      seoDailyUpdates: Boolean,

      // Landing page features
      landingBuilder: Boolean,
      dragDropEditor: Boolean,
      landingTemplates: Boolean,
      formBuilders: Boolean,
      popups: Boolean,

      // CRM features
      crmEnabled: Boolean,
      leadScoring: Boolean,
      visitorTracking: Boolean,
      crmSync: Boolean,
      emailSequences: Boolean,
      behavioralTriggers: Boolean,
      abTesting: Boolean,

      // AI features
      aiResponseTuning: Boolean,
      aiModelTraining: Boolean,
      customModels: Boolean,

      // Growth features
      analyticsDashboard: Boolean,
      customBranding: Boolean,
      teamCollaboration: Boolean,
      dynamicContent: Boolean,
      webinarIntegration: Boolean,
      membershipSites: Boolean,
      paymentGateways: Boolean,

      // Enterprise features
      prioritySupport: Boolean,
      whiteLabel: Boolean,
      apiAccess: Boolean,
      webhooks: Boolean,
      sso: Boolean,
      dedicatedInstance: Boolean,
      sla99_9: Boolean,
      customDataCenter: Boolean,
      auditLogs: Boolean,
      dataResidency: Boolean,
      hipaaCompliance: Boolean,
      accountManager: Boolean,
    },
    // Notifications
    notifications: {
      upcomingRenewal: {
        sent: Boolean,
        sentAt: Date,
        nextSentDate: Date,
      },
      paymentFailed: {
        sent: Boolean,
        sentAt: Date,
        attempts: Number,
      },
      subscriptionEnding: {
        sent: Boolean,
        sentAt: Date,
      },
      usageWarning: {
        chatbots: Date,
        messages: Date,
        storage: Date,
        apiCalls: Date,
      },
      planLimitReached: {
        chatbots: Date,
        messages: Date,
        storage: Date,
        apiCalls: Date,
      },
    },
    planChangeLog: [
      { date: Date, fromPlan: String, toPlan: String, proratedAmount: Number },
    ],
    // Usage overage tracking
    usageOverage: {
      chatbots: { type: Number, default: 0 },
      messages: { type: Number, default: 0 },
      members: { type: Number, default: 0 },
      storage: { type: Number, default: 0 },
      apiCalls: { type: Number, default: 0 },
      lastCalculated: Date,
      lastCharged: Date,
      chargeAmount: Number,
    },
    // Custom pricing for negotiated enterprise plans
    customPricing: {
      isCustom: Boolean,
      monthlyRate: Number,
      yearlyRate: Number,
      contractTerm: Number, // in months
      contractStart: Date,
      contractEnd: Date,
      specialTerms: String,
    },
    // Add-ons that can be purchased separately
    addOns: [
      {
        id: String,
        name: String,
        description: String,
        price: Number,
        quantity: Number,
        billingCycle: String,
        addedAt: Date,
        expiresAt: Date,
      },
    ],
    metadata: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
      canceledAt: Date,
      notes: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.gatewaySubscriptionId;
        delete ret.gatewayCustomerId;
        delete ret.gatewayPlanId;
        delete ret.coupon;
        delete ret.paymentGateway;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Indexes
subscriptionSchema.index({ "currentPeriod.end": 1 });
subscriptionSchema.index({ status: 1, "currentPeriod.end": 1 });
subscriptionSchema.index({ "lifecycle.nextBilling.date": 1 });
subscriptionSchema.index({ "trial.end": 1 });
subscriptionSchema.index({ "usage.apiCalls": 1 });
subscriptionSchema.index({ plan: 1, status: 1 });
subscriptionSchema.index({ "features.channels": 1 });
subscriptionSchema.index({ "features.prioritySupport": 1 });

// Virtuals
subscriptionSchema.virtual("isActive").get(function () {
  if (this.plan === "enterprise" && this.status === "active") return true;

  return (
    ["active", "trialing"].includes(this.status) &&
    (!this.currentPeriod.end || this.currentPeriod.end > new Date())
  );
});

subscriptionSchema.virtual("isTrial").get(function () {
  return this.trial.end && this.trial.end > new Date();
});
subscriptionSchema.virtual("trialDaysRemaining").get(function () {
  if (!this.isTrial) return 0;
  return Math.ceil((this.trial.end - new Date()) / (1000 * 60 * 60 * 24));
});

subscriptionSchema.virtual("daysUntilRenewal").get(function () {
  if (!this.currentPeriod.end) return Infinity;
  return Math.ceil(
    (this.currentPeriod.end - new Date()) / (1000 * 60 * 60 * 24)
  );
});
subscriptionSchema.virtual("inGracePeriod").get(function () {
  if (
    !this.currentPeriod.end ||
    !["past_due", "unpaid"].includes(this.status)
  ) {
    return false;
  }
  const graceEnd = new Date(this.currentPeriod.end);
  graceEnd.setDate(graceEnd.getDate() + GRACE_PERIOD_DAYS);
  return graceEnd > new Date();
});
subscriptionSchema.virtual("usagePercentage").get(function () {
  const calc = (used, limit) => {
    if (limit === "Infinity") return 0;
    return limit > 0 ? Math.min(Math.round((used / limit) * 100), 100) : 0;
  };

  return {
    chatbots: calc(this.usage.chatbots, this.limits.chatbots),
    messages: calc(this.usage.messages, this.limits.messages),
    members: calc(this.usage.members, this.limits.members),
    storage: calc(this.usage.storage, this.limits.storage),
    apiCalls: calc(this.usage.apiCalls, this.limits.apiCalls),
  };
});
subscriptionSchema.virtual("isNearLimit").get(function () {
  const percentages = this.usagePercentage;
  return {
    chatbots: percentages.chatbots >= OVERAGE_BUFFER * 100,
    messages: percentages.messages >= OVERAGE_BUFFER * 100,
    members: percentages.members >= OVERAGE_BUFFER * 100,
    storage: percentages.storage >= OVERAGE_BUFFER * 100,
    apiCalls: percentages.apiCalls >= OVERAGE_BUFFER * 100,
  };
});
// Hooks
subscriptionSchema.pre("save", function (next) {
  // Prevent plan changes on inactive subscriptions
  if (this.isModified("plan") && !this.isActive) {
    throw new Error("Cannot change plan on inactive subscription");
  }

  // Update trial conversion status
  if (this.isModified("status") && this.status === "active" && this.trial.end) {
    this.trial.converted = true;
  }

  // Set cancellation dates
  if (this.isModified("status") && this.status === "canceled") {
    this.cancellation.requestedAt = this.cancellation.requestedAt || new Date();
    this.cancellation.effectiveAt = this.currentPeriod.end;
  }
  // Update lifecycle dates
  this.lifeCycle = this.lifeCycle || {};
  this.lifeCycle.updatedAt = new Date();
  next();
});

subscriptionSchema.pre("save", async function (next) {
  if (this.isModified("plan")) {
    try {
      await this.validatePlanChange(this.plan);
    } catch (err) {
      return next(err);
    }
  }
  next();
});
subscriptionSchema.pre("save", function (next) {
  const plan = PLANS[this.plan];
  if (!plan) return next(new Error(`Invalid plan: ${this.plan}`));

  // When plan changes, validate limits and update features
  if (this.isModified("plan")) {
    // Check if new plan can accommodate current usage
    for (const [resource, limit] of Object.entries(plan.limits)) {
      if (limit !== "Infinity" && this.usage[resource] > limit) {
        return next(
          new Error(
            `Cannot downgrade: Current ${resource} usage (${this.usage[resource]}) ` +
              `exceeds new plan limit (${limit})`
          )
        );
      }
    }

    // Copy plan limits and features
    this.limits = plan.limits;
    this.features = this.transformPlanFeatures(plan.features);

    // Set trial period if applicable
    if (plan.metadata.trialDays > 0 && !this.trial.end) {
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + plan.metadata.trialDays);
      this.trial = {
        start: new Date(),
        end: trialEnd,
        converted: false,
      };
      this.status = "trialing";
    }
  }

  next();
});

// Methods
subscriptionSchema.methods = {
  transformPlanFeatures: function (features) {
    return {
      // Chatbot features
      channels: features.chatbotAutomation.channels,
      visualFlowBuilder: features.chatbotAutomation.visualFlowBuilder,
      multilingualSupport: features.chatbotAutomation.multilingualSupport,
      chatbotTemplates: features.chatbotAutomation.templates,
      fileAttachments: features.chatbotAutomation.fileAttachments,
      customFlows: features.chatbotAutomation.customFlows,

      // Ads features
      adsAutomation: features.adsAutomation.enabled,
      adCopyGeneration: features.adsAutomation.adCopyGeneration,
      targeting: features.adsAutomation.targeting,
      budgetManagement: features.adsAutomation.budgetManagement,
      autoPublishing: features.adsAutomation.autoPublishing,
      audienceSegmentation: features.adsAutomation.audienceSegmentation,

      // SEO features
      seoTools: features.seoTools.enabled,
      keywordResearch: features.seoTools.keywordResearch,
      longTailKeywords: features.seoTools.longTailKeywords,
      seoDailyUpdates: features.seoTools.dailyUpdates,

      // Landing page features
      landingBuilder: features.landingBuilder.enabled,
      dragDropEditor: features.landingBuilder.dragDropEditor,
      landingTemplates: features.landingBuilder.templates,
      formBuilders: features.landingBuilder.formBuilders,
      popups: features.landingBuilder.popups,

      // CRM features
      crmEnabled: features.crmAndDripCampaigns.enabled,
      leadScoring: features.crmAndDripCampaigns.leadScoring,
      visitorTracking: features.crmAndDripCampaigns.visitorTracking,
      crmSync: features.crmAndDripCampaigns.crmSync,
      emailSequences: features.crmAndDripCampaigns.emailSequences,
      behavioralTriggers: features.crmAndDripCampaigns.behavioralTriggers,
      abTesting: features.crmAndDripCampaigns.abTesting,

      // AI features
      aiResponseTuning: features.aiAgent.responseTuning,
      aiModelTraining: features.aiAgent.modelTraining,
      customModels: features.aiAgent.customModels,

      // Growth features
      analyticsDashboard: features.growthFeatures.analyticsDashboard,
      customBranding: features.growthFeatures.customBranding,
      teamCollaboration: features.growthFeatures.teamCollaboration,
      dynamicContent: features.growthFeatures.dynamicContent,
      webinarIntegration: features.growthFeatures.webinarIntegration,
      membershipSites: features.growthFeatures.membershipSites,
      paymentGateways: features.growthFeatures.paymentGateways,

      // Enterprise features
      prioritySupport: features.enterpriseFeatures.prioritySupport,
      whiteLabel: features.enterpriseFeatures.whiteLabel,
      apiAccess: features.enterpriseFeatures.apiAccess,
      webhooks: features.enterpriseFeatures.webhooks,
      sso: features.enterpriseFeatures.sso,
      dedicatedInstance: features.enterpriseFeatures.dedicatedInstance,
      sla99_9: features.enterpriseFeatures.sla99_9,
      customDataCenter: features.enterpriseFeatures.customDataCenter,
      auditLogs: features.enterpriseFeatures.auditLogs,
      dataResidency: features.enterpriseFeatures.dataResidency,
      hipaaCompliance: features.enterpriseFeatures.hipaaCompliance,
      accountManager: features.enterpriseFeatures.accountManager,
    };
  },
  checkUsageOverage: async function () {
    const overages = {};
    const resources = [
      "chatbots",
      "messages",
      "members",
      "storage",
      "apiCalls",
    ];

    resources.forEach((resource) => {
      const limit = this.limits[resource];
      if (limit !== "Infinity") {
        const overage = this.usage[resource] - limit;
        if (overage > 0) {
          overages[resource] = overage;
        }
      }
    });

    this.overage = overages;
    this.overage.lastCalculated = new Date();
    return overages;
  },

  hasFeature: function (feature) {
    return this.features[feature] || false;
  },

  getUsageDashboard: function () {
    const formatLimit = (limit) => (limit === "Infinity" ? "Unlimited" : limit);

    return {
      chatbots: {
        used: this.usage.chatbots,
        limit: formatLimit(this.limits.chatbots),
        percentage: this.usagePercentage.chatbots,
        nearLimit: this.isNearLimit.chatbots,
      },
      messages: {
        used: this.usage.messages,
        limit: formatLimit(this.limits.messages),
        percentage: this.usagePercentage.messages,
        nearLimit: this.isNearLimit.messages,
      },
      members: {
        used: this.usage.members,
        limit: formatLimit(this.limits.members),
        percentage: this.usagePercentage.members,
        nearLimit: this.isNearLimit.members,
      },
      storage: {
        used: (this.usage.storage / 1024).toFixed(2), // Convert to GB
        limit: formatLimit(
          this.limits.storage === "Infinity"
            ? "Unlimited"
            : (this.limits.storage / 1024).toFixed(2)
        ),
        percentage: this.usagePercentage.storage,
        nearLimit: this.isNearLimit.storage,
      },
      apiCalls: {
        used: this.usage.apiCalls,
        limit: formatLimit(this.limits.apiCalls),
        percentage: this.usagePercentage.apiCalls,
        nearLimit: this.isNearLimit.apiCalls,
      },
    };
  },

  updatePlan: async function (newPlan, billingCycle, options = {}) {
    const planConfig = PLANS[newPlan];
    if (!planConfig) throw new Error("Invalid plan");

    // Validate the change
    if (this.plan === newPlan && this.billingCycle === billingCycle) {
      throw new Error("Subscription already on this plan and billing cycle");
    }

    // Handle payment gateway updates
    if (this.paymentGateway === "razorpay" && this.gatewayIds.subscription) {
      await razorpay.subscriptions.update(this.gatewayIds.subscription, {
        plan_id: planConfig.razorpayIds[billingCycle],
        prorate: options.prorate !== false,
      });
    }

    // Update subscription details
    this.plan = newPlan;
    this.billingCycle = billingCycle;
    this.limits = planConfig.limits;
    this.features = this.transformPlanFeatures(planConfig.features);

    // Update workspace reference
    const Workspace = mongoose.model("Workspace");
    await Workspace.findByIdAndUpdate(this.workspace, {
      "subscription.plan": newPlan,
      limits: planConfig.limits,
      features: this.features,
    });

    await this.save();
    return this;
  },

  updateUsage: async function (resource, amount = 1) {
    if (!this.limits[resource]) {
      throw new Error(`Invalid resource: ${resource}`);
    }

    this.usage[resource] = (this.usage[resource] || 0) + amount;
    await this.save();

    // Check if we need to send usage warnings
    if (
      this.isNearLimit[resource] &&
      (!this.notifications.usageWarning[resource] ||
        new Date() - this.notifications.usageWarning[resource] > 86400000)
    ) {
      await this.sendUsageWarning(resource);
    }

    return this;
  },

  // Check if any limits are reached
  checkLimits: function () {
    return {
      chatbots:
        this.limits.chatbots !== "Infinity" &&
        this.usage.chatbots >= this.limits.chatbots,
      messages:
        this.limits.messages !== "Infinity" &&
        this.usage.messages >= this.limits.messages,
      members:
        this.limits.members !== "Infinity" &&
        this.usage.members >= this.limits.members,
      storage:
        this.limits.storage !== "Infinity" &&
        this.usage.storage >= this.limits.storage,
      apiCalls:
        this.limits.apiCalls !== "Infinity" &&
        this.usage.apiCalls >= this.limits.apiCalls,
    };
  },

  getPaymentStatus: function () {
    if (this.inGracePeriod) return "grace_period";
    if (["past_due", "unpaid"].includes(this.status) && !this.inGracePeriod) {
      return "delinquent";
    }
    if (this.status === "trialing") return "trialing";
    if (this.status === "paused") return "paused";
    return this.status;
  },

  sendUsageWarning: async function (resource) {
    const Workspace = mongoose.model("Workspace");
    const workspace = await Workspace.findById(this.workspace).populate({
      path: "members.user",
      match: { role: { $in: ["owner", "admin"] } },
      select: "email name",
    });

    const recipients = workspace.members.map((m) => m.user).filter((u) => u);

    for (const user of recipients) {
      await mongoose
        .model("User")
        .sendSubscriptionNotification(user._id, "usage_warning", {
          resource,
          used: this.usage[resource],
          limit: this.limits[resource],
          percentage: this.usagePercentage[resource],
        });
    }

    this.notifications.usageWarning[resource] = new Date();
    await this.save();
  },

  sendUpcomingRenewalNotification: async function () {
    if (
      this.daysUntilRenewal <= 7 &&
      (!this.notifications.upcomingRenewal.sent ||
        (this.daysUntilRenewal <= 3 &&
          !this.notifications.upcomingRenewal.nextSendDate))
    ) {
      const Workspace = mongoose.model("Workspace");
      const workspace = await Workspace.findById(this.workspace).populate({
        path: "members.user",
        match: { role: "owner" },
        select: "email name",
      });

      const owners = workspace.members.map((m) => m.user).filter((u) => u);

      for (const owner of owners) {
        await mongoose
          .model("User")
          .sendSubscriptionNotification(owner._id, "upcoming_renewal", {
            daysUntilRenewal: this.daysUntilRenewal,
            plan: this.plan,
            billingCycle: this.billingCycle,
            renewalAmount: this.getRenewalAmount(),
          });
      }

      // Schedule next notification if still more than 3 days out
      this.notifications.upcomingRenewal = {
        sent: true,
        sentAt: new Date(),
        nextSendDate:
          this.daysUntilRenewal > 3
            ? new Date(Date.now() + (this.daysUntilRenewal - 3) * 86400000)
            : null,
      };

      await this.save();
    }
  },
  // Calculate renewal amount
  getRenewalAmount: function () {
    if (this.customPricing.isCustom) {
      return this.billingCycle === "yearly"
        ? this.customPricing.yearlyRate
        : this.customPricing.monthlyRate;
    }

    const plan = PLANS[this.plan];
    const baseAmount = plan.prices[this.billingCycle];

    // Apply promotion if valid
    if (this.promotion && this.promotion.expiresAt > new Date()) {
      if (this.promotion.type === "percent") {
        return baseAmount * (1 - this.promotion.value / 100);
      } else if (this.promotion.type === "fixed") {
        return Math.max(baseAmount - this.promotion.value, 0);
      }
    }

    return baseAmount;
  },

  // Add an add-on to the subscription
  addAddOn: async function (addOnId, quantity = 1) {
    const addOn = ADD_ONS[addOnId];
    if (!addOn) throw new Error("Invalid add-on");

    // Check if add-on already exists
    const existingAddOn = this.addOns.find((a) => a.id === addOnId);
    if (existingAddOn) {
      existingAddOn.quantity += quantity;
    } else {
      this.addOns.push({
        id: addOnId,
        name: addOn.name,
        description: addOn.description,
        price: addOn.price,
        quantity,
        billingCycle: this.billingCycle,
        addedAt: new Date(),
        expiresAt: this.currentPeriod.end,
      });
    }

    await this.save();
    return this;
  },

  // Cancel the subscription
  cancel: async function (reason, feedback) {
    if (this.status === "canceled") {
      throw new Error("Subscription already canceled");
    }

    this.status = "canceled";
    this.cancellation = {
      requestedAt: new Date(),
      effectiveAt: this.currentPeriod.end,
      reason,
      feedback,
    };

    // Cancel with payment gateway if applicable
    if (this.paymentGateway !== "offline" && this.gatewayIds.subscription) {
      if (this.paymentGateway === "razorpay") {
        await razorpay.subscriptions.cancel(this.gatewayIds.subscription);
      }
    }

    await this.save();
    return this;
  },
  // In subscriptionSchema.methods
  validatePlanChange: async function (newPlan) {
    const currentPlanLevel = Object.keys(PLANS).indexOf(this.plan);
    const newPlanLevel = Object.keys(PLANS).indexOf(newPlan);

    if (newPlanLevel < currentPlanLevel) {
      const newLimits = PLANS[newPlan].limits;
      const overages = {};

      for (const [resource, limit] of Object.entries(newLimits)) {
        if (limit !== "Infinity" && this.usage[resource] > limit) {
          overages[resource] = {
            current: this.usage[resource],
            newLimit: limit,
          };
        }
      }

      if (Object.keys(overages).length > 0) {
        throw new Error({
          message: "Cannot downgrade due to usage limits",
          overages,
        });
      }
    }
    return true;
  },
  hasFeatureAccess: async function (featurePath) {
    // Example: 'chatbotAutomation.customFlows'
    const parts = featurePath.split(".");
    let current = this.features;

    for (const part of parts) {
      if (!current[part]) return false;
      current = current[part];
    }
    return current === true || current > 0;
  },
};

// Statics
subscriptionSchema.statics = {
  // Create a new subscription with proper initialization
  async createWithPricing(workspaceId, planId, billingCycle, options = {}) {
    const { session, userId, promotionCode } = options;
    const plan = PLANS[planId];
    if (!plan) throw new Error("Invalid plan");

    // Calculate period end date
    const periodEnd = new Date();
    if (billingCycle === "yearly") {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    } else if (billingCycle === "monthly") {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } // Lifetime has no end date

    const subscriptionData = {
      workspace: workspaceId,
      plan: planId,
      billingCycle,
      status: planId === "free" ? "active" : "trialing",
      currentPeriod: {
        start: new Date(),
        end: planId === "free" ? null : periodEnd,
      },
      limits: plan.limits,
      features: this.prototype.transformPlanFeatures(plan.features),
      lifecycle: {
        createdAt: new Date(),
        nextBilling: {
          date: planId === "free" ? null : periodEnd,
          estimatedAmount: plan.prices[billingCycle],
        },
      },
      metadata: {
        createdBy: userId,
      },
    };

    // Apply promotion if provided
    if (promotionCode) {
      const promotion = await this.validatePromotion(promotionCode, planId);
      subscriptionData.promotion = promotion;

      if (promotion.type === "trial" && plan.metadata.trialDays > 0) {
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + promotion.value);
        subscriptionData.trial = {
          start: new Date(),
          end: trialEnd,
          converted: false,
        };
        subscriptionData.status = "trialing";
      }
    }

    return await this.create(
      [subscriptionData],
      session ? { session } : {}
    ).then((res) => res[0]);
  },

  // Validate a promotion code
  validatePromotion: async function (code, planId) {
    // In a real app, this would query a promotions collection
    const PROMOTIONS = {
      SUMMER2023: {
        code: "SUMMER2023",
        name: "Summer Sale 2023",
        type: "percent",
        value: 20, // 20% off
        expiresAt: new Date("2023-09-01"),
        appliesTo: ["starter", "pro", "growth"],
      },
      EXTENDEDTRIAL: {
        code: "EXTENDEDTRIAL",
        name: "Extended Trial",
        type: "trial",
        value: 14, // 14 day trial
        expiresAt: new Date("2023-12-31"),
        appliesTo: ["starter", "pro", "growth"],
      },
    };

    const promotion = PROMOTIONS[code];
    if (!promotion) throw new Error("Invalid promotion code");
    if (promotion.expiresAt < new Date()) throw new Error("Promotion expired");
    if (!promotion.appliesTo.includes(planId)) {
      throw new Error("Promotion not valid for this plan");
    }

    return promotion;
  },

  // Calculate prorated cost for plan changes
  calculateProratedCost: async function (
    subscriptionId,
    newPlanId,
    newBillingCycle,
    promotionCode
  ) {
    const subscription = await this.findById(subscriptionId);
    if (!subscription) throw new Error("Subscription not found");

    const currentPlan = PLANS[subscription.plan];
    const newPlan = PLANS[newPlanId];
    if (!currentPlan || !newPlan) throw new Error("Invalid plan");

    // Calculate unused time in current period
    const daysUsed = Math.ceil(
      (new Date() - subscription.currentPeriod.start) / (1000 * 60 * 60 * 24)
    );
    const daysTotal = Math.ceil(
      (subscription.currentPeriod.end - subscription.currentPeriod.start) /
        (1000 * 60 * 60 * 24)
    );
    const unusedDays = daysTotal - daysUsed;

    // Calculate credit from unused time
    const dailyRateCurrent =
      currentPlan.prices[subscription.billingCycle] / daysTotal;
    const credit = unusedDays * dailyRateCurrent;

    // Calculate cost of new plan
    const dailyRateNew =
      newPlan.prices[newBillingCycle] /
      (newBillingCycle === "yearly" ? 365 : 30);
    const costNew = dailyRateNew * daysTotal;

    // Apply promotion if valid
    let promotion = null;
    if (promotionCode) {
      try {
        promotion = await this.validatePromotion(promotionCode, newPlanId);
      } catch (err) {
        // Promotion not valid, continue without it
      }
    }

    let subtotal = Math.max(costNew - credit, 0);
    let discountAmount = 0;

    if (promotion) {
      if (promotion.type === "percent") {
        discountAmount = subtotal * (promotion.value / 100);
        subtotal -= discountAmount;
      } else if (promotion.type === "fixed") {
        discountAmount = Math.min(promotion.value, subtotal);
        subtotal -= discountAmount;
      }
    }

    const taxAmount = subtotal * TAX_RATES.INR;
    const total = subtotal + taxAmount;

    return {
      currentPlan: currentPlan.name,
      newPlan: newPlan.name,
      daysUsed,
      daysTotal,
      credit: PricingUtils.formatPrice(credit),
      newCost: PricingUtils.formatPrice(costNew),
      proratedAmount: PricingUtils.formatPrice(subtotal),
      promotion: promotion
        ? {
            code: promotion.code,
            name: promotion.name,
            discount: PricingUtils.formatPrice(discountAmount),
          }
        : null,
      taxRate: `${TAX_RATES.INR * 100}%`,
      taxAmount: PricingUtils.formatPrice(taxAmount),
      total: PricingUtils.formatPrice(total),
    };
  },

  // Find subscriptions that need renewal processing
  findSubscriptionsDueForRenewal: async function (daysBefore = 3) {
    const date = new Date();
    date.setDate(date.getDate() + daysBefore);

    return this.find({
      status: "active",
      "lifecycle.nextBilling.date": { $lte: date },
      $or: [
        { "notifications.upcomingRenewal.sent": { $ne: true } },
        { "notifications.upcomingRenewal.nextSendDate": { $lte: new Date() } },
      ],
    });
  },

  // Find subscriptions with usage nearing limits
  findSubscriptionsNearLimits: async function (threshold = 0.8) {
    const subscriptions = await this.find({
      status: "active",
    });

    return subscriptions.filter((sub) => {
      const percentages = sub.usagePercentage;
      return (
        percentages.chatbots >= threshold * 100 ||
        percentages.messages >= threshold * 100 ||
        percentages.storage >= threshold * 100 ||
        percentages.apiCalls >= threshold * 100
      );
    });
  },
};

export const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
