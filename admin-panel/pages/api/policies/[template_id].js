import dbConnect from "../lib/mongodb";
import Policy from "../models/policies";

export default async function handler(req, res) {
  const { template_id } = req.query;
  await dbConnect(); // Connect to MongoDB

  if (req.method === "GET") {
    try {
      // Find the policy by template_id
      const policy = await Policy.findOne({ template_id });

      if (policy) {
        res.status(200).json(policy);
      } else {
        res.status(404).json({ message: "Policy not found" });
      }
    } catch (error) {
      console.error("Error fetching policy:", error);
      res.status(500).json({ message: "Failed to fetch policy" });
    }
  } else if (req.method === "DELETE") {
    try {
      // Find the policy by template_id and delete it
      const deletedCount = await Policy.deleteOne({ template_id });
      if (deletedCount.deletedCount > 0) {
        res.status(200).json({ message: "Policy deleted successfully" });
      } else {
        res.status(404).json({ message: "Policy not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "Failed to delete policy" });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        title,
        content,
        seo_title,
        seo_description,
        seo_keywords,
        slug,
        updated_date,
      } = req.body;

      const updatedPolicy = await Policy.findOneAndUpdate(
        { template_id },
        {
          $set: {
            title,
            content,
            seo_title,
            seo_description,
            seo_keywords,
            slug,
            updated_date,
          },
        },
        { new: true }
      );
      if (updatedPolicy) {
        res.status(200).json(updatedPolicy);
      } else {
        res.status(404).json({ message: "Policy not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update policy" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
