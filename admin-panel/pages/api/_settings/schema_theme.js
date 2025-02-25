import fs from "fs";
import path from "path";
import connectToDatabase from "./../lib/mongodb";
import ThemeSettings from "./../models/themeSettings";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public/JSON/schema__json.json");

  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { data, theme_id } = req.body;

      if (!data || !theme_id) {
        return res
          .status(400)
          .json({ message: "Invalid request: Missing theme_id or data" });
      }

      const themeData = {
        theme_id,
        data,
        last_updated: new Date(),
      };

      // Insert or update the theme data in MongoDB
      await ThemeSettings.findOneAndUpdate(
        { theme_id },
        { $set: themeData },
        { upsert: true, new: true }
      );

      // ✅ **Retrieve the latest data from MongoDB**
      const updatedData = await ThemeSettings.findOne({ theme_id });

      // ✅ **Ensure retrieved data is valid before writing to file**
      if (!updatedData || !updatedData.data) {
        return res
          .status(500)
          .json({ message: "Failed to retrieve updated theme data" });
      }

      // ✅ **Write the retrieved data to JSON file**
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(updatedData.data, null, 2)
      );

      res.status(200).json({
        message: "Theme updated successfully!",
        data: updatedData.data,
      });
    } catch (error) {
      console.error("Error saving JSON:", error);
      res
        .status(500)
        .json({ message: "Failed to save theme", error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { theme_id } = req.query; // Get theme_id from query parameters
      if (!theme_id) {
        return res.status(400).json({ message: "theme_id is required" });
      }

      const themeData = await ThemeSettings.findOne({ theme_id });

      if (!themeData) {
        return res.status(404).json({ message: "Theme not found" });
      }

      res.status(200).json({ themeData });
    } catch (error) {
      console.error("Error retrieving JSON:", error);
      res
        .status(500)
        .json({ message: "Failed to retrieve theme", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
