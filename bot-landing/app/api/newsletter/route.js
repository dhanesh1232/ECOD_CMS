import dbConnect from "@/config/dbConnect";
import { ErrorHandles, SuccessHandles } from "@/lib/server/respons_handles";
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
    if (source !== "model") {
      if (!email || !name || !agreed) {
        return ErrorHandles.BadRequest(
          "Name, email and agreement are required."
        );
      } else {
        if (!email) {
          return ErrorHandles.BadRequest("Email is required.");
        }
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
      // Already exists: update metadata
      await Newsletter.updateOne(
        { email },
        {
          $set: {
            lastSeenAt: new Date(),
            userAgent,
            location,
          },
          $inc: { openCount: 1 },
        }
      );
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
    console.log(data);
    await Newsletter.create(data);
    return SuccessHandles.Created("Successfully subscribed!");
  } catch (err) {
    return ErrorHandles.InternalServer(err.message || "Something went wrong");
  }
}
