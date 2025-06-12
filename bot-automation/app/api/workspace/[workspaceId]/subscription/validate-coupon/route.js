import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";
import { CouponRule } from "@/models/payment/couponRules";
export async function GET(request, { params }) {
  await dbConnect();
  try {
    await validateSession(request);
    const { workspaceId: slug } = await params;
    const searchParams = new URL(request.url).searchParams;
    const couponCode = searchParams.get("coupon");
    const plan = searchParams.get("plan");
    if (!couponCode || !slug) {
      return ErrorHandles.BadRequest(
        "Missing required fields: coupon code and workspaceId are required"
      );
    }

    const coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      status: "active",
    }).populate("rules");

    if (!coupon) {
      return ErrorHandles.UserNotFound("Invalid coupon");
    }

    if (coupon.applicablePlans) {
      const exact = await coupon.applicablePlans.find((v) => v === plan);
      console.log(exact);
    }

    console.log(coupon);
    return SuccessHandle.couponValidationSuccess(
      {
        data: {
          code: couponCode,
          type: "percent",
          value: 15,
          isValid: true,
        },
      },
      "Validation successfully completed"
    );
  } catch (err) {
    return ErrorHandles.InternalServer(
      "An error occurred while validating the coupon code"
    );
  }
}
