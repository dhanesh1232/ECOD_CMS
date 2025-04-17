"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Settings = () => {
  const { data: status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  });
  if (status === "unauthenticated") {
    return null;
  }
  return <h1 className="text-gray-800 dark:text-gray-200">Settings</h1>;
};
export default Settings;
