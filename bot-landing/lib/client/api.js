const headers = {
  "Content-Type": "application/json",
};
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return error || "Network response was not ok";
  }
  return response.json();
}

const fetchWithRetry = async (url, options, retries = 3) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    return error;
  }
};

export const LandingPageAPIHandles = {
  newsLetterUpdate: async (data, options = {}) => {
    return fetchWithRetry("/api/newsletter", {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(data),
      ...options,
    });
  },
  preNotifyConnect: async (data, options = {}) => {
    return fetchWithRetry("/api/notify", {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(data),
      ...options,
    });
  },
};
