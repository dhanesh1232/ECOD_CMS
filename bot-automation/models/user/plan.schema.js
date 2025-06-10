import mongoose from "mongoose";

const planSchema = new mongoose.Schema({}, { strict: false }); // no hardcoded structure

export const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);
