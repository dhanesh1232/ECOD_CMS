"use client";

import { DynamicIcon } from "lucide-react/dynamic";
export default function Home() {
  return (
    <div className="bg-white flex-col dark:bg-gray-700 w-full flex items-center h-full p-4 sm:p-6">
      <h1>Home</h1>
      <p>Quick overview, onboarding guide, key stats</p>
      <span>Recent updates, news, tips</span>
      <DynamicIcon name="bot" />
    </div>
  );
}
