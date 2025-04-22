import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    serviceSlug: { type: String, required: true },
    discount: { type: String, required: true },
    couponCode: { type: String, required: true },
    couponPrefix: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    validityDays: { type: Number, required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
    claimedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Auto-expire on read middleware
CouponSchema.pre(/^find/, function (next) {
  this.where({ expiresAt: { $gt: new Date() } })
    .updateMany(
      { expiresAt: { $lte: new Date() }, status: "active" },
      { $set: { status: "expired" } }
    )
    .exec(); // Fire-and-forget expiry update
  next();
});

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
