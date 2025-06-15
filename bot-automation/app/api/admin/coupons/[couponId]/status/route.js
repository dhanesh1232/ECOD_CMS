import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { couponId } = await params;
    const { status } = await request.json();

    if (!couponId) {
      return ErrorHandles.BadRequest("Coupon ID is required");
    }

    // Validate status input
    const validStatuses = ["active", "paused", "archived", "upcoming"];
    if (!validStatuses.includes(status)) {
      return ErrorHandles.BadRequest("Invalid status value");
    }

    // Find the coupon
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return ErrorHandles.NotFound("Coupon not found");
    }

    // Special case: if activating a coupon, verify dates are valid
    if (status === "active") {
      const now = new Date();
      const endDate = new Date(
        `${coupon.validity.end.date.toISOString().split("T")[0]}T${
          coupon.validity.end.time
        }`
      );

      if (now > endDate) {
        return ErrorHandles.BadRequest("Cannot activate an expired coupon");
      }
    }

    // Update status
    coupon.status = status;
    coupon.updatedAt = new Date();
    await coupon.save();

    return SuccessHandle.CouponSuccessHandle({
      message: `Coupon status updated to ${status}`,
      coupon: {
        _id: coupon._id,
        status: coupon.status,
        code: coupon.code,
        title: coupon.title,
      },
    });
  } catch (err) {
    console.error(
      `PUT /api/admin/coupons/${params.couponId}/status error:`,
      err
    );
    return ErrorHandles.InternalServer(err.message);
  }
}
