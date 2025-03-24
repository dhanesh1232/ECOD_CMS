import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { TrustSVG } from "@/public/Assets/svg";
import { useCallback, useState } from "react";

// Dynamically import Buttons to reduce initial load
const Buttons = dynamic(() => import("../Reusable/buttons"));

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  // Track mouse movement inside the section
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section
      className="w-full h-[500px] md:h-[700px] flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 sm:px-6 relative overflow-hidden transition-all ease-in-out duration-150"
      onMouseMove={handleMouseMove}
      aria-label="Hero Section"
    >
      {/* Dot Reflection Effect */}
      <motion.div
        className="absolute w-6 h-6 md:w-10 md:h-10 bg-white opacity-40 rounded-full blur-lg pointer-events-none overflow-hidden"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{
          position: "absolute",
        }}
      />

      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={useCallback(async (engine) => await loadSlim(engine), [])}
        options={{
          background: { color: "transparent" },
          fpsLimit: 120,
          particles: {
            number: { value: 120 },
            color: { value: "#ffffff" },
            shape: { type: ["square", "circle"] },
            opacity: { value: 0.8, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 2.5,
              direction: "none",
              random: true,
              straight: true,
              outModes: "out",
            },
          },
        }}
        className="absolute inset-0"
      />

      {/* Floating Blobs */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white opacity-10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center flex flex-col items-center justify-center"
        role="banner"
      >
        <h1 className="text-4xl md:text-4xl italic xl:text-6xl font-extrabold mb-4 drop-shadow-lg font-handwriting">
          Transform Your Vision into Reality 🚀
        </h1>

        <p className="text-lg sm:text-xl font-sans md:text-2xl max-w-2xl mb-8 drop-shadow-md">
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
            `
          </span>
        </p>
      </motion.div>

      {/* Buttons with Glow Hover Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="flex gap-2 sm:gap-4 z-10 relative"
        role="navigation"
        onMouseEnter={() => setMousePosition({ x: -100, y: -100 })}
        onMouseLeave={handleMouseMove} // Show dot again
      >
        <Buttons
          first_label={"Learn More"}
          second_label={"Contact Us"}
          first_nav={"/services"}
          second_nav={"/contact"}
          first_styles={
            "px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-[0px_0px_15px_rgba(0,0,255,0.6)] transition-all duration-300 transform hover:scale-105"
          }
          second_styles={
            "px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-[0px_0px_15px_rgba(255,255,255,0.6)] transition-all duration-300 transform hover:scale-105"
          }
        />
      </motion.div>

      {/* Wave Animation */}
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

      {/* Trust Badge */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bottom-0 sm:bottom-2">
        <span className="text-sm text-white opacity-80">Trusted by</span>
        <TrustSVG
          width={50}
          height={60}
          color="#026607"
          aria-label="Trust Badge"
        />
      </div>
    </section>
  );
};

export default HeroSection;
