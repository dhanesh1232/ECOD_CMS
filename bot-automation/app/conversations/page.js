"use client";

import { useState } from "react";
import ChatList from "@/components/conversations/ChatList";
import ChatWindow from "@/components/conversations/ChatWindow";

export default function ConversationsPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-full relative">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 absolute left-0">
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div className="w-2/3 absolute right-0 h-full">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
