import mongoose from "mongoose";
import { PLANS, PricingUtils, TAX_RATES } from "@/config/pricing.config";
import { razorpay } from "@/lib/payment_gt";
import { Plan } from "../user/schema";

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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
    endAt: Date,
    lifeCycle: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
      lastRenewal: { date: Date, amount: Number, invoiceUrl: String },
      lastCharge: Date,
      nextBilling: { date: Date, estimatedAmount: Number },
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
      storage: { type: Number, required: true },
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
      channels: [String],
      visualFlowBuilder: Boolean,
      multilingualSupport: Number,
      chatbotTemplates: Boolean,
      fileAttachments: Boolean,
      customFlows: Boolean,
      adsAutomation: Boolean,
      adCopyGeneration: Boolean,
      targeting: Boolean,
      budgetManagement: Boolean,
      autoPublishing: Boolean,
      audienceSegmentation: Boolean,
      seoTools: Boolean,
      keywordResearch: Boolean,
      longTailKeywords: Boolean,
      seoDailyUpdates: Boolean,
      landingBuilder: Boolean,
      dragDropEditor: Boolean,
      landingTemplates: Boolean,
      formBuilders: Boolean,
      popups: Boolean,
      crmEnabled: Boolean,
      leadScoring: Boolean,
      visitorTracking: Boolean,
      crmSync: Boolean,
      emailSequences: Boolean,
      behavioralTriggers: Boolean,
      abTesting: Boolean,
      aiResponseTuning: Boolean,
      aiModelTraining: Boolean,
      customModels: Boolean,
      analyticsDashboard: Boolean,
      customBranding: Boolean,
      teamCollaboration: Boolean,
      dynamicContent: Boolean,
      webinarIntegration: Boolean,
      membershipSites: Boolean,
      paymentGateways: Boolean,
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
    usageTracking: {
      lastUpdated: Date,
      dailyStats: [
        {
          date: Date,
          apiCalls: Number,
          storage: Number,
          messages: Number,
        },
      ],
      monthlyStats: [
        {
          month: Date,
          totalApiCalls: Number,
          avgStorage: Number,
          totalMessages: Number,
        },
      ],
    },
    notifications: {
      upcomingRenewal: {
        sent: Boolean,
        sentAt: Date,
        nextSentDate: Date,
      },
      paymentPending: {
        sent: Boolean,
        sentAt: Date,
        attempts: Number,
      },
      paymentFailed: {
        sent: Boolean,
        sentAt: Date,
        attempts: Number,
      },
      subscriptionExpiring: {
        sent: Boolean,
        sentAt: Date,
      },
      usageWarning: {
        sent: Boolean,
        sentAt: Date,
        threshold: Number,
        nextSentDate: Date,
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
      {
        date: Date,
        fromPlan: String,
        toPlan: String,
        proratedAmount: Number,
        oldLimits: Object,
        newLimits: Object,
        changedFeatures: Object,
      },
    ],
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
    customPricing: {
      isCustom: Boolean,
      monthlyRate: Number,
      yearlyRate: Number,
      contractTerm: Number,
      contractStart: Date,
      contractEnd: Date,
      specialTerms: String,
    },
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
      createdBy: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        workspace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workspace",
        },
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: {
        type: Date,
        validate: {
          validator: function (v) {
            return v instanceof Date && !isNaN(v.getTime());
          },
          message: (props) => `${props.value} is not a valid date!`,
        },
      },
      canceledAt: Date,
      notes: String,
      lastRenewal: Date,
      pausedAt: Date,
      pauseReason: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        if (ret.gateway) {
          delete ret.gateway.subscriptionId;
          delete ret.gateway.customerId;
          delete ret.gateway.planId;
          delete ret.gateway.invoice;
        }
        delete ret.paymentGateway;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      // Add this to ensure transforms don't affect database operations
      transform: function (doc, ret, options) {
        // Keep all data for database operations
        return ret;
      },
    },
  }
);

// Indexes
subscriptionSchema.index({ "currentPeriod.end": 1 });
subscriptionSchema.index({ status: 1, "currentPeriod.end": 1 });
subscriptionSchema.index({ "lifeCycle.nextBilling.date": 1 });
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
    !this.currentPeriod?.end ||
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
    if (limit === "Infinity" || limit === Infinity) return 0;
    return limit > 0 ? Math.min(Math.round((used / limit) * 100), 100) : 0;
  };

  return {
    chatbots: calc(this.usage?.chatbots || 0, this.limits?.chatbots || 0),
    messages: calc(this.usage?.messages || 0, this.limits?.messages || 0),
    members: calc(this.usage?.members || 0, this.limits?.members || 0),
    storage: calc(this.usage?.storage || 0, this.limits?.storage || 0),
    apiCalls: calc(this.usage?.apiCalls || 0, this.limits?.apiCalls || 0),
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

// Methods
subscriptionSchema.methods = {
  // Helper method to detect feature changes
  getFeatureChanges(oldFeatures, newFeatures) {
    const changes = {};
    for (const [key, oldValue] of Object.entries(oldFeatures || {})) {
      const newValue = newFeatures?.[key];
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        changes[key] = {
          old: oldValue,
          new: newValue,
        };
      }
    }
    return changes;
  },

  canAccessFeature: async function (featurePath, quantity = 1) {
    const hasAccess = await this.hasFeatureAccess(featurePath);
    if (!hasAccess) return false;

    const resource = featurePath.split(".")[0];
    const currentUsage = this.usage[resource] || 0;
    const limit = this.limits[resource];
    return limit === "Infinity" || currentUsage + quantity <= limit;
  },

  trackUsage: async function (resource, quantity = 1) {
    if (!this.limits?.[resource]) {
      throw new Error(`Invalid resource: ${resource}`);
    }

    const update = {
      $inc: { [`usage.${resource}`]: quantity },
      $set: { "usageTracking.lastUpdated": new Date() },
      $push: {
        "usageTracking.dailyStats": {
          date: new Date(),
          [resource]: quantity,
        },
      },
    };

    await this.updateOne(update);
    const percentUsed =
      ((this.usage?.[resource] || 0) / this.limits[resource]) * 100;

    if (percentUsed >= 80 && !this.notifications?.usageWarning?.sent) {
      await this.sendUsageWarning(resource, percentUsed);
    }
  },

  transformPlanFeatures: function (features) {
    return {
      channels: features.chatbotAutomation?.channels || [],
      visualFlowBuilder: features.chatbotAutomation?.visualFlowBuilder || false,
      multilingualSupport: features.chatbotAutomation?.multilingualSupport || 0,
      chatbotTemplates: features.chatbotAutomation?.templates || false,
      fileAttachments: features.chatbotAutomation?.fileAttachments || false,
      customFlows: features.chatbotAutomation?.customFlows || false,
      adsAutomation: features.adsAutomation?.enabled || false,
      adCopyGeneration: features.adsAutomation?.adCopyGeneration || false,
      targeting: features.adsAutomation?.targeting || false,
      budgetManagement: features.adsAutomation?.budgetManagement || false,
      autoPublishing: features.adsAutomation?.autoPublishing || false,
      audienceSegmentation:
        features.adsAutomation?.audienceSegmentation || false,
      seoTools: features.seoTools?.enabled || false,
      keywordResearch: features.seoTools?.keywordResearch || false,
      longTailKeywords: features.seoTools?.longTailKeywords || false,
      seoDailyUpdates: features.seoTools?.dailyUpdates || false,
      landingBuilder: features.landingBuilder?.enabled || false,
      dragDropEditor: features.landingBuilder?.dragDropEditor || false,
      landingTemplates: features.landingBuilder?.templates || false,
      formBuilders: features.landingBuilder?.formBuilders || false,
      popups: features.landingBuilder?.popups || false,
      crmEnabled: features.crmAndDripCampaigns?.enabled || false,
      leadScoring: features.crmAndDripCampaigns?.leadScoring || false,
      visitorTracking: features.crmAndDripCampaigns?.visitorTracking || false,
      crmSync: features.crmAndDripCampaigns?.crmSync || false,
      emailSequences: features.crmAndDripCampaigns?.emailSequences || false,
      behavioralTriggers:
        features.crmAndDripCampaigns?.behavioralTriggers || false,
      abTesting: features.crmAndDripCampaigns?.abTesting || false,
      aiResponseTuning: features.aiAgent?.responseTuning || false,
      aiModelTraining: features.aiAgent?.modelTraining || false,
      customModels: features.aiAgent?.customModels || false,
      analyticsDashboard: features.growthFeatures?.analyticsDashboard || false,
      customBranding: features.growthFeatures?.customBranding || false,
      teamCollaboration: features.growthFeatures?.teamCollaboration || false,
      dynamicContent: features.growthFeatures?.dynamicContent || false,
      webinarIntegration: features.growthFeatures?.webinarIntegration || false,
      membershipSites: features.growthFeatures?.membershipSites || false,
      paymentGateways: features.growthFeatures?.paymentGateways || false,
      prioritySupport: features.enterpriseFeatures?.prioritySupport || false,
      whiteLabel: features.enterpriseFeatures?.whiteLabel || false,
      apiAccess: features.enterpriseFeatures?.apiAccess || false,
      webhooks: features.enterpriseFeatures?.webhooks || false,
      sso: features.enterpriseFeatures?.sso || false,
      dedicatedInstance:
        features.enterpriseFeatures?.dedicatedInstance || false,
      sla99_9: features.enterpriseFeatures?.sla99_9 || false,
      customDataCenter: features.enterpriseFeatures?.customDataCenter || false,
      auditLogs: features.enterpriseFeatures?.auditLogs || false,
      dataResidency: features.enterpriseFeatures?.dataResidency || false,
      hipaaCompliance: features.enterpriseFeatures?.hipaaCompliance || false,
      accountManager: features.enterpriseFeatures?.accountManager || false,
    };
  },
  transformPlanLimits: function (planLimits) {
    // Handle "Infinity" values by converting to a large number
    const convertLimit = (limit) => {
      if (limit === "Infinity") return Number.MAX_SAFE_INTEGER;
      return limit;
    };

    return {
      chatbots: convertLimit(planLimits.chatbots || 0),
      messages: convertLimit(planLimits.messages || 0),
      members: convertLimit(planLimits.members || 0),
      storage: convertLimit(planLimits.storage || 0),
      conversations: convertLimit(planLimits.conversations || 0),
      integrations: convertLimit(planLimits.integrations || 0),
      automationRules: convertLimit(planLimits.automationRules || 0),
      dripCampaigns: convertLimit(planLimits.dripCampaigns || 0),
      landingPages: convertLimit(planLimits.landingPages || 0),
      adCampaigns: convertLimit(planLimits.adCampaigns || 0),
      teamRoles: convertLimit(planLimits.teamRoles || 0),
      aiModelTraining: convertLimit(planLimits.aiModelTraining || 0),
      apiCalls: convertLimit(planLimits.apiCalls || 0),
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

    this.usageOverage = overages;
    this.usageOverage.lastCalculated = new Date();
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
        used: (this.usage.storage / 1024).toFixed(2),
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
    const session = options.session || null;
    const planConfig = PLANS[newPlan];
    if (!planConfig) throw new Error("Invalid plan");

    // Validate the change
    if (this.plan === newPlan && this.billingCycle === billingCycle) {
      throw new Error("Subscription already on this plan and billing cycle");
    }

    // Start transaction if no session provided
    let createdSession = false;
    if (!session) {
      const dbSession = await mongoose.startSession();
      dbSession.startTransaction();
      createdSession = true;
    }

    try {
      // Handle payment gateway updates
      if (this.paymentGateway === "razorpay" && this.gateway.subscriptionId) {
        await razorpay.subscriptions.update(
          this.gateway.subscriptionId,
          {
            plan_id: planConfig.razorpayIds[billingCycle],
            prorate: options.prorate !== false,
          },
          { session }
        );
      }

      // Update subscription details
      this.plan = newPlan;
      this.billingCycle = billingCycle;

      // Limits and features will be updated by pre-save hook
      await this.save({ session });

      if (createdSession) {
        await session.commitTransaction();
        session.endSession();
      }

      return this;
    } catch (error) {
      if (createdSession && session) {
        await session.abortTransaction();
        session.endSession();
      }
      throw error;
    }
  },

  updateUsage: async function (resource, amount = 1) {
    if (!this.limits[resource]) {
      throw new Error(`Invalid resource: ${resource}`);
    }

    this.usage[resource] = (this.usage[resource] || 0) + amount;
    await this.save();

    if (
      this.isNearLimit[resource] &&
      (!this.notifications.usageWarning[resource] ||
        new Date() - this.notifications.usageWarning[resource] > 86400000)
    ) {
      await this.sendUsageWarning(resource);
    }

    return this;
  },

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

  validatePlanChange: async function (newPlan) {
    const currentPlanLevel = Object.keys(PLANS).indexOf(this.plan);
    const newPlanLevel = Object.keys(PLANS).indexOf(newPlan);

    if (newPlanLevel < currentPlanLevel) {
      const newLimits = PLANS[newPlan]?.limits?.[this.billingCycle] || {};
      const overages = {};

      for (const [resource, limit] of Object.entries(newLimits)) {
        const currentUsage = this.usage?.[resource] || 0;
        if (limit !== "Infinity" && currentUsage > limit) {
          overages[resource] = {
            current: currentUsage,
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
    const parts = featurePath.split(".");
    let current = this.features;

    for (const part of parts) {
      if (!current[part]) return false;
      current = current[part];
    }
    return current === true || current > 0;
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
  async createSubscription(
    workspaceId,
    planId,
    billingCycle,
    session,
    ownerId
  ) {
    const plan = await Plan.findOne({ id: planId });
    if (!plan) throw new Error("Invalid plan");
    const planLimits = plan.limits.yearly;
    // Calculate period end date
    const subscriptionData = {
      workspace: workspaceId,
      user: ownerId,
      plan: planId,
      billingCycle,
      status: "active",
      currentPeriod: {
        start: new Date(),
        end: planId === "free" && null,
      },
      limits: this.prototype.transformPlanLimits(planLimits),
      features: this.prototype.transformPlanFeatures(plan.features),
      lifeCycle: {
        createdAt: new Date(),
        nextBilling: {
          date: planId === "free" && null,
          estimatedAmount: planId !== "free" && plan.prices[billingCycle],
        },
      },
      metadata: {
        createdBy: {
          workspace: workspaceId,
          user: ownerId,
        },
      },
    };

    try {
      const result = await this.create(subscriptionData);

      return result;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
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
      "lifeCycle.nextBilling.date": { $lte: date },
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
