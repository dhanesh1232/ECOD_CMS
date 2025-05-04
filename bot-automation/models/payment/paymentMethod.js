import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gateway: {
      type: String,
      enum: ["stripe", "paypal", "razorpay"],
      required: true,
    },
    gatewayId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["card", "bank_account", "paypal", "wallet", "upi"],
      required: true,
    },
    details: {
      brand: String,
      last4: String,
      expMonth: Number,
      expYear: Number,
      country: String,
      funding: String,
      fingerprint: String,
      name: String,
      email: String,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Indexes
paymentMethodSchema.index({ user: 1 });
paymentMethodSchema.index({ gateway: 1 });
paymentMethodSchema.index({ isDefault: 1 });
paymentMethodSchema.index({ "details.last4": 1 });

// Methods
paymentMethodSchema.methods = {
  getMaskedNumber: function () {
    if (this.type === "card") {
      return `•••• •••• •••• ${this.details.last4}`;
    }
    return this.details.email || this.gatewayId;
  },

  getExpiryDate: function () {
    if (this.type === "card") {
      return `${this.details.expMonth
        .toString()
        .padStart(2, "0")}/${this.details.expYear.toString().slice(-2)}`;
    }
    return null;
  },
};

export const PaymentMethod =
  mongoose.models.PaymentMethod ||
  mongoose.model("PaymentMethod", paymentMethodSchema);
