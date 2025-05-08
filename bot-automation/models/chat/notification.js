import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // Content
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "new_conversation",
        "new_message",
        "mention",
        "assignment",
        "sla_warning",
        "sla_breach",
        "workflow_triggered",
        "system_alert",
      ],
      required: true,
    },
    // Related entities
    relatedEntities: {
      conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
      messageId: { type: Schema.Types.ObjectId, ref: "Message" },
      chatbotId: { type: Schema.Types.ObjectId, ref: "Chatbot" },
      inboxId: { type: Schema.Types.ObjectId, ref: "Inbox" },
    },
    // Delivery methods
    deliveryMethods: [
      {
        method: {
          type: String,
          enum: ["in_app", "email", "push", "sms", "webhook"],
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "sent", "delivered", "failed"],
          default: "pending",
        },
        sentAt: Date,
        deliveredAt: Date,
        error: String,
      },
    ],
    // Actions
    actions: [
      {
        text: { type: String, required: true },
        type: {
          type: String,
          enum: ["open_conversation", "reply", "dismiss", "snooze", "complete"],
          required: true,
        },
        payload: Schema.Types.Mixed,
      },
    ],
    // Priority
    priority: {
      type: Number,
      min: 1,
      max: 3,
      default: 2,
    },
    // User interaction
    interaction: {
      isRead: { type: Boolean, default: false },
      readAt: Date,
      clickedAt: Date,
      dismissedAt: Date,
      actionTaken: {
        action: String,
        takenAt: Date,
        payload: Schema.Types.Mixed,
      },
    },
    // Expiry
    expiresAt: Date,
    // Metadata
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Indexes
notificationSchema.index({ userId: 1, "interaction.isRead": 1 });
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // Auto-delete after 30 days
notificationSchema.index({ "relatedEntities.conversationId": 1 });
notificationSchema.index({
  "deliveryMethods.method": 1,
  "deliveryMethods.status": 1,
});

// Pre-save hook for default expiry
notificationSchema.pre("save", function (next) {
  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  }
  next();
});

export const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
