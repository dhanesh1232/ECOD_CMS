"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FeedbackPage from "@/components/feedbacks";
import OfferButton from "../button-offer";
import StickyContactButton from "../contact-button";
import CookiePopup from "../cookies";
import ContactModel from "../contact-model";

const OverlayPages = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFeedback, setShowFeedback] = useState("");

  // Handle initial load and URL changes
  useEffect(() => {
    const modal = searchParams.get("modal");
    console.log(modal);
    setShowFeedback(modal);
  }, [searchParams]);

  const handleCloseFeedback = () => {
    console.log("model close");
    setShowFeedback("");
    // Remove the modal parameter while keeping other query params
    const params = new URLSearchParams(searchParams);
    params.delete("modal");
    router.push(`${pathname}`);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showFeedback) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFeedback]);

  const renderModals = (modal) => {
    switch (modal) {
      case "contact-bid":
        return <ContactModel onClose={handleCloseFeedback} />;
      case "feedback":
        return <FeedbackPage onClose={handleCloseFeedback} />;
      default:
        return null;
    }
  };
  return (
    <>
      <OfferButton />
      <StickyContactButton />
      <CookiePopup />
      {renderModals(showFeedback)}
    </>
  );
};

export default OverlayPages;
