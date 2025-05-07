// models/paymentHistory.js
import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    plan: { type: String, enum: ["free", "starter", "pro", "enterprise"] },
    amount: {
      subtotal: Number,
      tax: Number,
      discount: Number,
      total: Number,
    },
    razorpay: {
      paymentId: String,
      orderId: String,
      signature: String,
    },
    invoice: {
      number: String,
      url: String,
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
paymentHistorySchema.virtual("userInfo", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
});

paymentHistorySchema.set("toJSON", { virtuals: true });
paymentHistorySchema.set("toObject", { virtuals: true });

export const PaymentHistory =
  mongoose.models.PaymentHistory ||
  mongoose.model("PaymentHistory", paymentHistorySchema);
