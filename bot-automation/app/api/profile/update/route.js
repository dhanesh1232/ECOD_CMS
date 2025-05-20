import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import { User } from "@/models/user/user";
import cloudinary from "@/utils/cloudinary";
import { validateSession } from "@/lib/auth";

export async function PUT(request) {
  await dbConnect();
  try {
    const session = await validateSession(request);

    const body = await request.json();
    const { image, name } = body;
    console.log(body);
    // Handle image upload
    let imageUrl = image;

    if (image.startsWith("data:image")) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "user-profiles",
        allowed_formats: ["png", "jpg", "jpeg", "gif"],
      });
      imageUrl = uploadResult.secure_url;
    }
    const updatedUser = await User.findByIdAndUpdate(
      session?.user?.id,
      {
        $set: {
          image: imageUrl,
          name,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Internal server error please try again",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
