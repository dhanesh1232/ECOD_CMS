import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { TrustSVG } from "@/public/Assets/svg";
const Buttons = dynamic(() => import("../Reusable/buttons"));

const HeroSection = () => {
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  return (
    <section className="w-full h-[500px] md:h-[700px] flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 sm:px-6 relative overflow-hidden transition-all ease-in-out duration-150">
      {/* Particle Animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
            },
            modes: {
              bubble: {
                distance: 200,
                size: 10,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center flex flex-col items-center justify-center"
      >
        <h1 className="text-2xl md:text-4xl text-center xl:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Transform Your Vision into Reality 🚀
        </h1>
        <p className="text-lg sm:text-xl text-center md:text-2xl max-w-2xl mb-8 drop-shadow-md">
          {`We create fast, scalable websites and web apps that deliver results. From sleek business sites to powerful eCommerce platforms and modern SaaS solutions, we use the latest tech like React, Next.js, and Tailwind CSS to build stunning, user-friendly digital experiences. Let’s bring your ideas to life!`}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-2 sm:gap-4 z-10"
      >
        <Buttons
          first_label={"Learn More"}
          second_label={"Contact Us"}
          first_nav={"/services"}
          second_nav={"/contact"}
          first_styles={
            "px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
          }
          second_styles={
            "px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
          }
        />
      </motion.div>

      {/* Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white opacity-10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        ></motion.div>
      </div>

      {/* Trust Badge or Testimonial */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2">
        <span className="text-sm text-white opacity-80">Trusted by</span>

        <TrustSVG />
      </div>
    </section>
  );
};

export default HeroSection;
