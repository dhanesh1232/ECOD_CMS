import { existingCouponEmail, sendCouponEmail } from "../lib/mailer";
import dbConnect from "../lib/mongodb";
import Coupon from "../models/gift";
import User from "../models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
      allowedMethods: ["POST"],
    });
  }

  try {
    await dbConnect();

    const { user, offer } = req.body;

    // Step 1: Validate required fields
    if (
      !user?.name ||
      !user?.email ||
      !user?.phone ||
      !offer?.title ||
      !offer?.description ||
      !offer?.serviceSlug ||
      !offer?.discount ||
      !offer?.couponCode ||
      !offer?.expiresAt
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        required: {
          user: ["name", "email", "phone"],
          offer: [
            "title",
            "description",
            "serviceSlug",
            "discount",
            "couponCode",
            "expiresAt",
          ],
        },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Step 2: Normalize and sanitize inputs
    const normalizedUser = {
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
      phone: user.phone.trim(),
    };

    const normalizedOffer = {
      title: offer.title.trim(),
      description: offer.description.trim(),
      serviceSlug: offer.serviceSlug.trim(),
      discount: offer.discount.toString(),
      couponCode: offer.couponCode.trim(),
      couponPrefix: offer.couponPrefix?.trim() || null,
      expiresAt: new Date(offer.expiresAt),
      validityDays: Number(offer.validityDays) || 30,
    };

    // Step 3: Check if user exists, or create
    let userRecord = await User.findOne({ email: normalizedUser.email });
    if (!userRecord) {
      userRecord = await User.create(normalizedUser);
    }

    // Step 4: Check for existing coupon
    const existingCoupon = await Coupon.findOne({
      userId: userRecord._id,
      status: "active",
      expiresAt: { $gt: new Date() },
    });

    if (existingCoupon) {
      // Send reminder email for existing coupon
      await existingCouponEmail({
        to: normalizedUser.email,
        userName: normalizedUser.name,
        offerTitle: existingCoupon.title,
        couponCode: existingCoupon.couponCode,
        discount: existingCoupon.discount,
        expiresAt: existingCoupon.expiresAt,
        serviceSlug: existingCoupon.serviceSlug,
      });

      return res.status(200).json({
        success: true,
        data: {
          coupon: existingCoupon,
          user: {
            id: userRecord._id,
            name: userRecord.name,
            email: userRecord.email,
          },
          existingCoupon: true,
          message: "You already have an active coupon",
        },
      });
    }

    // Step 5: Create new coupon
    const newCoupon = await Coupon.create({
      userId: userRecord._id,
      ...normalizedOffer,
      status: "active",
    });

    // Step 6: Send coupon email
    const emailSent = await sendCouponEmail({
      to: normalizedUser.email,
      userName: normalizedUser.name,
      offerTitle: normalizedOffer.title,
      couponCode: normalizedOffer.couponCode,
      discount: normalizedOffer.discount,
      expiresAt: normalizedOffer.expiresAt,
      serviceSlug: normalizedOffer.serviceSlug,
    });

    return res.status(200).json({
      success: true,
      data: {
        message: "Congratulations you got a new coupon code",
        coupon: newCoupon,
        user: {
          id: userRecord._id,
          name: userRecord.name,
          email: userRecord.email,
        },
        emailSent,
      },
    });
  } catch (err) {
    console.error("Coupon creation failed:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}
