import { SideBar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { DarkModeProvider } from "@/context/context";

export default function Layout({ children }) {
  return (
    <DarkModeProvider>
      <div className="flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {/* Sidebar Navigation */}
        <SideBar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with user controls */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </DarkModeProvider>
  );
}
