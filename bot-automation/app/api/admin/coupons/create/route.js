import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";
import { validateCouponCode } from "@/lib/server/validator";
import { validateSession } from "@/lib/auth";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const session = await validateSession(request);
    // Validate required fields
    const requiredFields = [
      "title",
      "code",
      "discountType",
      "validity",
      "usageLimits",
      "period",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return ErrorHandles.BadRequest(
        `Missing required fields: ${missingFields.join(", ")}`
      );
    }

    // Validate coupon code format
    if (!validateCouponCode(data.code)) {
      return ErrorHandles.BadRequest(
        "Coupon code must be 4-20 characters, uppercase alphanumeric with hyphens/underscores"
      );
    }

    const startDateStr = `${data.validity.start.date}T${data.validity.start.time}`;
    const endDateStr = `${data.validity.end.date}T${data.validity.end.time}`;

    const startDateTime = new Date(startDateStr);
    const endDateTime = new Date(endDateStr);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return ErrorHandles.BadRequest(
        "Invalid date/time format. Please use YYYY-MM-DD for dates and HH:MM for times."
      );
    }

    if (startDateTime >= endDateTime) {
      return ErrorHandles.BadRequest(
        "End date/time must be after start date/time"
      );
    }

    // Validate discount values
    if (data.discountType === "percent") {
      if (
        data.discountValue < 0 ||
        data.discountValue > 100 ||
        isNaN(data.discountValue)
      ) {
        return ErrorHandles.BadRequest("Percentage must be between 0 and 100");
      }
    } else if (data.discountType === "fixed") {
      if (data.discountValue < 0 || isNaN(data.discountValue)) {
        return ErrorHandles.BadRequest("Fixed amount cannot be negative");
      }
      if (!data.currency) {
        return ErrorHandles.BadRequest(
          "Currency is required for fixed amount coupons"
        );
      }
    }

    // Validate usage limits
    if (
      data.usageLimits.total < 1 ||
      data.usageLimits.total > 1000000 ||
      isNaN(data.usageLimits.total)
    ) {
      return ErrorHandles.BadRequest(
        "Total usage limit must be between 1 and 1,000,000"
      );
    }

    if (
      data.usageLimits.perUser &&
      (data.usageLimits.perUser < 1 ||
        data.usageLimits.perUser > 100 ||
        isNaN(data.usageLimits.perUser))
    ) {
      return ErrorHandles.BadRequest(
        "Per user limit must be between 1 and 100 if specified"
      );
    }

    // Validate min cart value if provided
    if (
      data.minCartValue &&
      (data.minCartValue < 0 || isNaN(data.minCartValue))
    ) {
      return ErrorHandles.BadRequest("Minimum cart value cannot be negative");
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
      description: data.description?.trim(),
      code: data.code.toUpperCase().trim(),
      discountType: data.discountType,
      discountValue: Number(data.discountValue),
      maxDiscountAmount:
        data.discountType === "percent"
          ? Number(data.maxDiscountAmount)
          : undefined,
      minCartValue: data.minCartValue ? Number(data.minCartValue) : undefined,
      validity: {
        start: {
          date: new Date(data.validity.start.date),
          time: data.validity.start.time,
        },
        end: {
          date: new Date(data.validity.end.date),
          time: data.validity.end.time,
        },
        timezone: data.validity.timezone,
      },
      usageLimits: {
        total: Number(data.usageLimits.total),
        perUser: data.usageLimits.perUser
          ? Number(data.usageLimits.perUser)
          : undefined,
        usedCount: 0,
      },
      rules: data.rules || [],
      applicablePlans:
        data.applicablePlans?.length > 0 ? data.applicablePlans : ["all"],
      period: data.period,
      currency: data.currency || "INR",
      interActions: {
        autoApply: data.interActions?.autoApply || false,
        autoSuggest: data.interActions?.autoSuggest || false,
        showInBanner: data.interActions?.showInBanner || false,
        bannerText: data.interActions?.bannerText?.trim(),
      },
      metadata: {
        tags: data.metadata?.tags || [],
        campaignId: data.metadata?.campaignId?.trim(),
      },
      createdBy: session.user.id, // Should be set from auth middleware
      status: "upcoming", // Will be updated in pre-save hook
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
