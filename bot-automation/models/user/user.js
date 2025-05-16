import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
import { RateLimiterMongo } from "rate-limiter-flexible";
import { generateRandomSlug } from "@/lib/slugGenerator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      immutable: true,
      index: true,
    },
    termsAccepted: {
      type: Boolean,
      default: true,
      required: function () {
        return this.provider === "credentials";
      },
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => !v || validator.isMobilePhone(v),
        message: (props) => `${props.value} is not a valid phone number`,
      },
      index: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
      validate: {
        validator: function (v) {
          return validator.isStrongPassword(v, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message:
          "Password must contain at least 8 characters with 1 lowercase, 1 uppercase, 1 number, and 1 symbol",
      },
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "facebook", "github"],
      default: "credentials",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    requiresProfileCompletion: {
      type: Boolean,
      default: function () {
        return this.provider !== "credentials";
      },
    },
    invitation: [
      {
        invitedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        workspace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workspace",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "admin", "member", "guest"],
          default: "member",
          required: true,
        },
      },
    ],
    workspaces: [
      {
        workspace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workspace",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "admin", "member", "guest"],
          default: "member",
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        invitedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        settings: {
          chatHistory: {
            type: Boolean,
            default: true,
          },
          // Other user-specific workspace settings
          notificationFrequency: {
            type: String,
            enum: ["realtime", "hourly", "daily"],
            default: "realtime",
          },
        },
        lastActive: Date,
        status: {
          type: String,
          enum: ["active", "suspended", "invited"],
          default: "active",
        },
      },
    ],
    currentWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    lastLogin: Date,
    loginHistory: [
      {
        timestamp: Date,
        ip: String,
        userAgent: String,
        device: String,
        location: {
          country: String,
          region: String,
          city: String,
        },
      },
    ],
    failedLoginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    accountLockedUntil: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    mfa: {
      enabled: { type: Boolean, default: false },
      method: {
        type: String,
        enum: ["totp", "sms", "email", "authenticator"],
        default: "totp",
      },
      secret: { type: String, select: false },
      backupCodes: [
        {
          code: String,
          used: Boolean,
          usedAt: Date,
        },
      ],
      lastUsed: Date,
    },
    image: {
      type: String,
      validate: {
        validator: (v) =>
          !v ||
          validator.isURL(v) ||
          /^data:image\/(png|jpeg|jpg|gif);base64,/.test(v),
        message: "Image must be a valid URL or base64 encoded",
      },
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
    },
    metadata: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
      deletedAt: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.failedLoginAttempts;
        delete ret.accountLockedUntil;
        delete ret.mfa;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ "workspaces.role": 1 });
userSchema.index({ accountLockedUntil: 1 }, { expireAfterSeconds: 0 });
userSchema.index(
  { "workspaces.workspace": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "workspaces.status": "active",
      "workspaces.workspace": { $exists: true },
    },
  }
);
userSchema.index({ currentWorkspace: 1 });

// Virtuals
userSchema.virtual("activeWorkspaces", {
  ref: "Workspace",
  localField: "workspaces.workspace",
  foreignField: "_id",
  match: { "workspaces.status": "active" },
});

// Pre-save hooks
userSchema.pre("save", async function (next) {
  // Password hashing
  if (this.isModified("password")) {
    try {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 14);
        this.passwordChangedAt = Date.now() - 1000;
      }
    } catch (err) {
      return next(err);
    }
  }

  // Workspace deduplication
  if (this.isModified("workspaces")) {
    const uniqueWorkspaces = [];
    const seenWorkspaces = new Set();

    for (const ws of this.workspaces) {
      const wsId = ws.workspace.toString();
      if (!seenWorkspaces.has(wsId)) {
        uniqueWorkspaces.push(ws);
        seenWorkspaces.add(wsId);
      }
    }

    this.workspaces = uniqueWorkspaces;
  }

  next();
});

userSchema.pre("save", function (next) {
  if (this.isModified("currentWorkspace") || this.isModified("workspaces")) {
    if (this.currentWorkspace) {
      const isValid = this.workspaces.some(
        (ws) =>
          ws.workspace.equals(this.currentWorkspace) && ws.status === "active"
      );
      if (!isValid) {
        this.currentWorkspace = null;
      }
    }
  }
  next();
});

userSchema.pre("save", function (next) {
  if (
    this.isModified("mfa") &&
    this.mfa.enabled &&
    !this.mfa.backupCodes?.length
  ) {
    this.mfa.backupCodes = Array.from({ length: 10 }, () => ({
      code: crypto.randomBytes(4).toString("hex"),
      used: false,
    }));
  }
  next();
});

// Updated User model methods
userSchema.methods.createDefaultWorkspace = async function (session = null) {
  const Workspace = mongoose.model("Workspace");

  // Create workspace with transaction support
  const workspace = await Workspace.createWithOwner(
    this._id,
    {
      name: `${this.name}'s Workspace`,
      slug: generateRandomSlug(),
      members: [
        {
          user: this._id,
          role: "owner",
          status: "active",
          joinedAt: new Date(),
        },
      ],
      subscription: {
        plan: "free",
        billingCycle: "lifetime",
        status: "active",
      },
    },
    { session }
  );

  // Add workspace to user with transaction support
  await this.addToWorkspace(workspace._id, "owner", null, session);
  return workspace;
};
// Methods
userSchema.methods = {
  correctPassword: async function (candidatePassword) {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
  },

  changedPasswordAfter: function (JWTTimestamp) {
    return (
      this.passwordChangedAt &&
      parseInt(this.passwordChangedAt.getTime() / 1000, 10) > JWTTimestamp
    );
  },

  createPasswordResetToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  },

  hasWorkspaceAccess: function (workspaceId) {
    // Check user have workspace access or not ?
    return this.workspaces.some(
      (ws) => ws.workspace.equals(workspaceId) && ws.status === "active"
    );
  },

  getWorkspaceRole: function (workspaceId) {
    // Get existing workspace role
    const workspace = this.workspaces.find(
      (ws) => ws.workspace.equals(workspaceId) && ws.status === "active"
    );
    return workspace?.role;
  },

  addToWorkspace: async function (
    workspaceId,
    role = "member",
    invitedBy = null,
    session = null
  ) {
    // Check if already in workspace
    const existingIndex = this.workspaces.findIndex((ws) =>
      ws.workspace.equals(workspaceId)
    );

    if (existingIndex >= 0) {
      // Update existing membership
      this.workspaces[existingIndex] = {
        ...this.workspaces[existingIndex].toObject(),
        role,
        status: "active",
        invitedBy,
        lastActive: new Date(),
      };
    } else {
      // Add new workspace membership
      this.workspaces.push({
        workspace: workspaceId,
        role,
        status: "active",
        invitedBy,
        joinedAt: new Date(),
        lastActive: new Date(),
      });
    }
    if (!this.currentWorkspace) {
      this.currentWorkspace = workspaceId;
    }
    await this.save(session);
    return this;
  },

  removeFromWorkspace: async function (workspaceId) {
    const index = this.workspaces.findIndex((ws) =>
      ws.workspace.equals(workspaceId)
    );

    if (index !== -1) {
      // Mark status as 'suspended' or remove completely depending on your policy
      this.workspaces.splice(index, 1);

      // If current workspace is being removed, unset it
      if (this.currentWorkspace && this.currentWorkspace.equals(workspaceId)) {
        this.currentWorkspace = null;

        // Optionally set a new active workspace, if any
        const active = this.workspaces.find((ws) => ws.status === "active");
        if (active) {
          this.currentWorkspace = active.workspace;
        }
      }

      await this.save();
    }

    return this;
  },

  updateLastActiveInWorkspace: async function (workspaceId) {
    const workspace = this.workspaces.find((ws) =>
      ws.workspace.equals(workspaceId)
    );
    if (workspace) {
      workspace.lastActive = new Date();
      await this.save();
    }
    return this;
  },

  trackLogin: async function (req) {
    try {
      // Safely get headers or default to empty object
      const headers = req?.headers || new Headers();

      // Get IP address with multiple fallbacks
      const ip =
        req?.ip || Array.isArray(headers["x-forwarded-for"])
          ? headers["x-forwarded-for"][0]
          : (typeof headers["x-forwarded-for"] === "string"
              ? headers["x-forwarded-for"].split(",").shift().trim()
              : null) ||
            req?.socket?.remoteAddress ||
            req?.connection?.remoteAddress ||
            "unknown";

      // Get user agent safely
      const userAgent = headers["user-agent"] || "unknown";

      this.lastLogin = new Date();
      this.loginHistory.push({
        timestamp: new Date(),
        ip,
        userAgent,
        device: this.getDeviceType(userAgent),
        location: await this.constructor.getIpLocation(ip),
      });

      if (this.loginHistory.length > 20) this.loginHistory.shift();
      await this.save();
    } catch (error) {
      console.error("Error tracking login:", error);
      // Continue without failing the request
    }
  },

  getDeviceType: function (userAgent) {
    // Get Device Type
    if (/mobile/i.test(userAgent)) return "Mobile";
    if (/tablet/i.test(userAgent)) return "Tablet";
    if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS";
    if (/Android/.test(userAgent)) return "Android";
    if (/Windows/.test(userAgent)) return "Windows";
    if (/Macintosh/.test(userAgent)) return "Mac";
    if (/Linux/.test(userAgent)) return "Linux";
    return "Unknown";
  },

  handleFailedLogin: async function () {
    // User login failed then its works
    this.failedLoginAttempts += 1;
    if (this.failedLoginAttempts >= 5) {
      this.accountLockedUntil = Date.now() + 30 * 60 * 1000; // 30Min Lock
    }
    await this.save();
  },

  resetLoginAttempts: async function () {
    // If previous logins are failed, after sometime user have successful then its will reset
    this.failedLoginAttempts = 0;
    this.accountLockedUntil = undefined;
    await this.save();
  },
};

// Statics
userSchema.statics = {
  isEmailTaken: async function (email, excludeUserId) {
    //For checking mail already taken or not ?
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  },

  getIpLocation: async function (ip) {
    // Get IP Location
    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.")) {
      return { country: "Local", region: "Local", city: "Local" };
    }

    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      return {
        country: data.country_name || "Unknown",
        region: data.region || "Unknown",
        city: data.city || "Unknown",
      };
    } catch (err) {
      return { country: "Unknown", region: "Unknown", city: "Unknown" };
    }
  },

  initializeRateLimiter: async function () {
    return new RateLimiterMongo({
      storeClient: mongoose.connection,
      dbName: process.env.MONGODB_DBNAME || "auto-bot",
      points: 5,
      duration: 15 * 60,
      blockDuration: 60 * 60,
      tableName: "login_rate_limits",
    });
  },

  sendSubscriptionNotification: async function (user, type, data) {
    const notificationTypes = {
      trial_ending: {
        subject: "Your trial is ending soon",
        template: "trial-ending",
      },
      payment_failed: {
        subject: "Payment failed for your subscription",
        template: "payment-failed",
      },
      subscription_activated: {
        subject: "Subscription activated",
        template: "subscription-activated",
      },
      subscription_renewed: {
        subject: "Your subscription has been renewed",
        template: "subscription-renewed",
      },
    };

    const config = notificationTypes[type];
    if (!config) return;

    console.log(`Sending ${type} notification to ${user.email}`);

    await this.findByIdAndUpdate(user._id, {
      $push: {
        notifications: {
          type,
          message: config.subject,
          data,
          read: false,
          createdAt: new Date(),
        },
      },
    });
  },
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
