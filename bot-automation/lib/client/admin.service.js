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
  // Coupon Handles
  fetchCouponRules: async (options = {}) => {
    return fetchWithRetry("/api/admin/coupons/rules", {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  generateCouponCode: async (options = {}) => {
    return fetchWithRetry("/api/admin/coupons/generate-code", {
      method: "POST",
      headers,
      credentials: "include",
      ...options,
    });
  },
  createCoupon: async (formData, options = {}) => {
    return fetchWithRetry(`/api/admin/coupons/create`, {
      method: "POST",
      credentials: "include",
      headers,
      ...options,
      body: JSON.stringify(formData),
    });
  },
  getCoupon: async (couponId, options = {}) => {
    return fetchWithRetry(`/api/admin/coupons/${couponId}`, {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  getCouponUsage: async (couponId, options = {}) => {
    return fetchWithRetry(`/api/admin/coupons/${couponId}/usage`, {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  deleteAllCoupons: async (options = {}) => {
    return fetchWithRetry(`/api/admin/coupons`, {
      method: "DELETE",
      credentials: "include",
      headers,
      ...options,
    });
  },
  deleteCoupon: async (couponId, options = {}) => {
    return fetchWithRetry(`/api/admin/coupons/${couponId}`, {
      method: "DELETE",
      credentials: "include",
      headers,
      ...options,
    });
  },
  updateCouponStatus: async (couponId, newStatus, options = {}) => {
    return fetchWithRetry(`/api/admin/coupons/${couponId}/status`, {
      method: "PUT",
      credentials: "include",
      headers,
      ...options,
      body: JSON.stringify({ status: newStatus }),
    });
  },
  updateCoupon: async (couponId, formData, options = {}) => {
    return fetchWithRetry(`/api/admin/coupons/${couponId}`, {
      method: "PUT",
      credentials: "include",
      headers,
      ...options,
      body: JSON.stringify(formData),
    });
  },

  //Cron jobs
  updateCouponStatusCron: async (options = {}) => {
    return fetchWithRetry(`/api/admin/cron/coupon`, {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
};
