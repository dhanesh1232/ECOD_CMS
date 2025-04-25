import mongoose from "mongoose";
import validator from "validator";

const userTempSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, "any", { strictMode: false });
        },
        message: "Please provide a valid phone number",
      },
    },
    verificationCode: {
      type: String,
      required: true,
    },
    attemptsRemaining: {
      type: Number,
      default: 3,
      min: 0,
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 60 * 60 * 1000, // 1 hour from now
    },
  },
  { timestamps: true }
);

// Index for automatic expiration
userTempSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserTemp =
  mongoose.models.UserTemp || mongoose.model("UserTemp", userTempSchema);

export default UserTemp;
