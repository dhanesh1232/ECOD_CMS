import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";

export async function GET() {
  try {
    await dbConnect();
    const coupons = await Coupon.find({
      $or: [{ status: "archived" }, { status: "expired" }],
    }).sort({
      createdAt: -1,
    });
    return SuccessHandle.CouponSuccessHandle({ success: true, coupons });
  } catch (error) {
    return ErrorHandles.InternalServer();
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const { id, action } = await req.json();
    if (!id || !action) {
      return ErrorHandles.BadRequest("Id and Action are required");
    }

    console.log(id, action);
    let coupon;
    if (action === "restore") {
      coupon = await Coupon.findByIdAndUpdate(
        id,
        { status: "active" },
        { new: true }
      );
    } else if (action === "delete") {
      coupon = await Coupon.findByIdAndDelete(id);
    } else if (action === "archive") {
      coupon = await Coupon.findByIdAndUpdate(
        id,
        { status: "archived" },
        { new: true }
      );
    } else {
      return ErrorHandles.BadRequest("Action is not valid");
    }
    if (!coupon) {
      return ErrorHandles.UserNotFound("Coupon not found");
    }
    return SuccessHandle.CouponSuccessHandle({ success: true, coupon });
  } catch (err) {
    return ErrorHandles.InternalServer(err.message);
  }
}
