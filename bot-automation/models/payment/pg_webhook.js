import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema(
  {
    gateway: {
      type: String,
      enum: ["stripe", "paypal", "razorpay"],
      required: true,
    },
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    processingError: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Indexes
webhookEventSchema.index({ gateway: 1 });
webhookEventSchema.index({ eventType: 1 });
webhookEventSchema.index({ processed: 1 });
webhookEventSchema.index({ createdAt: 1 });

export const WebhookEvent =
  mongoose.models.WebhookEvent ||
  mongoose.model("WebhookEvent", webhookEventSchema);
