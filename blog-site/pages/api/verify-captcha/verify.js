export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.body;

  const secretKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SECRET ||
    "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"; // test key

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();

  if (data.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, errors: data["error-codes"] });
  }
}
