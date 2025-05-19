// app/chatbot/[botId]/page.js
"use client";
import { useEffect, useState } from "react";

export default function Chatbot({ params }) {
  const [bot, setBot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`/api/bot/${params.botId}`)
      .then((res) => res.json())
      .then(setBot);
  }, [params.botId]);

  const sendMessage = () => {
    const newMessages = [...messages, { sender: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", content: bot?.welcomeMessage },
      ]);
    }, 500);
  };

  if (!bot) return <div>Loading...</div>;

  return (
    <div className="fixed bottom-4 right-4 max-w-xs w-full bg-white border rounded-lg shadow-lg p-3">
      <h3 className="font-bold text-lg mb-2" style={{ color: bot.themeColor }}>
        {bot.name}
      </h3>
      <div className="h-60 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            <div className="bg-gray-100 inline-block px-3 py-1 rounded mb-1">
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message"
        className="w-full border px-2 py-1 rounded"
      />
    </div>
  );
}
