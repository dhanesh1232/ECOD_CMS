import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "public/JSON/schema__json.json");

  if (req.method === "POST") {
    try {
      const { data } = req.body;

      // Validate if JSON data is correct
      if (!data) {
        return res.status(400).json({ message: "Invalid data" });
      }

      // Write JSON data to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      res.status(200).json({ message: "Theme updated successfully!" });
    } catch (error) {
      console.error("Error saving JSON:", error);
      res.status(500).json({ message: "Failed to save theme" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
