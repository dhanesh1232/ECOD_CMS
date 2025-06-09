import dbConnect from "@/config/dbconnect";
import { validateSession } from "@/lib/auth";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Discount } from "@/models/payment/discount";
const coupons = [
  "SAVE20NOW", // 9 chars
  "TRIAL2024", // 9 chars
  "FREEDAY01", // 9 chars
  "WELCOME50", // 10 chars
  "ECOD100OFF", // 10 chars
  "AIACCESS12", // 10 chars
  "LAUNCH123", // 10 chars
  "LIMITED10", // 9 chars
  "CHATOFFER", // 9 chars
  "NEWYEAR25", // 9 chars
  "SUMMER2025", // 10 chars
  "ECOUPON45", // 9 chars
  "GETTRIAL7D", // 10 chars
  "FLAT50AI", // 8 chars
  "PROUSER2025", // 11 chars
  "PREMIUM75", // 10 chars
  "ECODTEST110",
];

export async function GET(request, { params }) {
  await dbConnect();
  try {
    await validateSession(request);
    const { workspaceId: slug } = await params;
    const searchParams = new URL(request.url).searchParams;
    const couponCode = searchParams.get("coupon");
    if (!couponCode || !slug) {
      return ErrorHandles.BadRequest(
        "Missing required fields: coupon code and workspaceId are required"
      );
    }

    /*const isValid = await Discount.findOne({
      code: couponCode,
    }).lean();*/
    const isValid = coupons.find((each) => each === couponCode);
    if (!isValid) {
      return ErrorHandles.UserNotFound("Invalid coupon");
    }
    return SuccessHandle.couponValidationSuccess(
      {
        data: {
          code: couponCode,
          type: "percentage",
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
