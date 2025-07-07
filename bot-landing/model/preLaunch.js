import mongoose from "mongoose";

const prelaunchLeadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  companyOrWebsite: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  industryUseCase: {
    type: String,
    required: [true, "Industry use case is required"],
    enum: [
      "Real Estate",
      "E-commerce",
      "Education",
      "Healthcare",
      "Restaurants",
      "Agencies",
      "Finance",
      "Other",
    ],
  },
  otherIndustryText: {
    type: String,
    trim: true,
    required: function () {
      return this.industryUseCase === "Other";
    },
  },
  referralSource: {
    type: String,
    trim: true,
  },
  consentToUpdates: {
    type: Boolean,
    required: [true, "You must agree to receive updates"],
    default: false,
  },
  ipAddress: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const PrelaunchLead =
  mongoose.models.PrelaunchLead ||
  mongoose.model("PrelaunchLead", prelaunchLeadSchema);
