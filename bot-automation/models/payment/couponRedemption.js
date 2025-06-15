// models/payment/couponRedemption.js
import mongoose from "mongoose";

const couponRedemptionSchema = new mongoose.Schema(
  {
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace", // or Workspace
    },
    redeemedAt: {
      type: Date,
      default: Date.now,
    },
    orderId: {
      type: String, // Optional if tied to a transaction
    },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const CouponRedemption =
  mongoose.models.CouponRedemption ||
  mongoose.model("CouponRedemption", couponRedemptionSchema);
