import dbConnect from "@/config/dbconnect";
import { User } from "@/models/user/user";
import cloudinary from "@/utils/cloudinary";
import { validateSession } from "@/lib/auth";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";

export async function PUT(request) {
  await dbConnect();
  try {
    const session = await validateSession(request);

    const body = await request.json();
    const { image, name } = body;
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
      return ErrorHandles.UserNotFound();
    }
    return SuccessHandle.UserProfileUpdate();
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
