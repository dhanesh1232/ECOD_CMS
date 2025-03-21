import { getSession } from "next-auth/react";
import TeamMember from "../api/models/team";
import dbConnect from "../api/lib/mongodb";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { email } = req.query;

    try {
      const user = await TeamMember.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { email, ...updateData } = req.body;

    try {
      const updatedUser = await TeamMember.findOneAndUpdate(
        { email },
        updateData,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
