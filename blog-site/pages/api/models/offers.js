import mongoose from "mongoose";

const offerSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  offer: {
    title: String,
    discount: Number,
    couponPrefix: String,
    validityDays: Number,
  },
  couponCode: {
    type: String,
    required: true,
  },
  recaptchaToken: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

// Add indexes for better query performance
offerSubmissionSchema.index({ email: 1, submittedAt: -1 });
offerSubmissionSchema.index({ couponCode: 1 }, { unique: true });

const OfferSubmission =
  mongoose.models.OfferSubmission ||
  mongoose.model("OfferSubmission", offerSubmissionSchema);

export default OfferSubmission;
