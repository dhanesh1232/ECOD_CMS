import mongoose, { Schema } from "mongoose";

const chatbotSchema = new Schema(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true, trim: true },
    description: String,
    // AI Configuration
    aiConfig: {
      provider: {
        type: String,
        enum: ["openai", "anthropic", "google", "custom"],
      },
      model: String,
      temperature: { type: Number, min: 0, max: 2, default: 0.7 },
      maxTokens: { type: Number, default: 500 },
      contextWindow: { type: Number, default: 8 }, // in K tokens
      functions: [
        {
          name: String,
          description: String,
          parameters: Schema.Types.Mixed,
        },
      ],
    },
    // Knowledge Base
    knowledgeBase: {
      sources: [
        {
          type: {
            type: String,
            enum: ["website", "document", "api", "database"],
          },
          url: String,
          refreshInterval: Number, // hours
          lastSynced: Date,
        },
      ],
      chunkSize: { type: Number, default: 1000 }, // characters
      chunkOverlap: { type: Number, default: 200 }, // characters
    },
    // Conversation Flow
    flows: [
      {
        name: String,
        trigger: {
          type: {
            type: String,
            enum: ["intent", "keyword", "event", "always"],
          },
          value: String,
        },
        steps: [Schema.Types.Mixed], // Array of flow steps
        fallback: Schema.Types.Mixed,
      },
    ],
    // Multi-platform
    channels: [
      {
        type: {
          type: String,
          enum: ["web", "whatsapp", "facebook", "instagram", "telegram", "sms"],
        },
        config: Schema.Types.Mixed,
        isActive: { type: Boolean, default: true },
      },
    ],
    // Analytics
    analytics: {
      trackEvents: { type: Boolean, default: true },
      trackConversations: { type: Boolean, default: true },
      trackSatisfaction: { type: Boolean, default: false },
    },
    // Versioning
    version: { type: String, default: "1.0.0" },
    changelog: [
      {
        version: String,
        changes: [String],
        timestamp: { type: Date, default: Date.now },
      },
    ],
    // Status
    status: {
      type: String,
      enum: ["draft", "testing", "published", "archived"],
      default: "draft",
    },
    // Audit
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Indexes
chatbotSchema.index({ organizationId: 1, status: 1 });
chatbotSchema.index({ "channels.type": 1, "channels.isActive": 1 });

// Virtual for active conversations
chatbotSchema.virtual("activeConversations", {
  ref: "Conversation",
  localField: "_id",
  foreignField: "chatbotId",
  match: { status: "active" },
  count: true,
});

export const Chatbot =
  mongoose.models.Chatbot || mongoose.model("Chatbot", chatbotSchema);
