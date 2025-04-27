"use client";

import { SideBar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useCallback, useEffect, useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import OverLayComponent from "@/components/overlay/overlay";
import { signOut } from "next-auth/react";

export default function ProtectLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const encryptionCache = useRef(new Map());
  const initialCheckDone = useRef(false);

  const SECRET_KEY = process.env.NEXTAUTH_SECRET || "ecodify-dns-key";

  const stableEncrypt = useCallback(
    (data) => {
      if (!data) return "";
      if (encryptionCache.current.has(data)) {
        return encryptionCache.current.get(data);
      }
      const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
      encryptionCache.current.set(data, encrypted);
      return encrypted;
    },
    [SECRET_KEY]
  );

  const checkProfileComplete = useCallback(async () => {
    setIsChecking(true);
    try {
      const res = await fetch("/api/profile/user-info");
      const data = await res.json();
      if (!res.ok && data.message.includes("not")) {
        console.log("user not found");
        alert("User not found please register");
        await signOut();
      } else {
        if (data.requiresProfileCompletion) {
          const encryptedName = stableEncrypt(data.name);
          const newParams = new URLSearchParams(searchParams);
          newParams.set(
            "model",
            `update_req_${encodeURIComponent(encryptedName)}`
          );

          router.push(`settings/?${newParams.toString()}`, { scroll: false });
        } else {
          const hasProfileParam = searchParams.has("model");
          if (hasProfileParam) {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("model");
            router.replace(`${pathname}?${newParams.toString()}`);
          }
        }
      }
    } catch (error) {
      console.error("Profile check failed:", error);
    } finally {
      setIsChecking(false);
      initialCheckDone.current = true;
    }
  }, [stableEncrypt, searchParams, router, pathname]);

  // Fixed useEffect hooks
  useEffect(() => {
    if (!initialCheckDone.current) {
      checkProfileComplete();
    }
  }, [checkProfileComplete, pathname, searchParams]); // Add dependencies here

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100/30 dark:bg-gray-900/30">
        <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">
          Verifying profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <SideBar />
        <div className="flex-1 flex flex-col overflow-hidden h-full bg-inherit">
          <Header />
          <main className="flex-1 bg-white dark:bg-gray-700 transition-colors ease-in-out duration-300">
            {children}
          </main>
        </div>
      </div>
      <OverLayComponent />
    </>
  );
}
