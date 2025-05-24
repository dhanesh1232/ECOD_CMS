// app/api/workspace/[workspaceId]/settings/route.js
import { NextResponse } from "next/server";
import { Workspace } from "@/models/user/workspace";
import { User } from "@/models/user/user";
import { validateSession } from "@/lib/auth";
import dbConnect from "@/config/dbconnect";
import { z } from "zod";
import cloudinary from "@/utils/cloudinary";

// Validation schemas
const AddressSchema = z.object({
  street: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
  state: z.string().max(50).optional(),
  postalCode: z.string().max(20).optional(),
  country: z.string().max(50).optional(),
});

const ContactInfoSchema = z.object({
  supportEmail: z.string().email().max(100).optional().or(z.literal("")),
  websiteURL: z.string().url().max(200).optional().or(z.literal("")),
  phone: z.string().max(20).optional(),
  address: AddressSchema.optional(),
});

const BrandingSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  logoUrl: z
    .union([z.string().url().max(500), z.literal(""), z.undefined()])
    .optional(),
  faviconUrl: z
    .union([z.string().url().max(500), z.literal(""), z.undefined()])
    .optional(),
  customDomain: z.string().max(100).optional(),
});

const SecuritySchema = z.object({
  widgetDomainWhitelist: z.array(z.string().url()).max(20),
  apiKeyRotationDays: z.number().min(1).max(365),
});

const WorkspaceSettingsSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  industry: z.enum([
    "technology",
    "healthcare",
    "finance",
    "education",
    "retail",
    "hospitality",
    "manufacturing",
    "other",
  ]),
  timezone: z.string(),
  contactInfo: ContactInfoSchema.optional(),
  branding: BrandingSchema.optional(),
  security: SecuritySchema.optional(),
});

// Helper function to upload base64 image to Cloudinary
async function uploadToCloudinary(base64Data, folder = "workspace-assets") {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder,
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

// Helper function to process branding images
async function processBrandingImages(branding) {
  if (!branding) return branding;

  const processedBranding = { ...branding };

  // Process logo
  if (branding.logoUrl && branding.logoUrl.startsWith("data:image")) {
    processedBranding.logoUrl = await uploadToCloudinary(
      branding.logoUrl,
      "workspace-logos"
    );
  } else if (branding.logoUrl === "") {
    processedBranding.logoUrl = "";
  } else if (branding.logoUrl === undefined) {
    processedBranding.logoUrl = undefined;
  }

  // Process favicon
  if (branding.faviconUrl && branding.faviconUrl.startsWith("data:image")) {
    processedBranding.faviconUrl = await uploadToCloudinary(
      branding.faviconUrl,
      "workspace-favicons"
    );
  } else if (branding.faviconUrl === "") {
    processedBranding.faviconUrl = "";
  } else if (branding.faviconUrl === undefined) {
    processedBranding.faviconUrl = undefined;
  }

  return processedBranding;
}

async function preProcessRequest(body) {
  const processedData = { ...body };

  // Process branding images first
  if (body.branding) {
    processedData.branding = await processBrandingImages(body.branding);
  }

  return processedData;
}

export async function GET(request, { params }) {
  await dbConnect();
  const session = await validateSession(request);

  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const workspace = await Workspace.findById(user.currentWorkspace)
      .select(
        "name description logo industry timezone contactInfo branding security settings"
      )
      .lean();

    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(workspace);
  } catch (error) {
    console.error("Error fetching workspace settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspace settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const session = await validateSession(request);

  try {
    const user = await User.findById(session.user.id).select(
      "currentWorkspace workspaces"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check permissions
    const workspaceMembership = user.workspaces.find(
      (ws) => ws.workspace.toString() === user.currentWorkspace.toString()
    );

    if (
      !workspaceMembership ||
      !["owner", "admin"].includes(workspaceMembership.role)
    ) {
      return NextResponse.json(
        { error: "You don't have permission to update these settings" },
        { status: 403 }
      );
    }

    // Validate input
    const body = await request.json();
    console.log(body);
    const rawData = await preProcessRequest(body);
    let validatedData = WorkspaceSettingsSchema.parse(rawData);

    // Update workspace
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      user.currentWorkspace,
      validatedData,
      { new: true, runValidators: true }
    ).select(
      "name description logo industry timezone contactInfo branding security settings"
    );

    return NextResponse.json(updatedWorkspace);
  } catch (error) {
    console.error("Error updating workspace settings:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to update workspace settings" },
      { status: 500 }
    );
  }
}
