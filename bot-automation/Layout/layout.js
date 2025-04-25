"use client";

import { useEffect, useState } from "react";
import ProtectLayout from "./protect";
import LoaderThreeDots from "@/components/animate/loader";
const { SessionProvider, useSession } = require("next-auth/react");

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [setIsMounted]);

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
