import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    domain: {
      type: String,
      validate: {
        validator: (v) => /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(v),
        message: (props) => `${props.value} is not a valid domain!`,
      },
    },
    logo: String,
    billing: {
      plan: {
        type: String,
        enum: ["starter", "professional", "enterprise"],
        default: "starter",
      },
      paymentMethod: Schema.Types.Mixed,
      billingEmail: String,
      nextBillingDate: Date,
      billingAddress: { type: String },
      billingHistory: [
        {
          date: Date,
          amount: Number,
          status: {
            type: String,
            enum: ["paid", "pending", "failed"],
            default: "pending",
          },
          invoiceId: String,
        },
      ],
    },
    settings: {
      autoJoinDomain: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 1440 }, // minutes
      dataRetention: { type: Number, default: 365 }, // days
    },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        role: String,
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    integrations: {
      googleWorkspace: Schema.Types.Mixed,
      microsoft365: Schema.Types.Mixed,
      slack: Schema.Types.Mixed,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Indexes
organizationSchema.index({ domain: 1 }, { unique: true, sparse: true });
organizationSchema.index({ "members.userId": 1 });

// Export the model
export const Organization =
  mongoose.models.Organization ||
  mongoose.model("Organization", organizationSchema);
