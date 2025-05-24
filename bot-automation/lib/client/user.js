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
const headers = { "Content-Type": "application/json" };
export const UserServices = {
  //Get User info
  fetchUserData: async (options = {}) => {
    return fetchWithRetry(`/api/profile`, {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  updateUserPendingProfile: async (profile, options = {}) => {
    return fetchWithRetry("/api/profile", {
      method: "PUT",
      headers,
      credentials: "include",
      body: JSON.stringify(profile),
      ...options,
    });
  },
  checkCurrentPasswordIsvalid: async (password) => {
    return fetchWithRetry("/api/profile/update/change-password", {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(password),
    });
  },
  updateUserPassword: async (passwordData, options = {}) => {
    return fetchWithRetry("/api/profile/update/change-password", {
      method: "PUT",
      credentials: "include",
      headers,
      body: JSON.stringify(passwordData),
      ...options,
    });
  },
  // Profile page API's
  fetchUserProfile: async (options = {}) => {
    return fetchWithRetry("/api/profile/user", {
      method: "GET",
      credentials: "include",
      headers,
      ...options,
    });
  },
  updateUserProfile: async (profileData, options = {}) => {
    return fetchWithRetry("/api/profile/update", {
      credentials: "include",
      method: "PUT",
      headers,
      body: JSON.stringify(profileData),
      ...options,
    });
  },
  updateUserNotifications: async (data) => {
    return fetchWithRetry("/api/profile/user", {
      method: "PATCH",
      credentials: "include",
      headers,
      body: JSON.stringify(data),
    });
  },

  //Get Timezones
  getTimezone: async () => {
    return fetchWithRetry("/api/timezone", {
      method: "GET",
      headers,
      credentials: "include",
    });
  },
};
