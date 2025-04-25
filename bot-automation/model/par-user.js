import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      immutable: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (v) {
          return !v || validator.isMobilePhone(v, "any", { strictMode: false });
        },
        message: "Please provide a valid phone number",
      },
    },
    requiresProfileCompletion: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "facebook"],
      default: "credentials",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    lastLogin: {
      type: Date,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    lastVerificationAttempt: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove sensitive information when converting to JSON
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.verificationAttempts;
        delete ret.lastVerificationAttempt;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove sensitive information when converting to object
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.verificationAttempts;
        delete ret.lastVerificationAttempt;
        return ret;
      },
    },
  }
);

// Enhanced password hashing with stronger salt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 14 (higher than default for better security)
    this.password = await bcrypt.hash(this.password, 14);
    next();
  } catch (err) {
    next(err);
  }
});

// Update passwordChangedAt when password is modified
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Enhanced method to check if password was changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Enhanced password reset token generation
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Static method to check if email is taken
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// Static method to check if phone is taken
userSchema.statics.isPhoneTaken = async function (phone, excludeUserId) {
  if (!phone) return false;
  const user = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.index({ email: 1, phone: 1 });
userSchema.index({ createdAt: -1 });

// Add any compound indexes that aren't covered by the unique fields
// For example, if you need to query by both role and isVerified frequently:
userSchema.index({ role: 1, isVerified: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
