import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    name: { type: String, required: true },
    url: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^https?:\/\/.+\..+/.test(v),
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    events: [
      {
        type: {
          type: String,
          enum: [
            "conversation_created",
            "conversation_updated",
            "message_created",
            "message_updated",
            "contact_created",
            "contact_updated",
            "notification_created",
          ],
          required: true,
        },
        filters: Schema.Types.Mixed,
      },
    ],
    // Security
    security: {
      secret: { type: String, select: false },
      verifySSL: { type: Boolean, default: true },
      customHeaders: [
        {
          name: String,
          value: String,
        },
      ],
    },
    // Configuration
    config: {
      retryPolicy: {
        maxAttempts: { type: Number, default: 3 },
        interval: { type: Number, default: 60 }, // seconds
      },
      payloadFormat: {
        type: String,
        enum: ["default", "slack", "microsoft_teams", "discord", "custom"],
        default: "default",
      },
      customTemplate: String,
    },
    // Status
    status: {
      type: String,
      enum: ["active", "paused", "failed", "disabled"],
      default: "active",
    },
    // Statistics
    stats: {
      totalAttempts: { type: Number, default: 0 },
      successCount: { type: Number, default: 0 },
      failureCount: { type: Number, default: 0 },
      lastAttempt: Date,
      lastSuccess: Date,
      lastFailure: Date,
    },
    // Metadata
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// Indexes
webhookSchema.index({ organizationId: 1, status: 1 });
webhookSchema.index({ "events.type": 1 });

// Plugin for webhook delivery tracking
webhookSchema.plugin(require("mongoose-webhook-deliveries"), {
  collection: "webhook_deliveries",
  maxAttempts: 3,
});

export const Webhooks =
  mongoose.models.Webhook || mongoose.model("Webhook", webhookSchema);
