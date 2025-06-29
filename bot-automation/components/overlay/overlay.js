"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const LogoutRelay = dynamic(() => import("./logout"));
const ProfileCompletion = dynamic(() => import("./profile"));
const OverLayComponent = () => {
  const [isShown, setIsShown] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const pop = searchParams.get("model");
    if (pop) {
      setIsShown(pop);
    } else {
      setIsShown("");
    }
  }, [searchParams]);
  const renderOverlay = () => {
    if (isShown.startsWith("update_req")) {
      return <ProfileCompletion />;
    } else if (isShown.startsWith("confirm_logout")) {
      return <LogoutRelay />;
    }
    return null;
  };
  if (!isShown) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      {renderOverlay()}
    </div>
  );
};
export default OverLayComponent;
