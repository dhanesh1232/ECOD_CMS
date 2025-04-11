"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Header from "@/components/Header";
import { Menu } from "lucide-react";
import { ToasterProvider } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex h-screen">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar - Responsive */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out`}
          >
            <Sidebar onClose={handleCloseSidebar} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:ml-64">
            {/* Sticky Header with Mobile Menu Button */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between p-4">
                <button
                  className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu />
                </button>
                <Header />
              </div>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto p-2 sm:p-4">
              <ToasterProvider />
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
