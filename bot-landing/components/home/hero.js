"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Settings,
  Bot,
  Megaphone,
  Mail,
  BarChart2,
  Loader2,
} from "lucide-react";
import {
  useEffect,
  useState,
  useCallback,
  lazy,
  Suspense,
  useRef,
} from "react";

const WhatsAppChat = lazy(() => import("./components/whatsappChat"));
const InstagramChat = lazy(() => import("./components/instagramChat"));
const DiscordChat = lazy(() => import("./components/discordChat"));

const CHAT_PLATFORMS = [
  { id: "whatsapp", name: "WhatsApp Business", component: WhatsAppChat },
  { id: "instagram", name: "Instagram DM", component: InstagramChat },
  { id: "discord", name: "Discord", component: DiscordChat },
];

const SAAS_PRODUCTS = [
  {
    name: "AI Chatbots",
    icon: <Bot className="w-5 h-5" />,
    description: "Automate customer support with intelligent chatbots",
    features: ["24/7 Availability", "Multi-language", "CRM Integration"],
  },
  {
    name: "Ads Automation",
    icon: <Megaphone className="w-5 h-5" />,
    description: "Optimize ad campaigns across platforms automatically",
    features: ["Cross-platform", "AI Budgeting", "Performance Analytics"],
  },
  {
    name: "Drip Campaigns",
    icon: <Mail className="w-5 h-5" />,
    description: "Nurture leads with personalized email sequences",
    features: ["Behavior-based", "A/B Testing", "Automated Follow-ups"],
  },
  {
    name: "Analytics",
    icon: <BarChart2 className="w-5 h-5" />,
    description: "Get actionable insights from your customer data",
    features: ["Real-time", "Custom Dashboards", "Predictive Analytics"],
  },
];

export const HeroSection = () => {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeProduct, setActiveProduct] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const handlePlatformChange = useCallback(
    (index) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(index > currentPlatform ? 1 : -1);
      setCurrentPlatform(index);
      setIsLoading(true); // Set loading state when changing platform

      setTimeout(() => {
        setIsAnimating(false);
        setIsLoading(false); // Simulate loading completion
      }, 500);
    },
    [currentPlatform, isAnimating]
  );

  useEffect(() => {
    setIsMounted(true);

    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (isAnimating) return;

      setIsAnimating(true);
      setIsLoading(true);
      setDirection(1);
      setCurrentPlatform((prev) => (prev + 1) % CHAT_PLATFORMS.length);
      setActiveProduct((prev) => (prev + 1) % SAAS_PRODUCTS.length);

      setTimeout(() => {
        setIsAnimating(false);
        setIsLoading(false);
      }, 500);
    }, 100000); // Changed to 10 seconds for better UX

    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimer);
    };
  }, [prefersReducedMotion, isAnimating]);

  const variants = {
    enter: (direction) => ({
      x: prefersReducedMotion ? 0 : direction > 0 ? 100 : -100,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: prefersReducedMotion ? 0 : direction > 0 ? -100 : 100,
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95,
    }),
  };

  if (!isMounted) {
    return (
      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 xl:gap-12">
          {/* Content Section Skeleton */}
          <div className="w-full lg:w-[45%] xl:w-[48%] space-y-6">
            <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="flex gap-3">
              <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Chat Window Skeleton */}
          <div className="w-full lg:w-[55%] xl:w-[52%] h-[500px] relative">
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-inner flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-2 sm:px-4 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 xl:gap-12">
        {/* Content Section */}
        <div className="w-full lg:w-[45%] xl:w-[48%] flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight mb-4 sm:mb-6"
          >
            All-in-One{" "}
            <span className="text-indigo-600 dark:text-indigo-400 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Business Automation
            </span>{" "}
            Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8"
          >
            {`Streamline your operations with our integrated suite of AI-powered
            tools. From chatbots to marketing automation - we've got you
            covered.`}
          </motion.p>

          {/* Product Features Carousel */}
          <div className="mb-6 sm:mb-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={SAAS_PRODUCTS[activeProduct].name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    {SAAS_PRODUCTS[activeProduct].icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-400 mb-1">
                      {SAAS_PRODUCTS[activeProduct].name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {SAAS_PRODUCTS[activeProduct].description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {SAAS_PRODUCTS[activeProduct].features.map(
                        (feature, i) => (
                          <li
                            key={i}
                            className="text-xs bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full"
                          >
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-2 mt-4">
              {SAAS_PRODUCTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProduct(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeProduct
                      ? "bg-indigo-600 w-4"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`View ${SAAS_PRODUCTS[index].name}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all flex items-center justify-center shadow-lg hover:shadow-indigo-500/20 text-sm sm:text-base font-medium"
              aria-label="Start free trial"
            >
              Start Free Trial <ArrowRight className="ml-2" size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all flex items-center justify-center text-sm sm:text-base font-medium"
              aria-label="See all features"
            >
              <Settings className="mr-2" size={16} /> See All Features
            </motion.button>
          </div>
        </div>

        {/* Chat Window Section */}
        <div
          ref={containerRef}
          className="w-full lg:w-[55%] xl:w-[52%] h-[500px] sm:h-[450px] md:h-[500px] relative flex items-center justify-center mt-8 lg:mt-0"
        >
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-3xl shadow-inner"></div>

          <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-purple-100/40 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/4 right-1/4 w-32 sm:w-40 md:w-60 h-32 sm:h-40 md:h-60 bg-pink-100/40 dark:bg-pink-900/10 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

          {/* Loading overlay */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl z-10 flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Loading {CHAT_PLATFORMS[currentPlatform].name} demo...
                </span>
              </div>
            </motion.div>
          )}

          {/* Chat container */}
          <div className="relative w-full h-full max-w-xs sm:max-w-sm md:max-w-md mx-auto flex items-center justify-center">
            <Suspense fallback={null}>
              <AnimatePresence mode="popLayout" initial={false}>
                {CHAT_PLATFORMS.map(
                  (platform, index) =>
                    currentPlatform === index && (
                      <motion.div
                        key={platform.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.5,
                          ease: "easeInOut",
                        }}
                        className="absolute w-full h-full"
                      >
                        <platform.component />
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </Suspense>
          </div>

          {/* Platform indicators */}
          <div className="absolute -bottom-4 sm:-bottom-4 left-0 right-0 flex justify-center space-x-2">
            {CHAT_PLATFORMS.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePlatformChange(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currentPlatform
                    ? "bg-indigo-600 w-4 sm:w-6"
                    : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
                aria-label={`View ${CHAT_PLATFORMS[index].name} demo`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
