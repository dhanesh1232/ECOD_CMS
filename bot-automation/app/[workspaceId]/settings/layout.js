"use client";

import { usePathname } from "next/navigation";

const SettingsLayout = ({ children }) => {
  const pathname = usePathname();
  const isBillingSection = pathname?.includes("/settings/workspace/billing");

  return (
    <div className="flex flex-col sm:flex-row h-full relative">
      {/*Settings Right Side Content */}
      <div
        className={`flex-1 ${
          isBillingSection ? "overflow-hidden" : "overflow-y-auto"
        } scrollbar-transparent w-full`}
      >
        <div className={`max-w-7xl mx-auto h-full`}>
          {/* Content Card */}
          <div
            className={`rounded-lg border-gray-200 dark:border-gray-700 ${
              isBillingSection ? "h-full" : "overflow-x-auto"
            } scrollbar-transparent w-full p-2 pt-0 sm:p-4`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
