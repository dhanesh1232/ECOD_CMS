import dbConnect from "../lib/mongodb";
import Policy from "../models/policies";

export default async function handler(req, res) {
  const { template_id } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect(); // Connect to MongoDB

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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
