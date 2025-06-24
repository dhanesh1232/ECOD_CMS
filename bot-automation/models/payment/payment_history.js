// models/paymentHistory.js
import { PLANS } from "@/config/pricing.config";
import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who initiated the payment
    plan: { type: String, enum: Object.keys(PLANS), required: true },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    amount: {
      subtotal: { type: Number, required: true }, // Before tax and discount
      tax: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
      currency: { type: String, default: "INR" },
    },
    gateway: {
      name: {
        type: String,
        enum: ["razorpay", "stripe", "paypal"],
        required: true,
      },
      paymentId: String,
      subscriptionId: String,
      orderId: String,
      invoiceId: String,
      signature: String,
      receipt: String,
    },
    invoice: {
      number: { type: String, required: true },
      date: { type: Date, default: Date.now },
      dueDate: Date,
      status: {
        type: String,
        enum: ["draft", "open", "paid", "void", "uncollectible"],
        default: "open",
      },
      pdfUrl: String,
      hostedUrl: String,
    },
    refund: {
      amount: Number,
      reason: String,
      date: Date,
      gatewayRefundId: String,
    },
    paymentMethod: {
      type: { type: String, enum: ["card", "netbanking", "upi", "wallet"] },
      last4: String,
      brand: String,
      expiry: String,
    },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed", "refunded", "disputed"],
      default: "pending",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

paymentHistorySchema.virtual("formattedAmount").get(function () {
  return {
    subtotal: (this.amount.subtotal / 100).toFixed(2),
    tax: (this.amount.tax / 100).toFixed(2),
    discount: (this.amount.discount / 100).toFixed(2),
    total: (this.amount.total / 100).toFixed(2),
  };
});
paymentHistorySchema.virtual("workspaceInfo", {
  ref: "Workspace",
  localField: "workspace",
  foreignField: "_id",
  justOne: true,
});

paymentHistorySchema.set("toJSON", { virtuals: true });
paymentHistorySchema.set("toObject", { virtuals: true });

export const PaymentHistory =
  mongoose.models.PaymentHistory ||
  mongoose.model("PaymentHistory", paymentHistorySchema);
