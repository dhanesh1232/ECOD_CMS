const { default: connectToDatabase } = require("../lib/mongodb");
const { default: ThemeSettings } = require("../models/themeSettings");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { theme_id } = req.query;

  try {
    await connectToDatabase();

    const settings = await ThemeSettings.findOne({ theme_id });

    if (settings) {
      res.status(200).json(settings.settings);
    } else {
      res.status(404).json({ message: "Settings not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
}
