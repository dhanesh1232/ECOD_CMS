"use client";

import ProtectLayout from "./protect";
const { SessionProvider, useSession } = require("next-auth/react");

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
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
