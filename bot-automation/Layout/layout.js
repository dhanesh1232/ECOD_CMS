"use client";

import { useEffect, useState } from "react";
import LoaderThreeDots from "@/components/animate/loader";
import { SessionProvider, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
const ProtectLayout = dynamic(() => import("./protect"));

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [setIsMounted, session]);

  if (!isMounted || status === "loading") {
    return <LoaderThreeDots />;
  }

  if (status === "authenticated") {
    return <ProtectLayout>{children}</ProtectLayout>;
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
