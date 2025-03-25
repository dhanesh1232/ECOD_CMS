"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { faqs } from "@/data/faq";

const AnimatedFAQItem = ({ item, index, isOpen, onClick, animationDelay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: animationDelay,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      className="group mb-4"
    >
      <div
        className={`p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border dark:border-slate-700 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md hover:border-gray-300 dark:hover:border-slate-600 ${
          isOpen ? "shadow-md border-gray-300 dark:border-slate-600" : ""
        }`}
        onClick={() => onClick(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(index);
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 text-left">
            {item.question}
          </h3>
          <ChevronDown
            size={24}
            className={`text-gray-600 dark:text-gray-300 transition-transform transform ease-in-out duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            } group-hover:text-gray-900 dark:group-hover:text-white`}
          />
        </div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              id={`faq-content-${index}`}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                marginTop: "0.75rem",
              }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <div
                className="text-gray-700 dark:text-gray-300 text-left prose dark:prose-invert prose-p:my-2"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AnimatedFAQList = ({
  items,
  className = "",
  initialOpenIndex = 0,
  itemAnimationDelay = 0.1,
  enableKeyboardNavigation = true,
}) => {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);
  const [hasInteracted, setHasInteracted] = useState(false);
  const listRef = useRef(null);
  const isInView = useInView(listRef, { margin: "-20% 0px -20% 0px" });

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setHasInteracted(true);
  };

  // Auto-open first item when list comes into view
  useEffect(() => {
    if (isInView && !hasInteracted && items.length > 0) {
      setOpenIndex(0);
    }
  }, [isInView, hasInteracted, items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyDown = (e) => {
      if (openIndex === null) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpenIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setOpenIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        setOpenIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setOpenIndex(items.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex, items.length, enableKeyboardNavigation]);

  return (
    <div ref={listRef} className={`space-y-4 ${className}`}>
      <AnimatePresence>
        {items.map((item, index) => (
          <AnimatedFAQItem
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onClick={toggleItem}
            animationDelay={index * itemAnimationDelay}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ECODFaqs = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-b transition ease-in-out duration-150 transform from-gray-50 to-white text-center dark:from-slate-500 dark:to-slate-950">
      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-2xl md:text-4xl font-extrabold dark:text-gray-100 text-gray-900 mb-2"
      >
        💡 FAQs About ECOD Web Services
      </motion.h2>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
      >
        Find answers to common questions about our web development and digital
        solutions.
      </motion.p>

      {/* Animated FAQ List */}
      <div className="mt-12 max-w-4xl mx-auto">
        <AnimatedFAQList
          items={faqs}
          initialOpenIndex={0}
          itemAnimationDelay={0.1}
          enableKeyboardNavigation={true}
        />
      </div>
    </section>
  );
};

export default ECODFaqs;
