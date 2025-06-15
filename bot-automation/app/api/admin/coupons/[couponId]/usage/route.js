import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";
import { CouponRedemption } from "@/models/payment/couponRedemption";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { couponId } = await params;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "30d"; // 7d, 30d, 90d, all

    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

    // Verify coupon exists
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return ErrorHandles.NotFound("Coupon not found");
    }

    // Calculate date range based on period
    let startDate;
    const endDate = new Date();

    switch (period) {
      case "7d":
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "all":
        startDate = new Date(coupon.validity.start.date);
        break;
      default:
        return ErrorHandles.BadRequest("Invalid period parameter");
    }

    // Aggregate redemption data
    const redemptions = await CouponRedemption.aggregate([
      {
        $match: {
          coupon: coupon._id,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Fill in missing dates with zero counts
    const dateMap = {};
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      dateMap[dateStr] = { date: dateStr, count: 0 };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Merge with actual redemption data
    redemptions.forEach((redemption) => {
      dateMap[redemption.date] = redemption;
    });

    const usageData = Object.values(dateMap).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Calculate summary statistics
    const totalRedemptions = redemptions.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const daysInPeriod = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const avgDailyRedemptions =
      daysInPeriod > 0 ? totalRedemptions / daysInPeriod : 0;

    return SuccessHandle.CouponSuccessHandle({
      usageData,
      summary: {
        totalRedemptions,
        remainingRedemptions:
          coupon.usageLimits.total - coupon.usageLimits.usedCount,
        redemptionRate:
          (coupon.usageLimits.usedCount / coupon.usageLimits.total) * 100,
        avgDailyRedemptions,
        periodStart: startDate,
        periodEnd: endDate,
        period,
      },
    });
  } catch (err) {
    console.error(
      `GET /api/admin/coupons/${params.couponId}/usage error:`,
      err
    );
    return ErrorHandles.InternalServer(err.message);
  }
}
