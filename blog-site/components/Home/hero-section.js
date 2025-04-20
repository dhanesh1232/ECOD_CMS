import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Shield,
  ChevronRight,
  ThumbsUp,
  Clock,
  Star,
  ArrowUpRight,
  TrendingUp,
  Zap,
  BarChart2,
  Globe2,
  Globe,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { usePathname, useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Sample data for charts
  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 7390 },
  ];

  const kpiData = [
    { name: "ROI", value: 4.2 },
    { name: "CAC", value: 2.8 },
    { name: "LTV", value: 8.5 },
    { name: "CR", value: 3.1 },
  ];

  // Key metrics
  const metrics = [
    {
      icon: <Rocket className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      value: "2-5X",
      label: "ROI Guarantee",
    },
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      value: "24h",
      label: "Response Time",
    },
    {
      icon: <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      value: "90%",
      label: "Retention",
    },
    {
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      value: "4.9/5",
      label: "Rating",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
      },
    },
  };

  const handleContactModal = () => {
    router.push(`${pathname}?modal=contact-bid`, { scroll: false });
  };
  return (
    <section
      ref={ref}
      id="hero-section"
      className="relative pt-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-400/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: ["0%", "5%", "0%"],
            y: ["0%", "-5%", "0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-indigo-400/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.15, 0.1],
            x: ["0%", "-5%", "0%"],
            y: ["0%", "5%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Trust Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300 text-xs sm:text-sm"
              whileHover={{ y: -2 }}
            >
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              <span>Trusted by 1,000+ businesses</span>
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-3xl sm:text-[2.75rem] md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Results-Driven
              </motion.span>{" "}
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Digital Solutions
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              className="text-base md:text-lg text-blue-100 dark:text-blue-200 mb-6 sm:mb-8"
            >
              We help{" "}
              <span className="font-semibold text-white">
                SaaS companies and agencies
              </span>{" "}
              increase revenue by 2-5X with our proven frameworks.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={container}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <motion.button
                variants={item}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 10px 25px -5px rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContactModal}
                className="flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              >
                Get Free Strategy
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                variants={item}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/portfolio")}
                className="flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all text-sm sm:text-base"
              >
                <Globe className="text-sm sm:text-base mr-2" />
                Portfolio
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 sm:mt-0"
          >
            {/* Stats Card (Top) */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 z-10 w-36 sm:w-40 md:w-48"
            >
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl border border-white/10 text-xs sm:text-sm">
                <div className="flex items-center mb-2 sm:mb-3">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 mr-1.5 sm:mr-2" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    +78%
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-1 sm:mb-2">
                  Revenue Growth
                </p>
                <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "78%" } : {}}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Main Chart */}
            <motion.div
              variants={chartVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/20 p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-yellow-400" />
                Client Revenue Growth
              </h3>
              <div className="h-48 sm:h-56 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ffffff"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ffffff"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="2 2"
                      strokeOpacity={0.1}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#bfdbfe", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      tickMargin={8}
                    />
                    <YAxis
                      tick={{ fill: "#bfdbfe", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      tickMargin={8}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(30, 41, 59, 0.9)",
                        borderColor: "rgba(255,255,255,0.2)",
                        borderRadius: "0.375rem",
                        backdropFilter: "blur(10px)",
                        fontSize: "0.875rem",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#ffffff"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      strokeWidth={1.5}
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Stats Card (Bottom) */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-10 w-36 sm:w-40 md:w-48"
            >
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl border border-white/10 text-xs sm:text-sm">
                <div className="flex items-center mb-2 sm:mb-3">
                  <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-500 mr-1.5 sm:mr-2" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Key KPIs
                  </span>
                </div>
                <div className="h-24 sm:h-28 md:h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={kpiData}
                      layout="vertical"
                      margin={{ left: -15 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 10 }}
                        width={60}
                      />
                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        radius={[0, 2, 2, 0]}
                        animationDuration={1800}
                      >
                        {kpiData.map((entry, index) => (
                          <text
                            key={index}
                            x={entry.value * 10}
                            y={index * 20 + 10}
                            textAnchor="start"
                            dominantBaseline="middle"
                            fill="#ffffff"
                            fontSize={10}
                            fontWeight="bold"
                          >
                            {entry.value}
                          </text>
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mb-6 sm:mb-8 text-center"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90">
              Proven Results Across Industries
            </h3>
            <p className="mt-2 text-sm sm:text-base text-blue-100/80 max-w-2xl mx-auto">
              Trusted by startups and enterprises to deliver measurable impact
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          delay: 0.9 + index * 0.1,
                          type: "spring",
                          stiffness: 100,
                        },
                      }
                    : {}
                }
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255,255,255,0.12)",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
                className="relative text-center bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all overflow-hidden group"
              >
                {/* Animated background element */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -50, y: -50 }}
                  whileHover={{ x: 0, y: 0 }}
                />

                {/* Icon container */}
                <motion.div
                  whileHover={{
                    rotate: [0, 10, -5, 0],
                    scale: [1, 1.1, 1.05, 1.1],
                    transition: { duration: 0.6 },
                  }}
                  className="inline-flex items-center justify-center p-3 mb-3 sm:mb-4 bg-white/10 rounded-full border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-colors"
                >
                  {metric.icon}
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.p
                    className="text-xl md:text-3xl font-bold text-white mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
                    whileHover={{ scale: 1.05 }}
                  >
                    {metric.value}
                  </motion.p>
                  <motion.p
                    className="text-xs md:text-base font-medium text-blue-100/90 tracking-wide uppercase"
                    whileHover={{ scale: 1.02 }}
                  >
                    {metric.label}
                  </motion.p>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute -inset-1 bg-blue-400/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all metrics link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.3 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <a
              href="#metrics"
              className="inline-flex items-center text-sm sm:text-base font-medium text-white/80 hover:text-white transition-colors group"
            >
              Explore all performance metrics
              <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
