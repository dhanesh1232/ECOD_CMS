"use client";

import ChatbotCard from "@/components/chatbots/ChatbotCard";
import { useState } from "react";
import NewChatbotModal from "@/components/chatbots/NewChatbotModal";
import { useRouter } from "next/navigation";

export default function MyChatbotsPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const chatbots = [
    { id: 1, name: "Shop Support Bot", platform: "WhatsApp", status: "active" },
    {
      id: 2,
      name: "Insta Inquiry Bot",
      platform: "Instagram",
      status: "inactive",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Chatbots</h1>
        <button
          onClick={() => router.push("/new")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + New Chatbot
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chatbots.map((bot) => (
          <ChatbotCard key={bot.id} bot={bot} />
        ))}
      </div>

      {showModal && <NewChatbotModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
