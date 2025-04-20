"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import SetPasswordModal from "@/components/auth/setPasswordModel";

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [passwordStatus, setPasswordStatus] = useState({
    checked: false,
    isSet: true,
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Check for password set query param on initial load
  useEffect(() => {
    const passwordParam = searchParams.get("set-password");
    if (passwordParam === "true") {
      setShowPasswordModal(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkPasswordSet = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setPasswordStatus({
            checked: true,
            isSet: data.isPasswordSet,
          });
          if (!data.isPasswordSet) {
            // Update URL without page reload
            router.replace("/dashboard?set-password=true", { scroll: false });
            setShowPasswordModal(true);
          }
        }
      } catch (error) {
        console.error("Error checking password status:", error);
        setPasswordStatus({
          checked: true,
          isSet: true, // Assume password is set to avoid blocking access
        });
      }
    };

    if (status === "authenticated") {
      checkPasswordSet();
    }
  }, [status, router]);

  const handlePasswordSetSuccess = () => {
    router.replace("/", { scroll: false });
    setShowPasswordModal(false);
    setPasswordStatus((prev) => ({ ...prev, isSet: true }));
  };

  if (status === "loading" || !passwordStatus.checked) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}
      >
        {/* Sidebar - Fixed width and always visible on md+ screens */}
        <Sidebar />
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>

      {/* Password Setup Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto relay-bg">
          <div className="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center sm:flex sm:p-0">
            {/* Modal content */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <SetPasswordModal onSuccess={handlePasswordSetSuccess} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
