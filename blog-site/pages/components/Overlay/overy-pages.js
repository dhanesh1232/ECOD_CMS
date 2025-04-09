"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FeedbackPage from "@/pages/feedbacks";
import OfferButton from "../button-offer";
import StickyContactButton from "../contact-button";
import CookiePopup from "../cookies";
import ContactModel from "../contact-model";

const OverlayPages = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFeedback, setShowFeedback] = useState(false);

  // Handle initial load and URL changes
  useEffect(() => {
    const modal = searchParams.get("modal");
    setShowFeedback(modal === "feedback");
  }, [searchParams]);

  const handleCloseFeedback = () => {
    setShowFeedback(false);
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

  return (
    <>
      <OfferButton />
      <StickyContactButton />
      <CookiePopup />
      <ContactModel />

      {showFeedback && <FeedbackPage onClose={handleCloseFeedback} />}
    </>
  );
};

export default OverlayPages;
