// config/pricing.config.js

import { PLANS } from "@/utils/config.plans";

export { PLANS };
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
    if (discount === null || !discount) {
      discountAmount = 0;
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
      sub_total: pre_total,
      currency,
      billingCycle,
    };
  },
  hasFeature: (planId, feature) => {
    const plan = PLANS[planId] || PLANS.free;
    return plan.features[feature] || false;
  },

  checkLimit: (planId, resource, currentUsage) => {
    const plan = PLANS[planId] || PLANS.free;
    const limit = plan.limits[resource];

    if (limit === "Infinity")
      return { withinLimit: true, remaining: "Infinity" };

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
