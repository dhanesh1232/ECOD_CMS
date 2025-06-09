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
      landingPages: 1,
      adCampaigns: 0,
      teamRoles: 0,
      aiModelTraining: 0,
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
      // Chatbot Automation
      visualFlowBuilder: false,
      aiResponseTuning: false,
      chatbotTemplates: false,
      // Ads Automation
      adCopyGeneration: false,
      smartTargeting: false,
      budgetSuggestions: false,
      autoPublishing: false,
      audienceSegmentation: false,
      // Drip Campaigns
      emailSequences: false,
      behavioralTriggers: false,
      aBTesting: false,
      // Landing Page Builder
      dragDropEditor: false,
      pageTemplates: false,
      formBuilders: false,
      popupCreators: false,
      seoTools: false,
      // Growth Features
      teamCollaboration: false,
      customAiModels: false,
      advancedSegmentation: false,
      dynamicContent: false,
      webinarIntegration: false,
      membershipSites: false,
      paymentGateways: false,
      // Enterprise Features
      dedicatedInstance: false,
      sla99_9: false,
      enterpriseSso: false,
      customDataCenter: false,
      aiModelHosting: false,
      auditLogs: false,
      dataResidency: false,
      hipaaCompliance: false,
      accountManager: false,
      developerSupport: false,
      trainingSessions: false,
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
      monthly: 999,
      yearly: 9999,
    },
    limits: {
      chatbots: 2,
      messages: 3000,
      members: 2,
      storage: 5,
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
      landingPages: 3,
      adCampaigns: 1,
      teamRoles: 0,
      aiModelTraining: 0,
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
      // Chatbot Automation
      visualFlowBuilder: true,
      aiResponseTuning: true,
      chatbotTemplates: true,
      // Ads Automation
      adCopyGeneration: true,
      smartTargeting: false,
      budgetSuggestions: false,
      autoPublishing: false,
      audienceSegmentation: false,
      // Drip Campaigns
      emailSequences: true,
      behavioralTriggers: false,
      aBTesting: false,
      // Landing Page Builder
      dragDropEditor: true,
      pageTemplates: true,
      formBuilders: true,
      popupCreators: false,
      seoTools: false,
      // Growth Features
      teamCollaboration: false,
      customAiModels: false,
      advancedSegmentation: false,
      dynamicContent: false,
      webinarIntegration: false,
      membershipSites: false,
      paymentGateways: false,
      // Enterprise Features
      dedicatedInstance: false,
      sla99_9: false,
      enterpriseSso: false,
      customDataCenter: false,
      aiModelHosting: false,
      auditLogs: false,
      dataResidency: false,
      hipaaCompliance: false,
      accountManager: false,
      developerSupport: false,
      trainingSessions: false,
    },
    metadata: {
      recommended: false,
      popular: false,
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
      landingPages: 10,
      adCampaigns: 3,
      teamRoles: 0,
      aiModelTraining: 0,
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
      // Chatbot Automation
      visualFlowBuilder: true,
      aiResponseTuning: true,
      chatbotTemplates: true,
      // Ads Automation
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
      audienceSegmentation: true,
      // Drip Campaigns
      emailSequences: true,
      behavioralTriggers: true,
      aBTesting: true,
      // Landing Page Builder
      dragDropEditor: true,
      pageTemplates: true,
      formBuilders: true,
      popupCreators: true,
      seoTools: true,
      // Growth Features
      teamCollaboration: false,
      customAiModels: false,
      advancedSegmentation: false,
      dynamicContent: false,
      webinarIntegration: false,
      membershipSites: false,
      paymentGateways: false,
      // Enterprise Features
      dedicatedInstance: false,
      sla99_9: false,
      enterpriseSso: false,
      customDataCenter: false,
      aiModelHosting: false,
      auditLogs: false,
      dataResidency: false,
      hipaaCompliance: false,
      accountManager: false,
      developerSupport: false,
      trainingSessions: false,
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
    description:
      "For scaling businesses with advanced automation & team collaboration",
    prices: {
      monthly: 4999,
      yearly: 47999,
    },
    limits: {
      chatbots: 15,
      messages: 50000,
      members: 30,
      storage: 250,
      conversations: 25000,
      integrations: 15,
      automationRules: 30,
      dripCampaigns: 20,
      leadScoring: true,
      visitorTracking: true,
      multilingualBots: 15,
      crmSync: true,
      adCredits: 2500,
      exports: 100,
      landingPages: 50,
      adCampaigns: 15,
      teamRoles: 5,
      aiModelTraining: 3,
      apiCalls: 100000,
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
      // Chatbot Automation
      visualFlowBuilder: true,
      aiResponseTuning: true,
      chatbotTemplates: true,
      // Ads Automation
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
      audienceSegmentation: true,
      // Drip Campaigns
      emailSequences: true,
      behavioralTriggers: true,
      aBTesting: true,
      // Landing Page Builder
      dragDropEditor: true,
      pageTemplates: true,
      formBuilders: true,
      popupCreators: true,
      seoTools: true,
      // Growth Features
      teamCollaboration: true,
      customAiModels: true,
      advancedSegmentation: true,
      dynamicContent: true,
      webinarIntegration: true,
      membershipSites: true,
      paymentGateways: true,
      // Enterprise Features
      dedicatedInstance: false,
      sla99_9: false,
      enterpriseSso: false,
      customDataCenter: false,
      aiModelHosting: false,
      auditLogs: false,
      dataResidency: false,
      hipaaCompliance: false,
      accountManager: false,
      developerSupport: false,
      trainingSessions: false,
    },
    metadata: {
      recommended: true,
      popular: false,
      trialDays: 7,
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description:
      "For large organizations needing enterprise-grade security & reliability",
    prices: {
      monthly: 19999,
      yearly: 199999,
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
      landingPages: Infinity,
      adCampaigns: Infinity,
      teamRoles: Infinity,
      aiModelTraining: Infinity,
      apiCalls: 1000000,
      dedicatedConcurrency: 20,
    },
    features: {
      channels: [
        "web",
        "whatsapp",
        "facebook",
        "instagram",
        "telegram",
        "sms",
        "voice",
      ],
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
      // Chatbot Automation
      visualFlowBuilder: true,
      aiResponseTuning: true,
      chatbotTemplates: true,
      // Ads Automation
      adCopyGeneration: true,
      smartTargeting: true,
      budgetSuggestions: true,
      autoPublishing: true,
      audienceSegmentation: true,
      // Drip Campaigns
      emailSequences: true,
      behavioralTriggers: true,
      aBTesting: true,
      // Landing Page Builder
      dragDropEditor: true,
      pageTemplates: true,
      formBuilders: true,
      popupCreators: true,
      seoTools: true,
      // Growth Features
      teamCollaboration: true,
      customAiModels: true,
      advancedSegmentation: true,
      dynamicContent: true,
      webinarIntegration: true,
      membershipSites: true,
      paymentGateways: true,
      // Enterprise Features
      dedicatedInstance: true,
      sla99_9: true,
      enterpriseSso: true,
      customDataCenter: true,
      aiModelHosting: true,
      auditLogs: true,
      dataResidency: true,
      hipaaCompliance: true,
      accountManager: true,
      developerSupport: true,
      trainingSessions: true,
    },
    metadata: {
      recommended: false,
      popular: false,
      trialDays: 14,
      implementationSupport: true,
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

  calculatePrice: (planId, billingCycle, discount, currency = "INR") => {
    const plan = PLANS[planId];
    if (!plan) return { base: 0, tax: 0, total: 0 };
  
    const basePrice = plan.prices[billingCycle] || 0;
    const taxRate = TAX_RATES[currency] || 0;
    const taxAmount = Math.round(basePrice * taxRate);
    const pre_total = basePrice + taxAmount;
  
    let discountAmount = 0;
  
    if (typeof discount === "object" && discount !== null) {
      const percentageDiscount = discount.percentage
        ? (pre_total * discount.percentage) / 100
        : 0;
      const fixedDiscount = discount.fixed || 0;
      discountAmount = percentageDiscount + fixedDiscount;
  
    } else if (typeof discount === "number") {
      discountAmount = discount;
  
    } else if (typeof discount === "string" && discount.endsWith("%")) {
      const parsed = parseFloat(discount.replace("%", ""));
      if (!isNaN(parsed)) {
        discountAmount = (pre_total * parsed) / 100;
      }
    }
  
    discountAmount = Math.min(discountAmount, pre_total); // Prevent negative totals
    const total = Math.max(Math.round(pre_total - discountAmount), 0);
  
    return {
      base: basePrice,
      discount: Math.round(discountAmount),
      tax: taxAmount,
      total,
      currency,
      billingCycle,
    };
  }
,  
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
