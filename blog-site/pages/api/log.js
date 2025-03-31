import dbConnect from "./lib/mongodb";
import Visitor from "./models/Visitor";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { path, referrer } = req.body;
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "127.0.0.1";
    console.log(ip);
    const userAgent = req.headers["user-agent"] || "Unknown";

    // Get geolocation
    let geoData = {};
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      geoData = await geoResponse.json();
    } catch (error) {
      console.error("Geolocation fetch failed:", error);
    }

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

    // Save to database
    await Visitor.create(visitorData);

    res
      .status(200)
      .json({ success: true, data: JSON.stringify(visitorData, null, 2) });
  } catch (error) {
    console.error("Error in visit tracking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
