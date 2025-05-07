// lib/billing.js
export const billingService = {
  getSubscription: async () => {
    return fetch("/api/profile/subscription", {
      method: "GET",
      credentials: "include",
    }).then(handleResponse);
  },

  createPaymentOrder: async (data) => {
    console.log(data);
    return fetch("/api/profile/subscription/create-payment-order", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  verifyPayment: async (paymentData) => {
    return fetch("/api/profile/subscription/verify-payment", {
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

  getPaymentHistory: async (userId) => {
    return fetch(`/api/profile/subscription/payment-history?user=${userId}`, {
      method: "GET",
      credentials: "include",
    }).then(handleResponse);
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
