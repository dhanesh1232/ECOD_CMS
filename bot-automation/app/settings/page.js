"use client";
import { useState } from "react";
const GeneralPage = () => {
  // State management examples
  const [chatHistory, setChatHistory] = useState(true);
  const [responseLength, setResponseLength] = useState(50);
  const [tone, setTone] = useState("casual");
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(true);

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
        <div className="space-y-4">
          {/* Response Length */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 dark:text-gray-200">
                Response Length
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {responseLength}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={responseLength}
              onChange={(e) => setResponseLength(Number(e.target.value))}
              className="w-full range-sm dark:range-dark"
            />
          </div>

          {/* Conversation Tone */}
          <div className="flex items-center justify-between">
            <span className="text-gray-800 dark:text-gray-200">
              Conversation Tone
            </span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="p-2 border rounded-lg bg-transparent text-gray-800 dark:text-gray-200"
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="technical">Technical</option>
            </select>
          </div>

          {/* Chat History */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 dark:text-gray-200">
                Save Chat History
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Store conversation history locally
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={chatHistory}
                onChange={(e) => setChatHistory(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          {/* Auto-translate */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 dark:text-gray-200">Auto-translate</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Translate responses automatically
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={autoTranslate}
                onChange={(e) => setAutoTranslate(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Real-Time Features */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Real-Time Settings
        </h2>
        <div className="space-y-4">
          {/* Typing Indicator */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 dark:text-gray-200">
                Typing Indicator
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Show when bot is typing
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={typingIndicator}
                onChange={(e) => setTypingIndicator(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          {/* Response Speed */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 dark:text-gray-200">
                Response Speed Priority
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Balance between speed and quality
              </p>
            </div>
            <select className="p-2 border rounded-lg bg-transparent text-gray-800 dark:text-gray-200">
              <option>Fast</option>
              <option>Balanced</option>
              <option>Detailed</option>
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
          <button className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Export Chat History
          </button>
          <button className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500">
            Clear All Chat Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;
