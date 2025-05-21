"use client";

import dynamic from "next/dynamic";
const SideBar = dynamic(() => import("@/components/sidebar"));
const Header = dynamic(() => import("@/components/header"));
import { useCallback, useState, useEffect, useRef } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
const OverLayComponent = dynamic(() => import("@/components/overlay/overlay"));
import { signOut } from "next-auth/react";
import { encryptData } from "@/utils/encryption";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ProtectLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialCheckDone = useRef(false);

  const checkProfileComplete = useCallback(async () => {
    if (initialCheckDone.current) return;

    try {
      const res = await fetch("/api/profile/user-info");
      const data = await res.json();
      if (!res.ok && data.message.includes("not")) {
        await signOut({ redirect: true, callbackUrl: "/auth/login" });
        return;
      }

      if (data.requiresProfileCompletion) {
        const encryptedName = encryptData(data.user.name);
        const newParams = new URLSearchParams(searchParams);
        newParams.set(
          "model",
          `update_req_${encodeURIComponent(encryptedName)}`
        );

        if (!pathname.startsWith(`/${workspaceId}/settings`)) {
          router.push(
            `${workspaceId}/settings/account/profile?${newParams.toString()}`,
            {
              scroll: false,
            }
          );
          return;
        }
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
  }, [searchParams, router, workspaceId, pathname]);

  useEffect(() => {
    checkProfileComplete();
  }, [checkProfileComplete]);

  return (
    <>
      <TooltipProvider delayDuration={300} skipDelayDuration={100}>
        <div className="flex h-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <SideBar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          <div className="flex-1 flex flex-col overflow-hidden h-full bg-inherit">
            <Header
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
    </>
  );
}
