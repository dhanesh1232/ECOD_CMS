async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Network response was not ok");
  }
  return response.json();
}

export const WorkspaceService = {
  checkCurrentWorkspaceRole: async () => {
    const response = await fetch("/api/workspace", {
      methos: "GET",
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
