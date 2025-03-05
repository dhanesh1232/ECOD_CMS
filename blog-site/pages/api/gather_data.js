import fs from "fs";
import path from "path";
import connectToDatabase from "./lib/mongodb";
import ThemeSettings from "./models/theme";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const filePath = path.join(process.cwd(), "/public/Schema/schema__data.json");
  await connectToDatabase();

  if (req.method === "GET") {
    const { theme_id } = req.query;

    if (!theme_id) {
      return res.status(400).json({ message: "Missing theme_id" });
    }

    try {
      console.log("Fetching theme from DB...");
      const theme = await ThemeSettings.findOne({ theme_id });

      if (!theme) {
        return res.status(404).json({ message: "Theme not found" });
      }
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(theme.data, null, 2)
      );
      return res.status(200).json(theme);
    } catch (error) {
      console.error("Error fetching theme:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
