const headers = { "Content-Type": "application/json" };

async function handleResponse(res) {
  if (!res.ok) {
    return res;
  }
  return res.json();
}

const fetchWithRetry = async (url, options, retries = 3) => {
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

export const AdminServices = {
  getPlans: async (options = {}) => {
    return fetchWithRetry("/api/admin/plans", {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  getPlan: async (planId, id, options = {}) => {
    return fetchWithRetry(`/api/admin/plans/${planId}?id=${id}`, {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  updatePlanChanges: async (planId, id, options = {}) => {
    return fetchWithRetry(`/api/admin/plans/${planId}?id=${id}`, {
      method: "PUT",
      credentials: "include",
      headers,
      ...options,
    });
  },
  // SubscriptionData
  getSubscriptionData: async (options = {}) => {
    return fetchWithRetry("/api/admin/subscription", {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
};
