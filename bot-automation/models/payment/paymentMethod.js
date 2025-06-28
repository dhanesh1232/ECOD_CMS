// models/PaymentMethod.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const methodSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["card", "upi", "netbanking", "wallet"],
      required: true,
    },

    // Card
    card: {
      last4: {
        type: String,
        validate: {
          validator: (v) => /^\d{4}$/.test(v),
          message: (v) => `${v.value} is not a valid last 4 digits`,
        },
      },
      network: {
        type: String,
        enum: [
          "visa",
          "mastercard",
          "amex",
          "rupay",
          "discover",
          "jcb",
          "diners",
        ],
      },
      type: {
        type: String,
        enum: ["credit", "debit", "prepaid"],
      },
      issuer: String,
      expiryMonth: Number,
      expiryYear: Number,
      isInternational: Boolean,
    },

    // UPI
    upi: {
      vpa: {
        type: String,
        validate: {
          validator: (v) => /^[\w.-]+@[\w]+$/.test(v),
          message: (v) => `${v.value} is not a valid VPA`,
        },
      },
      handle: String,
    },

    // Netbanking
    netbanking: {
      bank: String,
      ifsc: {
        type: String,
        validate: {
          validator: (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v),
          message: (v) => `${v.value} is not a valid IFSC code`,
        },
      },
      accountNumberLast4: {
        type: String,
        validate: {
          validator: (v) => /^\d{4}$/.test(v),
          message: "Must be last 4 digits",
        },
      },
    },

    // Wallet
    wallet: {
      provider: {
        type: String,
        enum: ["paytm", "phonepe", "amazonpay", "mobikwik", "freecharge"],
      },
      phoneLast4: {
        type: String,
        validate: {
          validator: (v) => /^\d{4}$/.test(v),
          message: "Must be last 4 digits",
        },
      },
    },

    label: {
      type: String,
      maxlength: 32,
    },

    fingerprint: {
      type: String,
      select: false,
    },
  },
  { _id: false }
);

// Final schema with single method
const paymentMethodSchema = new Schema(
  {
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: ["razorpay", "stripe", "paypal"],
      required: true,
    },
    method: methodSchema, // 🔹 Only ONE method
    metadata: {
      type: Schema.Types.Mixed,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

paymentMethodSchema.index({ workspace: 1, subscription: 1 }, { unique: true });

export const PaymentMethod =
  mongoose.models.PaymentMethod ||
  mongoose.model("PaymentMethod", paymentMethodSchema);
