"use client";
import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import Sidebar from "@/components/flows/sidebar";

export default function Home({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-full bg-gray-50">
      <ReactFlowProvider>
        {showSidebar && <Sidebar />}
        <div className="flex-grow h-full overflow-y-auto">{children}</div>
      </ReactFlowProvider>
    </div>
  );
}
