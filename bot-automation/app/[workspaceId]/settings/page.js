"use client";
import { useState } from "react";
import { ChevronRight, FileText, Shield, Download, Trash2 } from "lucide-react";

const GeneralPage = () => {
  const [settings, setSettings] = useState({
    chatHistory: true,
    responseLength: 50,
    tone: "casual",
    autoTranslate: false,
    typingIndicator: true,
    responseSpeed: "balanced",
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Chat Settings
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
              <label
                htmlFor="responseLength"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Response Length
              </label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {settings.responseLength}%
              </span>
            </div>
            <input
              type="range"
              id="responseLength"
              min="20"
              max="100"
              value={settings.responseLength}
              onChange={(e) =>
                handleChange("responseLength", Number(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          {/* Conversation Tone */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Conversation Tone
            </label>
            <select
              value={settings.tone}
              onChange={(e) => handleChange("tone", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[180px]"
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
              <label
                htmlFor="chatHistory"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Save Chat History
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Store conversation history locally
              </p>
            </div>
            <ToggleSwitch
              id="chatHistory"
              checked={settings.chatHistory}
              onChange={(val) => handleChange("chatHistory", val)}
            />
          </div>

          {/* Auto-translate */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <label
                htmlFor="autoTranslate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Auto-translate
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Translate responses automatically
              </p>
            </div>
            <ToggleSwitch
              id="autoTranslate"
              checked={settings.autoTranslate}
              onChange={(val) => handleChange("autoTranslate", val)}
            />
          </div>
        </div>
      </div>

      {/* Real-Time Features */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Real-Time Settings
        </h2>
        <div className="space-y-6">
          {/* Typing Indicator */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <label
                htmlFor="typingIndicator"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Typing Indicator
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Show when bot is typing
              </p>
            </div>
            <ToggleSwitch
              id="typingIndicator"
              checked={settings.typingIndicator}
              onChange={(val) => handleChange("typingIndicator", val)}
            />
          </div>

          {/* Response Speed */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Response Speed Priority
            </label>
            <select
              value={settings.responseSpeed}
              onChange={(e) => handleChange("responseSpeed", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[180px]"
            >
              <option value="fast">Fast</option>
              <option value="balanced">Balanced</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Data Management
        </h2>
        <div className="space-y-4">
          <button className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-300">
                Export Chat History
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          <button className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="h-5 w-5" />
              <span>Clear All Chat Data</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Advanced Settings */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Advanced Settings
        </h2>
        <div className="space-y-4">
          <button className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-300">
                Privacy Policy
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          <button className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5" />
              <span className="text-gray-700 dark:text-gray-300">
                Data Security
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom ToggleSwitch component to replace the missing Switch
const ToggleSwitch = ({ id, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id={id}
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

export default GeneralPage;
