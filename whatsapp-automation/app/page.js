"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ChatWidget() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add user message immediately
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");

      // Send to your API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          Body: input,
          From: "web-widget", // Mock sender for web chat
          platform: "web",
        }),
      });

      if (!response.ok) throw new Error("Failed to send");

      const data = await response.text();
      setMessages((prev) => [...prev, { text: data, sender: "bot" }]);
    } catch (error) {
      console.error("Send failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, something went wrong",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSend = async () => {
    const res = await fetch("/api/twilio/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <>
      <div className="flex items-center justify-center gap-2 h-screen">
        <input
          type="text"
          placeholder="Enter Number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-64 rounded-md bg-gray-200 placeholder:text-blue-600 border-gray-800"
        />
        <button
          type="button"
          onClick={onSend}
          className="bg-blue-500 text-white p-2 px-6 rounded-md"
        >
          Send
        </button>
      </div>
      <div className="hidden bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white">Chat Support</div>
        <div className="h-64 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${msg.sender === "user" ? "text-right" : ""}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center py-2">
              <div className="inline-block animate-pulse">...</div>
            </div>
          )}
          {error && <div className="text-red-500 text-sm p-2">{error}</div>}
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border rounded-l-lg p-2"
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 rounded-r-lg disabled:bg-blue-300"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}
