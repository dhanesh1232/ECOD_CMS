"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { testimonials } from "@/data/web_data";
import dynamic from "next/dynamic";
import { Quote, Star, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Buttons = dynamic(() => import("@/components/Reusable/buttons"));

const fadeInUp = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(4px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const Testimonials = () => {
  const router = useRouter();
  const pathname = usePathname();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const openFeedbackModal = () => {
    router.push(`${pathname}?modal=feedback`, { scroll: false });
  };

  // Intersection observer hooks for scroll animations
  const [headingRef, headingInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [swiperRefInView, swiperInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && swiperRef.current) {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        swiperRef.current.swiper.slideTo(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    controls.start("visible");
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <section className="w-full py-20 px-6 sm:px-8 bg-gradient-to-l from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm text-center relative overflow-hidden">
      {/* Floating gradient elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/20"
        />
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/20"
        />

        {/* Animated sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -20],
              x: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
            className="absolute rounded-full bg-white/80 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mb-16"
        >
          <motion.span
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-blue-600 dark:text-blue-300 text-sm font-medium mb-4 border border-blue-200/30 dark:border-blue-700/30 shadow-inner"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={headingInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-4 h-4 mr-2" /> Trusted by Industry Leaders
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Client Testimonials
          </motion.h2>

          <motion.p
            className="mt-6 text-xl text-gray-600/90 dark:text-gray-300/90 max-w-3xl mx-auto backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Trusted by businesses worldwide.{" "}
            <span className="relative inline-block">
              {`Here's what they say about us`}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 -z-10"
                initial={{ scaleX: 0 }}
                animate={headingInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </span>
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          ref={swiperRefInView}
          initial="hidden"
          animate={swiperInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="my-16 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glass background for swiper */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl -rotate-1 -z-10 backdrop-blur-sm"></div>

          {/* Navigation arrows */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/30"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/30"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </motion.button>

          <Swiper
            ref={swiperRef}
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              renderBullet: (index, className) => {
                return `<span class="${className} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 w-3 h-3 backdrop-blur-sm"></span>`;
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            onSlideChange={handleSlideChange}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                },
              },
              768: {
                slidesPerView: 2,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                },
              },
              1024: {
                slidesPerView: 3,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                },
              },
            }}
            className="py-10 px-2"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial="hidden"
                  animate={swiperInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg text-left border border-gray-200/50 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col group relative overflow-hidden"
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.2,
                      }}
                      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                    />
                  </div>

                  {/* Inner shadow */}
                  <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

                  {/* Client Info */}
                  <div className="flex items-center mb-6 relative z-10">
                    {testimonial.image ? (
                      <motion.div
                        className="relative w-16 h-16 rounded-full border-2 border-white/80 dark:border-gray-800/80 shadow-md overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-semibold shadow-md"
                        whileHover={{ scale: 1.05 }}
                      >
                        {testimonial.name.charAt(0)}
                      </motion.div>
                    )}
                    <div className="ml-4 text-left">
                      <h3 className="text-lg font-semibold text-gray-800/90 dark:text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600/90 dark:text-gray-300/90 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Star
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300/90 dark:text-gray-500/90"}`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative flex-1 z-10">
                    <Quote className="absolute -top-2 left-0 text-gray-200/50 dark:text-gray-700/50 w-8 h-8" />
                    <p className="mt-6 text-gray-700/90 dark:text-gray-300/90 pl-6">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Floating sparkles on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <Sparkles className="absolute top-4 right-4 w-5 h-5 text-yellow-400 animate-pulse" />
                    <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-blue-400 animate-pulse delay-300" />
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="custom-pagination mt-8 flex justify-center gap-2 backdrop-blur-sm"></div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/30 relative overflow-hidden"
        >
          {/* Inner shadow */}
          <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

          <h3 className="text-2xl font-bold text-gray-800/90 dark:text-white/90 mb-6">
            Why Businesses Choose Us
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Fast Results",
                description:
                  "We deliver measurable impact quickly and efficiently.",
                bg: "bg-blue-100/80 dark:bg-blue-900/50",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Trusted Expertise",
                description:
                  "Industry-leading professionals with proven track records.",
                bg: "bg-purple-100/80 dark:bg-purple-900/50",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                ),
                title: "Tailored Solutions",
                description:
                  "Custom strategies designed for your unique business needs.",
                bg: "bg-green-100/80 dark:bg-green-900/50",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.bg} p-4 rounded-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 relative overflow-hidden`}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Feature icon with animation */}
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
                  whileHover={{ rotate: 15 }}
                >
                  {item.icon}
                </motion.div>

                <h4 className="font-semibold text-gray-800/90 dark:text-white/90 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600/90 dark:text-gray-300/90 text-sm">
                  {item.description}
                </p>

                {/* Hover effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Buttons
            first_label="Share Your Experience"
            icon={true}
            buttonActionOne={openFeedbackModal}
            first_styles="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm hover:from-blue-500 hover:to-purple-500 group"
          />
          <motion.p
            className="mt-4 text-gray-500/90 dark:text-gray-400/90 text-sm backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            We value your feedback to help us improve
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
