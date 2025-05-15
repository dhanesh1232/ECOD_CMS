import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    chatbotId: { type: Schema.Types.ObjectId, ref: "Chatbot", required: true },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    channel: {
      type: String,
      enum: ["web", "whatsapp", "facebook", "instagram", "telegram", "sms"],
      required: true,
    },
    // Participants
    participants: [
      {
        type: { type: String, enum: ["user", "contact", "bot", "system"] },
        ref: { type: String, enum: ["User", "Contact"] },
        id: Schema.Types.ObjectId,
        joinedAt: { type: Date, default: Date.now },
        leftAt: Date,
        isActive: Boolean,
      },
    ],
    // Context
    context: {
      currentFlow: String,
      currentStep: String,
      variables: Schema.Types.Mixed,
      intents: [
        {
          name: String,
          confidence: Number,
          detectedAt: Date,
        },
      ],
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
        lastCalculated: Date,
      },
    },
    // Status
    status: {
      type: String,
      enum: ["new", "open", "pending", "resolved", "closed", "spam"],
      default: "new",
    },
    priority: { type: Number, min: 1, max: 5, default: 3 },
    // Assignment
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    assignmentHistory: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        assignedAt: { type: Date, default: Date.now },
        unassignedAt: Date,
        reason: String,
      },
    ],
    // SLA
    sla: {
      responseTime: Number, // minutes
      resolutionTime: Number, // hours
      firstResponseAt: Date,
      resolvedAt: Date,
      breaches: [
        {
          type: { type: String, enum: ["response", "resolution"] },
          breachedAt: Date,
          duration: Number, // minutes overdue
        },
      ],
    },
    // Metadata
    metadata: {
      ip: String,
      location: Schema.Types.Mixed,
      device: String,
      referrer: String,
      utm: {
        source: String,
        medium: String,
        campaign: String,
        term: String,
        content: String,
      },
    },
    // Tags and categorization
    tags: [String],
    categories: [String],
    // Satisfaction
    satisfaction: {
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      surveyedAt: Date,
    },
    // Threading
    isThread: { type: Boolean, default: false },
    parentThread: { type: Schema.Types.ObjectId, ref: "Conversation" },
    // Timestamps
    firstMessageAt: { type: Date, default: Date.now },
    lastMessageAt: Date,
    resolvedAt: Date,
    closedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Indexes
conversationSchema.index({ chatbotId: 1, status: 1 });
conversationSchema.index({ "participants.id": 1 });
conversationSchema.index({ lastMessageAt: -1 });
conversationSchema.index({ "context.intents.name": 1 });
conversationSchema.index({
  "metadata.utm.source": 1,
  "metadata.utm.campaign": 1,
});

// Virtual for messages count
conversationSchema.virtual("messagesCount", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversationId",
  count: true,
});

// Pre-save hook for status changes
conversationSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "resolved" && !this.resolvedAt) {
      this.resolvedAt = new Date();
    } else if (this.status === "closed" && !this.closedAt) {
      this.closedAt = new Date();
    }
  }
  next();
});

export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);
