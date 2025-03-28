"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Sparkles } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "🎉 Web Development Offer!",
    description: "Get 20% off on your first website development project!",
    cta: "Claim Discount",
    bgColor: "bg-gradient-to-br from-blue-500/90 to-blue-600/90",
    borderColor: "border-blue-400/30",
  },
  {
    id: 2,
    title: "🚀 Digital Marketing Boost!",
    description:
      "Enjoy 30% off on our digital marketing services for the first month!",
    cta: "Start Campaign",
    bgColor: "bg-gradient-to-br from-purple-500/90 to-purple-600/90",
    borderColor: "border-purple-400/30",
  },
  {
    id: 3,
    title: "🛍️ Shopify Special Deal!",
    description: "Get a free Shopify theme setup with any premium package!",
    cta: "Get Started",
    bgColor: "bg-gradient-to-br from-green-500/90 to-green-600/90",
    borderColor: "border-green-400/30",
  },
  {
    id: 4,
    title: "📢 Google & Meta Ads Discount!",
    description: "Claim $100 ad credit when you start with us today!",
    cta: "Claim Credit",
    bgColor: "bg-gradient-to-br from-red-500/90 to-red-600/90",
    borderColor: "border-red-400/30",
  },
];

const OfferButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("offerLastShown");
    const today = new Date().toDateString();
    const hasInteracted = localStorage.getItem("hasInteractedWithOffer");

    if ((!lastShown || lastShown !== today) && !hasInteracted) {
      const timer = setTimeout(() => {
        setCurrentOffer(offers[Math.floor(Math.random() * offers.length)]);
        setShowButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setShowButton(false);
      setIsClosing(false);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      localStorage.setItem("offerLastShown", new Date().toDateString());
      localStorage.setItem("hasInteractedWithOffer", "true");
    }, 300);
  };

  const handleClaimOffer = () => {
    closePopup();
    // Add your offer claim logic here
    console.log("Offer claimed:", currentOffer);
  };

  return (
    <>
      {/* Floating Offer Button */}
      <AnimatePresence>
        {showButton && !showPopup && !isClosing && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            onClick={openPopup}
            className="fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full shadow-xl flex items-center justify-center text-white bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all group backdrop-blur-sm border border-amber-400/30"
            aria-label="View special offers"
          >
            {/* Sparkle effects */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <Sparkles className="absolute top-1 left-1 w-2 h-2 text-yellow-300 animate-pulse" />
              <Sparkles className="absolute bottom-2 right-2 w-1 h-1 text-yellow-200 animate-pulse delay-300" />
            </div>

            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Gift className="w-6 h-6" />
            </motion.div>
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm backdrop-blur-sm border border-red-400/30">
              !
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Offer Popup Modal */}
      <AnimatePresence>
        {showPopup && currentOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${currentOffer.bgColor} text-white backdrop-blur-lg border ${currentOffer.borderColor}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass texture overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')] opacity-10"></div>

              <div className="p-6 text-center relative z-10">
                <button
                  onClick={closePopup}
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
                  aria-label="Close offer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mb-4 backdrop-blur-sm border border-white/10">
                  <Gift className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  {currentOffer.title}
                </h3>
                <p className="text-white/90 mb-6">{currentOffer.description}</p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={handleClaimOffer}
                    className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors backdrop-blur-sm border border-white/20"
                  >
                    {currentOffer.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfferButton;
