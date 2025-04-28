"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-white dark:bg-gray-700 w-full h-full">
      <h1>Home</h1>
    </div>
  );
}
