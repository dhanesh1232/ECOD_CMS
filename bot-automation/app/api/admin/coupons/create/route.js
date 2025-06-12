import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "code",
      "discountType",
      "discountValue",
      "startDate",
      "endDate",
      "usageLimit",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return ErrorHandles.BadRequest(
        `Missing required fields: ${missingFields.join(", ")}`
      );
    }

    // Validate data types and formats
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (isNaN(startDate.getTime())) {
      return ErrorHandles.BadRequest("Invalid start date format");
    }

    if (isNaN(endDate.getTime())) {
      return ErrorHandles.BadRequest("Invalid end date format");
    }

    if (startDate >= endDate) {
      return ErrorHandles.BadRequest("End date must be after start date");
    }

    if (
      data.discountType === "percent" &&
      (data.discountValue < 0 || data.discountValue > 100)
    ) {
      return ErrorHandles.BadRequest("Percentage must be between 0 and 100");
    }

    if (data.discountType === "fixed" && data.discountValue < 0) {
      return ErrorHandles.BadRequest("Fixed amount cannot be negative");
    }

    if (data.usageLimit < 1) {
      return ErrorHandles.BadRequest("Usage limit must be at least 1");
    }

    // Check for duplicate coupon code
    const existingCoupon = await Coupon.findOne({
      code: data.code.toUpperCase(),
    });
    if (existingCoupon) {
      return ErrorHandles.BadRequest("Coupon code already exists");
    }

    // Prepare coupon data
    const couponData = {
      title: data.title.trim(),
      code: data.code.toUpperCase().trim(),
      discountType: data.discountType,
      discountValue: Number(data.discountValue),
      startDate,
      endDate,
      usageLimit: Number(data.usageLimit),
      rules: data.rules || [],
      applicablePlans: data.applicablePlans || [],
      interActions: {
        autoApply: data.interActions?.autoApply || false,
        autoSuggest: data.interActions?.autoSuggest || false,
      },
      currency:
        data.discountType === "fixed" ? data.currency || "INR" : undefined,
      status: startDate > new Date() ? "upcoming" : "active",
    };

    // Create and save coupon
    const coupon = await Coupon.create(couponData);

    return SuccessHandle.CouponSuccessHandle({
      success: true,
      coupon,
      message: "Coupon created successfully",
    });
  } catch (error) {
    console.error("Error in POST /api/admin/coupons/create:", error);
    return ErrorHandles.InternalServer(error.message);
  }
}
