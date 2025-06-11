import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";

export async function GET() {
  try {
    await dbConnect();

    // Get total coupons
    const totalCoupons = await Coupon.countDocuments();
    const activeCoupons = await Coupon.countDocuments({ status: "active" });
    const expiredCoupons = await Coupon.countDocuments({ status: "expired" });
    const upComing = await Coupon.countDocuments({ status: "upcoming" });
    // Get total redemptions
    const totalRedemptions = await Coupon.aggregate([
      { $group: { _id: null, total: { $sum: "$usedCount" } } },
    ]);
    const topCoupons = await Coupon.find()
      .sort({ usedCount: -1 })
      .limit(5)
      .select("title code usedCount discountType discountValue");
    const analytics = {
      success: true,
      analytics: {
        totalCoupons,
        activeCoupons,
        expiredCoupons,
        totalRedemptions: totalRedemptions[0]?.total || 0,
        topCoupons,
        upComing,
      },
    };
    return SuccessHandle.CouponSuccessHandle(analytics);
  } catch (error) {
    return ErrorHandles.InternalServer(error?.message);
  }
}
