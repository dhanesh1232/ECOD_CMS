"use client";

import dynamic from "next/dynamic";
const PremiumSidebar = dynamic(() => import("@/components/sidebar"));
const Header = dynamic(() => import("@/components/header"));
import { useCallback, useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const OverLayComponent = dynamic(() => import("@/components/overlay/overlay"));
import { signOut } from "next-auth/react";
import { encryptData } from "@/utils/encryption";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserServices } from "@/lib/client/user";
import NotificationButton from "@/components/notification";

export default function ProtectLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialCheckDone = useRef(false);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const rawSlug = segments[segments.length - 1] || "Dashboard";

    const formattedTitle = rawSlug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    document.title = `${formattedTitle} | ECODrIx`;
  }, [pathname]);

  const checkProfileComplete = useCallback(async () => {
    if (initialCheckDone.current) return;
    try {
      const data = await UserServices.fetchUserData();
      if (data.status && data.status !== 200) {
        await signOut({ redirect: true, callbackUrl: "/auth/login" });
        return;
      }
      if (data.user.requiresProfileCompletion) {
        const encryptedName = encryptData(data.user.user_name);
        const newParams = new URLSearchParams(searchParams);
        newParams.set(
          "model",
          `update_req_${encodeURIComponent(encryptedName)}`
        );

        router.push(`${pathname}?${newParams.toString()}`, {
          scroll: false,
        });
      } else if (searchParams.has("model")) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("model");
        router.replace(`${pathname}?${newParams.toString()}`);
      }
    } catch (error) {
      console.error("Profile check failed:", error);
    } finally {
      initialCheckDone.current = true;
    }
  }, [searchParams, router, pathname]);

  useEffect(() => {
    checkProfileComplete();
  }, [checkProfileComplete]);

  return (
    <>
      <TooltipProvider delayDuration={300} skipDelayDuration={100}>
        <div className="flex h-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
          <PremiumSidebar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <div className="flex-1 flex flex-col overflow-hidden h-full bg-inherit">
            <Header
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
            <main className="flex-1 flex flex-col bg-white overflow-hidden dark:bg-gray-800 transition-colors ease-in-out duration-300">
              {children}
            </main>
          </div>
        </div>
        <OverLayComponent />
        <NotificationButton
          size="default"
          iconSize={18}
          position="bottom-10 right-2"
          className="lg:hidden fixed bottom-4 right-8 z-40 bg-indigo-600 text-white shadow-lg rounded-full hover:bg-indigo-700"
        />
      </TooltipProvider>
    </>
  );
}
