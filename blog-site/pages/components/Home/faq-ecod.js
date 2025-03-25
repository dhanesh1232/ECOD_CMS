"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faq";

const ECODFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b transition ease-in-out duration-150 transform from-gray-50 to-white text-center dark:from-slate-500 dark:to-slate-950">
      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-extrabold dark:text-gray-100 text-gray-900"
      >
        💡 FAQs About ECOD Web Services
      </motion.h2>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-200"
      >
        Find answers to common questions about our web development and digital
        solutions.
      </motion.p>

      {/* FAQ List with Motion Animations */}
      <div className="mt-12 max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-slate-400 rounded-lg shadow-md border dark:border-0 border-gray-200 transition hover:shadow-lg cursor-pointer"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {faq.question}
              </h3>
              <ChevronDown
                size={24}
                className={`text-gray-600 transition-transform transform ease-in-out duration-200 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Animate the FAQ answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-3 text-gray-700 text-left dark:text-gray-200"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ECODFaqs;
