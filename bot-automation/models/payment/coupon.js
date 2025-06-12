// models/payment/coupon.js
import mongoose from "mongoose";
const couponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      required: true,
      enum: ["fixed", "percent", "trial"],
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    interActions: {
      autoSuggest: { type: Boolean, default: false },
      autoApply: { type: Boolean, default: false },
    },
    endDate: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    rules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CouponRule",
      },
    ],
    applicablePlans: [
      {
        type: String,
        enum: ["starter", "pro", "growth", "enterprise"],
      },
    ],
    status: {
      type: String,
      enum: ["active", "upcoming", "expired", "archived"],
      default: "upcoming",
    },
    currency: {
      type: String,
      default: "INR",
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

couponSchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;

  // Update status based on dates
  if (this.startDate <= now && this.endDate >= now) {
    this.status = "active";
  } else if (this.startDate > now) {
    this.status = "upcoming";
  } else {
    this.status = "expired";
  }

  next();
});

export const Coupon =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
