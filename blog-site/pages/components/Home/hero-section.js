import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { TrustSVG } from "@/public/Assets/svg";
import ClickSpark from "../Reusable/sparkle";
import ShinyText from "../Reusable/shinny-text";
import LoaderSpinner from "../Reusable/Spinner/spinner";

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

      {/* Hero Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center flex flex-col items-center justify-center max-w-6xl mx-auto"
        role="banner"
      >
        <ShinyText
          className="text-4xl md:text-6xl font-handwriting mb-4 text-white"
          text={"Transform Your Vision Into Reality 🚀"}
          speed={5}
          shineColor="#000"
          baseColor="gray"
          highlightColor="blue"
        />

        <motion.p
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-6 drop-shadow-md text-serif leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="sm:hidden">
            We create fast, scalable websites and web apps that deliver results.
            From sleek business sites to powerful eCommerce platforms and modern
            SaaS solutions...
          </span>
          <span className="hidden sm:inline">
            {`We create fast, scalable websites and web apps that deliver results.
            From sleek business sites to powerful eCommerce platforms and modern
            SaaS solutions, we use the latest tech like React, Next.js, and
            Tailwind CSS to build stunning, user-friendly digital experiences.
            Let's bring your ideas to life!`}
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
            "px-8 py-3.5 bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-300 hover:to-indigo-400 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 hover:scale-105"
          }
          second_styles={
            "px-8 py-3.5 border-2 border-white hover:border-blue-200 text-white font-semibold rounded-lg hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105"
          }
        />
      </motion.div>

      {/* Wave Animation */}
      {!shouldReduceMotion && (
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
          aria-hidden="true"
        >
          <svg
            className="relative block w-full h-[100px] animate-float"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1500,50 L1500,100 L0,100 Z"
              fill="rgba(255,255,255,0.3)"
            />
          </svg>
        </div>
      )}

      {/* Trust Badge */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bottom-0 sm:bottom-2">
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
