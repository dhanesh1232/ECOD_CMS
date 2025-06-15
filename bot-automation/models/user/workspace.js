// models/Workspace.js
import mongoose from "mongoose";
import validator from "validator";
import slugify from "slugify";
import { PLANS, PricingUtils } from "@/config/pricing.config";
import { Subscription } from "../payment/subscription";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Workspace name is required"],
      trim: true,
      maxlength: [100, "Workspace name cannot exceed 100 characters"],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      immutable: true,
      validate: {
        validator: function (v) {
          return /^(?:[a-z0-9]+-)?[a-z0-9]{4}-[a-z0-9]{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is invalid. Slug must be in format xxxx-xxxx or prefix-xxxx-xxxx, with no ambiguous characters (0/o/1/i/l).`,
      },
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    logo: {
      type: String,
      validate: {
        validator: (v) =>
          !v ||
          validator.isURL(v) ||
          /^data:image\/(png|jpeg|jpg|gif);base64,/.test(v),
        message: "Logo must be a valid URL or base64 encoded",
      },
    },
    domain: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: (v) => !v || validator.isFQDN(v),
        message: "Domain must be a valid fully qualified domain name",
      },
    },
    // New fields for general settings
    industry: {
      type: String,
      enum: [
        "technology",
        "healthcare",
        "finance",
        "education",
        "retail",
        "hospitality",
        "manufacturing",
        "other",
      ],
      default: "technology",
    },
    timezone: {
      type: String,
      default: "UTC",
      validate: {
        validator: function (v) {
          try {
            Intl.DateTimeFormat(undefined, { timeZone: v }).format();
            return true;
          } catch (e) {
            return false;
          }
        },
        message: (props) => `${props.value} is not a valid timezone`,
      },
    },
    contactInfo: {
      supportEmail: {
        type: String,
        validate: {
          validator: function (v) {
            return v === "" || validator.isEmail(v);
          },
          message: "Please provide a valid email",
        },
        default: "",
        trim: true,
        lowercase: true,
      },
      websiteURL: {
        type: String,
        validate: {
          validator: function (v) {
            return v === "" || validator.isURL(v);
          },
          message: "Please provide a valid URL",
        },
        trim: true,
        default: "",
      },
      phone: {
        type: String,
        validate: {
          validator: (v) => !v || validator.isMobilePhone(v),
          message: (props) => `${props.value} is not a valid phone number`,
        },
      },
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
    },
    branding: {
      primaryColor: {
        type: String,
        default: "#4f46e5",
        validate: {
          validator: (v) => /^#([0-9A-F]{3}){1,2}$/i.test(v),
          message: (props) => `${props.value} is not a valid hex color`,
        },
      },
      secondaryColor: {
        type: String,
        default: "#7c3aed",
        validate: {
          validator: (v) => /^#([0-9A-F]{3}){1,2}$/i.test(v),
          message: (props) => `${props.value} is not a valid hex color`,
        },
      },
      logoUrl: {
        type: String,
        validate: {
          validator: (v) =>
            !v ||
            validator.isURL(v) ||
            /^data:image\/(png|jpeg|jpg|gif);base64,/.test(v),
          message: "Image must be a valid URL or base64 encoded",
        },
      },
      faviconUrl: {
        type: String,
        validate: {
          validator: (v) =>
            !v ||
            validator.isURL(v) ||
            /^data:image\/(png|jpeg|jpg|gif);base64,/.test(v),
          message: "Image must be a valid URL or base64 encoded",
        },
      },
      customDomain: String,
    },
    security: {
      widgetDomainWhitelist: [
        {
          type: String,
          validate: [validator.isURL, "Please provide a valid URL"],
        },
      ],
      apiKeyRotationDays: {
        type: Number,
        default: 90,
        min: 1,
        max: 365,
      },
      lastApiKeyRotation: Date,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "admin", "member", "guest"],
          required: true,
        },
        invitedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        lastActive: Date,
        status: {
          type: String,
          enum: ["active", "suspended", "inactive", "invited"],
          default: "active",
        },
        permissions: [
          {
            resource: {
              type: String,
              enum: [
                "chatbot",
                "inbox",
                "analytics",
                "billing",
                "settings",
                "all",
              ],
            },
            actions: [String],
          },
        ],
      },
    ],
    subscription: {
      plan: {
        type: String,
        enum: Object.keys(PLANS),
        default: "free",
        required: true,
      },
      status: {
        type: String,
        enum: [
          "pending",
          "active",
          "trialing",
          "past_due",
          "paused",
          "canceled",
          "unpaid",
        ],
        default: "active",
      },
      billingCycle: {
        type: String,
        enum: ["monthly", "yearly", "lifetime"],
        default: "lifetime",
      },
      coupon: {
        appliedMethod: {
          type: String,
          enum: ["manual", "auto"],
          default: "manual",
        },
        code: String,
        discount: {
          type: {
            type: String,
            enum: ["trial", "percent", "fixed"],
          },
          amount: Number,
          value: {
            type: Number,
            min: 0,
          },
        },
      },
      currentPeriodStart: Date,
      currentPeriodEnd: Date,
      trialEnd: Date,
      paymentGateway: {
        type: String,
        enum: ["razorpay", "stripe", "paypal"],
        default: null,
      },
      gatewaySubscriptionId: String,
      // Enhanced billing details schema
      billingDetails: {
        contact: {
          name: String,
          email: {
            type: String,
            validate: [validator.isEmail, "Please provide a valid email"],
          },
          phone: String,
        },
        address: {
          line1: {
            type: String,
            validate: {
              validator: function (v) {
                const rootDoc = this.ownerDocument?.();
                return rootDoc?.plan === "free" || !!v;
              },
              message: "Address line1 is required for paid plans",
            },
          },
          line2: String,
          city: {
            type: String,
            validate: {
              validator: function (v) {
                const rootDoc = this.ownerDocument?.();
                return rootDoc?.plan === "free" || !!v;
              },
              message: "City is required for paid plans",
            },
          },
          state: {
            type: String,
            validate: {
              validator: function (v) {
                const rootDoc = this.ownerDocument?.();
                return rootDoc?.plan === "free" || !!v;
              },
              message: "State is required for paid plans",
            },
          },
          postalCode: {
            type: String,
            validate: {
              validator: function (v) {
                const rootDoc = this.ownerDocument?.();
                return rootDoc?.plan === "free" || !!v;
              },
              message: "Postal code is required for paid plans",
            },
          },
          country: {
            type: String,
            validate: {
              validator: function (v) {
                const rootDoc = this.ownerDocument?.();
                return rootDoc?.plan === "free" || !!v;
              },
              message: "Country is required for paid plans",
            },
          },
        },
        taxInfo: {
          taxId: String,
          vatId: String,
          companyName: String,
        },
        billingEmail: {
          type: String,
          validate: [validator.isEmail, "Please provide a valid email"],
        },
      },
    },
    usage: {
      chatbots: { type: Number, default: 0 },
      messages: { type: Number, default: 0 },
      members: { type: Number, default: 1 },
      storage: { type: Number, default: 0 },
    },
    limits: {
      chatbots: { type: Number, default: PLANS.free.limits.chatbots },
      messages: { type: Number, default: PLANS.free.limits.messages },
      members: { type: Number, default: PLANS.free.limits.members },
      storage: { type: Number, default: PLANS.free.limits.storage },
    },
    settings: {
      chat: {
        greetingMessage: {
          type: String,
          default: "Hello! How can I help you today?",
        },
        offlineMessage: {
          type: String,
          default:
            "We're currently offline. Please leave a message and we'll get back to you soon.",
        },
        businessHours: {
          enabled: { type: Boolean, default: false },
          timezone: { type: String, default: "UTC" },
          days: [
            {
              day: { type: Number, min: 0, max: 6 },
              open: String,
              close: String,
            },
          ],
        },
        historyRetention: {
          enabled: {
            type: Boolean,
            default: true,
          },
          durationDays: {
            type: Number,
            default: 30,
            min: 1,
            max: 365,
          },
        },
        // Other workspace-level chat settings
        defaultTone: {
          type: String,
          enum: ["casual", "formal", "technical", "friendly", "professional"],
          default: "casual",
        },
        autoCloseAfter: { type: Number, default: 24 },
      },
      realtime: {
        enabled: { type: Boolean, default: true },
        updateFrequency: { type: Number, default: 5000 }, // ms
      },
      localization: {
        enabled: { type: Boolean, default: false },
        defaultLanguage: { type: String, default: "en" },
      },
      retentionDays: { type: Number, default: 30, min: 1, max: 365 },
      notifications: {
        newConversation: {
          email: { type: Boolean, default: false },
          slack: { type: Boolean, default: false },
          webhook: { type: Boolean, default: false },
        },
        missedMessage: {
          email: { type: Boolean, default: false },
          slack: { type: Boolean, default: false },
          webhook: { type: Boolean, default: false },
        },
      },
      security: {
        sessionTimeout: { type: Number, default: 30 },
        passwordPolicy: {
          minLength: { type: Number, default: 8 },
          requireUppercase: { type: Boolean, default: false },
          requireLowercase: { type: Boolean, default: false },
          requireNumber: { type: Boolean, default: false },
          requireSpecialChar: { type: Boolean, default: false },
        },
        ipRestrictions: [
          {
            ip: String,
            description: String,
          },
        ],
      },
    },
    metadata: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
      deletedAt: Date,
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
    // Update the toJSON transform function in your workspace schema
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Safely handle members permissions deletion
        if (ret.members) {
          ret.members.forEach((member) => {
            if (member.permissions) {
              delete member.permissions;
            }
          });
        }
        return ret;
      },
    },
  }
);

// Indexes
workspaceSchema.index({ "subscription.plan": 1 });
workspaceSchema.index({ "subscription.status": 1 });
workspaceSchema.index(
  { "members.user": 1 },
  { unique: true, partialFilterExpression: { "members.status": "active" } }
);

// Hooks
workspaceSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  if (this.isModified("members")) {
    const owners = this.members.filter((m) => m.role === "owner");
    if (owners.length === 0) {
      throw new Error("Workspace must have at least one owner");
    }
  }

  if (this.isModified("subscription.plan")) {
    const plan = PLANS[this.subscription.plan];
    this.limits = plan.limits;
  }

  this.metadata.updatedAt = new Date();
  next();
});

// Virtuals
workspaceSchema.virtual("activeMembers", {
  ref: "User",
  localField: "members.user",
  foreignField: "_id",
  match: { "members.status": "active" },
});

workspaceSchema.virtual("isTrialActive").get(function () {
  return this.subscription.trialEnd && this.subscription.trialEnd > new Date();
});

workspaceSchema.virtual("isSubscriptionActive").get(function () {
  return (
    ["active", "trialing"].includes(this.subscription.status) &&
    (!this.subscription.currentPeriodEnd ||
      this.subscription.currentPeriodEnd > new Date())
  );
});

// Methods
workspaceSchema.methods = {
  async addMember(userId, role = "member", invitedBy = null) {
    // Check if user is already a member
    const existingMember = this.members.find((m) => m.user.equals(userId));

    if (existingMember) {
      existingMember.role = role;
      existingMember.status = "active";
    } else {
      this.members.push({
        user: userId,
        role,
        status: "active",
        invitedBy,
        joinedAt: new Date(),
      });
    }

    await this.save();
    return this;
  },
  canAddResource: function (resource, amount = 1) {
    const currentUsage = this.usage[resource] || 0;
    const { withinLimit } = PricingUtils.checkLimit(
      this.subscription.plan,
      resource,
      currentUsage + amount
    );
    return withinLimit;
  },

  hasChannelAccess: function (channel) {
    return PLANS[this.subscription.plan].features.channels.includes(channel);
  },

  async removeMember(userId) {
    // Prevent removing last owner
    const owners = this.members.filter((m) => m.role === "owner");
    const memberToRemove = this.members.find((m) => m.user.equals(userId));

    if (memberToRemove?.role === "owner" && owners.length <= 1) {
      throw new Error("Cannot remove last owner");
    }

    this.members = this.members.filter((m) => !m.user.equals(userId));
    await this.save();
    return this;
  },

  async updateMemberRole(userId, newRole) {
    const member = this.members.find((m) => m.user.equals(userId));
    if (!member) throw new Error("Member not found");

    // Handle owner role changes
    if (member.role === "owner" && newRole !== "owner") {
      const owners = this.members.filter((m) => m.role === "owner");
      if (owners.length <= 1) {
        throw new Error("Workspace must have at least one owner");
      }
    }

    member.role = newRole;
    await this.save();
    return this;
  },
  updateUsage: async function (resource, amount = 1) {
    this.usage[resource] = (this.usage[resource] || 0) + amount;
    await this.save();
    return this;
  },

  checkPermission: function (userId, resource, action) {
    const member = this.members.find((m) => m.user.equals(userId));
    if (!member) return false;
    if (member.role === "owner") return true;

    const permission = member.permissions?.find((p) => p.resource === resource);
    if (permission?.actions?.includes(action)) return true;

    const rolePermissions = this.defaultRoles[member.role]?.permissions;
    return rolePermissions?.some(
      (p) => p.resource === resource && p.actions.includes(action)
    );
  },
};

// Statics
workspaceSchema.statics = {
  async createWithOwner(ownerId, workspaceData, session = null) {
    console.log(ownerId, workspaceData);
    const options = session ? { session } : {};

    const workspace = new this({
      ...workspaceData,
      members: [
        {
          user: ownerId,
          role: "owner",
          status: "active",
          joinedAt: new Date(),
        },
      ],
      subscription: {
        plan: "free",
        status: "active",
        billingCycle: "lifetime",
        currentPeriodStart: new Date(),
        ...workspaceData.subscription,
      },
      metadata: {
        createdBy: ownerId,
      },
    });

    await workspace.save(options);

    await Subscription.createWithPricing(
      workspace._id,
      workspace.subscription.plan,
      workspace.subscription.billingCycle,
      session
    );

    return workspace;
  },

  inviteMember: async function (workspaceId, email, role, invitedBy) {
    const workspace = await this.findById(workspaceId);
    const User = mongoose.model("User");
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        workspaces: [
          {
            workspace: workspaceId,
            role,
            invitedBy,
            status: "invited",
          },
        ],
      });
    } else {
      user.workspaces.push({
        workspace: workspaceId,
        role,
        invitedBy,
        status: "invited",
      });
      await user.save();
    }

    workspace.members.push({
      user: user._id,
      role,
      invitedBy,
      status: "invited",
    });

    await workspace.save();
    return { workspace, user };
  },

  checkResourceUsage: async function (workspaceId, resource) {
    const workspace = await this.findById(workspaceId);
    return {
      used: workspace.usage[resource] || 0,
      limit: workspace.limits[resource] || 0,
      remaining: Math.max(
        (workspace.limits[resource] || 0) - (workspace.usage[resource] || 0),
        0
      ),
    };
  },

  getAvailablePlans: function () {
    return PricingUtils.getAllPlans();
  },

  changePlan: async function (workspaceId, newPlanId, billingCycle) {
    const workspace = await this.findById(workspaceId);

    let subscription = await Subscription.findOne({ workspace: workspaceId });

    if (!subscription) {
      subscription = new Subscription({
        workspace: workspaceId,
        user: workspace.metadata.createdBy,
        plan: newPlanId,
        billingCycle,
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(
          new Date().setMonth(
            new Date().getMonth() + (billingCycle === "yearly" ? 12 : 1)
          )
        ),
      });
    } else {
      subscription.plan = newPlanId;
      subscription.billingCycle = billingCycle;
    }

    const plan = PLANS[newPlanId];
    subscription.limits = plan.limits;
    subscription.features = plan.features;

    await subscription.save();

    workspace.subscription.plan = newPlanId;
    workspace.subscription.billingCycle = billingCycle;
    workspace.limits = plan.limits;

    await workspace.save();

    return { workspace, subscription };
  },
};

export const Workspace =
  mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);
