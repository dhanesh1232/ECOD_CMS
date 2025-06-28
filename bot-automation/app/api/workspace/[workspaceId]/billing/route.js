import dbConnect from "@/config/dbconnect";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { BillingDetails } from "@/models/payment/billingDetails";
import { Workspace } from "@/models/user/workspace";

// Common validation function
const validateBillingData = (data) => {
  const errors = [];

  if (!data.companyName?.trim()) {
    errors.push("Company name is required");
  }
  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Please enter a valid email");
  }
  if (!data.addressLine1?.trim()) {
    errors.push("Address line 1 is required");
  }
  if (!data.city?.trim()) {
    errors.push("City is required");
  }
  if (!data.state?.trim()) {
    errors.push("State is required");
  }
  if (!data.postalCode?.trim()) {
    errors.push("Postal code is required");
  }
  if (!data.country?.trim()) {
    errors.push("Country is required");
  }

  return errors;
};

// Common workspace lookup function
const getWorkspace = async (slug) => {
  if (!slug) throw new Error("Workspace ID is missing");
  const workspace = await Workspace.findOne({ slug });
  if (!workspace) throw new Error("Workspace not found");
  return workspace;
};

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { workspaceId: slug } = await params;
    const workspace = await getWorkspace(slug);

    const profile = await BillingDetails.findOne({
      workspace: workspace._id,
    }).lean();

    if (profile && !workspace.billingDetails) {
      workspace.billingDetails = profile._id;
      await workspace.save();
    }

    return SuccessHandle.DefaultSuccess(
      { profile: profile || null }, // Return null instead of empty object for consistency
      profile
        ? "Billing profile fetched successfully"
        : "No billing profile found"
    );
  } catch (err) {
    if (err.message === "Workspace not found") {
      return ErrorHandles.UserNotFound(err.message);
    }
    console.error("GET billing profile error:", err);
    return ErrorHandles.InternalServer("Failed to fetch billing profile");
  }
}

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { workspaceId: slug } = await params;
    const body = await req.json();

    const validationErrors = validateBillingData(body);
    if (validationErrors.length > 0) {
      return ErrorHandles.BadRequest(validationErrors.join(", "));
    }
    const workspace = await getWorkspace(slug);

    // Check if profile already exists
    const existingProfile = await BillingDetails.findOne({
      workspace: workspace._id,
    }).lean();

    if (existingProfile) {
      return ErrorHandles.Conflict(
        "Billing profile already exists for this workspace"
      );
    }
    const profile = await BillingDetails.create({
      ...body,
      workspace: workspace._id,
    });

    workspace.billingDetails = profile._id;
    await workspace.save();
    return SuccessHandle.DefaultSuccess(
      { profile },
      "Billing profile created successfully"
    );
  } catch (err) {
    if (err.message === "Workspace not found") {
      return ErrorHandles.UserNotFound(err.message);
    }
    console.error("POST billing profile error:", err);
    return ErrorHandles.InternalServer("Failed to create billing profile");
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { workspaceId: slug } = await params;
    const body = await req.json();

    const validationErrors = validateBillingData(body);
    if (validationErrors.length > 0) {
      return ErrorHandles.BadRequest(validationErrors.join(", "));
    }

    const workspace = await getWorkspace(slug);
    console.log(body);
    const updatedProfile = await BillingDetails.findOneAndUpdate(
      { workspace: workspace._id },
      {
        ...body,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProfile) {
      return ErrorHandles.NotFound(
        "Billing profile not found for this workspace"
      );
    }

    return SuccessHandle.DefaultSuccess(
      { profile: updatedProfile },
      "Billing profile updated successfully"
    );
  } catch (err) {
    if (err.message === "Workspace not found") {
      return ErrorHandles.UserNotFound(err.message);
    }
    console.error("PUT billing profile error:", err);
    return ErrorHandles.InternalServer("Failed to update billing profile");
  }
}
