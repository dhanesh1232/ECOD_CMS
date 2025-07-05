import dbConnect from "@/config/dbConnect";
import { Newsletter } from "@/model/newsletter";
import { mailSender } from "@/lib/server/sender";
import { ErrorHandles } from "@/lib/server/respons_handles";

// GET handler for /api/action?iv=email&status=inactive|active
export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const iv = searchParams.get("iv")?.trim().toLowerCase();
    const status = searchParams.get("status")?.toLowerCase(); // 'inactive' or 'active'

    // Validate query
    if (!iv || !["inactive", "active"].includes(status)) {
      return ErrorHandles.BadRequest("Missing or invalid parameters.");
    }

    const user = await Newsletter.findById(iv);
    if (!user) return ErrorHandles.NotFound("Subscriber not found");

    const isActive = status === "active";

    // Skip if already in desired state
    if (
      (isActive && user.status === "subscribed") ||
      (!isActive && user.status === "unsubscribed")
    ) {
      return new Response(
        `
        <!DOCTYPE html>
        <html><body style="font-family: Arial; padding: 40px; text-align: center;">
          <h2>No action needed</h2>
          <p>You are already ${
            isActive ? "subscribed" : "unsubscribed"
          } to ECODrIx updates.</p>
          <a href="https://ecodrix.com" style="margin-top:20px;display:inline-block;padding:10px 20px;background:#2f80ed;color:white;text-decoration:none;border-radius:5px;">
            Go back to ECODrIx
          </a>
        </body></html>
        `,
        {
          status: 200,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    // Update status
    user.status = isActive ? "subscribed" : "unsubscribed";
    user.unsubscribedAt = isActive ? null : new Date();
    if (isActive && !user.subscribedAt) {
      user.subscribedAt = new Date();
    }
    await user.save();

    // Send confirmation email
    await mailSender({
      template: isActive
        ? "newsletter.subscribe_confirmation"
        : "newsletter.unsubscribe_confirmation",
      to: user.email,
      variables: {
        userName: user.name || "there",
        email: user._id,
      },
    });

    // Response HTML
    const title = isActive ? "🎉 Resubscribed!" : "🔕 Unsubscribed!";
    const message = `You have successfully ${
      isActive ? "resubscribed to" : "unsubscribed from"
    } ECODrIx updates.`;

    return new Response(
      `
      <!DOCTYPE html>
      <html><body style="font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f9fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <h2 style="color: ${isActive ? "#2f80ed" : "#e63946"};">${title}</h2>
          <p style="font-size: 16px; color: #444;">${message}</p>
          <a href="https://ecodrix.com" style="margin-top: 30px; display: inline-block; padding: 12px 24px; background: #2f80ed; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Go back to ECODrIx</a>
        </div>
      </body></html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (err) {
    return ErrorHandles.InternalServer(err.message || "Something went wrong");
  }
}
