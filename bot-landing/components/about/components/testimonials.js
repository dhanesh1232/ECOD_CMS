"use client";

import { testimonials } from "@/data/scrap";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useCallback } from "react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useCallback(
    (newIndex) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(newIndex > currentTestimonial ? 1 : -1);
      setCurrentTestimonial(newIndex);

      // Reset animation lock after a short delay
      setTimeout(() => setIsAnimating(false), 500);
    },
    [currentTestimonial, isAnimating]
  );

  const nextTestimonial = useCallback(() => {
    navigate(
      currentTestimonial === testimonials.length - 1
        ? 0
        : currentTestimonial + 1
    );
  }, [currentTestimonial, navigate]);

  const prevTestimonial = useCallback(() => {
    navigate(
      currentTestimonial === 0
        ? testimonials.length - 1
        : currentTestimonial - 1
    );
  }, [currentTestimonial, navigate]);

  const goToTestimonial = useCallback(
    (index) => {
      navigate(index);
    },
    [navigate]
  );

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Success Stories
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden h-[300px] sm:h-[280px] relative">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentTestimonial}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg absolute inset-0"
              >
                <div className="flex flex-col sm:flex-row items-start h-full">
                  <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                    <motion.div
                      className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      {testimonials[currentTestimonial].author.charAt(0)}
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <motion.blockquote
                      className="text-base md:text-lg text-gray-600 italic dark:text-gray-300 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {`"${testimonials[currentTestimonial].quote}"`}
                    </motion.blockquote>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="font-semibold">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {testimonials[currentTestimonial].role},{" "}
                        {testimonials[currentTestimonial].company}
                      </p>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonials[currentTestimonial].rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                      <motion.div
                        className="mt-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">
                          {testimonials[currentTestimonial].plan} Plan User
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full ${
                  currentTestimonial === index
                    ? "bg-green-600 dark:bg-green-400 w-6"
                    : "bg-gray-300 dark:bg-gray-600 w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scaleY: 1.5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500 }}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
