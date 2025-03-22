import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    template_id: {
      type: String,
      required: true,
      unique: true, // Ensure template_id is unique
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    seo_title: {
      type: String,
      required: true,
    },
    seo_description: {
      type: String,
      required: true,
    },
    seo_keywords: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    updated_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Check if the model already exists to avoid redefining it
const Policy = mongoose.models.Policy || mongoose.model("Policy", policySchema);

export default Policy;
