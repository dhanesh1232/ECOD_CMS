import mongoose from "mongoose";

const couponSettingsSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      default: true,
    },
    defaultUsageLimit: {
      type: Number,
      default: 100,
      min: 1,
    },
    defaultValidityDays: {
      type: Number,
      default: 30,
      min: 1,
    },
    notifyOnCouponCreation: {
      type: Boolean,
      default: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const CouponSettings =
  mongoose.models.CouponSettings ||
  mongoose.model("CouponSettings", couponSettingsSchema);
