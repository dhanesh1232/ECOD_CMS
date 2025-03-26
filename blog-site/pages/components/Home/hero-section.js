import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { TrustSVG } from "@/public/Assets/svg";
import ClickSpark from "../Reusable/sparkle";
import ShinyText from "../Reusable/shinny-text";
import LoaderSpinner from "../Reusable/Spinner/spinner";
import Threads from "../Reusable/thread";
import { ChevronsDown, Rocket } from "lucide-react";

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
  // Use framer-motion's built-in reduced motion detection
  const shouldReduceMotion = useReducedMotion();

  // Animation variants that respect reduced motion preferences
  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : -50,
    },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.8,
    },
    visible: { opacity: 1, scale: 1 },
  };

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="w-full h-[500px] md:h-[700px] flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 sm:px-6 relative overflow-hidden transition-all ease-in-out duration-150"
      aria-label="Hero Section"
    >
      {!shouldReduceMotion && (
        <ClickSpark
          sparkColor="rgba(255,255,255,0.9)"
          sparkCount={12}
          extraScale={1.2}
          duration={600}
          easing="ease-in-out"
        />
      )}
      <div className="absolute w-full h-full">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>
      {/* Hero Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center flex flex-col items-center justify-center max-w-6xl mx-auto"
        role="banner"
      >
        <motion.div variants={childVariants} className="mb-1 md:mb-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium">
            <Rocket className="w-4 h-4 mr-2" /> Digital Transformation
          </span>
        </motion.div>
        <motion.h1 variants={childVariants} className="mb-1 md:mb-6">
          <ShinyText
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
            text="Transform Your Vision Into Reality"
            speed={4}
            shineColor="#ffffff"
            baseColor="#e0e7ff"
            highlightColor="#ffffff"
            disableReducedMotion={shouldReduceMotion}
          />
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
            className="inline-block ml-3"
            aria-hidden="true"
          >
            🚀
          </motion.span>
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

      {/* Buttons with Glow Hover Effect */}
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
          first_label={"Learn More"}
          second_label={"Contact Us"}
          first_nav={"/services"}
          second_nav={"/contact"}
          first_styles={
            "px-8 py-3.5 bg-gradient-to-r flex-inline items-center from-blue-400 to-indigo-500 hover:from-blue-300 hover:to-indigo-400 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 hover:scale-105"
          }
          second_styles={
            "px-8 py-3.5 border-2 border-white hover:border-blue-200 text-white font-semibold rounded-lg hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105"
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
          <ChevronsDown className="w-6 h-6 text-white/60 animate-bounce" />
        </motion.div>
      )}

      {/* Trust Badge */}
      <div className="absolute transform right-4 z-10 flex items-center bottom-0 sm:bottom-2">
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
