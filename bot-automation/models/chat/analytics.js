import mongoose, { Schema } from "mongoose";
const analyticsSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "conversation_volume",
        "response_time",
        "resolution_time",
        "agent_performance",
        "satisfaction",
        "channel_breakdown",
        "tag_analysis",
      ],
      required: true,
    },
    // Time period
    period: {
      type: {
        type: String,
        enum: ["hourly", "daily", "weekly", "monthly"],
        required: true,
      },
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    // Dimensions
    dimensions: {
      chatbotId: { type: Schema.Types.ObjectId, ref: "Chatbot" },
      inboxId: { type: Schema.Types.ObjectId, ref: "Inbox" },
      agentId: { type: Schema.Types.ObjectId, ref: "User" },
      channel: String,
      tag: String,
    },
    // Metrics
    metrics: {
      count: Number,
      avg: Number,
      min: Number,
      max: Number,
      median: Number,
      p95: Number,
      sum: Number,
    },
    // Breakdown
    breakdown: [
      {
        dimension: String,
        value: Schema.Types.Mixed,
        metrics: {
          count: Number,
          avg: Number,
          min: Number,
          max: Number,
        },
      },
    ],
    // Comparison
    comparison: {
      previousPeriod: {
        start: Date,
        end: Date,
        metrics: {
          count: Number,
          avg: Number,
          min: Number,
          max: Number,
        },
      },
      percentageChange: Number,
    },
    // Generated at
    generatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Indexes
analyticsSchema.index({
  organizationId: 1,
  type: 1,
  "period.start": 1,
  "period.end": 1,
});
analyticsSchema.index({ "dimensions.chatbotId": 1, "period.start": 1 });
analyticsSchema.index({ "dimensions.agentId": 1, "period.start": 1 });

export const Analytics =
  mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema);
