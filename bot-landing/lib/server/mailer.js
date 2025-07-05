import nodemailer from "nodemailer";

export const sendMail = async ({
  to,
  subject,
  html,
  fromName = "ECODrIx Support",
  fromMail = "support@ecodrix.com",
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_AUTH_USER_MAIL,
      pass: process.env.ZOHO_AUTH_APP_PASSWORD,
    },
  });
  const res = await transporter.sendMail({
    from: `"${fromName}" <${fromMail}>`,
    to,
    subject,
    html,
    headers: {
      "X-Mailer": "ECODrIx Mailer",
      "List-Unsubscribe":
        "<mailto:unsubscribe@ecodrix.com>, <https://ecodrix.com/unsubscribe>",
    },
  });
  return res;
};
