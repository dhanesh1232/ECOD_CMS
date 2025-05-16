"use client";
import { useState, useEffect } from "react";
import { ChevronRight, Download, Trash2 } from "lucide-react";
import useSWR from "swr";
import { useToast } from "@/components/ui/toast-provider";
import { useParams } from "next/navigation";

const ToggleSwitch = ({ id, checked, onChange, disabled = false }) => {
  return (
    <label
      htmlFor={id}
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        id={id}
        className="sr-only peer"
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};
const GeneralPage = () => {
  const showToast = useToast();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [userRole, setUserRole] = useState("member");

  const fetcher = async (url) => {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) {
      const error = new Error("An error occurred");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  };
  // Fetch user and workspace data
  const { data: userData } = useSWR("/api/profile/user-info", fetcher);
  const { data: workspaceData, mutate: mutateWorkspace } = useSWR(
    userData?.user?.currentWorkspace?.id
      ? `/api/workspace/${userData?.user?.currentWorkspace?._id}`
      : null,
    fetcher
  );

  useEffect(() => {
    console.log(workspaceData, userData);
    if (workspaceData && userData) {
      const role =
        userData?.user?.workspaces.find(
          (ws) => ws.workspace === workspaceData._id
        )?.role || "member";
      setUserRole(role);
      setCurrentWorkspace(workspaceData);
    }
  }, [workspaceData, userData]);

  const getWorkspaceSettings = () => {
    return userData?.user?.workspaces.find(
      (ws) => ws.workspace._id === currentWorkspace._id
    )?.settings;
  };

  const hasPermission = (requiredRole) => {
    const roleHierarchy = ["owner", "admin", "member", "guest"];
    return (
      roleHierarchy.indexOf(userRole) <= roleHierarchy.indexOf(requiredRole)
    );
  };

  const handleWorkspaceUpdate = async (key, value) => {
    try {
      await fetch(`/api/workspace/${currentWorkspace._id}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      mutateWorkspace({
        ...currentWorkspace,
        settings: {
          ...currentWorkspace.settings,
          [key]: value,
        },
      });
    } catch (error) {
      showToast({ variant: "destructive", title: "Failed to update settings" });
    }
  };
  const getWorkspaceSetting = (path, defaultValue) => {
    const paths = path.split(".");
    let result = currentWorkspace?.settings;

    for (const p of paths) {
      result = result?.[p];
      if (result === undefined) return defaultValue;
    }

    return result ?? defaultValue;
  };

  const handleSettingUpdate = async (type, key, value) => {
    try {
      await fetch(`/api/workspaces/${currentWorkspace._id}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settingKey: `${type}.${key}`,
          value,
        }),
      });

      // Optimistic update
      mutateWorkspace({
        ...currentWorkspace,
        settings:
          type === "workspace"
            ? { ...currentWorkspace.settings, [key]: value }
            : currentWorkspace.settings,
      });

      mutateUser({
        ...userData,
        workspaces: userData.workspaces.map((ws) =>
          ws.workspace._id === currentWorkspace._id
            ? { ...ws, settings: { ...ws.settings, [key]: value } }
            : ws
        ),
      });
    } catch (error) {
      showToast({ variant: "destructive", title: "Update failed" });
    }
  };
  // Add missing handler functions in your component
  const handleDataExport = async () => {
    try {
      const res = await fetch(`/api/workspace/${currentWorkspace._id}/export`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      showToast({ variant: "destructive", title: "Export failed" });
    }
  };

  const handleWorkspaceDeletion = async () => {
    if (!confirm("Are you sure you want to delete this workspace?")) return;
    try {
      await fetch(`/api/workspace/${currentWorkspace._id}`, {
        method: "DELETE",
      });
      window.location.href = `/${workspaceId}`;
    } catch (error) {
      showToast({ variant: "destructive", title: "Deletion failed" });
    }
  };

  if (!currentWorkspace || !userData) return <div>Loading...</div>;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        {currentWorkspace.name} Settings
      </h1>

      {/* Chat Behavior */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Chat Preferences
        </h2>
        <div className="space-y-6">
          {/* Response Length */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Response Length
              </label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentWorkspace.settings.chat.responseLength}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={currentWorkspace.settings.chat.responseLength}
              onChange={(e) =>
                handleWorkspaceUpdate(
                  "chat.responseLength",
                  Number(e.target.value)
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              disabled={!hasPermission("admin")}
            />
          </div>

          {/* Conversation Tone */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Conversation Tone
            </label>
            <select
              value={currentWorkspace.settings.chat.tone}
              onChange={(e) =>
                handleWorkspaceUpdate("chat.tone", e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[180px]"
              disabled={!hasPermission("admin")}
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="technical">Technical</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {/* Chat History */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Save Chat History
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Store conversation history locally
              </p>
            </div>
            <ToggleSwitch
              checked={getWorkspaceSettings()?.chatHistory ?? true}
              onChange={(val) =>
                handleSettingUpdate("user", "chatHistory", val)
              }
            />
          </div>

          {/* Real-Time Features */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Real-Time Sync
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable live collaboration
              </p>
            </div>
            <ToggleSwitch
              checked={getWorkspaceSetting("realtime.enabled", true)}
              onChange={(val) => handleWorkspaceUpdate("realtime.enabled", val)}
              disabled={!hasPermission("admin")}
            />
          </div>
        </div>
      </div>

      {/* Workspace Management */}
      {hasPermission("admin") && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Workspace Configuration
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Multi-Language Support
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable auto-translation for multilingual teams
                </p>
              </div>
              <ToggleSwitch
                checked={currentWorkspace.settings.localization.enabled}
                onChange={(val) =>
                  handleWorkspaceUpdate("localization.enabled", val)
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Data Retention Policy
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically delete old conversations after{" "}
                  {currentWorkspace.settings.retentionDays} days
                </p>
              </div>
              <input
                type="number"
                value={currentWorkspace.settings.retentionDays}
                onChange={(e) =>
                  handleWorkspaceUpdate("retentionDays", Number(e.target.value))
                }
                className="w-20 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                min="1"
                max="365"
              />
            </div>
          </div>
        </div>
      )}

      {/* Data Management */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Data Management
        </h2>
        <div className="space-y-4">
          <button
            className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => handleDataExport()}
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-300">
                Export Workspace Data
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          {hasPermission("owner") && (
            <button
              className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              onClick={() => handleWorkspaceDeletion()}
            >
              <div className="flex items-center gap-3">
                <Trash2 className="h-5 w-5" />
                <span>Delete Workspace</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Advanced Settings */}
      {hasPermission("admin") && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Advanced Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  API Access
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable third-party integrations
                </p>
              </div>
              <ToggleSwitch
                checked={currentWorkspace.settings.apiAccess}
                onChange={(val) => handleWorkspaceUpdate("apiAccess", val)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Audit Logging
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track all workspace activities
                </p>
              </div>
              <ToggleSwitch
                checked={currentWorkspace.settings.auditLogs}
                onChange={(val) => handleWorkspaceUpdate("auditLogs", val)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralPage;
