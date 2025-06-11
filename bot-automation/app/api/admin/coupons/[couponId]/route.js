import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { couponId } = await params;
    const coupon = await Coupon.findById(couponId);
    return SuccessHandle.CouponSuccessHandle({ coupon });
  } catch (err) {
    return ErrorHandles.InternalServer(err.message);
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { couponId } = await params;
    const data = await req.json();
    console.log(data, couponId);
    const couponUpdate = await Coupon.findByIdAndUpdate(couponId, data, {
      new: true,
      runValidators: true,
    });
    if (!couponUpdate) {
      return ErrorHandles.BadRequest("Coupon not found");
    }
    return SuccessHandle.CouponSuccessHandle({ coupon: couponUpdate });
  } catch (err) {
    return ErrorHandles.InternalServer(err.message);
  }
}
