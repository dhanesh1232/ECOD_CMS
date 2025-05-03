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
      body: JSON.stringify(paymentData),
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
