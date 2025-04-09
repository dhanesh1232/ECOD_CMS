import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { TrustSVG } from "../../../public/Assets/svg";
import LoaderSpinner from "../Reusable/Spinner/spinner";
import { ChevronsDown, Rocket, Sparkles, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Head from "next/head";

const TypeAnimation = dynamic(
  () => import("react-type-animation").then((mod) => mod.TypeAnimation),
  {
    ssr: false,
    loading: () => (
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Custom Web Development Solutions
      </span>
    ),
  }
);

const Buttons = dynamic(() => import("../Reusable/buttons"), {
  loading: () => (
    <div className="flex gap-4">
      <div className="px-6 py-3 rounded-lg bg-blue-400 opacity-50">
        <LoaderSpinner size="h-3 w-3" />
      </div>
      <div className="px-6 py-3 rounded-lg border-2 opacity-50">
        <LoaderSpinner size="h-3 w-3" />
      </div>
    </div>
  ),
  ssr: false,
});

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion() || isMobile;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  // Trust badges data
  const trustBadges = [
    { text: "24/7 Support", icon: <Sparkles className="w-4 h-4" /> },
    { text: "100% Satisfaction", icon: <Check className="w-4 h-4" /> },
  ];

  const handleContactModel = () => {
    const clickData = {
      timestamp: new Date().toISOString(),
      modelOpen: true,
    };
    // Save the individual click
    localStorage.setItem(`contactModelClick`, JSON.stringify(clickData));
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/Assets/svg/TrustSVG" as="image" />
      </Head>

      <section
        className="w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden"
        aria-label="Hero Section"
        id="hero-section"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 z-0" />

        {/* Particle Background - WORKING VERSION */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white/20"
              initial={{
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                x: `${Math.random() * 200 - 100}px`,
                y: `${Math.random() * 200 - 100}px`,
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        {/* Conditional Floating Glass Elements */}
        <>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-float-slow hover:scale-110 transition-transform duration-300" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-float-medium delay-1000 hover:scale-110 transition-transform duration-300" />
          <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-float-fast delay-500 hover:scale-110 transition-transform duration-300" />
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 animate-float-slow delay-1500 hover:scale-110 transition-transform duration-300" />
        </>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="z-10 text-center flex flex-col items-center justify-center max-w-6xl mx-auto"
        >
          {/* Trust Badge */}
          <motion.div variants={childVariants} className="mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <Rocket className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium text-white/90">
                Trusted by 100+ Businesses
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={childVariants} className="mb-4 md:mb-6">
            <TypeAnimation
              sequence={[
                "Custom Web Development Solutions",
                2000,
                "High-Performance Websites & Apps",
                2000,
                "SEO-Optimized Business Sites",
                2000,
                "Scalable E-Commerce Platforms",
                2000,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={70}
              repeat={Infinity}
              className="text-2xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              cursor={!shouldReduceMotion}
            />
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={childVariants}
            className="text-base sm:text-lg md:text-xl max-w-3xl mb-6 md:mb-8 text-white/90 leading-relaxed"
          >
            We design & develop{" "}
            <span className="font-semibold text-white">
              blazing-fast websites
            </span>{" "}
            that convert visitors into customers. Perfect for businesses looking
            to{" "}
            <span className="font-semibold text-white">
              scale their online presence.
            </span>
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            variants={childVariants}
            className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                {badge.icon}
                <span className="text-sm text-white/80">{badge.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={buttonVariants}
            className="flex flex-wrap justify-center gap-2 z-50"
          >
            <Buttons
              first_label={"See Our Work"}
              second_label={"Consultation"}
              first_nav={"/services"}
              buttonActionTwo={handleContactModel}
              first_styles={
                "md:px-6 px-3 py-2 md:py-3.5 border-2 border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
              }
              second_styles={
                "md:px-6 px-4 py-2 md:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-medium rounded-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300"
              }
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {!shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <button
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors duration-300"
              aria-label="Scroll down"
            >
              <ChevronsDown className="w-5 h-5 text-white animate-bounce" />
            </button>
          </motion.div>
        )}

        {/* Client Logos (Optional - Add your own logos) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute bottom-4 right-4 flex justify-center gap-6 md:gap-10 opacity-80"
        >
          {/* Replace with your client logos */}
          <div className="inline-flex items-center grayscale border px-2 border-gray-500 p-1 rounded bg-gray-500/20 contrast-200 brightness-0 invert-[1] opacity-60">
            <span className="text-xs">Trusted By</span>{" "}
            <TrustSVG width={40} height={30} color="green" />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
