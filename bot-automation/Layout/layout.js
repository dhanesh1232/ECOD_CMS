"use client";

import { useEffect, useState } from "react";
import LoaderThreeDots from "@/components/animate/loader";
import { SessionProvider, useSession } from "next-auth/react";
import DotByDotLoader from "@/components/animate/circle";

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [setIsMounted, session]);

  if (!isMounted || status === "loading") {
    return (
      <div className="h-full w-full flex items-center justify-center">
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
