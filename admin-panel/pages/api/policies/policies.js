import Policy from "../models/policies";
import dbConnect from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect(); // Connect to MongoDB

      const {
        template_id,
        title,
        content,
        seo_title,
        seo_description,
        seo_keywords,
        slug,
      } = req.body;

      // Create a new policy document
      const newPolicy = new Policy({
        template_id,
        title,
        content,
        seo_title,
        seo_description,
        seo_keywords,
        slug,
      });

      await newPolicy.save();

      res
        .status(201)
        .json({ message: "Policy saved successfully", template_id });
    } catch (error) {
      console.error("Error saving policy:", error);
      res.status(500).json({ message: "Failed to save policy" });
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect(); // Connect to MongoDB
      const policies = await Policy.find({});
      if (policies) {
        res.status(200).json(policies);
      } else {
        res.status(404).json({ message: "Policy not found" });
      }
    } catch (err) {
      console.error("Error getting policy:", err);
      res.status(500).json({ message: "Failed to getting policy" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
