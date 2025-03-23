import dbConnect from "../lib/mongodb";
import Policy from "../models/policies";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const { template_id } = req.query;

            if (!template_id) {
                return res.status(400).json({ error: "template_id is required" });
            }

            const policy = await Policy.findOne({ template_id });

            if (!policy) {
                return res.status(404).json({ error: "Policy not found" });
            }

            res.status(200).json(policy);
        } catch (error) {
            console.error("Error fetching policy:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
