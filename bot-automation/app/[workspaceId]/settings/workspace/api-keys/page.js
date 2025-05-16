// app/settings/workspace/api-keys/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useToast } from "@/components/ui/toast-provider";
import { encryptData } from "@/utils/encryption";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Calendar,
  Check,
  Clipboard,
  Clock,
  Key,
  LocateIcon,
  Plus,
  RefreshCcw,
  Trash,
  X,
} from "lucide-react";
import copy from "copy-to-clipboard";

// Constants for scopes to avoid magic strings
const SCOPES = {
  READ: "read",
  WRITE: "write",
  ADMIN: "admin",
  CHAT: "chat",
  ANALYTICS: "analytics",
};

const ALL_SCOPES = Object.values(SCOPES);

// API key status for better state management
const API_KEY_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function ApiKeysPage() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const showToast = useToast();

  const [apiKeys, setApiKeys] = useState([]);
  const [status, setStatus] = useState(API_KEY_STATUS.IDLE);
  const [showKey, setShowKey] = useState(null);
  const [model, setModel] = useState(null);
  const [newKeyData, setNewKeyData] = useState({
    name: "",
    scopes: [SCOPES.READ],
  });
  const [newKeyCreated, setNewKeyCreated] = useState(null);

  // Check for modal query param
  useEffect(() => {
    const pop = searchParams.get("workspace_model");
    if (pop?.startsWith("api_keyECOD")) {
      setModel(pop);
    } else {
      setModel(null);
    }
  }, [searchParams]);

  // Handle encrypted query for modal
  const handleEncryptedQuery = (mode) => {
    if (mode) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(
        "workspace_model",
        `api_keyECOD${encodeURIComponent(encryptData(workspaceId))}`
      );
      router.push(
        `/${workspaceId}/settings/workspace/api-keys?${newParams.toString()}`,
        { scroll: false }
      );
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("workspace_model");
      router.replace(`${pathname}?${newParams.toString()}`);
    }
  };

  // Fetch API keys with error handling and status tracking
  const fetchApiKeys = useCallback(async () => {
    try {
      setStatus(API_KEY_STATUS.LOADING);
      const response = await fetch(`/api/workspace/${workspaceId}/api-key`);

      if (!response.ok) {
        throw new Error("Failed to fetch API keys");
      }

      const data = await response.json();
      setApiKeys(data);
      setStatus(API_KEY_STATUS.SUCCESS);
    } catch (error) {
      console.error("Error fetching API keys:", error);
      showToast({
        description: error.message || "Failed to load API keys",
        variant: "warning",
      });
      setStatus(API_KEY_STATUS.ERROR);
    }
  }, [showToast, workspaceId]);

  // Fetch API keys when session or workspaceId changes
  useEffect(() => {
    if (session && workspaceId) {
      fetchApiKeys();
    }
  }, [session, workspaceId, fetchApiKeys]);

  // Create a new API key
  const handleCreateKey = async () => {
    if (!newKeyData.name) {
      showToast({
        description: "Please provide a name for the API key",
        variant: "warning",
      });
      return;
    }

    try {
      setStatus(API_KEY_STATUS.LOADING);
      const response = await fetch(`/api/workspace/${workspaceId}/api-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKeyData),
      });

      if (!response.ok) {
        throw new Error("Failed to create API key");
      }

      const data = await response.json();
      setNewKeyCreated(data);
      await fetchApiKeys();

      showToast({
        description: "API key created successfully",
        variant: "success",
      });
      handleEncryptedQuery(false);

      // Reset form
      setNewKeyData({
        name: "",
        scopes: [SCOPES.READ],
      });
    } catch (error) {
      console.error("Error creating API key:", error);
      showToast({
        description: error.message || "Failed to create API key",
        variant: "warning",
      });
    } finally {
      setStatus(API_KEY_STATUS.IDLE);
    }
  };

  // Rotate an existing API key
  const handleRotateKey = async (id) => {
    if (
      !confirm(
        "Are you sure you want to rotate this API key? Any applications using the current key will need to be updated."
      )
    ) {
      return;
    }

    try {
      setStatus(API_KEY_STATUS.LOADING);
      const response = await fetch(
        `/api/workspace/${workspaceId}/api-key/${id}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to rotate API key");
      }

      const data = await response.json();
      setShowKey({ id, key: data.key });
      await fetchApiKeys();

      showToast({
        description: "API key rotated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error rotating API key:", error);
      showToast({
        description: error.message || "Failed to rotate API key",
        variant: "warning",
      });
    } finally {
      setStatus(API_KEY_STATUS.IDLE);
    }
  };

  // Delete an API key
  const handleDeleteKey = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this API key? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setStatus(API_KEY_STATUS.LOADING);
      const response = await fetch(
        `/api/workspace/${workspaceId}/api-key/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete API key");
      }

      await fetchApiKeys();
      showToast({
        description: "API key deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting API key:", error);
      showToast({
        description: error.message || "Failed to delete API key",
        variant: "warning",
      });
    } finally {
      setStatus(API_KEY_STATUS.IDLE);
    }
  };

  // Toggle scope selection
  const toggleScope = (scope) => {
    setNewKeyData((prev) => ({
      ...prev,
      scopes: prev.scopes.includes(scope)
        ? prev.scopes.filter((s) => s !== scope)
        : [...prev.scopes, scope],
    }));
  };

  // Loading state
  if (status === API_KEY_STATUS.LOADING && !apiKeys.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-gray-500">Loading API keys...</span>
      </div>
    );
  }

  // Error state
  if (status === API_KEY_STATUS.ERROR && !apiKeys.length) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-center p-4">
        <ExclamationCircleIcon className="h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Failed to load API keys
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {`We couldn't load your API keys. Please try again.`}
        </p>
        <button
          onClick={fetchApiKeys}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header section */}
        <div className="border-b border-gray-200 pb-4 flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
          <div className="md:w-1/2 w-full">
            <h1 className="text-2xl font-semibold text-gray-900">API Keys</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage API keys for your workspace. These keys allow external
              services to access your workspace data securely.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleEncryptedQuery(true)}
            className="inline-flex justify-center w-full md:w-auto items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create API Key
          </button>
        </div>

        {/* New key success notification */}
        {newKeyCreated && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-green-800">
                  API Key Created Successfully
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    {`Your new API key is shown below. Make sure to copy it now -
                    you won't be able to see it again!`}
                  </p>
                  <div className="mt-3 flex items-center">
                    <div className="flex-1 bg-green-100 px-3 py-2 rounded-md overflow-x-auto">
                      <code className="text-sm font-mono break-all">
                        {newKeyCreated.key}
                      </code>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        copy(newKeyCreated.key);
                        showToast({
                          description: "Copied to clipboard",
                          variant: "success",
                        });
                      }}
                      className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Clipboard className="mr-1 h-4 w-4" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-auto pl-3">
                <button
                  type="button"
                  onClick={() => setNewKeyCreated(null)}
                  className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* API keys list */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {apiKeys.length === 0 ? (
            <div className="text-center p-8">
              <Key className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No API keys
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new API key.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => handleEncryptedQuery(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="mr-2 -ml-1 h-5 w-5" />
                  Create API Key
                </button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {apiKeys.map((apiKey) => (
                <li key={apiKey._id} className="px-4 py-4 sm:px-6">
                  <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between">
                    {/* Key info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {apiKey.name || "Unnamed Key"}
                        </p>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {apiKey.prefix}...
                        </span>
                      </div>

                      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>
                            Created{" "}
                            {new Date(
                              apiKey.metadata.createdAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <LocateIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>
                            Scopes:{" "}
                            <span className="font-medium">
                              {apiKey.scopes.join(", ")}
                            </span>
                          </span>
                        </div>

                        {apiKey.expiresAt && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <span>
                              Expires{" "}
                              {new Date(apiKey.expiresAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Key actions */}
                    <div className="flex-shrink-0 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRotateKey(apiKey._id)}
                        disabled={status === API_KEY_STATUS.LOADING}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RefreshCcw className="mr-1 h-4 w-4" />
                        Rotate
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteKey(apiKey._id)}
                        disabled={status === API_KEY_STATUS.LOADING}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash className="mr-1 h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Rotated key warning */}
                  {showKey?.id === apiKey._id && (
                    <div className="mt-4 bg-yellow-50 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Your new API key
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              {`Make sure to copy your new API key now. You won't
                              be able to see it again!`}
                            </p>
                            <div className="mt-3 flex items-center">
                              <div className="flex-1 bg-yellow-100 px-3 py-2 rounded-md overflow-x-auto">
                                <code className="text-sm font-mono break-all">
                                  {showKey.key}
                                </code>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  copy(showKey.key);
                                  showToast({
                                    description: "Copied to clipboard",
                                    variant: "success",
                                  });
                                }}
                                className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <Clipboard className="mr-1 h-4 w-4" />
                                Copy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Create API Key Modal */}
      {model && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <Key className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Create New API Key
                  </h3>
                  <div className="mt-4">
                    <div className="space-y-4">
                      {/* Key name */}
                      <div>
                        <label
                          htmlFor="key-name"
                          className="block text-sm font-medium text-gray-700 text-left"
                        >
                          Key Name
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="key-name"
                            id="key-name"
                            value={newKeyData.name}
                            onChange={(e) =>
                              setNewKeyData({
                                ...newKeyData,
                                name: e.target.value,
                              })
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2 border outline-none"
                            placeholder="e.g. Production Server"
                            required
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Give this key a descriptive name to identify its
                          purpose.
                        </p>
                      </div>

                      {/* Scopes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">
                          Permissions
                        </label>
                        <div className="mt-2 space-y-2">
                          {ALL_SCOPES.map((scope) => (
                            <div
                              key={scope}
                              className="relative flex items-start"
                            >
                              <div className="flex items-center h-5">
                                <input
                                  id={`scope-${scope}`}
                                  name={`scope-${scope}`}
                                  type="checkbox"
                                  checked={newKeyData.scopes.includes(scope)}
                                  onChange={() => toggleScope(scope)}
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor={`scope-${scope}`}
                                  className="font-medium text-gray-700"
                                >
                                  {scope.charAt(0).toUpperCase() +
                                    scope.slice(1)}
                                </label>
                                <p className="text-xs text-gray-500">
                                  {scope === SCOPES.READ && "Read-only access"}
                                  {scope === SCOPES.WRITE && "Write access"}
                                  {scope === SCOPES.ADMIN &&
                                    "Administrative privileges"}
                                  {scope === SCOPES.CHAT &&
                                    "Access to chat features"}
                                  {scope === SCOPES.ANALYTICS &&
                                    "Access to analytics data"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Select only the permissions this key needs to
                          function.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  disabled={
                    !newKeyData.name || status === API_KEY_STATUS.LOADING
                  }
                  onClick={handleCreateKey}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm ${
                    !newKeyData.name || status === API_KEY_STATUS.LOADING
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {status === API_KEY_STATUS.LOADING ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Key"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleEncryptedQuery(false)}
                  disabled={status === API_KEY_STATUS.LOADING}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
