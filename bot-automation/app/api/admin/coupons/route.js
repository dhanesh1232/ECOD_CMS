import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { Coupon } from "@/models/payment/coupon";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const discountType = searchParams.get("discountType");
    const dateFilter = searchParams.get("date");
    const plan = searchParams.get("plan");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const exportFormat = searchParams.get("export");

    const query = {};

    // Status filter
    if (status && status !== "all") {
      query.status = status;
    }

    // Search filter
    if (search) {
      query.$or = [
        { code: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "metadata.tags": { $regex: search, $options: "i" } },
      ];
    }

    // Discount type filter
    if (discountType && discountType !== "all") {
      query.discountType = discountType;
    }

    // Plan filter
    if (plan && plan !== "all") {
      query.applicablePlans = plan === "any" ? { $exists: true } : plan;
    }

    // Date filters
    if (dateFilter && dateFilter !== "all") {
      const now = new Date();
      let startDate, endDate;

      switch (dateFilter) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          endDate = new Date(now.setHours(23, 59, 59, 999));
          break;
        case "week":
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          endDate = new Date(now.setDate(now.getDate() - now.getDay() + 6));
          break;
        case "month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          break;
        case "year":
          startDate = new Date(now.getFullYear(), 0, 1);
          endDate = new Date(now.getFullYear(), 11, 31);
          break;
        case "active":
          query.$and = [
            { "validity.start.date": { $lte: now } },
            { "validity.end.date": { $gte: now } },
          ];
          break;
        case "upcoming":
          query["validity.start.date"] = { $gt: now };
          break;
        case "expired":
          query["validity.end.date"] = { $lt: now };
          break;
      }

      if (
        startDate &&
        endDate &&
        !["active", "upcoming", "expired"].includes(dateFilter)
      ) {
        query.createdAt = {
          $gte: startDate,
          $lte: endDate,
        };
      }
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const [coupons, total] = await Promise.all([
      Coupon.find(query).sort(sortOptions).skip(skip).limit(limit).lean(), // Use lean() for better performance
      Coupon.countDocuments(query),
    ]);

    // Format dates for response
    const formattedCoupons = coupons.map((coupon) => ({
      ...coupon,
      startDate: coupon.validity.start.date,
      endDate: coupon.validity.end.date,
      startTime: coupon.validity.start.time,
      endTime: coupon.validity.end.time,
      timezone: coupon.validity.timezone,
    }));

    // Handle export if requested
    if (exportFormat === "csv") {
      const fields = [
        { label: "Code", value: "code" },
        { label: "Title", value: "title" },
        { label: "Description", value: "description" },
        { label: "Discount Type", value: "discountType" },
        { label: "Discount Value", value: "discountValue" },
        { label: "Max Discount", value: "maxDiscountAmount" },
        { label: "Start Date", value: "startDate" },
        { label: "End Date", value: "endDate" },
        { label: "Usage Limit", value: "usageLimits.total" },
        { label: "Status", value: "status" },
      ];

      const csv = parse(formattedCoupons, { fields });
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=coupons.csv",
        },
      });
    }

    return SuccessHandle.CouponSuccessHandle({
      success: true,
      coupons: formattedCoupons,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return ErrorHandles.InternalServer();
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    await Coupon.deleteMany();
    return SuccessHandle.DefaultSuccess("All coupons deleted successfully");
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
