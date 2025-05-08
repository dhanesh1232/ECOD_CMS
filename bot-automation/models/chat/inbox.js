import mongoose from "mongoose";

const inboxSchema = new mongoose.Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    // Associated chatbots
    chatbots: [{ type: Schema.Types.ObjectId, ref: "Chatbot" }],
    // Team members
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: {
          type: String,
          enum: ["admin", "agent", "viewer"],
          default: "agent",
        },
        joinedAt: { type: Date, default: Date.now },
        lastActiveAt: Date,
      },
    ],
    // Routing rules
    routingRules: [
      {
        name: String,
        conditions: [
          {
            field: String,
            operator: {
              type: String,
              enum: [
                "equals",
                "notEquals",
                "contains",
                "startsWith",
                "endsWith",
                "greaterThan",
                "lessThan",
                "in",
                "notIn",
              ],
            },
            value: Schema.Types.Mixed,
          },
        ],
        actions: [
          {
            type: {
              type: String,
              enum: [
                "assign",
                "tag",
                "setPriority",
                "sendMessage",
                "addToWorkflow",
                "changeStatus",
              ],
            },
            value: Schema.Types.Mixed,
            metadata: Schema.Types.Mixed,
          },
        ],
        isActive: { type: Boolean, default: true },
        priority: { type: Number, default: 1 },
      },
    ],
    // SLA configuration
    sla: {
      responseTime: { type: Number, default: 30 }, // minutes
      resolutionTime: { type: Number, default: 24 }, // hours
      businessHours: {
        days: [{ type: Number, min: 0, max: 6 }], // 0=Sunday
        startTime: String, // "09:00"
        endTime: String, // "17:00"
        timezone: String,
      },
      holidays: [Date],
      excludeWeekends: { type: Boolean, default: true },
    },
    // Canned responses
    cannedResponses: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        shortcut: String,
        category: String,
        tags: [String],
        variables: [String],
        usageCount: { type: Number, default: 0 },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        updatedAt: Date,
      },
    ],
    // Workflows
    workflows: [
      {
        name: { type: String, required: true },
        trigger: {
          type: {
            type: String,
            enum: [
              "conversationCreated",
              "messageReceived",
              "statusChanged",
              "timeBased",
            ],
          },
          conditions: Schema.Types.Mixed,
        },
        steps: [
          {
            type: {
              type: String,
              enum: ["sendMessage", "assign", "tag", "changeStatus", "webhook"],
            },
            config: Schema.Types.Mixed,
            delay: { type: Number, default: 0 }, // minutes
          },
        ],
        isActive: { type: Boolean, default: true },
        lastTriggered: Date,
      },
    ],
    // Notification settings
    notifications: {
      newConversation: {
        email: Boolean,
        inApp: Boolean,
        webhook: Boolean,
      },
      mention: {
        email: Boolean,
        inApp: Boolean,
        webhook: Boolean,
      },
      slaWarning: {
        threshold: Number, // percentage
        email: Boolean,
        inApp: Boolean,
        webhook: Boolean,
      },
    },
    // Analytics
    analytics: {
      trackAgentPerformance: { type: Boolean, default: true },
      trackResponseTimes: { type: Boolean, default: true },
      trackResolutionRates: { type: Boolean, default: true },
      trackSatisfaction: { type: Boolean, default: false },
    },
    // Status
    isActive: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
    // Metadata
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Indexes
inboxSchema.index({ organizationId: 1, isDefault: 1 });
inboxSchema.index({ "members.userId": 1 });
inboxSchema.index({
  "cannedResponses.title": "text",
  "cannedResponses.content": "text",
});

// Virtual for unassigned conversations
inboxSchema.virtual("unassignedConversations", {
  ref: "Conversation",
  localField: "_id",
  foreignField: "inboxId",
  match: {
    status: { $in: ["new", "open"] },
    assignedTo: { $exists: false },
  },
  count: true,
});
export const Inbox =
  mongoose.models.Inbox || mongoose.model("Inbox", inboxSchema);
