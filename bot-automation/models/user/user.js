import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
import { RateLimiterMongo } from "rate-limiter-flexible";

// Notification types configuration
const NOTIFICATION_TYPES = {
  WORKSPACE: {
    INVITATION: "workspace_invitation",
    INVITATION_ACCEPTED: "invitation_accepted",
    INVITATION_EXPIRED: "invitation_expired",
    ROLE_CHANGED: "role_changed",
    REMOVED: "removed_from_workspace",
  },
  SUBSCRIPTION: {
    TRIAL_ENDING: "trial_ending",
    PAYMENT_FAILED: "payment_failed",
    ACTIVATED: "subscription_activated",
    RENEWED: "subscription_renewed",
    CANCELLED: "subscription_cancelled",
  },
  SYSTEM: {
    MAINTENANCE: "system_maintenance",
    UPDATE: "system_update",
    SECURITY: "security_alert",
  },
  MESSAGE: {
    DIRECT: "direct_message",
    MENTION: "mentioned",
    REPLY: "reply_to_message",
  },
};

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
    notifications: {
      type: [
        {
          type: {
            type: String,
            enum: Object.values(NOTIFICATION_TYPES).flatMap((category) =>
              Object.values(category)
            ),
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
          data: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
          },
          read: {
            type: Boolean,
            default: false,
          },
          action: {
            url: String,
            label: String,
          },
          source: {
            type: {
              type: String,
              enum: ["system", "user", "workspace", "subscription"],
              required: true,
            },
            id: mongoose.Schema.Types.ObjectId,
          },
          priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium",
          },
          expiresAt: Date,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    unreadNotificationCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "super_admin", "support", "other"],
      default: "user",
    },
    invitation: [
      {
        invitedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        workspace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workspace",
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member", "guest"],
          default: "member",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "expired", "declined"],
          required: true,
          default: "pending",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: {
          type: Date,
          default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Days
        },
      },
    ],
    workspaces: [
      {
        workspace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Workspace",
          required: true,
          validate: {
            validator: function (v) {
              return mongoose.Types.ObjectId.isValid(v);
            },
            message: (props) => `${props.value} is not a valid workspace ID!`,
          },
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
          notificationFrequency: {
            type: String,
            enum: ["realtime", "hourly", "daily"],
            default: "realtime",
          },
        },
        lastActive: Date,
        status: {
          type: String,
          enum: ["active", "suspended", "inactive", "invited"],
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
          coordinates: {
            type: [Number], // [longitude, latitude]
            index: "2dsphere",
          },
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
    notificationPreferences: {
      email: {
        workspace_invitation: { type: Boolean, default: true },
        invitation_accepted: { type: Boolean, default: true },
        invitation_expired: { type: Boolean, default: true },
        trial_ending: { type: Boolean, default: true },
        payment_failed: { type: Boolean, default: true },
        subscription_activated: { type: Boolean, default: true },
        subscription_renewed: { type: Boolean, default: true },
        direct_message: { type: Boolean, default: true },
        mentioned: { type: Boolean, default: true },
      },
      push: {
        workspace_invitation: { type: Boolean, default: true },
        direct_message: { type: Boolean, default: true },
        mentioned: { type: Boolean, default: true },
      },
      inApp: {
        all: { type: Boolean, default: true },
      },
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
userSchema.index({ name: "text", email: "text" });
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
userSchema.index({ "notifications.read": 1, "notifications.createdAt": -1 });
userSchema.index({ "notifications.expiresAt": 1 }, { expireAfterSeconds: 0 });

// Virtuals
userSchema.virtual("activeWorkspaces", {
  ref: "Workspace",
  localField: "workspaces.workspace",
  foreignField: "_id",
  justOne: false,
  match: {
    "workspaces.status": "active",
  },
});

// Pre-save hooks
userSchema.pre("save", async function (next) {
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

  if (this.isModified("notifications")) {
    // Update unread notification count
    this.unreadNotificationCount = this.notifications.filter(
      (n) => !n.read
    ).length;
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

// Notification methods
userSchema.methods.updateNotificationPreference = async function (
  channel,
  type,
  value
) {
  if (!this.notificationPreferences[channel]) {
    throw new Error(`Invalid notification channel: ${channel}`);
  }

  if (this.notificationPreferences[channel][type] === undefined) {
    throw new Error(
      `Invalid notification type: ${type} for channel ${channel}`
    );
  }

  this.notificationPreferences[channel][type] = value;
  await this.save();
  return this.notificationPreferences;
};
userSchema.methods.addNotification = function (notification) {
  const defaultNotification = {
    read: false,
    createdAt: new Date(),
    priority: "medium",
  };

  const newNotification = {
    ...defaultNotification,
    ...notification,
  };

  this.notifications.unshift(newNotification); // Add to beginning of array
  this.unreadNotificationCount += 1;

  // Keep only the most recent 500 notifications
  if (this.notifications.length > 500) {
    this.notifications.pop();
  }

  return newNotification;
};

userSchema.methods.markNotificationsAsRead = function (notificationIds = []) {
  let markedCount = 0;

  this.notifications = this.notifications.map((notification) => {
    if (
      (!notificationIds.length || notificationIds.includes(notification._id)) &&
      !notification.read
    ) {
      markedCount += 1;
      return { ...notification.toObject(), read: true };
    }
    return notification;
  });

  this.unreadNotificationCount = Math.max(
    0,
    this.unreadNotificationCount - markedCount
  );

  return markedCount;
};

userSchema.methods.clearExpiredNotifications = function () {
  const now = new Date();
  const beforeCount = this.notifications.length;

  this.notifications = this.notifications.filter(
    (notification) => !notification.expiresAt || notification.expiresAt > now
  );

  // Recalculate unread count
  this.unreadNotificationCount = this.notifications.filter(
    (n) => !n.read
  ).length;

  return beforeCount - this.notifications.length;
};

// Password and authentication methods
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  return (
    this.passwordChangedAt &&
    parseInt(this.passwordChangedAt.getTime() / 1000, 10) > JWTTimestamp
  );
};

userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Workspace methods
userSchema.methods.hasWorkspaceAccess = function (workspaceId) {
  return this.workspaces.some(
    (ws) => ws.workspace.equals(workspaceId) && ws.status === "active"
  );
};

userSchema.methods.getWorkspaceRole = function (workspaceId) {
  const workspace = this.workspaces.find(
    (ws) => ws.workspace.equals(workspaceId) && ws.status === "active"
  );
  return workspace?.role;
};

userSchema.methods.addToWorkspace = async function (
  workspaceId,
  role = "member",
  invitedBy = null,
  session = null
) {
  const options = session ? { session } : {};

  const existingIndex = this.workspaces.findIndex(
    (ws) => ws.workspace && ws.workspace.toString() === workspaceId.toString()
  );

  if (existingIndex >= 0) {
    this.workspaces[existingIndex].role = role;
    this.workspaces[existingIndex].status = "active";
    this.workspaces[existingIndex].invitedBy = invitedBy;
    this.workspaces[existingIndex].lastActive = new Date();
  } else {
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

  await this.save(options);
  return this;
};

userSchema.methods.removeFromWorkspace = async function (workspaceId) {
  const index = this.workspaces.findIndex((ws) =>
    ws.workspace.equals(workspaceId)
  );

  if (index !== -1) {
    this.workspaces.splice(index, 1);

    if (this.currentWorkspace && this.currentWorkspace.equals(workspaceId)) {
      this.currentWorkspace = null;
      const active = this.workspaces.find((ws) => ws.status === "active");
      if (active) {
        this.currentWorkspace = active.workspace;
      }
    }

    await this.save();
  }

  return this;
};

userSchema.methods.updateLastActiveInWorkspace = async function (workspaceId) {
  const workspace = this.workspaces.find((ws) =>
    ws.workspace.equals(workspaceId)
  );
  if (workspace) {
    workspace.lastActive = new Date();
    await this.save();
  }
  return this;
};

// Login tracking methods
userSchema.methods.trackLogin = async function (req) {
  try {
    const headers = req?.headers || {};

    const ip =
      req?.ip ||
      (Array.isArray(headers["x-forwarded-for"])
        ? headers["x-forwarded-for"][0]
        : (typeof headers["x-forwarded-for"] === "string"
            ? headers["x-forwarded-for"].split(",").shift().trim()
            : null) ||
          req?.socket?.remoteAddress ||
          req?.connection?.remoteAddress ||
          "unknown");

    const userAgent = headers["user-agent"] || "unknown";

    this.lastLogin = new Date();
    this.loginHistory.unshift({
      timestamp: new Date(),
      ip,
      userAgent,
      device: this.getDeviceType(userAgent),
      location: await this.constructor.getIpLocation(ip),
    });

    if (this.loginHistory.length > 20) this.loginHistory.pop();
    await this.save();
  } catch (error) {
    console.error("Error tracking login:", error);
  }
};

userSchema.methods.getDeviceType = function (userAgent) {
  if (/mobile/i.test(userAgent)) return "Mobile";
  if (/tablet/i.test(userAgent)) return "Tablet";
  if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS";
  if (/Android/.test(userAgent)) return "Android";
  if (/Windows/.test(userAgent)) return "Windows";
  if (/Macintosh/.test(userAgent)) return "Mac";
  if (/Linux/.test(userAgent)) return "Linux";
  return "Unknown";
};

userSchema.methods.handleFailedLogin = async function () {
  this.failedLoginAttempts += 1;
  if (this.failedLoginAttempts >= 5) {
    this.accountLockedUntil = Date.now() + 30 * 60 * 1000;

    // Add security notification
    this.addNotification({
      type: NOTIFICATION_TYPES.SYSTEM.SECURITY,
      title: "Account Locked",
      message:
        "Your account has been temporarily locked due to multiple failed login attempts.",
      priority: "high",
      source: { type: "system" },
    });
  }
  await this.save();
};

userSchema.methods.resetLoginAttempts = async function () {
  this.failedLoginAttempts = 0;
  this.accountLockedUntil = undefined;
  await this.save();
};

// Static methods
userSchema.statics = {
  NOTIFICATION_TYPES,

  isEmailTaken: async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  },

  getIpLocation: async function (ip) {
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
        coordinates:
          data.longitude && data.latitude
            ? [parseFloat(data.longitude), parseFloat(data.latitude)]
            : undefined,
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

  sendWorkspaceNotification: async function (userId, workspaceId, type, data) {
    const notificationConfigs = {
      [NOTIFICATION_TYPES.WORKSPACE.INVITATION]: {
        title: "Workspace Invitation",
        message: `You've been invited to join a workspace as ${data.role}`,
      },
      [NOTIFICATION_TYPES.WORKSPACE.INVITATION_ACCEPTED]: {
        title: "Invitation Accepted",
        message: `${data.userName} has accepted your workspace invitation`,
      },
      [NOTIFICATION_TYPES.WORKSPACE.INVITATION_EXPIRED]: {
        title: "Invitation Expired",
        message: "Your workspace invitation has expired",
      },
      [NOTIFICATION_TYPES.WORKSPACE.ROLE_CHANGED]: {
        title: "Role Updated",
        message: `Your role has been changed to ${data.newRole}`,
      },
      [NOTIFICATION_TYPES.WORKSPACE.REMOVED]: {
        title: "Removed from Workspace",
        message: "You have been removed from a workspace",
      },
    };

    const config = notificationConfigs[type];
    if (!config) throw new Error("Invalid notification type");

    return this.findByIdAndUpdate(
      userId,
      {
        $push: {
          notifications: {
            type,
            title: config.title,
            message: config.message,
            data,
            source: {
              type: "workspace",
              id: workspaceId,
            },
            action:
              type === NOTIFICATION_TYPES.WORKSPACE.INVITATION
                ? {
                    url: `/workspaces/invitations/${data.invitationId}`,
                    label: "View Invitation",
                  }
                : undefined,
          },
        },
        $inc: { unreadNotificationCount: 1 },
      },
      { new: true }
    );
  },

  sendSubscriptionNotification: async function (userId, type, data) {
    const notificationConfigs = {
      [NOTIFICATION_TYPES.SUBSCRIPTION.TRIAL_ENDING]: {
        title: "Trial Ending Soon",
        message: `Your trial ends in ${data.daysRemaining} days`,
      },
      [NOTIFICATION_TYPES.SUBSCRIPTION.PAYMENT_FAILED]: {
        title: "Payment Failed",
        message:
          "We couldn't process your payment. Please update your payment method.",
        priority: "high",
      },
      [NOTIFICATION_TYPES.SUBSCRIPTION.ACTIVATED]: {
        title: "Subscription Activated",
        message: "Your subscription has been successfully activated",
      },
      [NOTIFICATION_TYPES.SUBSCRIPTION.RENEWED]: {
        title: "Subscription Renewed",
        message: "Your subscription has been renewed",
      },
      [NOTIFICATION_TYPES.SUBSCRIPTION.CANCELLED]: {
        title: "Subscription Cancelled",
        message: "Your subscription has been cancelled",
      },
    };

    const config = notificationConfigs[type];
    if (!config) throw new Error("Invalid notification type");

    return this.findByIdAndUpdate(
      userId,
      {
        $push: {
          notifications: {
            type,
            title: config.title,
            message: config.message,
            data,
            priority: config.priority || "medium",
            source: {
              type: "subscription",
            },
            action:
              type === NOTIFICATION_TYPES.SUBSCRIPTION.PAYMENT_FAILED
                ? {
                    url: "/billing/payment-methods",
                    label: "Update Payment Method",
                  }
                : undefined,
          },
        },
        $inc: { unreadNotificationCount: 1 },
      },
      { new: true }
    );
  },

  sendSystemNotification: async function (userIds, type, data) {
    const notificationConfigs = {
      [NOTIFICATION_TYPES.SYSTEM.MAINTENANCE]: {
        title: "Scheduled Maintenance",
        message:
          data.message || "We'll be performing scheduled maintenance soon",
      },
      [NOTIFICATION_TYPES.SYSTEM.UPDATE]: {
        title: "System Update",
        message: data.message || "A new update is available",
      },
      [NOTIFICATION_TYPES.SYSTEM.SECURITY]: {
        title: "Security Alert",
        message: data.message || "Important security notice",
        priority: "high",
      },
    };

    const config = notificationConfigs[type];
    if (!config) throw new Error("Invalid notification type");

    const bulkOps = Array.isArray(userIds)
      ? userIds.map((userId) => ({
          updateOne: {
            filter: { _id: userId },
            update: {
              $push: {
                notifications: {
                  type,
                  title: config.title,
                  message: config.message,
                  data,
                  priority: config.priority || "medium",
                  source: {
                    type: "system",
                  },
                  action: data.actionUrl
                    ? {
                        url: data.actionUrl,
                        label: data.actionLabel || "Learn More",
                      }
                    : undefined,
                },
              },
              $inc: { unreadNotificationCount: 1 },
            },
          },
        }))
      : [
          {
            updateMany: {
              filter: {},
              update: {
                $push: {
                  notifications: {
                    type,
                    title: config.title,
                    message: config.message,
                    data,
                    priority: config.priority || "medium",
                    source: {
                      type: "system",
                    },
                    action: data.actionUrl
                      ? {
                          url: data.actionUrl,
                          label: data.actionLabel || "Learn More",
                        }
                      : undefined,
                  },
                },
                $inc: { unreadNotificationCount: 1 },
              },
            },
          },
        ];

    return this.bulkWrite(bulkOps);
  },
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
