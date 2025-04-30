import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
import { RateLimiterMongo } from "rate-limiter-flexible";

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

    // Authentication & Security
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "facebook"],
      default: "credentials",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
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
    securityQuestions: [
      {
        question: String,
        answerHash: String,
      },
    ],
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: String,

    // Profile Information
    image: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return validator.isURL(v, {
            protocols: ["http", "https"],
            require_protocol: true,
          });
        },
        message: "Image must be a valid URL",
      },
    },
    company: String,
    website: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v, { require_protocol: true }),
        message: "Invalid website URL",
      },
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: (v) => validator.isMobilePhone(v),
        message: "Invalid phone number",
      },
    },

    // System Flags
    requiresProfileCompletion: Boolean,
    verificationAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    lastVerificationAttempt: Date,
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
        delete ret.twoFactorSecret;
        return ret;
      },
    },
  }
);

// Initialize rate limiter
const rateLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection,
  dbName: process.env.DB_NAME,
  points: 5, // 5 attempts
  duration: 15 * 60, // 15 minutes
  blockDuration: 60 * 60, // 1 hour block
  tableName: "login_rate_limits",
});

// ======================
// SCHEMA METHODS
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

  // Track login activity using API-based geolocation
  trackLogin: async function (req) {
    try {
      const ip = req.ip;
      const location = await this.constructor.getIpLocation(ip);

      this.lastLogin = Date.now();
      this.loginHistory.push({
        timestamp: new Date(),
        ip,
        country: location.country || "Unknown",
        region: location.region || "Unknown",
        city: location.city || "Unknown",
        device: req.device?.type || "Unknown",
        userAgent: req.headers["user-agent"] || "Unknown",
      });

      // Keep only last 10 logins
      if (this.loginHistory.length > 10) this.loginHistory.shift();
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
    }

    await this.save();
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

  // Rate limiter integration
  consumeLoginRateLimit: async function (email, ip) {
    const rateLimiterKey = `login_${email}_${ip}`;
    try {
      await rateLimiter.consume(rateLimiterKey);
      return true;
    } catch (rejRes) {
      throw new Error("Too many login attempts. Try again later.");
    }
  },

  // API-based IP location lookup
  getIpLocation: async function (ip) {
    try {
      // Skip API call for localhost or private IPs
      if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.")) {
        return { country: "Local", region: "Local", city: "Local" };
      }

      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      if (!response.ok) throw new Error("IP API request failed");

      const data = await response.json();
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
};

// ======================
// INDEXES
// ======================

userSchema.index({ "loginHistory.ip": 1 });
userSchema.index({ accountLockedUntil: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
