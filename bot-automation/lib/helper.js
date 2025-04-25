import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});
export function VerificationMail(verificationCode, email) {
  transporter.sendMail({
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to: email,
    subject: "Verify your account",
    html: `<p>Your verification code: <strong>${verificationCode}</strong></p>
           <p>Or click this link: <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-account?email=${email}&code=${verificationCode}">Verify Account</a></p>`,
  });
}
