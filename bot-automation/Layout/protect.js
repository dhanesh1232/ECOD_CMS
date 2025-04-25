"use client";

import { SideBar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import OverLayComponent from "@/components/overlay/overlay";

export default function ProtectLayout({ children }) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const SECRET_KEY = process.env.NEXTAUTH_SECRET || "ecodify-dns-key";
  const encryptData = useCallback(
    (data) => {
      return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    },
    [SECRET_KEY]
  );

  useEffect(() => {
    const checkProfileComplete = async () => {
      const res = await fetch("/api/profile/user-info");
      const data = await res.json();
      console.log(data);
      if (data.requiresProfileCompletion) {
        const encryptedName = encryptData(data.name);
        router.push(
          `${pathname}?profile=update_req_${encodeURIComponent(encryptedName)}`,
          { scroll: false }
        );
      }
    };
    checkProfileComplete();
  }, [pathname, router, encryptData]);
  return (
    <>
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
      <OverLayComponent />
    </>
  );
}
