"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faq";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

const FAQItem = ({ item, index, isOpen, onClick, animationDelay }) => {
  const contentRef = useRef(null);
  const [conRef, inConView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={conRef}
      data-testid="faq-container"
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={inConView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.3,
        delay: index * 0.1 + 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
        ease: "easeInOut",
      }}
      className="group mb-4"
      whileHover={{ scale: 1.01 }}
    >
      <div
        className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
          bg-white/80 dark:bg-slate-800/70 backdrop-blur-md
          shadow-sm hover:shadow-lg
          border border-gray-200/50 dark:border-slate-700/30
          hover:border-blue-300/50 dark:hover:border-blue-500/30
          ${isOpen ? "!border-blue-500/50 dark:!border-blue-500/50 shadow-lg" : ""}`}
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
        aria-label={`Question: ${item.question}`}
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isOpen ? "!opacity-100" : ""}`}
        ></div>

        {/* Inner shadow */}
        <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

        <div className="flex justify-between items-center gap-4 relative z-10">
          <h3
            className={`text-base sm:text-lg md:text-xl font-semibold text-gray-800/90 dark:text-gray-100/90 text-left ${
              isOpen
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                : "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
            } transition-all`}
          >
            {item.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown
              size={24}
              className={`flex-shrink-0 transition-colors ${
                isOpen
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500/90 dark:text-gray-400/90"
              } group-hover:text-blue-600 dark:group-hover:text-blue-400`}
            />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              id={`faq-content-${index}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden relative z-10"
            >
              <div
                ref={contentRef}
                className="pt-4 text-gray-600/90 dark:text-gray-300/90 text-left prose dark:prose-invert sm:text-base text-sm prose-p:my-3 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline hover:prose-a:no-underline"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQList = ({
  items,
  className = "",
  initialOpenIndex = 0,
  itemAnimationDelay = 0.1,
  enableKeyboardNavigation = true,
}) => {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);
  const [hasInteracted, setHasInteracted] = useState(false);
  const listRef = useRef(null);
  const isInView = useInView(listRef, {
    margin: "-20% 0px -20% 0px",
    once: true,
  });

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
        const nextIndex = (openIndex + 1) % items.length;
        setOpenIndex(nextIndex);
        // Scroll into view if needed
        document
          .querySelector(
            `[aria-label="Question: ${items[nextIndex].question}"]`
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (openIndex - 1 + items.length) % items.length;
        setOpenIndex(prevIndex);
        document
          .querySelector(
            `[aria-label="Question: ${items[prevIndex].question}"]`
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
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
  }, [openIndex, items, enableKeyboardNavigation]);

  return (
    <div ref={listRef} className={`space-y-4 ${className}`}>
      <AnimatePresence>
        {items.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onClick={toggleItem}
            data-testid="faq-question"
            animationDelay={index * itemAnimationDelay}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ECODFaqs = () => {
  const router = useRouter();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="w-full py-24 px-4 sm:px-8 bg-gradient-to-b from-gray-50/50 via-white/50 to-white/50 dark:from-slate-800/50 dark:via-slate-900/50 dark:to-slate-900/50 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={
            inView
              ? {
                  x: [0, 15, 0],
                  y: [0, 10, 0],
                }
              : {}
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/20"
        ></motion.div>
        <motion.div
          animate={
            inView
              ? {
                  x: [0, -20, 0],
                  y: [0, -15, 0],
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/20"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-blue-900/50 backdrop-blur-md text-blue-600 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200/30 dark:border-blue-700/30 shadow-inner"
          >
            <HelpCircle className="w-4 h-4 mr-2" /> Common Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900/90 dark:text-white/90 mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Frequently Asked Questions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600/90 dark:text-gray-300/90 max-w-3xl mx-auto backdrop-blur-sm"
          >
            Find answers to common questions about our web development and
            digital solutions.
          </motion.p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <FAQList
            items={faqs}
            initialOpenIndex={0}
            itemAnimationDelay={0.1}
            enableKeyboardNavigation={true}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-lg text-gray-600/90 dark:text-gray-300/90 mb-6 backdrop-blur-sm"
          >
            {`Still have questions? We're here to help!`}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.3 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/contact")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 backdrop-blur-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Our Team
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ECODFaqs;
