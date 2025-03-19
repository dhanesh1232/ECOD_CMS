"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const offers = [
  {
    title: "🎉 Web Development Offer!",
    description: "Get 20% off on your first website development project!",
  },
  {
    title: "🚀 Digital Marketing Boost!",
    description:
      "Enjoy 30% off on our digital marketing services for the first month!",
  },
  {
    title: "🛍️ Shopify Special Deal!",
    description: "Get a free Shopify theme setup with any premium package!",
  },
  {
    title: "📢 Google & Meta Ads Discount!",
    description: "Claim $100 ad credit when you start with us today!",
  },
];

const OfferButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const lastShown = localStorage.getItem("offerLastShown");
    const today = new Date().toDateString();

    if (lastShown !== today) {
      setTimeout(() => setShowPopup(true), 3000);
      setOffer(offers[Math.floor(Math.random() * offers.length)]);
      setTimeout(() => setShowButton(true), 1000); // Show button after 1 sec delay
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"; // 🚫 Disable scrolling

      // Auto-close popup after 5s
      const timer = setTimeout(() => closePopup(), 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const closePopup = () => {
    setShowPopup(false);
    setShowButton(false); // ✅ Hide button after closing popup
    document.body.style.overflow = ""; // ✅ Enable scrolling
    localStorage.setItem("offerLastShown", new Date().toDateString()); // Store to prevent re-showing
  };

  return (
    <>
      {/* 🎯 Offer Button (Appears Only Once Per Day) */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowPopup(true)}
            className="fixed bottom-10 left-10 h-16 w-16 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center text-lg font-bold hover:bg-green-600 transition-all"
          >
            🎁 Offer
          </motion.button>
        )}
      </AnimatePresence>

      {/* 🎯 Offer Popup Modal */}
      <AnimatePresence>
        {showPopup && offer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 w-full h-screen flex items-center justify-center bg-gray-800 bg-opacity-70 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg rounded-lg p-6 text-center w-80 relative"
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg"
              >
                ✖
              </button>

              <h3 className="text-xl font-semibold text-gray-800">
                {offer.title}
              </h3>
              <p className="text-gray-600 mt-2">{offer.description}</p>
              <button
                onClick={closePopup}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
              >
                Claim Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfferButton;
