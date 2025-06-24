// lib/billing.js
const headers = { "Content-Type": "application/json" };

async function handleResponse(res) {
  // Response handle section
  if (!res.ok) {
    return res;
  }
  return await res.json();
}

const fetchWithRetry = async (url, options, retries = 3) => {
  // API Call from here to fecth data via api with multi retries
  try {
    const res = await fetch(url, options);
    return await handleResponse(res);
  } catch (err) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    return err;
  }
};
// All API calls
export const billingService = {
  getSubscription: async (workspaceId, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/subscription`, {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  getPlanDetails: async (workspaceId, planId, options = {}) => {
    return fetchWithRetry(
      `/api/workspace/${workspaceId}/subscription/plans/${planId}`,
      {
        method: "GET",
        credentials: "include",
        headers,
        ...options,
      }
    );
  },
  createBillingProfile: async (workspaceId, data, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/billing`, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(data),
      ...options,
    });
  },
  getBillingProfile: async (workspaceId, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/billing`, {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  updateBillingProfile: async (workspaceId, data, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/billing`, {
      method: "PUT",
      credentials: "include",
      headers,
      body: JSON.stringify(data),
      ...options,
    });
  },
  validateCoupon: async (workspaceId, couponCode, plan, options = {}) => {
    return fetchWithRetry(
      `/api/workspace/${workspaceId}/subscription/validate-coupon?coupon=${couponCode}&plan=${plan}`,
      {
        method: "GET",
        credentials: "include",
        headers,
        ...options,
      }
    );
  },
  createPaymentOrder: async (workspaceId, data, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/subscription/create`, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(data),
      ...options,
    });
  },
  updateFailedPayment: async (workspaceId, id, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/subscription/failed`, {
      method: "PUT",
      credentials: "include",
      headers,
      body: JSON.stringify({ id }),
      ...options,
    });
  },
  verifyPayment: async (workspaceId, paymentData, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/subscription/verify`, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(paymentData),
      ...options,
    });
  },
  checkWebhookConfirmation: async (workspaceId, paymentId, options = {}) => {
    return fetchWithRetry(
      `/api/workspace/${workspaceId}/subscription/confirm/${paymentId}`,
      {
        method: "GET",
        credentials: "include",
        ...options,
      }
    );
  },
  getPaymentHistory: async (workspaceId, options = {}) => {
    return fetchWithRetry(
      `/api/workspace/${workspaceId}/subscription/history`,
      {
        method: "GET",
        headers,
        credentials: "include",
        ...options,
      }
    );
  },

  cancelSubscription: async () => {
    return fetch("/api/subscription/cancel", {
      method: "POST",
      credentials: "include",
    }).then(handleResponse);
  },
};
