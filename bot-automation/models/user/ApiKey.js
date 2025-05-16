// models/ApiKey.js
import mongoose from "mongoose";
import crypto from "crypto";

const apiKeySchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
      select: false,
    },
    prefix: {
      type: String,
      required: true,
      index: true,
    },
    lastUsed: Date,
    expiresAt: Date,
    scopes: [
      {
        type: String,
        enum: [
          "read",
          "write",
          "admin",
          "chat",
          "analytics",
          "billing",
          "settings",
        ],
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
      deletedAt: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.key;
        return ret;
      },
    },
  }
);

apiKeySchema.pre("save", function (next) {
  if (this.isNew) {
    // Generate a random API key
    this.key = crypto.randomBytes(32).toString("hex");
    this.prefix = this.key.substring(0, 8);
  }
  next();
});

apiKeySchema.methods.rotate = async function () {
  const newKey = crypto.randomBytes(32).toString("hex");
  this.key = newKey;
  this.prefix = newKey.substring(0, 8);
  await this.save();
  return this;
};

apiKeySchema.statics.rotateExpiredKeys = async function () {
  const now = new Date();
  const expiredKeys = await this.find({
    expiresAt: { $lte: now },
    isActive: true,
  });

  for (const key of expiredKeys) {
    await key.rotate();
    // Set new expiration based on workspace settings
    const workspace = await mongoose.model("Workspace").findById(key.workspace);
    if (workspace?.security?.apiKeyRotationDays) {
      const newExpiration = new Date();
      newExpiration.setDate(
        newExpiration.getDate() + workspace.security.apiKeyRotationDays
      );
      key.expiresAt = newExpiration;
      await key.save();
    }
  }

  return expiredKeys.length;
};

export const ApiKey =
  mongoose.models.ApiKey || mongoose.model("ApiKey", apiKeySchema);
