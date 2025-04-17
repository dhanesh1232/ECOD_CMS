"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <div className="h-full">
      <h1 className="text-gray-800 dark:text-gray-200">Dashboard Page</h1>
    </div>
  );
}
