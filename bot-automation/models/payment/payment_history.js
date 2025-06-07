// models/paymentHistory.js
import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    plan: { type: String, enum: ["free", "starter", "pro", "enterprise"] },
    amount: {
      subtotal: Number,
      tax: Number,
      discount: { type: Number, default: 0 },
      total: Number,
    },
    razorpay: {
      paymentId: String,
      subscriptionId: String,
      invoiceId: String,
      signature: String,
    },
    invoice: {
      number: String,
      url: String,
      issuedAt: Date,
      paidAt: Date,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    period: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
  },
  { timestamps: true }
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
