import mongoose from "mongoose";

// Sub-schemas for different payment methods
const cardDetailsSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: function () {
        return this.parent().type === "card";
      },
      enum: ["visa", "mastercard", "amex", "discover", "rupay", "other"],
    },
    last4: {
      type: String,
      required: function () {
        return this.parent().type === "card";
      },
      validate: /^\d{4}$/,
    },
    expMonth: {
      type: Number,
      required: function () {
        return this.parent().type === "card";
      },
      min: 1,
      max: 12,
    },
    expYear: {
      type: Number,
      required: function () {
        return this.parent().type === "card";
      },
      min: new Date().getFullYear(),
      max: new Date().getFullYear() + 20,
    },
    country: String,
    funding: {
      type: String,
      enum: ["credit", "debit", "prepaid", "unknown"],
    },
    fingerprint: {
      type: String,
      select: false, // Sensitive data, exclude by default
    },
  },
  { _id: false }
);

const upiDetailsSchema = new mongoose.Schema(
  {
    vpa: {
      type: String,
      required: function () {
        return this.parent().type === "upi";
      },
      validate: {
        validator: (v) => /^[\w.-]+@[\w-]+$/.test(v),
        message: "Invalid UPI ID format",
      },
    },
  },
  { _id: false }
);

const walletDetailsSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: function () {
        return this.parent().type === "wallet";
      },
      enum: ["paytm", "phonepe", "amazonpay", "gpay"],
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => /^\+?\d{10,14}$/.test(v),
        message: "Invalid phone number format",
      },
    },
  },
  { _id: false }
);

const paymentMethodSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    gateway: {
      type: String,
      required: true,
      enum: ["stripe", "paypal", "razorpay", "phonepe"],
      index: true,
    },
    gatewayCustomerId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["card", "bank_account", "wallet", "upi", "netbanking"],
      index: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending_verification"],
      default: "active",
    },
    verification: {
      method: {
        type: String,
        enum: ["otp", "redirect", "none"],
      },
      attempts: {
        type: Number,
        default: 0,
      },
      lastAttempt: Date,
    },
    metadata: {
      clientIp: String,
      userAgent: String,
      deviceFingerprint: String,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function () {
          switch (this.type) {
            case "card":
              return this.details.last4 && this.details.expMonth;
            case "upi":
              return this.details.vpa;
            case "wallet":
              return this.details.provider;
            default:
              return true;
          }
        },
        message: "Invalid details for payment method type",
      },
    },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.details.fingerprint;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Compound indexes
paymentMethodSchema.index({ user: 1, isDefault: 1 });
paymentMethodSchema.index(
  { gateway: 1, "details.vpa": 1 },
  {
    partialFilterExpression: { type: "upi" },
  }
);

// Virtuals
paymentMethodSchema.virtual("maskedIdentifier").get(function () {
  switch (this.type) {
    case "card":
      return `•••• ${this.details.last4}`;
    case "upi":
      const [user, handle] = this.details.vpa.split("@");
      return `${user.slice(0, 2)}•••@${handle}`;
    case "wallet":
      return `${
        this.details.provider
      } •••• ${this.details.phone?.slice(-4) || ""}`;
    default:
      return "•••• •••• ••••";
  }
});

paymentMethodSchema.virtual("expiryDate").get(function () {
  if (this.type === "card") {
    return `${String(this.details.expMonth).padStart(2, "0")}/${String(
      this.details.expYear
    ).slice(-2)}`;
  }
  return null;
});

// Pre-save hooks
paymentMethodSchema.pre("save", async function (next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user },
      { $set: { isDefault: false } }
    );
  }
  next();
});

// Query helpers
paymentMethodSchema.query.byUser = function (userId) {
  return this.where({ user: userId });
};

paymentMethodSchema.query.activeMethods = function () {
  return this.where({ status: "active" });
};

// Static methods
paymentMethodSchema.statics.findDefaultForUser = async function (userId) {
  return this.findOne({ user: userId, isDefault: true });
};

// Instance methods
paymentMethodSchema.methods.toClientJSON = function () {
  const obj = this.toJSON();
  obj.metadata = undefined;
  return obj;
};

export const PaymentMethod =
  mongoose.models.PaymentMethod ||
  mongoose.model("PaymentMethod", paymentMethodSchema);
