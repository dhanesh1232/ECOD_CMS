import mongoose from "mongoose";

const forgotSchema = new mongoose.Schema({
  email: { type: String, required: true },
  verificationCode: { type: String, required: true },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 30 * 30 * 1000,
  },
});
forgotSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ForgotTemp =
  mongoose.models.ForgotTemp || mongoose.model("ForgotTemp", forgotSchema);

export default ForgotTemp;
