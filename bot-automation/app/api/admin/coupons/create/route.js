import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    console.log("Received data:", data); // Log incoming data

    const {
      title,
      code,
      discountType,
      discountValue,
      startDate,
      endDate,
      usageLimit,
      rules = [],
      applicablePlans = [],
      currency,
    } = data;

    // Validate required fields
    if (
      !title ||
      !code ||
      !discountType ||
      !discountValue ||
      !startDate ||
      !endDate ||
      !usageLimit
    ) {
      console.log("Validation failed - missing required fields");
      return ErrorHandles.BadRequest("All fields are required");
    }

    // Validate date formats
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime())) {
      console.log("Invalid start date format");
      return ErrorHandles.BadRequest("Invalid start date format");
    }

    if (isNaN(endDateObj.getTime())) {
      console.log("Invalid end date format");
      return ErrorHandles.BadRequest("Invalid end date format");
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      console.log("Coupon code already exists:", code);
      return ErrorHandles.BadRequest("Coupon code already exists");
    }

    // Create new coupon
    const couponData = {
      title,
      code,
      discountType,
      discountValue,
      startDate: startDateObj,
      endDate: endDateObj,
      usageLimit,
      rules,
      applicablePlans,
      currency,
      status: startDateObj > new Date() ? "upcoming" : "active",
    };

    console.log("Creating coupon with data:", couponData);
    const coupon = await Coupon.create(couponData);
    console.log("Coupon created successfully:", coupon);

    return SuccessHandle.CouponSuccessHandle({ success: true, coupon });
  } catch (error) {
    console.error("Error in POST /api/admin/coupons/create:", error);
    return ErrorHandles.InternalServer(error.message);
  }
}
