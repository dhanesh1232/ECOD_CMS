// models/Workspace.js
import mongoose from "mongoose";
import validator from "validator";
import slugify from "slugify";
import { PLANS, PricingUtils } from "@/config/pricing.config";
import { Subscription } from "../payment/subscription";
import { SLUG_REGEX } from "@/lib/validator";

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
          return SLUG_REGEX.test(v);
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
    gatewayCustomerId: String,
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    billingDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BillingDetails",
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
workspaceSchema.index(
  { "members.user": 1 },
  { unique: true, partialFilterExpression: { "members.status": "active" } }
);
workspaceSchema.index({ "metadata.deletedAt": 1 });
workspaceSchema.index({ "contactInfo.supportEmail": 1 });
workspaceSchema.index({ subscription: 1 });
workspaceSchema.index({ gatewayCustomerId: 1 });

// Hooks
workspaceSchema.pre("save", function (next) {
  if (this.isModified("subscription")) {
    if (!mongoose.Types.ObjectId.isValid(this.subscription)) {
      throw new Error("Invalid subscription reference");
    }
  }
  next();
});
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
workspaceSchema.virtual("planStatus").get(function () {
  if (!this.subscription) return "inactive";
  return this.subscription.status;
});
// Methods
workspaceSchema.methods = {
  hasFeature(featurePath) {
    if (!this.subscription) return false;
    // featurePath could be something like 'chatbotAutomation.visualFlowBuilder'
    const parts = featurePath.split(".");
    let value = this.subscription.features;

    for (const part of parts) {
      value = value[part];
      if (value === undefined) return false;
    }

    return !!value;
  },
  async checkLimit(resource) {
    await this.populate("subscription");
    return {
      used: this.subscription.usage[resource] || 0,
      limit: this.subscription.limits[resource] || 0,
      remaining: Math.max(
        (this.subscription.limits[resource] || 0) -
          (this.subscription.usage[resource] || 0),
        0
      ),
    };
  },
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

  checkPermission: async function (userId, resource, action) {
    const member = this.members.find((m) => m.user.equals(userId));
    if (!member) return false;

    if (member.role === "owner") return true;

    // Check granular permissions
    return member.permissions?.some(
      (perm) =>
        (perm.resource === resource || perm.resource === "all") &&
        perm.actions.includes(action)
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
      metadata: {
        createdBy: ownerId,
      },
    });

    await workspace.save(options);

    const subscription = await Subscription.createSubscription(
      workspace._id,
      "free",
      "lifetime",
      session,
      ownerId
    );
    workspace.subscription = subscription._id;
    await workspace.save(options);

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
    const workspace = await this.findById(workspaceId).populate("Subscription");
    if (!workspace.subscription) throw new Error("No subscription found");
    return {
      used: workspace.subscription.usage[resource] || 0,
      limit: workspace.subscription.limits[resource] || 0,
      remaining: Math.max(
        (workspace.subscription.limits[resource] || 0) -
          (workspace.subscription.usage[resource] || 0),
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

    return { subscription };
  },
  // Soft delete workspace
  async softDelete(workspaceId) {
    return this.findByIdAndUpdate(
      workspaceId,
      { "metadata.deletedAt": new Date() },
      { new: true }
    );
  },
  // Restore workspace
  async restore(workspaceId) {
    return this.findByIdAndUpdate(
      workspaceId,
      { $unset: { "metadata.deletedAt": 1 } },
      { new: true }
    );
  },
};

export const Workspace =
  mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);
