// config/pricing.config.js
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
      monthly: 1999,
      yearly: 19999,
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
      monthly: 4999,
      yearly: 49999,
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

export const TAX_RATES = {
  INR: 0.18,
  USD: 0.18,
};
