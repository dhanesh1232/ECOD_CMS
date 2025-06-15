import mongoose from "mongoose";

const ruleConditionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "minCartValue",
      "newCustomerOnly",
      "specificCustomer",
      "firstPurchase",
      "productCategory",
      "subscriptionType",
    ],
  },
  value: mongoose.Schema.Types.Mixed, // Can be number, string, array etc. based on condition
  description: String,
});

const couponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
      match: /^[A-Z0-9_-]+$/, // Only alphanumeric, underscore and hyphen
    },
    discountType: {
      type: String,
      required: true,
      enum: ["fixed", "percent", "trial", "free_shipping"],
    },
    discountValue: {
      type: Number,
      required: function () {
        return this.discountType !== "free_shipping";
      },
      min: 0,
    },
    maxDiscountAmount: {
      type: Number,
      min: 0,
    },
    minCartValue: {
      type: Number,
      min: 0,
    },
    interActions: {
      autoSuggest: {
        type: Boolean,
        default: false,
      },
      autoApply: {
        type: Boolean,
        default: false,
      },
      showInBanner: {
        type: Boolean,
        default: false,
      },
      bannerText: {
        type: String,
        trim: true,
        maxlength: 100,
      },
    },
    validity: {
      start: {
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
          match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, // HH:MM format
        },
      },
      end: {
        date: {
          type: Date,
          required: true,
          validate: {
            validator: function (value) {
              return value >= this.validity.start.date;
            },
            message: "End date must be after start date",
          },
        },
        time: {
          type: String,
          required: true,
          match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        },
      },
      timezone: {
        type: String,
        required: true,
        default: "UTC",
      },
    },
    usageLimits: {
      total: {
        type: Number,
        required: true,
        min: 1,
        max: 1000000,
      },
      perUser: {
        type: Number,
        min: 1,
        max: 100,
      },
      usedCount: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    rules: [ruleConditionSchema],
    applicablePlans: [
      {
        type: String,
        enum: ["starter", "pro", "growth", "enterprise", "all"],
        default: "all",
      },
    ],
    period: {
      type: String,
      enum: ["monthly", "yearly", "both"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "upcoming", "expired", "archived", "paused"],
      default: "upcoming",
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD", "EUR", "GBP"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metadata: {
      tags: [String],
      campaignId: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted start datetime
couponSchema.virtual("startDateTime").get(function () {
  return `${
    this.validity.start.date.toISOString().split("T")[0]
  }T${this.validity.start.time}`;
});

// Virtual for formatted end datetime
couponSchema.virtual("endDateTime").get(function () {
  return `${
    this.validity.end.date.toISOString().split("T")[0]
  }T${this.validity.end.time}`;
});

couponSchema.pre("validate", function (next) {
  if (
    this.discountType === "percent" &&
    typeof this.discountValue === "number" &&
    this.discountValue > 100
  ) {
    this.invalidate("discountValue", "Percentage discount cannot exceed 100%");
  }

  next();
});
// Pre-save hooks
couponSchema.pre("save", function (next) {
  // Uppercase code
  if (this.isModified("code")) {
    this.code = this.code.toUpperCase().replace(/\s+/g, "");
  }

  // Update status based on current time
  const now = new Date();
  const startDate = new Date(
    `${this.validity.start.date.toISOString().split("T")[0]}T${
      this.validity.start.time
    }`
  );
  const endDate = new Date(
    `${this.validity.end.date.toISOString().split("T")[0]}T${
      this.validity.end.time
    }`
  );

  if (this.status !== "paused" && this.status !== "archived") {
    if (now >= startDate && now <= endDate) {
      this.status = "active";
    } else if (now < startDate) {
      this.status = "upcoming";
    } else {
      this.status = "expired";
    }
  }

  // Set default max discount for percentage coupons
  if (this.discountType === "percent" && !this.maxDiscountAmount) {
    this.maxDiscountAmount = Infinity;
  }

  next();
});

couponSchema.index({ status: 1 });
couponSchema.index({ "validity.start.date": 1, "validity.end.date": 1 });
couponSchema.index({ isActive: 1 });

export const Coupon =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
