import { PLANS } from "@/config/pricing.config";
import mongoose from "mongoose";

// models/Discount.js
const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: String,
  type: {
    type: String,
    enum: ["percentage", "fixed", "trial"],
    required: true,
  },
  value: { type: Number, required: true },
  currency: String,
  appliesTo: {
    plans: [{ type: String, enum: Object.keys(PLANS) }],
    billingCycles: [{ type: String, enum: ["monthly", "yearly"] }],
  },
  validFrom: { type: Date, required: true },
  validUntil: Date,
  maxRedemptions: Number,
  redemptionCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  metadata: {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
});
export const Discount =
  mongoose.models.Discount || mongoose.model("Discount", discountSchema);
