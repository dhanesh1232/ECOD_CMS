"use client";
import { useState } from "react";

export default function MessageComposer() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    // Send message logic
    setTimeout(() => {
      setIsSending(false);
      setMessage("");
    }, 1000);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          placeholder="Type your message here..."
          required
        />
        <div className="mt-3 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <span className="text-lg">📎</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <span className="text-lg">😊</span>
            </button>
          </div>
          <button
            type="submit"
            disabled={isSending}
            className={`px-4 py-2 rounded-lg text-white ${
              isSending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
