import dbConnect from "@/config/dbConnect";
import { ErrorHandles, SuccessHandles } from "@/lib/server/respons_handles";
import { mailSender } from "@/lib/server/sender";
import { PrelaunchLead } from "@/model/preLaunch";
import { getClientIp } from "request-ip";

export async function POST(req) {
  await dbConnect();
  try {
    const ip = getClientIp(req);
    const data = await req.json();
    const { fullName, email, industryUseCase, consentToUpdates } = data;
    if (
      !fullName ||
      !email ||
      !industryUseCase ||
      consentToUpdates === undefined
    ) {
      return ErrorHandles.BadRequest(
        "Full name, email, industry use case, and consent to updates are required"
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return ErrorHandles.BadRequest("Please enter a valid email address");
    }
    const exist = await PrelaunchLead.findOne({
      email: email.trim().toLowerCase(),
    });
    if (exist) {
      return ErrorHandles.BadRequest(
        "You have already signed up for the pre-launch notification"
      );
    }

    const preLaunchData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      companyOrWebsite: data.companyOrWebsite?.trim() || "",
      phoneNumber: data.phoneNumber?.trim() || "",
      industryUseCase: industryUseCase.trim(),
      otherIndustryText: data.otherIndustryText?.trim() || "",
      referralSource: data.referralSource?.trim() || "",
      consentToUpdates: Boolean(consentToUpdates),
      createdAt: new Date(),
      ipAddress: ip || "Unknown",
    };

    const launch = await PrelaunchLead.create(preLaunchData);
    await mailSender({
      template: "newsletter.pre_launch_signup",
      to: preLaunchData.email,
      variables: {
        userName: preLaunchData.fullName,
        id: launch._id, // Assuming _id is available after creation
      },
    });
    return SuccessHandles.Ok();
  } catch (err) {
    return ErrorHandles.InternalServer(err.message || "Internal Server Error");
  }
}
