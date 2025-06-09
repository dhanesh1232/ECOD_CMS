import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Payment Method Schema
 */
const methodSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["card", "upi", "netbanking", "wallet"],
      required: [true, "Payment method type is required"],
    },
    card: {
      last4: {
        type: String,
        required: function () {
          return this.method === "card";
        },
        validate: {
          validator: (v) => /^\d{4}$/.test(v),
          message: (props) => `${props.value} is not a valid last 4 digits`,
        },
      },
      network: {
        type: String,
        required: function () {
          return this.method === "card";
        },
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
        required: function () {
          return this.method === "card";
        },
        enum: ["credit", "debit", "prepaid"],
      },
      issuer: {
        type: String,
        required: function () {
          return this.method === "card";
        },
      },
      expiryMonth: {
        type: Number,
        min: 1,
        max: 12,
      },
      expiryYear: {
        type: Number,
        min: new Date().getFullYear(),
      },
      isInternational: {
        type: Boolean,
        default: false,
      },
    },
    upi: {
      vpa: {
        type: String,
        required: function () {
          return this.method === "upi";
        },
        validate: {
          validator: (v) => /^[\w.-]+@[\w]+$/.test(v),
          message: (props) => `${props.value} is not a valid VPA`,
        },
      },
      handle: {
        type: String,
      },
    },
    netbanking: {
      bank: {
        type: String,
        required: function () {
          return this.method === "netbanking";
        },
      },
      ifsc: {
        type: String,
        validate: {
          validator: (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v),
          message: (props) => `${props.value} is not a valid IFSC code`,
        },
      },
      accountNumberLast4: {
        type: String,
        validate: {
          validator: (v) => /^\d{4}$/.test(v),
          message: (props) => `${props.value} is not a valid last 4 digits`,
        },
      },
    },
    wallet: {
      provider: {
        type: String,
        required: function () {
          return this.method === "wallet";
        },
        enum: ["paytm", "phonepe", "amazonpay", "mobikwik", "freecharge"],
      },
      phoneLast4: {
        type: String,
        validate: {
          validator: (v) => /^\d{4}$/.test(v),
          message: (props) => `${props.value} is not a valid last 4 digits`,
        },
      },
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    fingerprint: {
      type: String,
      select: false, // Not returned by default in queries
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    discriminatorKey: "method", // For discriminators if needed
  }
);

/**
 * Payment Method Collection Schema
 */
const paymentMethodSchema = new Schema(
  {
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Workspace reference is required"],
      index: true, // Add index for faster queries
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: [true, "Subscription reference is required"],
      index: true,
    },
    methods: [methodSchema],
    currentMethodIndex: {
      type: Number,
      default: 0,
      min: 0,
    },
    provider: {
      type: String,
      enum: ["razorpay", "stripe", "paypal"],
      required: [true, "Payment provider is required"],
    },
    metadata: {
      type: Schema.Types.Mixed,
      select: false, // Not returned by default in queries
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for current method
paymentMethodSchema.virtual("currentMethod").get(function () {
  return this.methods[this.currentMethodIndex];
});

// Indexes for faster queries
paymentMethodSchema.index({ workspace: 1, subscription: 1 }, { unique: true });
paymentMethodSchema.index({ "methods.fingerprint": 1 }, { sparse: true });

// Middleware to update timestamps
paymentMethodSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Static methods
paymentMethodSchema.statics.findByWorkspace = async function (workspaceId) {
  return this.findOne({ workspace: workspaceId });
};

// Create or retrieve model
const PaymentMethod =
  mongoose.models.PaymentMethod ||
  mongoose.model("PaymentMethod", paymentMethodSchema);

module.exports = PaymentMethod;
