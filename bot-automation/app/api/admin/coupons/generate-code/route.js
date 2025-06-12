// /api/admin/coupons/generate-code
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";

export async function POST() {
  try {
    const code = `ECOD-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    return SuccessHandle.CouponSuccessHandle(
      {
        success: true,
        code,
      },
      "Coupon code generated successfully"
    );
  } catch (error) {
    console.error("Error generating coupon code:", error);
    return ErrorHandles.InternalServer(error.message);
  }
}
