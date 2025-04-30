"use client";
import { useEffect } from "react";

const BillingPage = () => {
  useEffect(() => {
    const renderBillingInfo = async () => {
      const res = await fetch("/api/profile/subscription");
      const data = await res.json();
      console.log(data);
    };
    renderBillingInfo();
    return () => renderBillingInfo();
  });
  return (
    <div className="flex-1 p-4 sm:p-6 bg-white select-none dark:bg-gray-900 rounded-xl shadow-lg overflow-auto">
      <h1>Billing Page</h1>
    </div>
  );
};

export default BillingPage;
