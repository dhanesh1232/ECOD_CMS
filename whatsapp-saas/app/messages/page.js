'use client";';

import MessageList from "@/components/MessageList";
import MessageComposer from "@/components/MessageComposer";
import ContactSelector from "@/components/ContactSelector";

export default function Messages() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">Message Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white p-3 rounded-lg shadow">
          <ContactSelector />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <MessageComposer />
          <MessageList />
        </div>
      </div>
    </div>
  );
}
