import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { home_about } from "@/data/web_data";
import Stepper, { Step } from "./Sections/stepper";

// Dynamically import CountUp for better performance
const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => (
    <span className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-3">
      0
    </span>
  ),
});

// Custom visibility sensor hook
const useVisibilitySensor = (offset = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      {
        rootMargin: `${offset}px`,
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [offset]);

  return [ref, isVisible];
};

const AboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Enhanced CountUp component
  const EnhancedCountUp = ({ stat, index }) => {
    const [counterRef, isCounterVisible] = useVisibilitySensor(50);

    const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
    const suffix = stat.value.includes("+")
      ? "+"
      : stat.value.includes("/5")
        ? "/5"
        : stat.value.includes("%")
          ? "%"
          : "";

    return (
      <div ref={counterRef} className="text-center">
        <div className="md:text-5xl text-3xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-3">
          {isCounterVisible ? (
            <CountUp
              end={numericValue}
              suffix={suffix}
              duration={2.5}
              decimals={stat.value.includes(".") ? 1 : 0}
              decimal="."
              separator=","
            />
          ) : (
            <span>0{suffix}</span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 uppercase text-xs md:text-sm tracking-wider font-medium">
          {stat.label}
        </p>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-gray-900/10"
      id="about"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-blue-200/40 dark:bg-blue-500/20 rounded-full filter blur-3xl"
          animate={{
            x: [-20, 20, -20],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-200/40 dark:bg-purple-500/20 rounded-full filter blur-3xl"
          animate={{
            x: [20, -20, 20],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Hero About Card */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-8 md:p-10 rounded-3xl mb-20"
        >
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            {home_about.who_we_are.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {home_about.who_we_are.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-inner p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-200">
                {home_about.who_we_are.mission}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-inner p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-200">
                {home_about.who_we_are.vision}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Differentiators Section */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-8 rounded-3xl mb-20"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home_about.differentiators.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-inner p-6 rounded-xl flex flex-col items-center text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-8 rounded-3xl mb-20"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2"></div>

            {home_about.timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative mb-12 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
              >
                <div
                  className={`flex md:block items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center transform -translate-x-1/2 z-10"
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`glass-inner p-6 rounded-xl ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                  >
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {item.event}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-8 rounded-3xl mb-20"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {home_about.stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <EnhancedCountUp stat={stat} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-8 rounded-3xl mb-20"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home_about.values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-inner p-6 rounded-xl"
              >
                <div className="md:text-3xl lg:text-5xl text-2xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stepper Section - Replacing the old Process Section */}
        <motion.div
          variants={itemVariants}
          className="glass-card py-4 sm:p-8 rounded-3xl mb-20"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            Our Step-by-Step Process
          </h2>
          <Stepper
            initialStep={1}
            onStepChange={(step) => console.log(`Step changed to ${step}`)}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
            stepContainerClassName="justify-center"
            contentClassName="py-6 px-2 sm:px-4"
          >
            {home_about.process.map((step, index) => (
              <Step key={index}>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {step.step}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </Step>
            ))}
          </Stepper>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-12 rounded-3xl text-center"
        >
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            {home_about.cta.title}
          </h2>
          <p className="md:text-lg text-base text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            {home_about.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {home_about.cta.buttons.map((button, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={button.link}
                className={`px-8 py-4 rounded-full font-medium text-sm sm:text-base transition-all ${
                  index === 0
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 text-white"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                }`}
              >
                {button.text}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        .dark .glass-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
        }

        .glass-inner {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .dark .glass-inner {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        @media (prefers-reduced-motion: reduce) {
          .glass-card,
          .glass-inner {
            transition: none !important;
            animation: none !important;
          }
          .motion-div,
          [data-framer-motion-div] {
            animation: none !important;
            transition: none !important;
          }
          .countup-animation {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
