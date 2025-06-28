"use client";

import { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import DotByDotLoader from "@/components/animate/circle";
import { AdminServices } from "@/lib/client/admin.service";

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [setIsMounted, session]);
  useEffect(() => {
    const fecthPlans = async () => {
      try {
        await Promise.all([AdminServices.getPlans()]);
      } catch (err) {
        console.log(err);
      }
    };
    fecthPlans();
  });

  if (!isMounted || status === "loading") {
    return (
      <div className="h-full w-full flex items-center justify-center dark:bg-gray-800/80 bg-white/90">
        <DotByDotLoader />
      </div>
    );
  }

  if (status === "authenticated") {
    return children;
  } else if (status === "unauthenticated") {
    return children;
  }
}

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
}
