"use client";
import { useEffect, useState } from "react";
import Landing from "./landing";
import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DashboardLayout from "@/Layout/dash";

// Component to handle auth state
const AuthWrapper = ({ children }) => {
  const { data: session, status } = useSession();
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount || status === "loading") {
    return (
      <div className="flex items-center justify-center flex-row h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <LoadingSpinner size="md" color="primary" />
      </div>
    );
  }

  return status === "authenticated" ? (
    <DashboardLayout> {children}</DashboardLayout>
  ) : (
    <Landing>{children}</Landing>
  );
};

const Layout = ({ children }) => {
  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
};

export default Layout;
