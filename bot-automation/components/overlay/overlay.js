"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileCompletion from "./profile";

const OverLayComponent = () => {
  const [isShown, setIsShown] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const pop = searchParams.get("profile");
    if (pop) {
      setIsShown(pop);
    } else {
      setIsShown("");
    }
  }, [searchParams]);
  const renderOverlay = () => {
    if (isShown.startsWith("update_req")) {
      return <ProfileCompletion />;
    }
    return null;
  };
  if (!isShown) {
    return null;
  }
  return (
    <div className="fixed z-50 inset-0 w-full h-screen bg-gray-950/50 flex items-center justify-center">
      {renderOverlay()}
    </div>
  );
};
export default OverLayComponent;
