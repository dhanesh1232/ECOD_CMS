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

export const sendOfferMail = async (name, email, offer, coupon, expiresAt) => {
  const mailOptions = {
    from: `"ECOD Service" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    to: email,
    subject: `🎉 Your ${offer.discount}% OFF - ${offer.title}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Exclusive Offer</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; }
      </style>
    </head>
    <body style="margin: 0; background-color: #f8f9fa;">
      <!-- Main Container -->
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Hero Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2.5rem; text-align: center; color: white;">
          <div style="font-size: 36px; margin-bottom: 8px;">🎉</div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">${offer.title}</h1>
          <p style="margin: 8px 0 0; font-size: 16px; opacity: 0.9;">Your exclusive ${offer.discount}% discount is ready!</p>
        </div>
        
        <!-- Content Area -->
        <div style="padding: 0.5rem;">
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 1.5rem;">Hi <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #4b5563; margin-bottom: 1.5rem;">Thank you for choosing ECO Service! We're excited to offer you this special discount:</p>
          
          <!-- Premium Coupon Card -->
          <div style="position: relative; border-radius: 12px; padding: 2rem; margin: 1.5rem 0; 
              background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
              border: 1px solid #e5e7eb;
              box-shadow: inset 0 0 0 1px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.05);">
            
            <!-- Floating Discount Badge -->
            <div style="position: absolute; top: -12px; right: 20px; 
                background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
                color: white; font-weight: 700; font-size: 14px; 
                padding: 4px 16px; border-radius: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              ${offer.discount}% OFF
            </div>
            
            <p style="text-align: center; color: #6b7280; font-size: 14px; margin-bottom: 8px;">YOUR PROMO CODE</p>
            <div style="font-family: monospace; font-size: 24px; font-weight: 700; letter-spacing: 3px; 
                text-align: center; color: #111827; margin: 12px 0; padding: 8px; 
                background: white; border-radius: 8px; border: 1px dashed #d1d5db;">
              ${coupon}
            </div>
            
            <div style="text-align: center; margin-top: 16px;">
              <span style="display: inline-block; background-color: #fef2f2; color: #b91c1c; 
                  font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 20px;">
                ⏳ Expires ${new Date(expiresAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 2rem 0;">
            <a href="https://ecodservice.com" 
               style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; text-decoration: none; font-weight: 600; font-size: 16px; 
                      padding: 14px 28px; border-radius: 8px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
                      transition: all 0.3s ease;">
              Redeem Your Discount Now →
            </a>
          </div>
          
          <!-- Steps -->
          <div style="background-color: #f9fafb; border-radius: 12px; padding: 1.5rem; margin: 2rem 0;">
            <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 18px; color: #111827;">How to redeem your offer</h3>
            
            ${[
              {
                icon: "1️⃣",
                text: "Visit <a href='https://ecodservice.com' style='color: #6366f1; text-decoration: none; font-weight: 500;'>ecodservice.com</a>",
              },
              { icon: "2️⃣", text: "Click on Consultation" },
              {
                icon: "3️⃣",
                text: "Fill Personal and Service Details and Project Brief",
              },
              { icon: "4️⃣", text: "Use the coupon code at final Step" },
              { icon: "5️⃣", text: "Enjoy your discount!" },
            ]
              .map(
                (step) => `
              <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                <div style="font-size: 16px; margin-right: 12px; line-height: 1.5;">${step.icon}</div>
                <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.5;">${step.text}</p>
              </div>
            `
              )
              .join("")}
          </div>
          
          <!-- Support Section -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 1.5rem; margin-top: 2rem;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 0.5rem;">Need help with your order?</p>
            <p style="font-size: 15px; margin: 0;">
              <a href="mailto:support@ecodservice.com" 
                 style="color: #6366f1; text-decoration: none; font-weight: 500;">
                Contact our support team
              </a> or reply to this email
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 1.5rem; text-align: center; font-size: 13px; color: #6b7280;">
          <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} ECO Service. All rights reserved.</p>
          <p style="margin: 0; font-size: 12px;">123 Business Street, City, Country</p>
          
          <!-- Social Links -->
          <div style="margin-top: 16px;">
            <a href="#" style="display: inline-block; margin: 0 6px;"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="24" alt="Facebook"></a>
            <a href="#" style="display: inline-block; margin: 0 6px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter"></a>
            <a href="#" style="display: inline-block; margin: 0 6px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" alt="Instagram"></a>
          </div>
        </div>
      </div>
    </body>
    </html>
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
