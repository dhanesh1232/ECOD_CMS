import mongoose from "mongoose";

const planSchema = new mongoose.Schema({}, { strict: false }); // no hardcoded structure

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

const navLinks = new mongoose.Schema({}, { strict: false }); // no hardcoded structure
const NavLinks =
  mongoose.models.NavLinks || mongoose.model("NavLinks", navLinks);
export { Plan, NavLinks };
