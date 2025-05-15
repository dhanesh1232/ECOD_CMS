import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    // Identity
    name: String,
    email: {
      type: String,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => /^\+?[\d\s\-\(\)]{7,}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    // Channel-specific IDs
    channelIdentifiers: [
      {
        channel: {
          type: String,
          enum: ["whatsapp", "facebook", "instagram", "telegram", "sms"],
        },
        id: String,
      },
    ],
    // Demographics
    location: {
      country: String,
      region: String,
      city: String,
      timezone: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    language: String,
    // Custom fields
    customFields: Schema.Types.Mixed,
    // Tags and segments
    tags: [String],
    segments: [String],
    // Social profiles
    socialProfiles: [
      {
        platform: String,
        url: String,
        username: String,
      },
    ],
    // Conversation history
    conversationHistory: [
      {
        conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
        startedAt: Date,
        lastMessageAt: Date,
        status: String,
        chatbotId: { type: Schema.Types.ObjectId, ref: "Chatbot" },
      },
    ],
    // Preferences
    preferences: {
      subscribed: { type: Boolean, default: true },
      preferredChannel: String,
      doNotDisturb: {
        enabled: Boolean,
        hours: {
          start: String,
          end: String,
        },
      },
    },
    // Metadata
    source: String,
    importedAt: Date,
    lastSeenAt: Date,
    // GDPR compliance
    gdpr: {
      consentGiven: Boolean,
      consentDate: Date,
      dataProcessingAllowed: Boolean,
      rightToBeForgotten: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Indexes
contactSchema.index(
  { organizationId: 1, email: 1 },
  { unique: true, sparse: true }
);
contactSchema.index({
  "channelIdentifiers.channel": 1,
  "channelIdentifiers.id": 1,
});
contactSchema.index({ tags: 1 });
contactSchema.index({ lastSeenAt: -1 });

// Virtual for active conversations
contactSchema.virtual("activeConversations", {
  ref: "Conversation",
  localField: "_id",
  foreignField: "participants.id",
  match: { status: { $in: ["new", "open", "pending"] } },
  count: true,
});

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
