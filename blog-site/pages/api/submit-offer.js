import { sendOfferMail } from "./lib/mailer";
import dbConnect from "./lib/mongodb";
import OfferSubmission from "./models/offers";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const { name, email, phone, offer, coupon, timestamp, recaptchaToken } =
        req.body;
      // Validate required fields
      if (!name || !email || !offer || !coupon) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + offer.validityDays);

      // Create new submission
      const submission = new OfferSubmission({
        name,
        email,
        phone: phone || undefined,
        offer: {
          title: offer.title,
          discount: offer.discount,
          couponPrefix: offer.couponPrefix,
          validityDays: offer.validityDays,
        },
        couponCode: coupon,
        expiresAt,
        recaptchaToken,
      });

      // Save to database
      await submission.save();
      await sendOfferMail(name, email, offer, coupon, expiresAt);
      return res.status(200).json({
        success: true,
        message: "Offer submitted successfully",
        coupon,
        expiresAt: expiresAt.toISOString(),
      });
    } catch (error) {
      console.error("Submission error:", error);

      // Handle duplicate coupon code error
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Duplicate coupon code. Please try again.",
        });
      }

      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();
      const { coupon } = req.query;
      if (!coupon) {
        return res.status(400).json({ message: "Missing coupon code" });
      }
      // Check if the coupon code exists in the database
      const submission = await OfferSubmission.findOne({ couponCode: coupon });
      if (!submission) {
        return res.status(404).json({ message: "Invalid coupon" });
      }

      return res.status(200).json({
        success: true,
        submission,
      });
    } catch (error) {
      console.error("Error fetching coupon:", error);
      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
