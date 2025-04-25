"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OverLayComponent = () => {
  const [isShown, setIsShown] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const pop = searchParams.get("profile");
    if (pop) {
      setIsShown(pop);
    }
    console.log(pop);
  }, [searchParams]);
  const renderOverlay = () => {
    if (isShown.startsWith("update_")) {
      console.log("Update profile info");
    }
    return "Onverly Component";
  };
  if (!isShown) {
    return null;
  }
  return (
    <div className="fixed z-50 inset-0 w-full h-screen bg-gray-950/50">
      {renderOverlay()}
    </div>
  );
};
export default OverLayComponent;
