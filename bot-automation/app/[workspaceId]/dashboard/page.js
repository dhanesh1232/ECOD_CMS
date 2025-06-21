"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const testHandle = async () => {
    await fetch("/api/corn/test");
  };
  return (
    <div className="bg-white flex-col dark:bg-gray-700 w-full flex items-center h-full p-4 sm:p-6">
      <h1>Home</h1>
      <p>Quick overview, onboarding guide, key stats</p>
      <span>Recent updates, news, tips</span>
      <Button onClick={testHandle}>Test</Button>
    </div>
  );
}
