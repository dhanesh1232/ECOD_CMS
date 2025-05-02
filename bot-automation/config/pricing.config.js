// Currency conversion and formatting utilities
const DEFAULT_CURRENCY = navigator.language.startsWith("en-IN") ? "INR" : "USD";
const EXCHANGE_RATE = 83.33; // Update this with current rate in production
console.log(navigator);
export const getLocalizedPrice = (amount, currency = DEFAULT_CURRENCY) => {
  const convertedAmount = currency === "INR" ? amount : amount / EXCHANGE_RATE;

  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedAmount);
};

export const getPlanPrice = (planId, period = "monthly") => {
  const plan = PLANS[planId];
  if (!plan.prices) return null;

  return {
    raw: plan.prices[period],
    localized: getLocalizedPrice(plan.prices[period]),
    currency: DEFAULT_CURRENCY,
    period,
  };
};

// Updated PLANS configuration with price helpers
export const PLANS = {
  free: {
    name: "Free",
    features: {
      channels: ["web"],
      chatbots: 1,
      monthlyMessages: 500,
      teamMembers: 1,
      bandwidth: "2GB",
      fileAttachments: false,
      analyticsDashboard: false,
      customBranding: false,
      apiAccess: false,
      prioritySupport: false,
      whiteLabel: false,
    },
  },
  starter: {
    name: "Starter",
    prices: {
      monthly: 1900,
      yearly: 19000,
      get: (period = "monthly") => getPlanPrice("starter", period),
    },
    razorpayIds: {
      monthly: "plan_NlNjdG4zbDw6Qx",
      yearly: "plan_NlNjfJ4mZJk9pD",
    },
    features: {
      channels: ["web", "whatsapp"],
      chatbots: 3,
      monthlyMessages: 5000,
      teamMembers: 3,
      bandwidth: "10GB",
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      apiAccess: false,
      prioritySupport: false,
      whiteLabel: false,
    },
  },
  pro: {
    name: "Pro",
    prices: {
      monthly: 4900,
      yearly: 49000,
      get: (period = "monthly") => getPlanPrice("pro", period),
    },
    razorpayIds: {
      monthly: "plan_NlNjgR7q3CJ2vT",
      yearly: "plan_NlNjhP8s1dB7wE",
    },
    features: {
      channels: ["web", "whatsapp", "facebook", "instagram"],
      chatbots: 10,
      monthlyMessages: Infinity,
      teamMembers: 10,
      bandwidth: "50GB",
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      apiAccess: true,
      prioritySupport: true,
      whiteLabel: true,
    },
  },
  enterprise: {
    name: "Enterprise",
    features: {
      channels: ["web", "whatsapp", "facebook", "instagram", "telegram", "sms"],
      chatbots: Infinity,
      monthlyMessages: Infinity,
      teamMembers: Infinity,
      bandwidth: "Unlimited",
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      apiAccess: true,
      prioritySupport: true,
      whiteLabel: true,
    },
  },
};

// Dynamic tax configuration
export const TAX_RATE = DEFAULT_CURRENCY === "INR" ? 0.18 : 0; // 18% GST for India
export const CURRENCY = DEFAULT_CURRENCY;
