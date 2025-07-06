// models/Review.js
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: String,
      enum: ["free", "starter", "pro", "growth", "enterprise"],
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: {
      type: String,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    verifiedPurchase: {
      type: Boolean,
      default: false,
    },
    helpfulVotes: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        type: String, // URLs to images/screenshots
        maxlength: 5, // Limit to 5 attachments
      },
    ],
    metadata: {
      ipAddress: String,
      userAgent: String,
      deviceType: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "flagged"],
      default: "pending",
    },
    response: {
      adminId: mongoose.Schema.Types.ObjectId,
      content: String,
      createdAt: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add indexes for faster queries
ReviewSchema.index({ planId: 1, status: 1, rating: 1 });
ReviewSchema.index({ userId: 1, planId: 1 }, { unique: true }); // Prevent duplicate reviews

// Virtual populate for user data
ReviewSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
