import dbConnect from "@/config/dbconnect";
import { navLinks } from "@/data/bot-links";
import { ErrorHandles } from "@/lib/server/errors";
import { SuccessHandle } from "@/lib/server/success";
import { NavLinks } from "@/models/user/schema";

export async function GET() {
  await dbConnect();
  try {
    const updatedLinks = await NavLinks.findOneAndUpdate(
      { type: "navLinks" },
      { type: "navLinks", data: navLinks },
      { upsert: true, new: true }
    );
    return SuccessHandle.fetchNav({ links: updatedLinks });
  } catch (err) {
    return ErrorHandles.InternalServer();
  }
}
