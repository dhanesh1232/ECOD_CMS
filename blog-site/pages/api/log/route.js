import dbConnect from "../lib/mongodb";
import Visitor from "../models/Visitor";

export async function POST(request) {
  try {
    await dbConnect();

    const contest = request.headers.get("x-forword-for");
    console.log(contest);
    const { path, referrer } = await request.json();
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.ip ||
      "127.0.0.1";
    console.log(ip);
    const userAgent = request.headers.get("user-agent") || "Unknown";

    // Get geolocation
    let geoData = {};
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      geoData = await geoResponse.json();
    } catch (error) {
      console.error("Geolocation fetch failed:", error);
    }

    console.log("Geolocation data:", JSON.stringify(geoData, null, 2));
    // Create visitor data object
    const visitorData = {
      ip,
      path,
      referrer,
      userAgent,
      country: geoData.country_name || "Unknown",
      city: geoData.city || "Unknown",
      region: geoData.region || "Unknown",
      time: new Date(),
    };

    // Log to console before saving
    console.log("New visitor data:", JSON.stringify(visitorData, null, 2));

    // Save to database
    //await Visitor.create(visitorData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in visit tracking:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
