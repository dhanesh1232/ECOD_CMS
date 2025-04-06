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
  userName,
  serviceName
) => {
  try {
    const mailOptions = {
      from: `"ECOD Service" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: toEmail,
      subject: `Your Verification Code for ${serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                .gradient-bg {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                }
                .gradient-btn {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                }
                .gradient-code {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            </style>
        </head>
        <body class="font-['Poppins'] bg-gray-50">
            <div class="max-w-2xl mx-auto my-5">
                <!-- Header -->
                <div class="gradient-bg py-8 px-6 text-center text-white rounded-t-xl">
                    <div class="text-3xl font-bold mb-2">ECOD SERVICE</div>
                    <h2 class="text-2xl font-semibold">Secure Your Account</h2>
                </div>
                
                <!-- Content -->
                <div class="bg-white px-8 py-8 rounded-b-xl shadow-lg">
                    <!-- Greeting -->
                    <p class="text-lg mb-5">Hello ${userName},</p>
                    
                    <p class="mb-6 text-gray-700">Thank you for choosing <strong class="font-semibold">ECOD Service</strong> for ${serviceName}. We're excited to have you on board!</p>
                    
                    <!-- Service Info -->
                    <div class="bg-emerald-50 border-l-4 border-emerald-500 py-4 px-5 mb-6 rounded-r-lg">
                        <p class="text-gray-800">You're signing up for: <span class="font-semibold text-emerald-800">${serviceName}</span></p>
                    </div>
                    
                    <p class="mb-4 text-gray-700">To complete your verification, please use the following code:</p>
                    
                    <!-- Verification Code -->
                    <div class="bg-gray-50 border border-dashed border-gray-300 py-6 px-5 mb-8 rounded-lg text-center">
                        <p class="text-gray-600 mb-3">Your verification code:</p>
                        <div class="gradient-code text-4xl font-bold tracking-wider my-4">${verificationCode}</div>
                        <p class="text-red-600 font-medium">Expires in 10 minutes</p>
                    </div>
                    
                    <!-- Features -->
                    <div class="mb-8">
                        <p class="text-gray-800 mb-4">With ${serviceName}, you'll enjoy:</p>
                        
                        <div class="flex items-start mb-3">
                            <div class="text-blue-500 mr-3 text-xl">✓</div>
                            <p class="text-gray-700">Secure and reliable service with end-to-end encryption</p>
                        </div>
                        <div class="flex items-start mb-3">
                            <div class="text-blue-500 mr-3 text-xl">✓</div>
                            <p class="text-gray-700">24/7 customer support for all your needs</p>
                        </div>
                        <div class="flex items-start">
                            <div class="text-blue-500 mr-3 text-xl">✓</div>
                            <p class="text-gray-700">Regular updates and feature enhancements</p>
                        </div>
                    </div>
                    
                    <p class="mb-6 text-gray-700">Once verified, you'll have full access to all features and benefits of our service.</p>
                    
                    <!-- CTA Button -->
                    <div class="text-center mb-8">
                        <a href="#" class="gradient-btn inline-block py-3 px-8 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200">Get Started Now</a>
                    </div>
                    
                    <!-- Support -->
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <p class="text-sm text-gray-600">Need help or have questions? Contact our support team at <a href="mailto:support@ecodservice.com" class="text-blue-500 hover:underline">support@ecodservice.com</a></p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="text-center py-6 text-sm text-gray-500 mt-4">
                    <p>&copy; ${new Date().getFullYear()} ECO Service. All rights reserved.</p>
                    <p class="mt-1">123 Business Ave, Tech City, TC 10001</p>
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
    console.error("Error sending email:", error);
    return false;
  }
};
