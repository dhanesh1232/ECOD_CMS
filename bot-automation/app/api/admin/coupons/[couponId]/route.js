import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { couponId } = await params;

    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

    const coupon = await Coupon.findById(couponId).populate("rules").lean();

    if (!coupon) {
      return ErrorHandles.UserNotFound("Coupon not found");
    }

    // Calculate status based on current date
    const now = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);

    let status = coupon.status;
    if (now < startDate) {
      status = "upcoming";
    } else if (now > endDate) {
      status = "expired";
    } else {
      status = "active";
    }

    // Update status if changed
    if (status !== coupon.status) {
      await Coupon.findByIdAndUpdate(couponId, { status });
      coupon.status = status;
    }

    return SuccessHandle.CouponSuccessHandle({ coupon });
  } catch (err) {
    console.error(`GET /api/admin/coupons/${params.couponId} error:`, err);
    return ErrorHandles.InternalServer(err.message);
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { couponId } = await params;
    const data = await req.json();

    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

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

    // Validate dates
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

    // Validate discount value
    if (
      data.discountType === "percent" &&
      (data.discountValue < 0 || data.discountValue > 100)
    ) {
      return ErrorHandles.BadRequest("Percentage must be between 0 and 100");
    }

    if (data.discountType === "fixed" && data.discountValue < 0) {
      return ErrorHandles.BadRequest("Fixed amount cannot be negative");
    }

    // Validate usage limit
    if (data.usageLimit < 1) {
      return ErrorHandles.BadRequest("Usage limit must be at least 1");
    }

    // Check for duplicate code (excluding current coupon)
    const existingCoupon = await Coupon.findOne({
      code: data.code.toUpperCase(),
      _id: { $ne: couponId },
    });

    if (existingCoupon) {
      return ErrorHandles.BadRequest("Coupon code already exists");
    }

    // Calculate status based on current date
    const now = new Date();
    let status = "active";
    if (now < startDate) {
      status = "upcoming";
    } else if (now > endDate) {
      status = "expired";
    }

    const updateData = {
      ...data,
      code: data.code.toUpperCase(),
      status,
      updatedAt: new Date(),
    };

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateData, {
      new: true,
      runValidators: true,
    }).populate("rules");

    if (!updatedCoupon) {
      return ErrorHandles.UserNotFound("Coupon not found");
    }

    return SuccessHandle.CouponSuccessHandle({
      coupon: updatedCoupon,
      message: "Coupon updated successfully",
    });
  } catch (err) {
    console.error(`PUT /api/admin/coupons/${params.couponId} error:`, err);
    return ErrorHandles.InternalServer(err.message);
  }
}
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { couponId } = await params;
    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

    const coupon = await Coupon.findByIdAndDelete(couponId).exec();

    if (!coupon) {
      return ErrorHandles.NotFound("Coupon not found");
    }

    return SuccessHandle.CouponSuccessHandle({
      message: "Coupon successfully deleted",
      coupon: null,
    }); // More consistent response format
  } catch (err) {
    return ErrorHandles.InternalServer(err.message);
  }
}
