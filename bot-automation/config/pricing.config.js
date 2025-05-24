// config/pricing.config.js
export const PLANS = {
  free: {
    id: "free",
    name: "Free",
    description: "Basic chatbot functionality for small projects",
    prices: {
      monthly: 0,
      yearly: 0,
    },
    limits: {
      chatbots: 1,
      messages: 300,
      members: 1,
      storage: 1, // GB
      conversations: 100,
      integrations: 1,
      automationRules: 0,
      dripCampaigns: 0,
      leadScoring: false,
      visitorTracking: false,
      multilingualBots: 1,
      crmSync: false,
      adCredits: 0,
      exports: 0,
    },
    features: {
      channels: ["web"],
      fileAttachments: false,
      analyticsDashboard: false,
      customBranding: false,
      prioritySupport: false,
      whiteLabel: false,
      apiAccess: false,
      webhooks: false,
      sso: false,
      aiFeatures: false,
      customFlows: false,
      autoScheduling: false,
      advancedReporting: false,
      // AI Ads features
      adCopyGeneration: false,
      smartTargeting: false,
      budgetSuggestions: false,
      autoPublishing: false,
    },
    metadata: {
      recommended: false,
      popular: false,
      trialDays: 0,
    },
  },
  starter: {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses getting started with automation",
    prices: {
      monthly: 2499, // in paise (₹24.99)
      yearly: 23999, // in paise (₹239.99) (~20% discount)
    },
    razorpayIds: {
      monthly: "plan_QS3bpF6uWaXCt6",
      yearly: "plan_QS3c2KZLIExwlX",
    },
    limits: {
      chatbots: 3,
      messages: 3000,
      members: 5,
      storage: 10, // GB
      conversations: 2000,
      integrations: 3,
      automationRules: 5,
      dripCampaigns: 3,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 2,
      crmSync: true,
      adCredits: 0,
      exports: 5,
    },
    features: {
      channels: ["web", "whatsapp"],
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      prioritySupport: false,
      whiteLabel: false,
      apiAccess: true,
      webhooks: true,
      sso: false,
      aiFeatures: false,
      customFlows: true,
      autoScheduling: true,
      advancedReporting: false,
      // AI Ads features
      adCopyGeneration: false,
      smartTargeting: false,
      budgetSuggestions: false,
      autoPublishing: false,
    },
    metadata: {
      recommended: true,
      popular: true,
      trialDays: 3,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "Advanced features for growing businesses with AI-powered ads",
    prices: {
      monthly: 5999, // in paise (₹59.99)
      yearly: 59999, // in paise (₹599.99) (~16% discount)
    },
    razorpayIds: {
      monthly: "plan_QS3CWwOR3vrYNe",
      yearly: "plan_QS3F2XWMxMog5J",
    },
    limits: {
      chatbots: 10,
      messages: 10000,
      members: 15,
      storage: 100, // GB
      conversations: 5000,
      integrations: 10,
      automationRules: 20,
      dripCampaigns: 10,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 5,
      crmSync: true,
      adCredits: 5,
      exports: 20,
    },
    features: {
      channels: ["web", "whatsapp", "facebook", "instagram"],
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      prioritySupport: true,
      whiteLabel: true,
      apiAccess: true,
      webhooks: true,
      sso: true,
      aiFeatures: true,
      customFlows: true,
      autoScheduling: true,
      advancedReporting: true,
      // AI Ads features
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
    },
    metadata: {
      recommended: false,
      popular: false,
      trialDays: 7,
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Custom solutions for large organizations with unlimited AI ads",
    prices: {
      monthly: 14999, // in paise (₹149.99)
      yearly: 149999, // in paise (₹1499.99) (~16% discount)
    },
    razorpayIds: {
      monthly: "plan_QS3Gm4vJXqYb9P",
      yearly: "plan_QS3Hn5wKYrZc0Q",
    },
    limits: {
      chatbots: Infinity,
      messages: Infinity,
      members: Infinity,
      storage: Infinity,
      conversations: Infinity,
      integrations: Infinity,
      automationRules: Infinity,
      dripCampaigns: Infinity,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: Infinity,
      crmSync: true,
      adCredits: Infinity,
      exports: Infinity,
    },
    features: {
      channels: ["web", "whatsapp", "facebook", "instagram", "telegram"],
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      prioritySupport: true,
      whiteLabel: true,
      apiAccess: true,
      webhooks: true,
      sso: true,
      aiFeatures: true,
      customFlows: true,
      autoScheduling: true,
      advancedReporting: true,
      // AI Ads features
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
    },
    metadata: {
      recommended: false,
      popular: false,
      trialDays: 30,
      customPricing: true,
    },
  },
};

export const TAX_RATES = {
  INR: 0.18, // 18% GST in India
  USD: 0.1, // Example for international customers
  EUR: 0.21, // Example VAT rate
};

export const PricingUtils = {
  getPlan: (planId) => PLANS[planId] || PLANS.free,

  calculatePrice: (planId, billingCycle, currency = "INR") => {
    const plan = PLANS[planId];
    if (!plan) return { base: 0, tax: 0, total: 0 };

    const basePrice = plan.prices[billingCycle] || 0;
    const taxRate = TAX_RATES[currency] || 0;
    const taxAmount = Math.round(basePrice * taxRate);
    const total = basePrice + taxAmount;

    return { base: basePrice, tax: taxAmount, total, currency, billingCycle };
  },

  hasFeature: (planId, feature) => {
    const plan = PLANS[planId] || PLANS.free;
    return plan.features[feature] || false;
  },

  checkLimit: (planId, resource, currentUsage) => {
    const plan = PLANS[planId] || PLANS.free;
    const limit = plan.limits[resource];

    if (limit === Infinity) return { withinLimit: true, remaining: Infinity };

    return {
      withinLimit: currentUsage < limit,
      remaining: Math.max(limit - currentUsage, 0),
      limit,
    };
  },

  getAllPlans: () =>
    Object.values(PLANS).map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      prices: plan.prices,
      features: plan.features,
      limits: plan.limits,
      metadata: plan.metadata,
      isFree: plan.id === "free",
    })),

  getRecommendedPlans: () =>
    Object.values(PLANS).filter((plan) => plan.metadata.recommended),

  getUpgradeOptions: (currentPlanId) => {
    const planOrder = ["free", "starter", "pro", "enterprise"];
    const currentIndex = planOrder.indexOf(currentPlanId);
    return currentIndex === -1 || currentIndex === planOrder.length - 1
      ? []
      : planOrder.slice(currentIndex + 1).map((planId) => PLANS[planId]);
  },

  formatPrice: (amount, currency = "INR") => {
    const formatter = new Intl.NumberFormat(
      currency === "INR" ? "en-IN" : "en-US",
      {
        style: "currency",
        currency: currency === "INR" ? "INR" : "USD",
        minimumFractionDigits: 2,
      }
    );
    return formatter.format(amount / 100);
  },

  getYearlySavings: (planId) => {
    const plan = PLANS[planId];
    if (!plan?.prices?.monthly || !plan?.prices?.yearly) return 0;

    const monthlyTotal = plan.prices.monthly * 12;
    const yearlyTotal = plan.prices.yearly;
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  },
};

export const validatePlan = (planId) => Object.keys(PLANS).includes(planId);
export const validateBillingCycle = (cycle) =>
  ["monthly", "yearly"].includes(cycle);
