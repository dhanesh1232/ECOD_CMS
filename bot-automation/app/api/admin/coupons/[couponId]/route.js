import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";
import { validateCouponData } from "@/lib/server/validator";
import { getCouponStatus } from "@/lib/server/utils";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { couponId } = await params;

    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

    const coupon = await Coupon.findById(couponId).lean();

    if (!coupon) {
      return ErrorHandles.UserNotFound("Coupon not found");
    }

    // Calculate current status
    const status = getCouponStatus(
      coupon.validity.start,
      coupon.validity.end,
      coupon.status
    );

    // Update status if changed
    if (status !== coupon.status) {
      await Coupon.findByIdAndUpdate(couponId, { status });
      coupon.status = status;
    }

    // Format response data
    const responseData = {
      ...coupon,
      startDate: coupon.validity.start.date,
      endDate: coupon.validity.end.date,
      startTime: coupon.validity.start.time,
      endTime: coupon.validity.end.time,
    };

    return SuccessHandle.CouponSuccessHandle({ coupon: responseData });
  } catch (err) {
    console.error(`GET /api/admin/coupons/${params.couponId} error:`, err);
    return ErrorHandles.InternalServer(err.message);
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { couponId } = await params;
    const data = await request.json();

    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

    // Validate coupon data
    const validation = validateCouponData(data, couponId);
    if (!validation.valid) {
      return ErrorHandles.BadRequest(validation.message);
    }

    // Prepare update data
    const updateData = {
      ...data,
      validity: {
        start: {
          date: new Date(data.startDate),
          time: data.startTime || "00:00",
        },
        end: {
          date: new Date(data.endDate),
          time: data.endTime || "23:59",
        },
        timezone: data.timezone || "UTC",
      },
      status: getCouponStatus(
        {
          date: new Date(data.startDate),
          time: data.startTime || "00:00",
        },
        {
          date: new Date(data.endDate),
          time: data.endTime || "23:59",
        },
        data.status
      ),
      updatedAt: new Date(),
    };

    // Update coupon
    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoupon) {
      return ErrorHandles.UserNotFound("Coupon not found");
    }

    // Format response data
    const responseData = {
      ...updatedCoupon.toObject(),
      startDate: updatedCoupon.validity.start.date,
      endDate: updatedCoupon.validity.end.date,
      startTime: updatedCoupon.validity.start.time,
      endTime: updatedCoupon.validity.end.time,
    };

    return SuccessHandle.CouponSuccessHandle(
      {
        coupon: responseData,
      },
      "Coupon updated successfully"
    );
  } catch (err) {
    console.error(`PUT /api/admin/coupons/${params.couponId} error:`, err);
    return ErrorHandles.InternalServer(err.message);
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { couponId } = params;
    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

    const coupon = await Coupon.findByIdAndDelete(couponId);

    if (!coupon) {
      return ErrorHandles.NotFound("Coupon not found");
    }

    return SuccessHandle.CouponSuccessHandle({
      message: "Coupon successfully deleted",
      coupon: null,
    });
  } catch (err) {
    console.error(`DELETE /api/admin/coupons/${params.couponId} error:`, err);
    return ErrorHandles.InternalServer(err.message);
  }
}
