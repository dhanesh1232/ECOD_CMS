import mongoose from "mongoose";

const couponRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    conditionType: {
      type: String,
      required: true,
      enum: [
        "first_time_user",
        "min_subscriptions",
        "plan_specific",
        "redemption_limit",
      ],
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const CouponRule =
  mongoose.models.CouponRule || mongoose.model("CouponRule", couponRuleSchema);
