import dbConnect from "./lib/mongodb";
import ContactSubmission from "./models/project-contact";
import {
  sendConfirmationEmail,
  sendOwnerNotificationEmail,
} from "./lib/mailer"; // Adjust path if needed

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { formData, metadata } = req.body;

    if (
      !formData.projectBrief.description ||
      formData.projectBrief.description.length < 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Project description must be at least 20 characters long.",
      });
    }

    const parsedFormFingerprint =
      typeof metadata.formFingerprint === "string"
        ? JSON.parse(metadata.formFingerprint)
        : metadata.formFingerprint;

    const newSubmission = await ContactSubmission.create({
      name: formData.personalInfo.name,
      email: formData.personalInfo.email,
      phone: formData.personalInfo.phone,
      serviceType: formData.serviceDetails.serviceType,
      budget: formData.serviceDetails.budget,
      timeline: formData.serviceDetails.timeline,
      description: formData.projectBrief.description,
      referenceLinks: formData.projectBrief.referenceLinks || [],
      budgetDetails: formData.projectBrief.budgetDetails || undefined,
      timelineDetails: formData.projectBrief.timelineDetails || undefined,
      verification: {
        emailVerified: metadata.verificationMethod.email || false,
        whatsappVerified: metadata.verificationMethod.whatsapp || false,
        verificationMethod: { ...metadata.verificationMethod } || {},
      },
      metadata: {
        ...metadata,
        formFingerprint: parsedFormFingerprint,
      },
      status: "new",
      notes: [],
    });

    await sendConfirmationEmail(
      newSubmission.email,
      newSubmission.name,
      formData.serviceDetails.serviceType,
      {
        formData,
        metadata,
      }
    );
    await sendOwnerNotificationEmail(formData, metadata);

    return res.status(200).json({
      success: true,
      message: "Form submitted and saved successfully.",
    });
  } catch (e) {
    console.error("Error in submission handler:", e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
