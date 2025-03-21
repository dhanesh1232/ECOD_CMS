import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String, default: "" },
    role: { type: String, default: "user", required: true },
    skills: [{ type: String }],
    bio: { type: String, default: "" },
    expertize: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    location: { type: String, default: "" },
    socialLinks: [
      {
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" },
        discord: { type: String, default: "" },
        portfolio: { type: String, default: "" },
      },
    ],
    isActive: { type: Boolean, default: true },
    joinedAt: { type: Date, default: Date.now },
    password: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember ||
  mongoose.model("TeamMember", TeamSchema);
