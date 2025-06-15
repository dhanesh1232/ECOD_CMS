import dbConnect from "@/config/dbconnect";
import { Coupon } from "@/models/payment/coupon";
import "@/models/payment/couponRule";
import { NextResponse } from "next/server";

// Helper function to validate coupon against rules
const validateCouponRules = (coupon, validationData) => {
  if (!coupon.rules || coupon.rules.length === 0) return true;

  for (const rule of coupon.rules) {
    if (!rule.isActive) continue;

    switch (rule.conditionType) {
      case "first_time_user":
        if (validationData.isFirstTimeUser !== true) return false;
        break;
      case "min_subscriptions":
        if (validationData.activeSubscriptionsCount < rule.value) return false;
        break;
      case "plan_specific":
        if (!coupon.applicablePlans.includes(validationData.plan)) return false;
        break;
      case "redemption_limit":
        if (coupon.usedCount >= rule.value) return false;
        break;
      default:
        return false;
    }
  }

  return true;
};

// Helper function to calculate discount value for comparison
const calculateDiscountValue = (coupon, planPrice) => {
  switch (coupon.discountType) {
    case "fixed":
      return coupon.discountValue;
    case "percent":
      return (planPrice * coupon.discountValue) / 100;
    case "trial":
      return planPrice; // Full value for trial
    default:
      return 0;
  }
};
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const {
      code,
      plan,
      planPrice = 0,
      isFirstTimeUser = false,
      activeSubscriptionsCount = 0,
    } = body;

    const now = new Date();
    const validationData = { isFirstTimeUser, activeSubscriptionsCount, plan };

    const baseQuery = {
      status: "active",
      startDate: { $lte: now },
      endDate: { $gte: now },
      $expr: { $lt: ["$usedCount", "$usageLimit"] },
    };

    const planPriority = { starter: 1, pro: 2, growth: 3 };
    const currentPlanPriority = planPriority[plan] || 0;

    let coupons = [];
    let validationType = "autoApply";

    if (code) {
      const coupon = await Coupon.findOne({
        ...baseQuery,
        code: code.toUpperCase().trim(),
      }).populate("rules");

      if (!coupon) {
        return NextResponse.json(
          { valid: false, message: "Invalid or expired coupon code" },
          { status: 404 }
        );
      }

      coupons = [coupon];
      validationType = "manual";
    } else {
      // Auto-apply coupons for the current plan only
      coupons = await Coupon.find({
        ...baseQuery,
        "interActions.autoApply": true,
      }).populate("rules");
    }
    const validPlans = coupons.find((coupon) =>
      coupon.applicablePlans?.map((plan) => plan === plan)
    );
    const validCoupons = coupons.filter((coupon) =>
      validateCouponRules(coupon, validationData)
    );

    if (validCoupons.length === 0) {
      return NextResponse.json(
        { valid: false, message: "No valid coupons found" },
        { status: 404 }
      );
    }

    console.log("validPlans", validPlans);
    const bestCoupon = validCoupons.reduce((best, current) => {
      const currentValue = calculateDiscountValue(current, planPrice);
      const bestValue = calculateDiscountValue(best, planPrice);
      return currentValue > bestValue ? current : best;
    }, validCoupons[0]);

    // Now find upgrade suggestions
    const upgradeSuggestionsRaw = await Coupon.find({
      ...baseQuery,
      "interActions.autoSuggest": true,
    }).populate("rules");

    const upgradeSuggestions = upgradeSuggestionsRaw
      .filter((coupon) => {
        const targetPlan = coupon.applicablePlans?.[0];
        const targetPlanPriority = planPriority[targetPlan] || 0;

        return (
          validateCouponRules(coupon, {
            ...validationData,
            plan: targetPlan, // simulate different plan
          }) && targetPlanPriority > currentPlanPriority
        );
      })
      .map((coupon) => ({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        title: coupon.title,
        description: coupon.description,
        plan: coupon.applicablePlans?.[0],
        savings: calculateDiscountValue(coupon, planPrice),
      }));

    return NextResponse.json({
      valid: true,
      type: validationType,
      coupon: {
        id: bestCoupon._id,
        code: bestCoupon.code,
        discountType: bestCoupon.discountType,
        discountValue: bestCoupon.discountValue,
        title: bestCoupon.title,
        description: bestCoupon.description,
        currency: bestCoupon.currency,
      },
      message: "Coupon applied successfully",
      upgradeSuggestions,
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { valid: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
