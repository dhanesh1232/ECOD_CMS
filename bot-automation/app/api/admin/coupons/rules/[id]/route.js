import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { CouponRule } from "@/models/payment/couponRule";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const updateData = await request.json();

    const rule = await CouponRule.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!rule) {
      return ErrorHandles.UserNotFound("Coupon Rule not found");
    }

    return SuccessHandle.DefaultSuccess();
  } catch (error) {
    return ErrorHandles.InternalServer();
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const rule = await CouponRule.findByIdAndDelete(id);

    if (!rule) {
      return ErrorHandles.UserNotFound("Coupon Rule not found");
    }

    return SuccessHandle.DefaultSuccess();
  } catch (error) {
    return ErrorHandles.InternalServer();
  }
}
