import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    threadId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    // Sender information
    sender: {
      type: { type: String, enum: ["user", "contact", "bot", "system"] },
      ref: { type: String, enum: ["User", "Contact"] },
      id: Schema.Types.ObjectId,
      name: String,
      avatar: String,
    },
    // Content
    content: {
      type: {
        type: String,
        enum: [
          "text",
          "image",
          "video",
          "audio",
          "file",
          "location",
          "template",
          "rich",
        ],
        default: "text",
      },
      text: String,
      richText: String,
      markdown: String,
      template: {
        name: String,
        language: String,
        components: Schema.Types.Mixed,
      },
      quickReplies: [
        {
          type: { type: String, enum: ["text", "url", "phone", "email"] },
          title: String,
          payload: String,
        },
      ],
      buttons: [
        {
          type: { type: String, enum: ["url", "postback", "phone", "email"] },
          title: String,
          payload: String,
        },
      ],
    },
    // Attachments
    attachments: [
      {
        type: {
          type: String,
          enum: ["image", "video", "audio", "file", "location"],
        },
        url: String,
        name: String,
        size: Number,
        mimeType: String,
        thumbnail: String,
        duration: Number, // for audio/video
        coordinates: {
          // for location
          lat: Number,
          lng: Number,
        },
      },
    ],
    // Status
    status: {
      type: String,
      enum: ["sending", "sent", "delivered", "read", "failed"],
      default: "sent",
    },
    // Delivery info
    delivery: {
      attempts: { type: Number, default: 0 },
      lastAttempt: Date,
      error: {
        code: String,
        message: String,
        details: Schema.Types.Mixed,
      },
    },
    // Context
    context: {
      intent: String,
      entities: [
        {
          type: String,
          value: Schema.Types.Mixed,
          confidence: Number,
        },
      ],
      sentiment: {
        score: { type: Number, min: -1, max: 1 },
        magnitude: Number,
      },
    },
    // Metadata
    metadata: {
      isNote: { type: Boolean, default: false },
      isInternal: { type: Boolean, default: false },
      isAutoreply: { type: Boolean, default: false },
      source: String, // 'api', 'webhook', 'manual', etc.
      originalMessage: Schema.Types.Mixed, // For forwarded/replied messages
    },
    // Reactions
    reactions: [
      {
        emoji: String,
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        reactedAt: { type: Date, default: Date.now },
      },
    ],
    // Editing history
    edits: [
      {
        content: Schema.Types.Mixed,
        editedAt: { type: Date, default: Date.now },
        editedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    // Visibility
    visibility: {
      type: String,
      enum: ["all", "agents", "specific_agents", "hidden"],
      default: "all",
    },
    visibleTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // Timestamps
    sentAt: { type: Date, default: Date.now },
    deliveredAt: Date,
    readAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Indexes
messageSchema.index({ conversationId: 1, sentAt: 1 });
messageSchema.index({ "sender.id": 1 });
messageSchema.index({ "content.text": "text" });
messageSchema.index({ "content.type": 1 });
messageSchema.index({ "metadata.isNote": 1 });

// Virtual for reply count
messageSchema.virtual("replies", {
  ref: "Message",
  localField: "_id",
  foreignField: "metadata.originalMessage.id",
  count: true,
});

// Plugin for message versioning
messageSchema.plugin(require("mongoose-version"), {
  collection: "message_versions",
  strategy: "array",
  maxVersions: 10,
  ignorePaths: ["status", "delivery", "reactions", "edits"],
});
export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
