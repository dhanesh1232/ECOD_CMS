import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { CouponSettings } from "@/models/payment/CouponSettings";

export async function GET() {
  try {
    await dbConnect();
    let settings = await CouponSettings.findOne();
    if (!settings) {
      settings = new CouponSettings();
      await settings.save();
    }
    return SuccessHandle.CouponSuccessHandle({ success: true, settings });
  } catch (error) {
    return ErrorHandles.InternalServer(error?.message);
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();

    let settings = await CouponSettings.findOne();

    if (!settings) {
      settings = new CouponSettings(data);
    } else {
      settings = await CouponSettings.findOneAndUpdate({}, data, { new: true });
    }
    await settings.save();

    return SuccessHandle.CouponSuccessHandle({ success: true, settings });
  } catch (error) {
    return ErrorHandles.InternalServer(error?.message);
  }
}
