import dbConnect from "@/config/dbconnect";
import { Coupon } from "@/models/payment/coupon";
import { NextResponse } from "next/server";
import moment from "moment-timezone";

export async function GET(req) {
  await dbConnect();

  try {
    const now = new Date();
    const coupons = await Coupon.find({
      status: { $nin: ["paused", "archived"], $in: ["upcoming", "active"] },
      isActive: true,
    });

    let updatedCount = 0;
    const bulkOps = [];

    for (const coupon of coupons) {
      // Get the timezone from coupon or default to UTC
      const timezone = coupon.validity.timezone || "UTC";

      // Create moment objects with proper timezone
      const startMoment = moment.tz(
        `${coupon.validity.start.date.toISOString().split("T")[0]} ${
          coupon.validity.start.time
        }`,
        "YYYY-MM-DD HH:mm",
        timezone
      );

      const endMoment = moment.tz(
        `${coupon.validity.end.date.toISOString().split("T")[0]} ${
          coupon.validity.end.time
        }`,
        "YYYY-MM-DD HH:mm",
        timezone
      );

      // Convert to JavaScript Date objects for comparison
      const startDateTime = startMoment.toDate();
      const endDateTime = endMoment.toDate();

      let newStatus = coupon.status;

      // Determine new status
      if (now >= startDateTime && now <= endDateTime) {
        newStatus = "active";
      } else if (now > endDateTime) {
        newStatus = "expired";
      } else if (now < startDateTime) {
        newStatus = "upcoming";
      }

      if (newStatus !== coupon.status) {
        bulkOps.push({
          updateOne: {
            filter: { _id: coupon._id },
            update: { $set: { status: newStatus } },
          },
        });
        updatedCount++;

        // Log the change for debugging
        console.log(
          `Updating coupon ${coupon.code} from ${coupon.status} to ${newStatus}`
        );
        console.log(
          `Now: ${now}, Start: ${startDateTime}, End: ${endDateTime}`
        );
      }
    }

    if (bulkOps.length > 0) {
      await Coupon.bulkWrite(bulkOps);
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} coupon(s)`,
      updatedCount,
    });
  } catch (err) {
    console.error("Error in coupon status update:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
