import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function () {
      return this.source === "modal";
    },
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  agreed: {
    type: Boolean,
    default: false,
    required: function () {
      return this.source === "modal";
    },
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["subscribed", "unsubscribed", "bounced"],
    default: "subscribed",
  },
  isVerified: {
    type: Boolean,
    default: false, // set to true only after double opt-in (if you add that flow)
  },
  source: {
    type: String,
    enum: ["modal", "landing-page", "footer", "manual"],
    default: "modal",
  },
  tags: {
    type: [String],
    default: [],
  },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  referrer: String,
  location: String,
  ipAddress: String,
  userAgent: String,
  lastSeenAt: Date,
  openCount: {
    type: Number,
    default: 0,
  },
  metadata: mongoose.Schema.Types.Mixed, // screen size, browser, etc.
});

// Index for fast lookup
newsLetterSchema.index({ email: 1, subscribedAt: -1 });

export const Newsletter =
  mongoose.models.Newsletter || mongoose.model("Newsletter", newsLetterSchema);
