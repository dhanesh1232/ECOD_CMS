export async function handleEmailJob(job) {
  const { to, subject, html } = job.data;
  console.log(`📧 Sending email to ${to}: ${subject}`);
  // Here, you could use a service like Nodemailer or SendGrid
}
export async function handleSubscriptionJob(job) {
  const { userId, action } = job.data;
  console.log(
    `🔁 Processing subscription for user ${userId}, action: ${action}`
  );
}
