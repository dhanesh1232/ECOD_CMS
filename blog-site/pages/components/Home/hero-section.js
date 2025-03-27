import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { TrustSVG } from "@/public/Assets/svg";
import ClickSpark from "../Reusable/sparkle";
import LoaderSpinner from "../Reusable/Spinner/spinner";
import Threads from "../Reusable/thread";
import { ChevronsDown, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

// Dynamically import Buttons with loading fallback
const Buttons = dynamic(() => import("../Reusable/buttons"), {
  loading: () => (
    <div className="flex gap-4">
      <div className="px-6 py-3 rounded-lg bg-blue-400 opacity-50">
        <LoaderSpinner />
      </div>
      <div className="px-6 py-3 rounded-lg border-2 opacity-50">
        <LoaderSpinner />
      </div>
    </div>
  ),
});

const HeroSection = () => {
  const [frstLabel, setFrstLabel] = useState(
    typeof window !== "undefined" && window.innerWidth < 650
      ? "Learn"
      : "Learn More"
  );

  useEffect(() => {
    const handleResize = () => {
      setFrstLabel(window.innerWidth < 650 ? "Learn" : "Learn More");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldReduceMotion = useReducedMotion();

  // Animation variants that respect reduced motion preferences
  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : -50,
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

  const buttonVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="w-full h-[500px] md:h-[700px] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden transition-all ease-in-out duration-150"
      aria-label="Hero Section"
      data-testid="hero-section"
      id="hero-section"
    >
      {/* Glass Morphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-indigo-600/80 to-purple-600/80 backdrop-blur-md z-0" />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent animate-pulse-slow delay-1000" />
      </div>

      {!shouldReduceMotion && (
        <ClickSpark
          sparkColor="rgba(255,255,255,0.9)"
          sparkCount={20}
          extraScale={1.5}
          duration={800}
          easing="ease-in-out"
        />
      )}

      <div className="absolute w-full h-full">
        <Threads
          amplitude={1.5}
          distance={20}
          enableMouseInteraction={true}
          linecolor="rgba(255,255,255,0.15)"
        />
      </div>

      {/* Floating Glass Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-float-medium delay-1000" />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-float-fast delay-500" />

      {/* Hero Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="z-10 text-center flex flex-col items-center justify-center max-w-6xl mx-auto"
        role="banner"
      >
        <motion.div variants={childVariants} className="mb-1 md:mb-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium border border-white/10 hover:bg-white/15 transition-all duration-300">
            <Rocket className="w-4 h-4 mr-2" /> Digital Transformation
          </span>
        </motion.div>

        <motion.h1 variants={childVariants} className="mb-1 md:mb-6">
          <div className="flex items-center justify-center">
            <TypeAnimation
              sequence={[
                "Transform Your Vision Into Reality 🚀",
                2000,
                "Build Your Digital Future 🚀",
                2000,
                "Create Powerful Web Experiences 🚀",
                2000,
                `Grow Your Online Presence 🚀`,
                2000,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={70}
              repeat={Infinity}
              className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-purple-600 bg-clip-text text-transparent"
              cursor={!shouldReduceMotion}
            />
          </div>
        </motion.h1>

        <motion.p
          variants={childVariants}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-2 md:mb-8 leading-relaxed text-blue-100/90"
        >
          <span className="block sm:hidden">
            We create blazing-fast, scalable websites and web apps that deliver
            real results.
          </span>
          <span className="sm:block hidden">
            We create blazing-fast, scalable websites and web apps that deliver
            real results. From sleek business sites to powerful eCommerce
            platforms and modern SaaS solutions.
          </span>
        </motion.p>
      </motion.div>

      {/* Buttons with Glass Effect */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="flex items-center gap-3 sm:gap-4 z-50 relative mt-2"
        role="navigation"
        aria-label="navigation"
      >
        <Buttons
          first_label={frstLabel}
          second_label={"Contact"}
          first_nav={"/services"}
          second_nav={"/contact"}
          first_styles={
            "px-8 py-3.5 bg-gradient-to-r flex-inline items-center from-blue-400/90 to-indigo-500/90 hover:from-blue-300/90 hover:to-indigo-400/90 text-white font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
          }
          second_styles={
            "px-8 py-3.5 border-2 border-white/30 hover:border-blue-200/50 text-white font-semibold rounded-lg hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          }
        />
      </motion.div>

      {/* Scroll Indicator */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 transform -translate-x-1/2 z-10 flex flex-col items-center"
        >
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 animate-pulse">
            <ChevronsDown className="w-6 h-6 text-white/80 animate-bounce" />
          </div>
        </motion.div>
      )}

      {/* Trust Badge with Glass Effect */}
      <div className="absolute transform right-2 md:right-4 z-10 flex items-center bottom-0 sm:bottom-2 gap-2 p-2 rounded-lg sm:bg-white/5 sm:backdrop-blur-sm sm:border border-white/10">
        <span className="text-sm text-white/80">Trusted by</span>
        <TrustSVG
          width={50}
          height={60}
          color="#026607"
          aria-label="Trust Badge"
          className="hover:scale-105 transition-transform duration-200"
        />
      </div>
    </section>
  );
};

export default HeroSection;
