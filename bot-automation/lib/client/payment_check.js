import { billingService } from "./billing";

export const startWebhookPolling = (paymentId, workspaceId) => {
  const maxAttempts = 10;
  let attempts = 0;

  const poll = async () => {
    attempts++;
    try {
      const result = await billingService.checkWebhookConfirmation(
        workspaceId,
        paymentId
      );
      if (result.verified) {
        // Webhook confirmed - payment is definitely successful
        console.log("Webhook confirmation received");
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(poll, 3000); // Poll every 3 seconds
      } else {
        console.warn("Webhook confirmation not received after max attempts");
      }
    } catch (error) {
      console.error("Polling error:", error);
      if (attempts < maxAttempts) {
        setTimeout(poll, 3000);
      }
    }
  };

  // Start polling after a slight delay
  setTimeout(poll, 5000);
};
