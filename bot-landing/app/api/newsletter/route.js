import dbConnect from "@/config/dbConnect";
import { ErrorHandles, SuccessHandles } from "@/lib/server/respons_handles";
import { mailSender } from "@/lib/server/sender";
import { Newsletter } from "@/model/newsletter";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const {
      name,
      email,
      agreed,
      source = "modal",
      tags = [],
      utmSource,
      utmMedium,
      utmCampaign,
      metadata = {},
    } = body;
    if (source === "modal") {
      if (!email || !name || !agreed) {
        return ErrorHandles.BadRequest(
          "Name, email and agreement are required."
        );
      }
    } else {
      if (!email) {
        return ErrorHandles.BadRequest("Email is required.");
      }
    }
    const ip =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const userAgent = req.headers.get("user-agent") || "";
    let location = null;
    if (ip) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geoData = await geoRes.json();
        if (!geoData.error) {
          location = `${geoData.city}, ${geoData.region}, ${geoData.country_name}`;
        }
      } catch {
        location = null;
      }
    }
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      const updates = {
        lastSeenAt: new Date(),
        userAgent,
        location,
      };
      if (existing.status === "unsubscribed") {
        updates.status = "subscribed";
      }
      // Already exists: update metadata
      const news = await Newsletter.updateOne(
        { email },
        {
          $set: updates,
          $inc: { openCount: 1 },
        }
      );
      await mailSender({
        template: "newsletter.subscribe_confirmation",
        to: email,
        variables: {
          userName: name || "there",
          id: news._id,
        },
      });
      return SuccessHandles.Ok("Already subscribed, updated info.");
    }
    const data = {
      name,
      email,
      agreed,
      source,
      tags,
      utmSource,
      utmMedium,
      utmCampaign,
      referrer: metadata.referrer || null,
      ipAddress: ip,
      userAgent,
      location,
      lastSeenAt: new Date(),
      openCount: 1,
      metadata,
    };
    const news = await Newsletter.create(data);
    await mailSender({
      template: "newsletter.subscribe_confirmation",
      to: email,
      variables: {
        userName: news.name,
        id: news._id,
      },
    });
    return SuccessHandles.Created("Successfully subscribed!");
  } catch (err) {
    return ErrorHandles.InternalServer(err.message || "Something went wrong");
  }
}
