import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (
  toEmail,
  verificationCode,
  userName
) => {
  try {
    const mailOptions = {
      from: `"ECOD Service" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: toEmail,
      subject: `Your Verification Code`,
      html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);">
                <!-- Header -->
                <div style="background: linear-gradient(to right, #1e3a8a, #2563eb); color: white; padding: 30px 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">ECOD SERVICE</h1>
                    <p style="margin: 5px 0 0;">Project Request Verification</p>
                </div>

                <!-- Body -->
                <div style="padding: 30px 20px;">
                    <p style="font-size: 16px; color: #333;">Hi <strong>${userName}</strong>,</p>
                    <p style="font-size: 15px; color: #555; line-height: 1.6;">
                    Thank you for showing interest in working with <strong>ECOD Service</strong>. Please use the verification code below to confirm your request:
                    </p>

                    <!-- Code -->
                    <div style="background-color: #f0f4f8; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0; text-align: center; border-radius: 8px;">
                    <div style="font-size: 32px; font-weight: bold; color: #1e3a8a;">${verificationCode}</div>
                    <p style="color: #e11d48; font-size: 13px; margin-top: 10px;">This code will expire in 10 minutes</p>
                    </div>

                    <!-- Benefits -->
                    <ul style="padding-left: 20px; margin-bottom: 25px; color: #444;">
                    <li>✅ Secure verification process</li>
                    <li>✅ Fast project response time</li>
                    <li>✅ Dedicated support team</li>
                    </ul>

                    <p style="font-size: 14px; color: #444;">
                    Once verified, we'll proceed with reviewing your request and get in touch shortly.
                    </p>

                    <!-- Help -->
                    <div style="font-size: 13px; color: #666; text-align: center;">
                    Need help? Reach out to us at
                    <a href="mailto:support@ecodservice.com" style="color: #2563eb;">support@ecodservice.com</a>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background: #f9fafb; text-align: center; padding: 20px; font-size: 12px; color: #999;">
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} ECOD Service. All rights reserved.</p>
                    <p style="margin: 4px 0;">123 Business Ave, Tech City, TC 10001</p>
                    <div style="margin-top: 8px;">
                    <a href="#" style="margin: 0 10px; color: #2563eb;">Privacy Policy</a> |
                    <a href="#" style="margin: 0 10px; color: #2563eb;">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendConfirmationEmail = async (
  toEmail,
  userName,
  submissionData
) => {
  try {
    const formatServiceDetails = (details) => {
      return `
        <div class="mb-4">
          <h3 class="font-semibold text-lg mb-2 text-blue-600">Service Details</h3>
          <ul class="list-disc pl-5">
            <li><strong>Service Type:</strong> ${details.serviceType ? details.serviceType.toUpperCase() : "Not specified"}</li>
            <li><strong>Budget Range:</strong> ${details.budget || "Not specified"}</li>
            <li><strong>Estimated Timeline:</strong> ${details.timeline.replace("-", " ") || "Not specified"}</li>
          </ul>
        </div>
      `;
    };

    const formatProjectBrief = (brief) => {
      return `
        <div class="mb-4">
          <h3 class="font-semibold text-lg mb-2 text-blue-600">Project Brief</h3>
          <p class="text-gray-700 mb-3">${brief.description || "No detailed description provided"}</p>
          ${
            brief.referenceLinks
              ? `
            <div class="mt-2">
              <strong>Reference Links:</strong> 
              <a href="${brief.referenceLinks}" target="_blank" class="text-blue-500 hover:underline">View Reference</a>
            </div>
          `
              : ""
          }
          ${
            brief.budgetDetails
              ? `
            <div class="mt-2">
              <strong>Budget Notes:</strong> ${brief.budgetDetails}
            </div>
          `
              : ""
          }
          ${
            brief.timelineDetails
              ? `
            <div class="mt-2">
              <strong>Timeline Notes:</strong> ${brief.timelineDetails}
            </div>
          `
              : ""
          }
        </div>
      `;
    };

    const mailOptions = {
      from: `"ECOD Service" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: toEmail,
      subject: `Thank you for your SEO service inquiry, ${userName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                .gradient-bg {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                }
                .gradient-btn {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                }
            </style>
        </head>
        <body class="font-['Poppins'] bg-gray-50">
            <div class="max-w-2xl mx-auto my-5">
                <!-- Header -->
                <div class="gradient-bg py-8 px-6 text-center text-white rounded-t-xl">
                    <div class="text-3xl font-bold mb-2">ECOD DIGITAL SERVICES</div>
                    <h2 class="text-2xl font-semibold">Thank You for Your SEO Project Inquiry</h2>
                </div>
                
                <!-- Content -->
                <div class="bg-white px-8 py-8 rounded-b-xl shadow-lg">
                    <!-- Greeting -->
                    <p class="text-lg mb-5">Hello ${userName},</p>
                    
                    <p class="mb-6 text-gray-700">Thank you for reaching out to us about your <strong class="font-semibold">SEO project</strong> with a budget of <strong>${submissionData.formData.serviceDetails.budget}</strong>. We've received your details and our team will review them shortly.</p>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p class="text-blue-700 font-medium">Your submission was received on ${new Date(submissionData.metadata.submissionTime).toLocaleString()}.</p>
                    </div>
                    
                    <!-- Personal Info -->
                    <div class="mb-4">
                        <h3 class="font-semibold text-lg mb-2 text-blue-600">Your Contact Information</h3>
                        <ul class="list-disc pl-5">
                            <li><strong>Name:</strong> ${submissionData.formData.personalInfo.name}</li>
                            <li><strong>Email:</strong> ${submissionData.formData.personalInfo.email}</li>
                            <li><strong>Phone:</strong> ${submissionData.formData.personalInfo.phone}</li>
                        </ul>
                    </div>
                    
                    ${formatServiceDetails(submissionData.formData.serviceDetails)}
                    ${formatProjectBrief(submissionData.formData.projectBrief)}
                    
                    <!-- Next Steps -->
                    <div class="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-lg mb-2 text-blue-600">Our Next Steps</h3>
                        <ol class="list-decimal pl-5 space-y-2">
                            <li>Our SEO specialist will review your requirements within 24 hours</li>
                            <li>We'll prepare a customized SEO strategy for your 3-month timeline</li>
                            <li>You'll receive a detailed proposal with our recommendations</li>
                            <li>We'll schedule a call to discuss the plan and answer your questions</li>
                        </ol>
                    </div>
                    
                    <!-- Support -->
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <p class="text-sm text-gray-600">For immediate assistance, call us at +1 (800) 123-4567 or email <a href="mailto:seo@ecodservice.com" class="text-blue-500 hover:underline">seo@ecodservice.com</a>.</p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="text-center py-6 text-sm text-gray-500 mt-4">
                    <p>&copy; ${new Date().getFullYear()} ECO Digital Services. All rights reserved.</p>
                    <p class="mt-1">Submitted from IP: ${submissionData.metadata.ipAddress} (India)</p>
                    <div class="flex justify-center space-x-4 mt-2">
                        <a href="#" class="text-blue-500 hover:underline">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" class="text-blue-500 hover:underline">Terms of Service</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return false;
  }
};

export const sendCouponEmail = async ({
  to,
  userName,
  offerTitle,
  couponCode,
  discount,
  expiresAt,
  serviceSlug,
}) => {
  const year = new Date().getFullYear();
  const mailOptions = {
    from: `"ECOD Service" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    to: to,
    subject: `🎉 Your ${discount}% OFF - ${offerTitle}`,
    html: `
    <div style="font-family:'Helvetica Neue', sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px;margin:auto;background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
        <div style="background-color:#00b894;color:white;padding:20px;text-align:center;">
          <h2>🎉 You've Claimed an Offer!</h2>
        </div>
        <div style="padding:30px 20px;">
          <p>Hi ${userName},</p>
          <p>Thanks for claiming our <strong>${offerTitle}</strong> offer.</p>
          <p>Here is your exclusive coupon code:</p>
          <div style="background-color:#f1f1f1;padding:20px;text-align:center;border-radius:6px;font-size:24px;font-weight:bold;letter-spacing:2px;margin:20px 0;">
            ${couponCode}
          </div>
          <p><strong>Discount:</strong> ${discount}% OFF<br/>
             <strong>Valid until:</strong> ${expiresAt}<br/>
             <strong>Service:</strong> ${serviceSlug}</p>
          <p>Use this code while setting up or renewing your automation service. Don’t miss out on the savings!</p>
          <p>🚀 Happy Automating,<br/>The ECOD Team</p>
        </div>
        <div style="background-color:#fafafa;text-align:center;padding:15px;font-size:13px;color:#888;">
          &copy; ${year} ECODify. All rights reserved.
        </div>
      </div>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
    return false;
  }
};
export const existingCouponEmail = async ({
  to,
  userName,
  offerTitle,
  couponCode,
  discount,
  expiresAt,
  serviceSlug,
}) => {
  const mailOptions = {
    from: `"ECOD Service" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    to: to,
    subject: `🎁 You already have a ${discount}% OFF coupon for ${offerTitle}`,
    html: `
  <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eaeaea;">
    
    <h2 style="color: #222; font-size: 24px; font-weight: 600; margin-bottom: 12px;">
      👋 Hello ${userName},
    </h2>
    
    <p style="color: #555; font-size: 16px; margin: 0 0 20px;">
      Good news! You still have a <strong style="color: #0070f3;">${discount}% OFF</strong> coupon active for the <strong>${offerTitle}</strong> service.
    </p>

    <div style="background-color: #f3f6fc; padding: 18px 20px; border-left: 4px solid #0070f3; border-radius: 8px; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 16px;"><strong>🎟 Coupon Code:</strong> <code style="background: #e9f0ff; padding: 4px 8px; border-radius: 4px; font-size: 18px; font-weight: 600; color: #0070f3;">${couponCode}</code></p>
      <p style="margin: 8px 0 0; font-size: 16px;"><strong>📅 Expires At:</strong> ${new Date(expiresAt).toLocaleString()}</p>
    </div>

    <a href="https://yourdomain.com/services/${serviceSlug}" style="display: inline-block; padding: 12px 20px; background-color: #0070f3; color: #fff; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 500;">
      🔥 Use Your Discount Now
    </a>

    <p style="color: #666; font-size: 14px; margin-top: 28px;">
      Don’t miss this opportunity — use your discount before it expires and save big!
    </p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

    <p style="font-size: 12px; color: #aaa;">
      You’re receiving this email because you claimed a coupon on our platform. If you have any questions, just reply to this email.
    </p>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
    return false;
  }
};
