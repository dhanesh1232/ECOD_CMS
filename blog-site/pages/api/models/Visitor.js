import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  country: String,
  city: String,
  region: String,
  userAgent: String,
  referrer: String,
  time: { type: Date, default: Date.now },
});

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
export default Visitor;
