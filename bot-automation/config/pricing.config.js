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
    description: "Ideal for solopreneurs & SaaS founders getting started",
    prices: {
      monthly: 999, // in paise (₹9.99)
      yearly: 9999, // in paise (₹95.99) (~20% discount)
    },
    limits: {
      chatbots: 2,
      messages: 3000,
      members: 2,
      storage: 5, // GB
      conversations: 1000,
      integrations: 2,
      automationRules: 3,
      dripCampaigns: 2,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 2,
      crmSync: true,
      adCredits: 0,
      exports: 3,
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
      aiFeatures: true,
      customFlows: true,
      autoScheduling: false,
      advancedReporting: false,
      adCopyGeneration: true,
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
      monthly: 2499,
      yearly: 23999,
    },
    limits: {
      chatbots: 5,
      messages: 10000,
      members: 10,
      storage: 50,
      conversations: 5000,
      integrations: 5,
      automationRules: 10,
      dripCampaigns: 5,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 5,
      crmSync: true,
      adCredits: 500,
      exports: 10,
    },
    features: {
      channels: ["web", "whatsapp", "facebook", "instagram"],
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      prioritySupport: true,
      whiteLabel: false,
      apiAccess: true,
      webhooks: true,
      sso: false,
      aiFeatures: true,
      customFlows: true,
      autoScheduling: true,
      advancedReporting: true,
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
    },
    metadata: {
      recommended: false,
      popular: true,
      trialDays: 5,
    },
  },
  growth: {
    id: "growth",
    name: "Growth",
    description: "For serious SaaS owners scaling with automation & AI",
    prices: { monthly: 4999, yearly: 47999 }, // ₹49.99/mo, ₹479.99/yr
    limits: {
      chatbots: 10,
      messages: 30000,
      members: 25,
      storage: 200,
      conversations: 15000,
      integrations: 10,
      automationRules: 20,
      dripCampaigns: 15,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 10,
      crmSync: true,
      adCredits: 1500,
      exports: 50,
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
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
    },
    metadata: { recommended: true, popular: false, trialDays: 7 },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Unlimited automation & integrations with white-labeled platform",
    prices: { monthly: 9999, yearly: 99999 }, // ₹99.99/mo, ₹999.99/yr
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
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
    },
    metadata: {
      recommended: false,
      popular: false,
      trialDays: 14,
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

//// new Configurations
// config/pricing.config.js
/**
 * Pricing Configuration Module
 *
 * Features:
 * - Comprehensive plan definitions with limits and features
 * - Support for multiple currencies and tax rates
 * - Utility functions for plan comparisons and validations
 * - Support for both monthly and yearly billing
 * - Feature flag system
 * - Usage tracking helpers
 */

// Constants for plan IDs to prevent typos
/* This section defines unique identifiers for each plan.
export const PLAN_IDS = {
  FREE: "free",
  STARTER: "starter",
  PRO: "pro",
  GROWTH: "growth",
  ENTERPRISE: "enterprise",
};

// Constants for feature names
export const FEATURES = {
  CHANNELS: "channels",
  FILE_ATTACHMENTS: "fileAttachments",
  ANALYTICS_DASHBOARD: "analyticsDashboard",
  CUSTOM_BRANDING: "customBranding",
  PRIORITY_SUPPORT: "prioritySupport",
  WHITE_LABEL: "whiteLabel",
  API_ACCESS: "apiAccess",
  WEBHOOKS: "webhooks",
  SSO: "sso",
  AI_FEATURES: "aiFeatures",
  CUSTOM_FLOWS: "customFlows",
  AUTO_SCHEDULING: "autoScheduling",
  ADVANCED_REPORTING: "advancedReporting",
  AD_COPY_GENERATION: "adCopyGeneration",
  SMART_TARGETING: "smartTargeting",
  BUDGET_SUGGESTIONS: "budgetSuggestions",
  AUTO_PUBLISHING: "autoPublishing",
};

// Supported channels
export const CHANNELS = {
  WEB: "web",
  WHATSAPP: "whatsapp",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  TELEGRAM: "telegram",
  SMS: "sms",
  EMAIL: "email",
};

// Plan configuration
export const PLANS = {
  [PLAN_IDS.FREE]: {
    id: PLAN_IDS.FREE,
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
      fileUploads: 10, // per month
      apiRequests: 100, // per month
    },
    features: {
      [FEATURES.CHANNELS]: [CHANNELS.WEB],
      [FEATURES.FILE_ATTACHMENTS]: false,
      [FEATURES.ANALYTICS_DASHBOARD]: false,
      [FEATURES.CUSTOM_BRANDING]: false,
      [FEATURES.PRIORITY_SUPPORT]: false,
      [FEATURES.WHITE_LABEL]: false,
      [FEATURES.API_ACCESS]: false,
      [FEATURES.WEBHOOKS]: false,
      [FEATURES.SSO]: false,
      [FEATURES.AI_FEATURES]: false,
      [FEATURES.CUSTOM_FLOWS]: false,
      [FEATURES.AUTO_SCHEDULING]: false,
      [FEATURES.ADVANCED_REPORTING]: false,
      [FEATURES.AD_COPY_GENERATION]: false,
      [FEATURES.SMART_TARGETING]: false,
      [FEATURES.BUDGET_SUGGESTIONS]: false,
      [FEATURES.AUTO_PUBLISHING]: false,
    },
    metadata: {
      recommended: false,
      popular: false,
      trialDays: 0,
      bestFor: "Hobbyists, personal projects",
      maxTeamSize: 1,
    },
  },
  [PLAN_IDS.STARTER]: {
    id: PLAN_IDS.STARTER,
    name: "Starter",
    description: "Ideal for solopreneurs & SaaS founders getting started",
    prices: {
      monthly: 999, // in paise (₹9.99)
      yearly: 9999, // in paise (₹95.99) (~20% discount)
    },
    limits: {
      chatbots: 2,
      messages: 3000,
      members: 2,
      storage: 5, // GB
      conversations: 1000,
      integrations: 2,
      automationRules: 3,
      dripCampaigns: 2,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 2,
      crmSync: true,
      adCredits: 0,
      exports: 3,
      fileUploads: 100,
      apiRequests: 1000,
    },
    features: {
      [FEATURES.CHANNELS]: [CHANNELS.WEB, CHANNELS.WHATSAPP],
      [FEATURES.FILE_ATTACHMENTS]: true,
      [FEATURES.ANALYTICS_DASHBOARD]: true,
      [FEATURES.CUSTOM_BRANDING]: true,
      [FEATURES.PRIORITY_SUPPORT]: false,
      [FEATURES.WHITE_LABEL]: false,
      [FEATURES.API_ACCESS]: true,
      [FEATURES.WEBHOOKS]: true,
      [FEATURES.SSO]: false,
      [FEATURES.AI_FEATURES]: true,
      [FEATURES.CUSTOM_FLOWS]: true,
      [FEATURES.AUTO_SCHEDULING]: false,
      [FEATURES.ADVANCED_REPORTING]: false,
      [FEATURES.AD_COPY_GENERATION]: true,
      [FEATURES.SMART_TARGETING]: false,
      [FEATURES.BUDGET_SUGGESTIONS]: false,
      [FEATURES.AUTO_PUBLISHING]: false,
    },
    metadata: {
      recommended: true,
      popular: true,
      trialDays: 3,
      bestFor: "Solopreneurs, small businesses",
      maxTeamSize: 2,
    },
  },
  [PLAN_IDS.PRO]: {
    id: PLAN_IDS.PRO,
    name: "Pro",
    description: "Advanced features for growing businesses with AI-powered ads",
    prices: {
      monthly: 2499,
      yearly: 23999,
    },
    limits: {
      chatbots: 5,
      messages: 10000,
      members: 10,
      storage: 50,
      conversations: 5000,
      integrations: 5,
      automationRules: 10,
      dripCampaigns: 5,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 5,
      crmSync: true,
      adCredits: 500,
      exports: 10,
      fileUploads: 500,
      apiRequests: 5000,
    },
    features: {
      [FEATURES.CHANNELS]: [
        CHANNELS.WEB,
        CHANNELS.WHATSAPP,
        CHANNELS.FACEBOOK,
        CHANNELS.INSTAGRAM,
      ],
      [FEATURES.FILE_ATTACHMENTS]: true,
      [FEATURES.ANALYTICS_DASHBOARD]: true,
      [FEATURES.CUSTOM_BRANDING]: true,
      [FEATURES.PRIORITY_SUPPORT]: true,
      [FEATURES.WHITE_LABEL]: false,
      [FEATURES.API_ACCESS]: true,
      [FEATURES.WEBHOOKS]: true,
      [FEATURES.SSO]: false,
      [FEATURES.AI_FEATURES]: true,
      [FEATURES.CUSTOM_FLOWS]: true,
      [FEATURES.AUTO_SCHEDULING]: true,
      [FEATURES.ADVANCED_REPORTING]: true,
      [FEATURES.AD_COPY_GENERATION]: true,
      [FEATURES.SMART_TARGETING]: true,
      [FEATURES.BUDGET_SUGGESTIONS]: true,
      [FEATURES.AUTO_PUBLISHING]: true,
    },
    metadata: {
      recommended: false,
      popular: true,
      trialDays: 5,
      bestFor: "Growing businesses, digital agencies",
      maxTeamSize: 10,
    },
  },
  [PLAN_IDS.GROWTH]: {
    id: PLAN_IDS.GROWTH,
    name: "Growth",
    description: "For serious SaaS owners scaling with automation & AI",
    prices: { monthly: 4999, yearly: 47999 }, // ₹49.99/mo, ₹479.99/yr
    limits: {
      chatbots: 10,
      messages: 30000,
      members: 25,
      storage: 200,
      conversations: 15000,
      integrations: 10,
      automationRules: 20,
      dripCampaigns: 15,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 10,
      crmSync: true,
      adCredits: 1500,
      exports: 50,
      fileUploads: 1000,
      apiRequests: 10000,
    },
    features: {
      [FEATURES.CHANNELS]: [
        CHANNELS.WEB,
        CHANNELS.WHATSAPP,
        CHANNELS.FACEBOOK,
        CHANNELS.INSTAGRAM,
        CHANNELS.TELEGRAM,
      ],
      [FEATURES.FILE_ATTACHMENTS]: true,
      [FEATURES.ANALYTICS_DASHBOARD]: true,
      [FEATURES.CUSTOM_BRANDING]: true,
      [FEATURES.PRIORITY_SUPPORT]: true,
      [FEATURES.WHITE_LABEL]: true,
      [FEATURES.API_ACCESS]: true,
      [FEATURES.WEBHOOKS]: true,
      [FEATURES.SSO]: true,
      [FEATURES.AI_FEATURES]: true,
      [FEATURES.CUSTOM_FLOWS]: true,
      [FEATURES.AUTO_SCHEDULING]: true,
      [FEATURES.ADVANCED_REPORTING]: true,
      [FEATURES.AD_COPY_GENERATION]: true,
      [FEATURES.SMART_TARGETING]: true,
      [FEATURES.BUDGET_SUGGESTIONS]: true,
      [FEATURES.AUTO_PUBLISHING]: true,
    },
    metadata: {
      recommended: true,
      popular: false,
      trialDays: 7,
      bestFor: "Scaling SaaS companies, marketing teams",
      maxTeamSize: 25,
    },
  },
  [PLAN_IDS.ENTERPRISE]: {
    id: PLAN_IDS.ENTERPRISE,
    name: "Enterprise",
    description:
      "Unlimited automation & integrations with white-labeled platform",
    prices: { monthly: 9999, yearly: 99999 }, // ₹99.99/mo, ₹999.99/yr
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
      fileUploads: Infinity,
      apiRequests: Infinity,
    },
    features: {
      [FEATURES.CHANNELS]: [
        CHANNELS.WEB,
        CHANNELS.WHATSAPP,
        CHANNELS.FACEBOOK,
        CHANNELS.INSTAGRAM,
        CHANNELS.TELEGRAM,
      ],
      [FEATURES.FILE_ATTACHMENTS]: true,
      [FEATURES.ANALYTICS_DASHBOARD]: true,
      [FEATURES.CUSTOM_BRANDING]: true,
      [FEATURES.PRIORITY_SUPPORT]: true,
      [FEATURES.WHITE_LABEL]: true,
      [FEATURES.API_ACCESS]: true,
      [FEATURES.WEBHOOKS]: true,
      [FEATURES.SSO]: true,
      [FEATURES.AI_FEATURES]: true,
      [FEATURES.CUSTOM_FLOWS]: true,
      [FEATURES.AUTO_SCHEDULING]: true,
      [FEATURES.ADVANCED_REPORTING]: true,
      [FEATURES.AD_COPY_GENERATION]: true,
      [FEATURES.SMART_TARGETING]: true,
      [FEATURES.BUDGET_SUGGESTIONS]: true,
      [FEATURES.AUTO_PUBLISHING]: true,
    },
    metadata: {
      recommended: false,
      popular: false,
      trialDays: 14,
      customPricing: true,
      bestFor: "Large enterprises, agencies with multiple clients",
      maxTeamSize: Infinity,
    },
  },
};

// Tax rates by currency
export const TAX_RATES = {
  INR: 0.18, // 18% GST in India
  USD: 0.1, // Example for international customers
  EUR: 0.21, // Example VAT rate
  GBP: 0.2, // UK VAT
  AUD: 0.1, // Australia GST
  CAD: 0.05, // Canada GST
};

// Billing cycles
export const BILLING_CYCLES = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
};
export const PricingUtils = {
  // Get plan by ID (defaults to free plan if not found)
  getPlan: (planId) => PLANS[planId] || PLANS[PLAN_IDS.FREE],

  // Calculate price including taxes
  calculatePrice: (planId, billingCycle, currency = "INR") => {
    const plan = PLANS[planId];
    if (!plan) return { base: 0, tax: 0, total: 0, currency, billingCycle };

    const basePrice = plan.prices[billingCycle] || 0;
    const taxRate = TAX_RATES[currency] || 0;
    const taxAmount = Math.round(basePrice * taxRate);
    const total = basePrice + taxAmount;

    return {
      base: basePrice,
      tax: taxAmount,
      total,
      currency,
      billingCycle,
      formatted: this.formatPrice(total, currency),
    };
  },

  // Check if a plan includes a specific feature
  hasFeature: (planId, feature) => {
    const plan = PLANS[planId] || PLANS[PLAN_IDS.FREE];
    return plan.features[feature] || false;
  },

  // Check if usage is within plan limits
  checkLimit: (planId, resource, currentUsage) => {
    const plan = PLANS[planId] || PLANS[PLAN_IDS.FREE];
    const limit = plan.limits[resource];

    if (limit === Infinity)
      return {
        withinLimit: true,
        remaining: Infinity,
        limit: Infinity,
      };

    return {
      withinLimit: currentUsage < limit,
      remaining: Math.max(limit - currentUsage, 0),
      limit,
      usagePercentage: Math.round((currentUsage / limit) * 100),
    };
  },

  // Get all plans as an array
  getAllPlans: () =>
    Object.values(PLANS).map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      prices: plan.prices,
      features: plan.features,
      limits: plan.limits,
      metadata: plan.metadata,
      isFree: plan.id === PLAN_IDS.FREE,
    })),

  // Get recommended plans
  getRecommendedPlans: () =>
    Object.values(PLANS).filter((plan) => plan.metadata.recommended),

  // Get available upgrade options from current plan
  getUpgradeOptions: (currentPlanId) => {
    const planOrder = [
      PLAN_IDS.FREE,
      PLAN_IDS.STARTER,
      PLAN_IDS.PRO,
      PLAN_IDS.GROWTH,
      PLAN_IDS.ENTERPRISE,
    ];
    const currentIndex = planOrder.indexOf(currentPlanId);

    return currentIndex === -1 || currentIndex === planOrder.length - 1
      ? []
      : planOrder.slice(currentIndex + 1).map((planId) => PLANS[planId]);
  },

  // Format price for display
  formatPrice: (amount, currency = "INR") => {
    // Handle zero amount (free plan)
    if (amount === 0) {
      return currency === "INR" ? "₹0" : "$0";
    }

    const formatter = new Intl.NumberFormat(
      currency === "INR" ? "en-IN" : "en-US",
      {
        style: "currency",
        currency: currency === "INR" ? "INR" : "USD",
        minimumFractionDigits: 2,
      }
    );

    // Convert from paise to rupees (or cents to dollars)
    const displayAmount = amount / 100;
    return formatter.format(displayAmount);
  },

  // Calculate yearly savings percentage
  getYearlySavings: (planId) => {
    const plan = PLANS[planId];
    if (!plan?.prices?.monthly || !plan?.prices?.yearly) return 0;

    const monthlyTotal = plan.prices.monthly * 12;
    const yearlyTotal = plan.prices.yearly;
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  },

  // Compare two plans and return differences
  comparePlans: (planIdA, planIdB) => {
    const planA = PLANS[planIdA] || PLANS[PLAN_IDS.FREE];
    const planB = PLANS[planIdB] || PLANS[PLAN_IDS.FREE];

    const differences = {
      prices: {
        monthly: planB.prices.monthly - planA.prices.monthly,
        yearly: planB.prices.yearly - planA.prices.yearly,
      },
      features: {},
      limits: {},
    };

    // Compare features
    for (const [feature, valueA] of Object.entries(planA.features)) {
      const valueB = planB.features[feature];

      if (Array.isArray(valueA)) {
        // For array features (like channels), show what's added
        const added = valueB.filter((x) => !valueA.includes(x));
        const removed = valueA.filter((x) => !valueB.includes(x));
        if (added.length > 0 || removed.length > 0) {
          differences.features[feature] = { added, removed };
        }
      } else if (valueA !== valueB) {
        differences.features[feature] = {
          from: valueA,
          to: valueB,
        };
      }
    }

    // Compare limits
    for (const [limit, valueA] of Object.entries(planA.limits)) {
      const valueB = planB.limits[limit];

      if (valueA !== valueB) {
        differences.limits[limit] = {
          from: valueA,
          to: valueB,
          increase: typeof valueA === "number" ? valueB - valueA : null,
        };
      }
    }

    return differences;
  },

  // Get the cheapest plan that includes a specific feature
  getCheapestPlanWithFeature: (feature) => {
    const planOrder = [
      PLAN_IDS.FREE,
      PLAN_IDS.STARTER,
      PLAN_IDS.PRO,
      PLAN_IDS.GROWTH,
      PLAN_IDS.ENTERPRISE,
    ];

    for (const planId of planOrder) {
      const plan = PLANS[planId];
      if (this.hasFeature(planId, feature)) {
        return plan;
      }
    }

    return null;
  },

  // Check if a plan can be downgraded to another plan
  canDowngrade: (fromPlanId, toPlanId) => {
    const planOrder = [
      PLAN_IDS.FREE,
      PLAN_IDS.STARTER,
      PLAN_IDS.PRO,
      PLAN_IDS.GROWTH,
      PLAN_IDS.ENTERPRISE,
    ];
    const fromIndex = planOrder.indexOf(fromPlanId);
    const toIndex = planOrder.indexOf(toPlanId);

    return fromIndex > toIndex;
  },

  // Get the most restrictive limit for a resource across multiple plans
  getMostRestrictiveLimit: (plans, resource) => {
    if (!Array.isArray(plans) || plans.length === 0) {
      return { limit: 0, planId: null };
    }

    let mostRestrictive = { limit: Infinity, planId: null };

    for (const planId of plans) {
      const plan = PLANS[planId];
      if (!plan) continue;

      const limit = plan.limits[resource];

      // If any plan has Infinity, the combined limit is Infinity
      if (limit === Infinity) {
        return { limit: Infinity, planId: null };
      }

      if (limit < mostRestrictive.limit) {
        mostRestrictive = { limit, planId };
      }
    }

    return mostRestrictive;
  },
};

// Validation functions
export const validatePlan = (planId) => Object.keys(PLANS).includes(planId);
export const validateBillingCycle = (cycle) =>
  Object.values(BILLING_CYCLES).includes(cycle);

// Feature access helpers
export const hasFeatureAccess = (userPlan, feature) => {
  return PricingUtils.hasFeature(userPlan, feature);
};

export const getFeatureAccessLevel = (feature) => {
  const plans = Object.values(PLANS);
  return plans.filter((plan) => plan.features[feature]);
};

// Plan metadata
export const PLAN_METADATA = {
  [PLAN_IDS.FREE]: {
    color: "gray",
    badgeText: "Free Forever",
    ctaText: "Get Started",
  },
  [PLAN_IDS.STARTER]: {
    color: "blue",
    badgeText: "Most Popular",
    ctaText: "Start Trial",
  },
  [PLAN_IDS.PRO]: {
    color: "purple",
    badgeText: "Best Value",
    ctaText: "Go Pro",
  },
  [PLAN_IDS.GROWTH]: {
    color: "green",
    badgeText: "Recommended",
    ctaText: "Scale Up",
  },
  [PLAN_IDS.ENTERPRISE]: {
    color: "black",
    badgeText: "Custom",
    ctaText: "Contact Sales",
  },
};

// Feature categories for organized display
export const FEATURE_CATEGORIES = {
  messaging: {
    name: "Messaging",
    features: [
      FEATURES.CHANNELS,
      FEATURES.FILE_ATTACHMENTS,
      FEATURES.MULTILINGUAL_BOTS,
    ],
  },
  automation: {
    name: "Automation",
    features: [
      FEATURES.AUTOMATION_RULES,
      FEATURES.DRIP_CAMPAIGNS,
      FEATURES.CUSTOM_FLOWS,
      FEATURES.AUTO_SCHEDULING,
    ],
  },
  analytics: {
    name: "Analytics",
    features: [
      FEATURES.ANALYTICS_DASHBOARD,
      FEATURES.ADVANCED_REPORTING,
      FEATURES.LEAD_SCORING,
      FEATURES.VISITOR_TRACKING,
    ],
  },
  integrations: {
    name: "Integrations",
    features: [
      FEATURES.INTEGRATIONS,
      FEATURES.CRM_SYNC,
      FEATURES.API_ACCESS,
      FEATURES.WEBHOOKS,
    ],
  },
  branding: {
    name: "Branding",
    features: [FEATURES.CUSTOM_BRANDING, FEATURES.WHITE_LABEL],
  },
  support: {
    name: "Support",
    features: [FEATURES.PRIORITY_SUPPORT, FEATURES.SSO],
  },
  aiAds: {
    name: "AI Ads",
    features: [
      FEATURES.AD_COPY_GENERATION,
      FEATURES.SMART_TARGETING,
      FEATURES.BUDGET_SUGGESTIONS,
      FEATURES.AUTO_PUBLISHING,
    ],
  },
};

// Export all plans as ECOD_PLANS for backward compatibility
export const ECOD_PLANS = PLANS;
*/
