import dynamic from "next/dynamic";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// Dynamically import icons to reduce bundle size
const Rocket = dynamic(() => import("lucide-react").then((mod) => mod.Rocket), {
  ssr: false,
});
const ArrowRight = dynamic(
  () => import("lucide-react").then((mod) => mod.ArrowRight),
  { ssr: false }
);
const ChevronDown = dynamic(
  () => import("lucide-react").then((mod) => mod.ChevronDown),
  { ssr: false }
);
const BarChart = dynamic(
  () => import("lucide-react").then((mod) => mod.BarChart),
  { ssr: false }
);
const Zap = dynamic(() => import("lucide-react").then((mod) => mod.Zap), {
  ssr: false,
});
const Code = dynamic(() => import("lucide-react").then((mod) => mod.Code), {
  ssr: false,
});
const Shield = dynamic(() => import("lucide-react").then((mod) => mod.Shield), {
  ssr: false,
});
const Globe = dynamic(() => import("lucide-react").then((mod) => mod.Globe), {
  ssr: false,
});
const TrendingUp = dynamic(
  () => import("lucide-react").then((mod) => mod.TrendingUp),
  { ssr: false }
);
const Smartphone = dynamic(
  () => import("lucide-react").then((mod) => mod.Smartphone),
  { ssr: false }
);
const Server = dynamic(() => import("lucide-react").then((mod) => mod.Server), {
  ssr: false,
});

const TypeAnimation = dynamic(
  () => import("react-type-animation").then((mod) => mod.TypeAnimation),
  {
    ssr: false,
    loading: () => (
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-500">
        Elite Digital Solutions
      </span>
    ),
  }
);

// Constants for better organization
const SERVICES = [
  {
    icon: <BarChart className="w-8 h-8 text-blue-600 dark:text-blue-300" />,
    title: "Performance Ads",
    description: "Data-driven campaigns with 5x+ ROAS",
    stats: "4.8x average ROAS",
    color: "bg-blue-50/80 dark:bg-blue-900/30",
    border: "border-blue-100/80 dark:border-blue-400/20",
    hover: "hover:shadow-blue-200/50 dark:hover:shadow-blue-500/20",
  },
  {
    icon: <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />,
    title: "Web Development",
    description: "Blazing-fast conversion machines",
    stats: "210% faster load times",
    color: "bg-indigo-50/80 dark:bg-indigo-900/30",
    border: "border-indigo-100/80 dark:border-indigo-400/20",
    hover: "hover:shadow-indigo-200/50 dark:hover:shadow-indigo-500/20",
  },
  {
    icon: <Zap className="w-8 h-8 text-cyan-600 dark:text-cyan-300" />,
    title: "UX Optimization",
    description: "Seamless user experiences",
    stats: "75% higher engagement",
    color: "bg-cyan-50/80 dark:bg-cyan-900/30",
    border: "border-cyan-100/80 dark:border-cyan-400/20",
    hover: "hover:shadow-cyan-200/50 dark:hover:shadow-cyan-500/20",
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-600 dark:text-blue-300" />,
    title: "Enterprise Security",
    description: "Bank-grade protection",
    stats: "99.99% uptime",
    color: "bg-blue-50/80 dark:bg-blue-900/30",
    border: "border-blue-100/80 dark:border-blue-400/20",
    hover: "hover:shadow-blue-200/50 dark:hover:shadow-blue-500/20",
  },
];

const FEATURES = [
  {
    icon: <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
    title: "Global Reach",
    description: "We serve clients across 15+ countries",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-green-500 dark:text-green-400" />,
    title: "Proven Results",
    description: "Consistent 3x growth for our clients",
  },
  {
    icon: (
      <Smartphone className="w-6 h-6 text-purple-500 dark:text-purple-400" />
    ),
    title: "Mobile-First",
    description: "Optimized for all device types",
  },
  {
    icon: <Server className="w-6 h-6 text-orange-500 dark:text-orange-400" />,
    title: "Enterprise Grade",
    description: "Scalable infrastructure",
  },
];

const STATS = [
  { value: "50+", label: "Clients Worldwide" },
  { value: "4.7/5", label: "Average Rating" },
  { value: "24/7", label: "Support Available" },
  { value: "93%", label: "Client Retention" },
];

// Sub-components for better organization
const ServiceCard = ({ service, index, shouldReduceMotion }) => (
  <motion.div
    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    transition={{ delay: shouldReduceMotion ? 0 : 0.1 * index, duration: 0.8 }}
    whileHover={shouldReduceMotion ? {} : { y: -10 }}
    className={`p-8 rounded-2xl ${service.color} backdrop-blur-lg border ${service.border} ${service.hover} transition-all duration-500 overflow-hidden relative transform-gpu`}
  >
    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-xl" />
    <div className="relative z-10">
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mx-auto bg-white/80 dark:bg-black/20 backdrop-blur-sm border ${service.border}`}
      >
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-blue-100/80 mb-4 text-center">
        {service.description}
      </p>
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 text-center">
        {service.stats}
      </p>
    </div>
  </motion.div>
);

const FeatureItem = ({ feature }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 mt-1">
      <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-800/30 border border-blue-200/50 dark:border-blue-400/20">
        {feature.icon}
      </div>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
        {feature.title}
      </h4>
      <p className="text-gray-600 dark:text-blue-100/80">
        {feature.description}
      </p>
    </div>
  </div>
);

const StatCard = ({ stat }) => (
  <div className="bg-white/50 dark:bg-blue-900/20 backdrop-blur-lg p-6 rounded-xl border border-gray-200/50 dark:border-white/10 text-center hover:shadow-md transition-all duration-300 transform-gpu hover:scale-[1.02]">
    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent mb-2">
      {stat.value}
    </p>
    <p className="text-sm text-gray-600 dark:text-blue-100/80 uppercase tracking-wider">
      {stat.label}
    </p>
  </div>
);

const HeroSection = () => {
  const router = useRouter();
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion() || isMobile;

  useEffect(() => {
    if (!shouldReduceMotion) {
      // Start animation sequence after component mounts
      controls.start({
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      });
    }
  }, [shouldReduceMotion, controls]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants
  const containerVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.4,
          },
        },
      };

  const childVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

  const handleConsultationClick = () => {
    // Track analytics event
    if (window.gtag) {
      window.gtag("event", "click", {
        event_category: "CTA",
        event_label: "Free Consultation",
      });
    }

    // Store click data
    const clickData = {
      timestamp: new Date().toISOString(),
      modelOpen: true,
    };
    localStorage.setItem("contactModelClick", JSON.stringify(clickData));
  };

  const handlePortfolioClick = () => {
    router.push("/portfolio").catch((e) => {
      console.error("Navigation error:", e);
      // Fallback or error handling
    });
  };

  return (
    <>
      <Head>
        <title>Premium Digital Solutions | Web & Ads Specialists</title>
        <meta
          name="description"
          content="Cutting-edge web development and performance marketing with stunning glassmorphism design"
        />
        {/* OpenGraph tags */}
        <meta property="og:title" content="Premium Digital Solutions" />
        <meta
          property="og:description"
          content="Cutting-edge web development and performance marketing"
        />
        <meta property="og:type" content="website" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Digital Solutions" />
        <meta
          name="twitter:description"
          content="Cutting-edge web development and performance marketing"
        />
      </Head>

      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden isolate bg-gradient-to-br from-blue-700 to-indigo-600 dark:from-blue-950 dark:via-indigo-950 dark:to-gray-900"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label="Hero section"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:4rem_4rem]">
              <div className="absolute bottom-0 right-0 bg-gradient-to-t from-white to-transparent dark:from-blue-950 h-[20%] w-full" />
            </div>
          </div>

          {/* Floating Glass Orbs */}
          <div
            className={`absolute -left-40 -top-40 w-[30rem] h-[30rem] rounded-full bg-blue-400/10 backdrop-blur-3xl filter blur-[100px] opacity-20 dark:opacity-30 transition-all duration-1000 ${isHovering ? "translate-x-20 translate-y-20" : ""}`}
            aria-hidden="true"
          />
          <div
            className={`absolute -right-40 -bottom-40 w-[30rem] h-[30rem] rounded-full bg-indigo-400/10 backdrop-blur-3xl filter blur-[100px] opacity-20 dark:opacity-30 transition-all duration-1000 ${isHovering ? "-translate-x-20 -translate-y-20" : ""}`}
            aria-hidden="true"
          />
        </div>

        {/* Floating Glass Panels */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute top-1/3 left-[15%] w-64 h-64 rounded-2xl bg-blue-100/50 dark:bg-blue-600/15 backdrop-blur-xl border border-blue-200/50 dark:border-white/10 shadow-lg dark:shadow-2xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-1/4 right-[15%] w-72 h-72 rounded-2xl bg-indigo-100/50 dark:bg-indigo-600/15 backdrop-blur-xl border border-indigo-200/50 dark:border-white/10 shadow-lg dark:shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 max-w-7xl mx-auto px-4 py-20"
        >
          {/* Trust Badge */}
          <motion.div
            variants={childVariants}
            className="mb-8 flex items-center justify-center"
          >
            <div className="inline-flex self-center items-center gap-3 px-6 py-3 rounded-full bg-white/80 dark:bg-blue-900/50 backdrop-blur-lg border border-gray-200 dark:border-blue-400/20 hover:border-blue-300 dark:hover:border-blue-400/40 transition-all duration-500 group hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-blue-200/50 dark:bg-blue-500/30 blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <Rocket className="relative w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-blue-100 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                Trusted by 50+ Businesses Worldwide
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={childVariants} className="mb-8 text-center">
            <TypeAnimation
              sequence={[
                "Transform Your Digital Presence",
                2000,
                "Premium Web Solutions",
                2000,
                "Performance Marketing",
                2000,
                "Enterprise-Grade Development",
                2000,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={70}
              repeat={Infinity}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent leading-tight"
              cursor={!shouldReduceMotion}
              aria-live="polite"
            />
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-center text-gray-300 dark:text-blue-100/90 leading-relaxed"
          >
            We create{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              high-performance digital experiences
            </span>{" "}
            that drive measurable business growth through cutting-edge
            technology and{" "}
            <span className="font-semibold text-gray-800 dark:text-white">
              data-driven strategies
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={childVariants}
            className="flex flex-wrap justify-center gap-5 mb-16 z-50"
          >
            <motion.button
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={handleConsultationClick}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transform-gpu"
              aria-label="Get Free Consultation"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={handlePortfolioClick}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-white/10 hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform-gpu"
              aria-label="View Our Portfolio"
            >
              <span>View Our Portfolio</span>
            </motion.button>
          </motion.div>

          {/* Glassmorphism Service Cards */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20"
          >
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={childVariants}
            className="max-w-4xl mx-auto bg-white/50 dark:bg-blue-900/20 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-white/10 p-8 mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Why Choose Us?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 1 }}
            className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {STATS.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {!shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -15, 0],
              transition: {
                delay: 2,
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              },
            }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          >
            <button
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="p-3 rounded-full bg-white/80 dark:bg-blue-900/30 backdrop-blur-lg border border-gray-200 dark:border-blue-400/20 hover:border-blue-300 dark:hover:border-blue-400/40 hover:bg-gray-100 dark:hover:bg-blue-900/50 transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Scroll down"
            >
              <ChevronDown className="w-6 h-6 text-gray-500 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-white transition-colors duration-300" />
            </button>
          </motion.div>
        )}
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Elite Digital Solutions",
            description:
              "Cutting-edge web development and performance marketing services",
            url: "https://ecoddigi.com",
            logo: "https://ecoddigi.com/logo.png",
            sameAs: [
              "https://twitter.com/yourhandle",
              "https://linkedin.com/company/yourcompany",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-123-456-7890",
              contactType: "sales",
              areaServed: "US,CA,UK",
            },
          }),
        }}
      />
    </>
  );
};

export default HeroSection;
