export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET;
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not set");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.token}`;

    const response = await fetch(verificationUrl, { method: "POST" });
    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({
      success: false,
      message: "reCAPTCHA verification failed",
      errorCodes: data["error-codes"] || [],
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
