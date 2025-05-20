// lib/billing.js
export const billingService = {
  getSubscription: async (workspaceId) => {
    return fetch(`/api/workspace/${workspaceId}/subscription`, {
      method: "GET",
      credentials: "include",
    }).then(handleResponse);
  },

  createPaymentOrder: async (data, workspaceId) => {
    console.log(data);
    return fetch(
      `/api/workspace/${workspaceId}/subscription/create-payment-order`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    ).then(handleResponse);
  },

  verifyPayment: async (paymentData, workspaceId) => {
    return fetch(`/api/workspace/${workspaceId}/subscription/verify-payment`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_signature: paymentData.razorpay_signature,
        planId: paymentData.planId,
        currency: paymentData.currency,
        period: paymentData.period,
      }),
    }).then(handleResponse);
  },

  getPaymentHistory: async (workspace, workspaceId) => {
    return fetch(
      `/api/workspace/${workspaceId}/subscription/payment-history?workspace=${workspace}`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then(handleResponse);
  },

  cancelSubscription: async () => {
    return fetch("/api/subscription/cancel", {
      method: "POST",
      credentials: "include",
    }).then(handleResponse);
  },
};

function handleResponse(response) {
  return response.json().then((data) => {
    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }
    return data;
  });
}
