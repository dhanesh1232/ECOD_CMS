// app/api/admin/coupons/export/route.js
import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { Coupon } from "@/models/payment/coupon";
import { parse } from "json2csv";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    const fields = [
      "code",
      "title",
      "description",
      "discountType",
      "discountValue",
      "minPurchaseAmount",
      "startDate",
      "endDate",
      "usageLimit",
      "usedCount",
      "status",
      "createdAt",
      "updatedAt",
    ];

    const opts = { fields };
    const csv = parse(coupons, opts);

    return NextResponse.json(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=coupons-export.csv",
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return ErrorHandles.InternalServer();
  }
}
