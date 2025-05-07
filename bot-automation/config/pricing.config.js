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
      prioritySupport: false,
      whiteLabel: false,
      apiAccess: false,
    },
  },
  starter: {
    name: "Starter",
    prices: {
      monthly: 1999,
      yearly: 19999,
    },
    razorpayIds: {
      monthly: "plan_QS3bpF6uWaXCt6",
      yearly: "plan_QS3c2KZLIExwlX",
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
      prioritySupport: false,
      whiteLabel: false,
      apiAccess: false,
    },
  },
  pro: {
    name: "Pro",
    prices: {
      monthly: 4999,
      yearly: 49999,
    },
    razorpayIds: {
      monthly: "plan_QS3CWwOR3vrYNe",
      yearly: "plan_QS3F2XWMxMog5J",
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
      prioritySupport: true,
      whiteLabel: true,
      apiAccess: false,
    },
  },
  enterprise: {
    name: "Enterprise",
    features: {
      channels: ["web", "whatsapp", "facebook", "instagram", "telegram"],
      chatbots: Infinity,
      monthlyMessages: Infinity,
      teamMembers: Infinity,
      bandwidth: "Unlimited",
      fileAttachments: true,
      analyticsDashboard: true,
      customBranding: true,
      prioritySupport: true,
      whiteLabel: true,
      apiAccess: true,
    },
  },
};

export const TAX_RATES = {
  INR: 0.18,
};
