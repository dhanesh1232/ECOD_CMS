import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // Authentication & User Info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: function () {
        return !this.phoneNumber;
      },
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phoneNumber: {
      type: String,
      required: function () {
        return !this.email;
      },
      unique: true,
      sparse: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    company: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },

    // Authentication Security
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.isOAuthUser;
      },
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isOAuthUser: {
      type: Boolean,
      default: false,
    },
    oauthProvider: {
      type: String,
      enum: ["google", "facebook", "apple", null],
      default: null,
    },
    isPasswordSet: {
      type: Boolean,
      default: false,
    },

    // API Configuration
    apiPreference: {
      type: String,
      enum: ["platform_api", "custom_key"],
      default: "platform_api",
    },
    openaiApiKey: {
      type: String,
      default: "",
      select: false,
    },

    // Subscription Plans (Initially minimal, expanded later)
    subscription: {
      plan: {
        type: String,
        enum: ["free", "standard", "growth", "enterprise", null],
        default: "free",
      },
      status: {
        type: String,
        enum: ["none", "trial", "active", "canceled", "expired", "pending"],
        default: "none",
      },
      trialStarted: {
        type: Boolean,
        default: false,
      },
      startDate: Date,
      endDate: Date,
      trialEndDate: Date,
      autoRenew: {
        type: Boolean,
        default: false,
      },
      paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer", "razor_pay", null],
        default: null,
      },
      billingCycle: {
        type: String,
        enum: ["monthly", "annual", null],
        default: null,
      },
      lastPaymentDate: Date,
      nextBillingDate: Date,
    },

    // Usage Tracking with free tier limits
    usage: {
      monthlyMessages: {
        allocated: {
          type: Number,
          default: 500, // Very limited free tier
        },
        used: {
          type: Number,
          default: 0,
        },
      },
      integrations: {
        allocated: {
          type: Number,
          default: 1, // Only 1 integration for free tier
        },
        used: {
          type: Number,
          default: 0,
        },
      },
      lastResetDate: {
        type: Date,
        default: Date.now,
      },
    },

    // Platform Integrations
    integrations: [
      {
        platform: {
          type: String,
          enum: ["whatsapp", "instagram", "facebook", "telegram"],
          required: true,
        },
        credentials: {
          type: mongoose.Schema.Types.Mixed,
          select: false,
        },
        isActive: {
          type: Boolean,
          default: false,
        },
        lastSynced: Date,
      },
    ],

    // Admin & Metadata
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    lastLogin: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Virtual for checking if user has any subscription (including trial)
userSchema.virtual("hasSubscription").get(function () {
  return this.subscription.status !== "none";
});

// Virtual for checking active paid subscription
userSchema.virtual("hasActiveSubscription").get(function () {
  return (
    this.subscription.status === "active" &&
    (!this.subscription.endDate || this.subscription.endDate > new Date())
  );
});

// Virtual for checking if in trial period
userSchema.virtual("inTrialPeriod").get(function () {
  return (
    this.subscription.status === "trial" &&
    this.subscription.trialEndDate &&
    this.subscription.trialEndDate > new Date()
  );
});

// Virtual for checking free tier access
userSchema.virtual("isFreeTier").get(function () {
  return (
    this.subscription.status === "none" || this.subscription.plan === "free"
  );
});

// Virtual for checking if account is verified
userSchema.virtual("isAccountVerified").get(function () {
  return this.isVerified || this.isOAuthUser;
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.isPasswordSet = true;
    next();
  } catch (error) {
    next(error);
  }
});

// Set defaults for new users (minimal requirements)
userSchema.pre("save", function (next) {
  if (this.isNew) {
    // New users start with no subscription by default
    this.subscription = {
      plan: "free",
      status: "none",
      trialStarted: false,
    };

    // Set very limited free tier usage
    this.usage = {
      monthlyMessages: {
        allocated: 500,
        used: 0,
      },
      integrations: {
        allocated: 1,
        used: 0,
      },
      lastResetDate: new Date(),
    };
  }
  next();
});

// Method to start trial
userSchema.methods.startTrial = async function (days = 14) {
  this.subscription.status = "trial";
  this.subscription.trialStarted = true;
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + days);
  this.subscription.trialEndDate = trialEnd;

  // Increase limits for trial
  this.usage.monthlyMessages.allocated = 2000;
  this.usage.integrations.allocated = 3;

  await this.save();
};

// Method to subscribe to a plan
userSchema.methods.subscribe = async function (plan, billingCycle) {
  this.subscription.plan = plan;
  this.subscription.status = "active";
  this.subscription.startDate = new Date();
  this.subscription.billingCycle = billingCycle;

  // Set end date based on billing cycle
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + (billingCycle === "annual" ? 12 : 1));
  this.subscription.endDate = endDate;

  // Set appropriate limits based on plan
  switch (plan) {
    case "standard":
      this.usage.monthlyMessages.allocated = 1000;
      this.usage.integrations.allocated = 5;
      break;
    case "growth":
      this.usage.monthlyMessages.allocated = 10000;
      this.usage.integrations.allocated = 10;
      break;
    case "enterprise":
      this.usage.monthlyMessages.allocated = 100000;
      this.usage.integrations.allocated = 20;
      break;
  }

  await this.save();
};

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to check basic API access (even free tier has some access)
userSchema.methods.canUseAPI = function () {
  return true; // All users get basic API access
};

// Method to check premium API features
userSchema.methods.canUsePremiumAPI = function () {
  return this.hasActiveSubscription || this.inTrialPeriod;
};

// Method to check if user has exceeded usage limits
userSchema.methods.hasExceededLimits = function () {
  return (
    this.usage.monthlyMessages.used >= this.usage.monthlyMessages.allocated ||
    this.usage.integrations.used >= this.usage.integrations.allocated
  );
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
