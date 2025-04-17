"use client";

import { useState } from "react";
import {
  FiCode,
  FiCopy,
  FiTrash2,
  FiPlus,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function ApiAccessPage() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Production",
      key: "sk_live_51Jd...W3i",
      lastUsed: "2 hours ago",
      visible: false,
    },
    {
      id: 2,
      name: "Development",
      key: "sk_test_51Jd...X2j",
      lastUsed: "1 week ago",
      visible: false,
    },
  ]);
  const [newKeyName, setNewKeyName] = useState("");

  const toggleKeyVisibility = (id) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, visible: !key.visible } : key
      )
    );
  };

  const generateNewKey = () => {
    if (!newKeyName.trim()) return;

    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: "sk_new_" + Math.random().toString(36).substring(2, 10) + "...",
      lastUsed: "Never",
      visible: true,
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
  };

  const deleteKey = (id) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiCode className="mr-2" /> API Access
      </h1>

      {/* Documentation */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6 border-b">
          <h2 className="font-medium text-lg">API Documentation</h2>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            <h3 className="font-medium text-lg mb-2">Getting Started</h3>
            <p className="mb-4">
              Use our REST API to integrate your chatbot with external systems.
              All API requests must be authenticated with your API key.
            </p>

            <h3 className="font-medium text-lg mb-2">Base URL</h3>
            <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
              https://api.chatbot.com/v1
            </div>

            <h3 className="font-medium text-lg mb-2">Example Request</h3>
            <div className="bg-gray-800 text-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
              <span className="text-blue-300">curl</span> -X GET \<br />
              -H{" "}
              <span className="text-green-300">
                {`"Authorization: Bearer YOUR_API_KEY"`}
              </span>{" "}
              \<br />
              -H{" "}
              <span className="text-green-300">
                {`"Content-Type: application/json"`}
              </span>{" "}
              \<br />
              https://api.chatbot.com/v1/conversations
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              View Full Documentation
            </button>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-medium text-lg">API Keys</h2>
          <p className="text-sm text-gray-500">
            Manage your API keys for authentication
          </p>
        </div>

        <div className="p-6">
          {/* Create New Key */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="New key name"
              className="flex-1 border rounded-lg px-4 py-2 mr-2"
            />
            <button
              onClick={generateNewKey}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <FiPlus className="mr-2" /> Generate New Key
            </button>
          </div>

          {/* Key List */}
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{key.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      {key.visible ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="font-mono text-sm">
                    {key.visible ? key.key : "••••••••••••••••"}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(key.key)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <FiCopy size={18} />
                  </button>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Last used: {key.lastUsed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
