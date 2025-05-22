// lib/client/team.js

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
export const WorkspaceService = {
  //Fetch Settings General Page
  getWorkspaceConfig: async (workspaceId, options = {}) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/settings`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  },
  updateWorkspaceConfig: async (workspaceId, formData) => {
    return fetchWithRetry(`/api/workspace/${workspaceId}/settings`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  },

  checkCurrentWorkspaceRole: async () => {
    const response = await fetch("/api/workspace", {
      method: "GET",
      credentials: "include",
    });
    return handleResponse(response);
  },
  getTeam: async () => {
    const response = await fetch("/api/workspace/team", {
      method: "GET",
      credentials: "include",
    });
    return handleResponse(response);
  },
  getCurrentUser: async () => {
    const res = await fetch("/api/profile/user-info", {
      method: "GET",
      credentials: "include",
    });
    return handleResponse(res);
  },
  getLimits: async () => {
    const response = await fetch("/api/workspace/team/limits", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
  },
  updateMemberRole: async (memberId, newRole) => {
    const response = await fetch(`/api/workspace/team/${memberId}/role`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    });
    return handleResponse(response);
  },

  updateMemberPermissions: async (memberId, permissions) => {
    const response = await fetch(
      `/api/workspace/team/${memberId}/permissions`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permissions }),
      }
    );
    return handleResponse(response);
  },

  removeMember: async (memberId) => {
    const response = await fetch(`/api/workspace/team/${memberId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
  },
};
