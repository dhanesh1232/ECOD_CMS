import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    taxAmount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["draft", "open", "paid", "void", "uncollectible"],
      default: "open",
    },
    gatewayId: String,
    gatewayUrl: String,
    pdfUrl: String,
    hostedInvoiceUrl: String,
    items: [
      {
        description: String,
        amount: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        taxRates: [
          {
            type: String,
          },
        ],
      },
    ],
    taxRates: [
      {
        displayName: String,
        percentage: Number,
        inclusive: Boolean,
      },
    ],
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Indexes
invoiceSchema.index({ subscription: 1 });
invoiceSchema.index({ user: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ dueDate: 1 });

// Virtuals
invoiceSchema.virtual("totalAmount").get(function () {
  return this.amount + this.taxAmount;
});

export const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
