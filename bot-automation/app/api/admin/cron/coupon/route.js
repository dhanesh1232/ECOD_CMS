import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { Coupon } from "@/models/payment/coupon";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const nowUTC = new Date();
    const coupons = await Coupon.find({
      status: { $nin: ["paused", "archived"] },
    });

    const updates = [];
    for (const coupon of coupons) {
      const start = new Date(
        `${coupon.validity.start.date.toISOString().split("T")[0]}T${
          coupon.validity.start.time
        }:00Z`
      );
      const end = new Date(
        `${coupon.validity.end.date.toISOString().split("T")[0]}T${
          coupon.validity.end.time
        }:59Z`
      );
      let newStatus = coupon.status;
      if (nowUTC >= start && nowUTC <= end) {
        newStatus = "active";
      } else if (nowUTC < start) {
        newStatus = "upcoming";
      } else if (nowUTC > end) {
        newStatus = "expired";
      }

      if (coupon.status !== newStatus) {
        coupon.status = newStatus;
        updates.push(coupon.save());
      }
    }
    const data = await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: `Updated ${updates.length} coupon(s)`,
    });
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
