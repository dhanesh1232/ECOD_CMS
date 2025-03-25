"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "@/data/testi";

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 32;
const SPRING_OPTIONS = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.5,
};

export default function TestimonialCarousel({
  items = testimonials,
  width = 600,
  height = 400,
  autoplay = false,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showDots = true,
  showBorder = false,
  cardBackground = "dark:bg-gray-800 bg-white",
  cardBorder = "dark:border-gray-700 border-gray-200",
}) {
  const containerPadding = 16;
  const itemWidth = width - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  // Handle hover state for autoplay pause
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  // Autoplay logic
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered) && !isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
    isDragging,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const goNext = () => {
    setCurrentIndex((prev) => {
      if (prev === items.length - 1 && loop) {
        return prev + 1;
      }
      return Math.min(prev + 1, carouselItems.length - 1);
    });
  };

  const goPrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0 && loop) {
        return items.length - 1;
      }
      return Math.max(prev - 1, 0);
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 transition-colors duration-300 rounded-xl ${
        showBorder ? `${cardBorder} border` : "border-0"
      }`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 dark:bg-gray-800 bg-white shadow-lg dark:shadow-gray-900/50 shadow-gray-200/50 hover:scale-105 transition-transform"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="h-5 w-5 dark:text-white text-gray-800" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 dark:bg-gray-800 bg-white shadow-lg dark:shadow-gray-900/50 shadow-gray-200/50 hover:scale-105 transition-transform"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="h-5 w-5 dark:text-white text-gray-800" />
          </button>
        </>
      )}

      <motion.div
        className="flex h-full"
        drag="x"
        {...dragProps}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          x,
        }}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((testimonial, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const opacity = useTransform(x, range, [0.5, 1, 0.5], {
            clamp: false,
          });
          const scale = useTransform(x, range, [0.9, 1, 0.9], { clamp: false });

          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col items-center justify-center p-8 ${cardBackground} ${cardBorder} rounded-xl shadow-sm overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: `calc(100% - ${GAP}px)`,
                opacity,
                scale,
              }}
              transition={effectiveTransition}
              whileHover={{ scale: isDragging ? 1 : 1.02 }}
            >
              <div className="text-center max-w-md mx-auto">
                {/* Quote icon */}
                <div className="mb-6 text-4xl dark:text-gray-500 text-gray-300">
                  "
                </div>

                {/* Testimonial text */}
                <blockquote className="mb-6 text-lg italic dark:text-gray-300 text-gray-700">
                  {testimonial.quote}
                </blockquote>

                {/* Author info */}
                <div className="mt-8">
                  <div className="h-12 w-12 mx-auto rounded-full dark:bg-gray-700 bg-gray-200 mb-4"></div>
                  <p className="font-bold dark:text-white text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm dark:text-gray-400 text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dots navigation */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex justify-center gap-2">
            {items.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors duration-150 focus:outline-none ${
                  currentIndex % items.length === index
                    ? "dark:bg-white bg-gray-900"
                    : "dark:bg-gray-600 bg-gray-300"
                }`}
                animate={{
                  scale: currentIndex % items.length === index ? 1.3 : 1,
                }}
                onClick={() => setCurrentIndex(index)}
                transition={{ duration: 0.15 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
