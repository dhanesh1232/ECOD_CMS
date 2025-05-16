import dbConnect from "@/config/dbconnect";
import { User } from "@/models/user/user";
import { Workspace } from "@/models/user/workspace";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { workspaceId } = params;
    const { settingKey, value } = await req.json();

    // Validate and update workspace settings
    if (settingKey.startsWith("workspace.")) {
      const path = settingKey.replace("workspace.", "");
      await Workspace.findByIdAndUpdate(workspaceId, {
        $set: { [`settings.${path}`]: value },
      });
    }
    // Validate and update user-specific workspace settings
    else if (settingKey.startsWith("user.")) {
      const path = settingKey.replace("user.", "");
      await User.findOneAndUpdate(
        { _id: session.user.id, "workspaces.workspace": workspaceId },
        { $set: { [`workspaces.$.settings.${path}`]: value } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
