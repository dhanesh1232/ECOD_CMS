import mongoose from "mongoose";

// models/BillingProfile.js
const BillingProfileSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    unique: true,
    required: true,
    index: { unique: true },
  },

  companyName: { type: String, required: true }, // Full name or company name
  email: { type: String, required: true },
  phone: { type: String }, // Optional

  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },

  gstin: { type: String }, // Optional for India

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const BillingDetails =
  mongoose.models.BillingDetails ||
  mongoose.model("BillingDetails", BillingProfileSchema);
