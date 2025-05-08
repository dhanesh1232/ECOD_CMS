import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
import { RateLimiterMongo } from "rate-limiter-flexible";
import dbConnect from "@/config/dbconnect";

// Rate Limiter Initialization
let rateLimiter;

const initializeRateLimiter = async () => {
  if (!rateLimiter) {
    await dbConnect();
    rateLimiter = new RateLimiterMongo({
      storeClient: mongoose.connection.getClient(),
      dbName: process.env.DB_NAME,
      points: 5,
      duration: 15 * 60,
      blockDuration: 60 * 60,
      tableName: "login_rate_limits",
    });
  }
  return rateLimiter;
};

const userSchema = new mongoose.Schema(
  {
    // Core Identity Fields
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      immutable: true,
    },
    terms: {
      type: Boolean,
      required: [true, "You must accept the terms and conditions"],
    },
    // Authentication & Security
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "facebook", "github", "azure", "apple"],
      default: "credentials",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationExpires: Date,
    verificationAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "agent", "analyst", "owner"],
      default: "user",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    orgRole: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "member",
    },

    // Security Tracking
    lastLogin: Date,
    loginHistory: [
      {
        timestamp: Date,
        ip: String,
        country: String,
        region: String,
        city: String,
        device: String,
        userAgent: String,
        isSuspicious: Boolean,
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    failedLoginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    accountLockedUntil: Date,
    twoFactorAuth: {
      enabled: { type: Boolean, default: false },
      method: {
        type: String,
        enum: ["sms", "email", "authenticator", "none"],
        default: "none",
      },
      secret: { type: String, select: false },
      backupCodes: [{ type: String, select: false }],
      lastUsed: Date,
    },
    passwordHistory: [String],
    // Profile Information
    image: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return (
            validator.isURL(v, {
              protocols: ["http", "https"],
              require_protocol: true,
            }) ||
            /^data:image\/(png|jpeg|jpg|gif|webp);base64,([a-zA-Z0-9+/]+={0,2})$/.test(
              v
            )
          );
        },
        message: "Image must be a valid URL or base64 image",
      },
    },
    company: String,
    website: {
      type: String,
      validate: {
        validator: function (v) {
          return v === null || v === "" || validator.isURL(v);
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
      default: null,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return (
            v === null ||
            v === "" ||
            validator.isMobilePhone(v, "any", { strictMode: false })
          );
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
      default: null,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    language: {
      type: String,
      default: "en",
      enum: ["en", "es", "fr", "de", "pt", "zh", "ja", "ar", "hi", "ru"],
    },

    // Notification Preferences
    notifications: {
      email: {
        enabled: { type: Boolean, default: true },
        frequency: {
          type: String,
          enum: ["instant", "daily", "weekly"],
          default: "instant",
        },
      },
      push: {
        enabled: { type: Boolean, default: true },
      },
      inApp: {
        enabled: { type: Boolean, default: true },
      },
      sound: {
        enabled: { type: Boolean, default: true },
      },
    },
    // API Access
    apiKeys: [
      {
        name: String,
        key: { type: String, select: false },
        secret: { type: String, select: false },
        permissions: [String],
        lastUsed: Date,
        createdAt: Date,
        expiresAt: Date,
        isActive: Boolean,
      },
    ],

    // System Flags
    requiresProfileCompletion: Boolean,
    verificationAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    lastVerificationAttempt: Date,
    status: {
      type: String,
      enum: ["active", "suspended", "deactivated", "invited"],
      default: "active",
    },
    deletionRequestedAt: Date,
    deletionScheduledAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Security sanitization
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.verificationAttempts;
        delete ret.lastVerificationAttempt;
        delete ret.failedLoginAttempts;
        delete ret.accountLockedUntil;
        delete ret.securityQuestions;
        delete ret.twoFactorAuth;
        delete ret.apiKeys;
        return ret;
      },
    },
  }
);

// ======================
// VIRTUAL PROPERTIES
// ======================

userSchema.virtual("subscription", {
  ref: "Subscription",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

userSchema.virtual("activeConversations", {
  ref: "Conversation",
  localField: "_id",
  foreignField: "assignedTo",
  match: { status: { $in: ["active", "pending"] } },
  count: true,
});

userSchema.virtual("unreadNotifications", {
  ref: "Notification",
  localField: "_id",
  foreignField: "userId",
  match: { isRead: false },
  count: true,
});

userSchema.virtual("assignedChatbots", {
  ref: "Chatbot",
  localField: "_id",
  foreignField: "members.userId",
});

// ======================
// MIDDLEWARE
// ======================

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Hash password
    this.password = await bcrypt.hash(this.password, 14);
    this.passwordChangedAt = Date.now() - 1000;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre("save", function (next) {
  if (this.isModified("twoFactorAuth") && this.twoFactorAuth.enabled) {
    this.twoFactorAuth.lastUsed = new Date();
  }
  next();
});

// ======================
// INSTANCE METHODS
// ======================

userSchema.methods = {
  // Password verification
  correctPassword: async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  },
  // Password changed check
  changedPasswordAfter: function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  },

  // Password reset token
  createPasswordResetToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
  },

  // Generate API Key
  generateApiKey: function (name, permissions = [], expiresInDays = 90) {
    const key = crypto.randomBytes(32).toString("hex");
    const secret = crypto.randomBytes(64).toString("hex");

    const apiKey = {
      name,
      key,
      secret,
      permissions,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
      isActive: true,
    };

    this.apiKeys.push(apiKey);
    return { key, secret, apiKey };
  },

  // Track login activity
  trackLogin: async function (req) {
    try {
      const ip = req.ip;
      const location = await this.constructor.getIpLocation(ip);
      const isSuspicious = this.isSuspiciousLogin(req);

      this.lastLogin = Date.now();
      this.loginHistory.push({
        timestamp: new Date(),
        ip,
        country: location.country || "Unknown",
        region: location.region || "Unknown",
        city: location.city || "Unknown",
        device: req.device?.type || "Unknown",
        userAgent: req.headers["user-agent"] || "Unknown",
        isSuspicious,
      });

      // Keep only last 10 logins
      if (this.loginHistory.length > 10) this.loginHistory.shift();

      if (isSuspicious) {
        await this.sendSuspiciousLoginAlert(req);
      }
    } catch (err) {
      console.error("Login tracking failed:", err);
    }
  },

  // Check suspicious login
  isSuspiciousLogin: function (req) {
    if (this.loginHistory.length < 3) return false;

    const currentCountry = this.loginHistory.slice(-1)[0].country;
    const commonCountries = this.loginHistory
      .slice(-3)
      .map((entry) => entry.country);

    return !commonCountries.includes(currentCountry);
  },

  // Account locking
  handleFailedLogin: async function () {
    this.failedLoginAttempts += 1;

    if (this.failedLoginAttempts >= 5) {
      this.accountLockedUntil = Date.now() + 60 * 60 * 1000; // 1 hour
      await this.sendAccountLockedNotification();
    }

    await this.save();
  },

  // Two-factor authentication
  setupTwoFactorAuth: function (method = "authenticator") {
    const secret = crypto.randomBytes(20).toString("hex");
    const backupCodes = Array.from({ length: 5 }, () =>
      crypto.randomBytes(5).toString("hex").toUpperCase()
    );

    this.twoFactorAuth = {
      enabled: true,
      method,
      secret,
      backupCodes,
      lastUsed: new Date(),
    };

    return { secret, backupCodes };
  },
};

// ======================
// STATIC METHODS
// ======================

userSchema.statics = {
  isEmailTaken: async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  },

  isPhoneTaken: async function (phone, excludeUserId) {
    if (!phone) return false;
    const user = await this.findOne({ phone, _id: { $ne: excludeUserId } });
    return !!user;
  },

  // Updated Rate Limiter Method
  consumeLoginRateLimit: async function (email, ip) {
    const rateLimiterKey = `login_${email}_${ip}`;
    try {
      const limiter = await initializeRateLimiter();
      await limiter.consume(rateLimiterKey);
      return true;
    } catch (rejRes) {
      if (rejRes instanceof Error) {
        console.error("Rate limiter error:", rejRes);
        throw new Error("Login service unavailable. Please try again later.");
      }
      throw new Error("Too many login attempts. Try again later.");
    }
  },

  getIpLocation: async function (ip) {
    try {
      // Skip API call for localhost or private IPs
      if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.")) {
        console.log("Local IP detected, skipping location lookup");
        return { country: "Local", region: "Local", city: "Local" };
      }

      console.log(`Looking up location for IP: ${ip}`);
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      if (!response.ok) {
        console.error(`IP API request failed with status: ${response.status}`);
        throw new Error("IP API request failed");
      }

      const data = await response.json();
      console.log("Location data:", data);
      return {
        country: data.country_name || "Unknown",
        region: data.region || "Unknown",
        city: data.city || "Unknown",
      };
    } catch (err) {
      console.error("IP location lookup failed:", err);
      return { country: "Unknown", region: "Unknown", city: "Unknown" };
    }
  },

  // Find by API key
  findByApiKey: async function (apiKey) {
    return this.findOne({ "apiKeys.key": apiKey, "apiKeys.isActive": true })
      .select("+apiKeys")
      .exec();
  },
};

// ======================
// INDEXES
// ======================

userSchema.index({ "loginHistory.ip": 1 });
userSchema.index({ accountLockedUntil: 1 }, { expireAfterSeconds: 0 });
userSchema.index({ "organization.id": 1 });
userSchema.index({ "apiKeys.key": 1 });
userSchema.index({ status: 1 });
userSchema.index({ "twoFactorAuth.enabled": 1 });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
