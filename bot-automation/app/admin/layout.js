"use client";
import AdminHeader from "@/components/admin/header";
import AdminSidebar from "@/components/admin/sideBar";
import OverLayComponent from "@/components/overlay/overlay";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const rawSlug = segments[segments.length - 1] || "Dashboard";

    const formattedTitle = rawSlug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    document.title = `${formattedTitle} | ECODrIx`;
  }, [pathname]);
  return (
    <TooltipProvider>
      <div className="flex h-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <AdminSidebar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden h-full bg-inherit">
          <AdminHeader
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <main className="flex-1 flex flex-col bg-white overflow-hidden dark:bg-gray-700 transition-colors ease-in-out duration-300">
            {children}
          </main>
        </div>
      </div>
      <OverLayComponent />
    </TooltipProvider>
  );
}
