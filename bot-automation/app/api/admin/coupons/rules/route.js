import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { CouponRule } from "@/models/payment/couponRule";

export async function GET() {
  try {
    await dbConnect();
    const rules = await CouponRule.find().sort({ createdAt: -1 });
    return SuccessHandle.CouponSuccessHandle({ success: true, rules });
  } catch (error) {
    return ErrorHandles.InternalServer();
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const { name, conditionType, value, isActive } = await request.json();

    if (!name || !conditionType) {
      return ErrorHandles.BadRequest("Name and condition type are required");
    }

    const rule = await CouponRule.create({
      name,
      conditionType,
      value,
      isActive: isActive !== false,
    });
    return SuccessHandle.CouponSuccessHandle({ success: true, rule });
  } catch (error) {
    return ErrorHandles.InternalServer();
  }
}
export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    if (!data._id) {
      return ErrorHandles.BadRequest("Id is required");
    }
    const rule = await CouponRule.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    if (!rule) {
      return ErrorHandles.BadRequest("Rule not found");
    }
    return SuccessHandle.CouponSuccessHandle({ success: true, rule });
  } catch (err) {
    return ErrorHandles.InternalServer(err?.message);
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return ErrorHandles.BadRequest("Id is required");
    }

    const rule = await CouponRule.findByIdAndDelete(id);

    if (!rule) {
      return ErrorHandles.BadRequest("Rule not found");
    }

    return SuccessHandle.CouponSuccessHandle({ success: true });
  } catch (error) {
    return ErrorHandles.InternalServer(error?.message);
  }
}
