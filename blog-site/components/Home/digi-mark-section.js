"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { generateMarketingData } from "@/data/service_data";
import {
  Search,
  BarChart2,
  Share2,
  Rocket,
  ArrowRight,
  TrendingUp,
  Zap,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
const Buttons = dynamic(() => import("@/components/Reusable/buttons"));

const DigitalMarketing = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1 });
  const [chartRef, chartInView] = useInView({ threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });

  // Generate real-time data
  const marketingData = generateMarketingData();
  const currentMonthData = marketingData[marketingData.length - 1];

  const serviceData = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO (Search Engine Optimization)",
      color: "from-blue-500 to-blue-600",
      darkColor: "from-blue-400 to-blue-500",
      description:
        "Improves website visibility on search engines like Google by optimizing content, keywords, and backlinks.",
      stats: `${currentMonthData.SEO_Trend || "+15%"} MoM growth`,
      conversions: currentMonthData.SEO_Conversions,
      roi: currentMonthData.SEO_ROI,
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "PPC (Pay-Per-Click)",
      color: "from-purple-500 to-purple-600",
      darkColor: "from-purple-400 to-purple-500",
      description:
        "Paid advertising model where businesses pay per click, effective for quick traffic and conversions.",
      stats: `${currentMonthData.PPC_Trend || "+12%"} MoM growth`,
      conversions: currentMonthData.PPC_Conversions,
      roi: currentMonthData.PPC_ROI,
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media Marketing",
      color: "from-orange-500 to-orange-600",
      darkColor: "from-orange-400 to-orange-500",
      description:
        "Engages audiences through platforms like Facebook and Instagram for brand awareness and sales growth.",
      stats: `${currentMonthData.SMM_Trend || "+18%"} MoM growth`,
      conversions: currentMonthData.SMM_Conversions,
      roi: currentMonthData.SMM_ROI,
    },
  ];

  const handleContactModel = () => {
    router.push(`${pathname}?modal=contact-bid`, { scroll: false });
  };

  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-50/50 via-white/50 to-blue-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={ctaInView ? { opacity: 0.05, y: 0 } : {}}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute rounded-full bg-blue-400/20 dark:bg-blue-500/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/20"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/20"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Performance Stats */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            {
              icon: <TrendingUp className="w-5 h-5" />,
              value: `${currentMonthData.SEO + currentMonthData.PPC + currentMonthData.SMM}+`,
              label: "Monthly Leads",
              change: "+22% YoY",
            },
            {
              icon: <Zap className="w-5 h-5" />,
              value: `${(currentMonthData.SEO_Cost + currentMonthData.PPC_Cost + currentMonthData.SMM_Cost) / 1000}k`,
              label: "Monthly Ad Spend",
              change: "+15% YoY",
            },
            {
              icon: <Users className="w-5 h-5" />,
              value: `${currentMonthData.SEO_Conversions + currentMonthData.PPC_Conversions + currentMonthData.SMM_Conversions}+`,
              label: "Monthly Conversions",
              change: "+28% YoY",
            },
            {
              icon: <BarChart2 className="w-5 h-5" />,
              value: `${((parseFloat(currentMonthData.SEO_ROI) + parseFloat(currentMonthData.PPC_ROI) + parseFloat(currentMonthData.SMM_ROI)) / 3).toFixed(1)}x`,
              label: "Avg. ROI",
              change: "+12% YoY",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/30 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100/50 dark:bg-blue-900/20 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
              <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                {stat.change}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-blue-600 dark:text-blue-300 text-sm font-medium mb-4 border border-blue-200/30 dark:border-blue-700/30 shadow-inner"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Rocket className="w-4 h-4 mr-2" /> Digital Growth Solutions
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight">
            Transform Your Digital Presence
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-gray-600/90 dark:text-gray-300/90 max-w-3xl mx-auto backdrop-blur-sm"
          >
            Amplify your brand with our{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400 bg-white/50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded">
              data-driven
            </span>{" "}
            marketing strategies that deliver{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded">
              measurable results
            </span>{" "}
            and{" "}
            <span className="font-semibold text-orange-600 dark:text-orange-400 bg-white/50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded">
              sustainable growth
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 20 }}
          animate={chartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/30 mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900/90 dark:text-white/90">
                Marketing Performance
              </h3>
              <p className="text-gray-500/90 dark:text-gray-400/90">
                Last {marketingData.length} months growth metrics
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100/50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
                Updated:{" "}
                {new Date(currentMonthData.lastUpdated).toLocaleTimeString()}
              </span>
              {["SEO", "PPC", "SMM"].map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30"
                  style={{
                    backgroundColor:
                      item === "SEO"
                        ? "rgba(59, 130, 246, 0.1)"
                        : item === "PPC"
                          ? "rgba(139, 92, 246, 0.1)"
                          : "rgba(249, 115, 22, 0.1)",
                    color:
                      item === "SEO"
                        ? "#3b82f6"
                        : item === "PPC"
                          ? "#8b5cf6"
                          : "#f97316",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketingData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(156, 163, 175, 0.2)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(156, 163, 175, 0.2)" }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-gray-200/30 dark:border-gray-700/30">
                          <div className="font-semibold text-gray-900 dark:text-white mb-2">
                            {data.month}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {payload.map((entry, idx) => (
                              <div
                                key={`tooltip-${idx}`}
                                className="flex items-center"
                              >
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-gray-500">
                                  {entry.name}:
                                </span>
                                <span className="font-medium ml-auto">
                                  {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                          {data.lastUpdated && (
                            <div className="mt-2 text-xs text-gray-500">
                              Updated:{" "}
                              {new Date(data.lastUpdated).toLocaleString()}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => (
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {value}
                    </span>
                  )}
                />
                <ReferenceLine
                  y={100}
                  stroke="rgba(156, 163, 175, 0.5)"
                  strokeDasharray="3 3"
                  label={{
                    value: "Target",
                    position: "insideTopLeft",
                    fill: "#6b7280",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="SEO"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  activeDot={{
                    r: 6,
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="PPC"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8b5cf6" }}
                  activeDot={{
                    r: 6,
                    stroke: "#8b5cf6",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="SMM"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#f97316" }}
                  activeDot={{
                    r: 6,
                    stroke: "#f97316",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={servicesRef}
          initial={{ opacity: 0, y: 20 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative overflow-hidden shadow-lg transform transition ease-in-out duration-300"
            >
              <div className="relative bg-white/80 shadow-xl dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-8 h-full border border-gray-200/50 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300">
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                ></div>
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${service.color} text-white mb-6 shadow-inner`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900/90 dark:text-white/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600/90 dark:text-gray-400/90 mb-4">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/70 dark:bg-gray-700/50 p-2 rounded-lg">
                    <div className="text-xs text-gray-500">Conversions</div>
                    <div className="font-bold">{service.conversions}</div>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-700/50 p-2 rounded-lg">
                    <div className="text-xs text-gray-500">ROI</div>
                    <div className="font-bold">{service.roi}x</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 shadow-inner">
                    {service.stats}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative max-w-3xl mx-auto px-8 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"></div>
            <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.15)] pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Accelerate Your Growth?
              </h3>
              <p className="text-blue-100/90 mb-8 max-w-2xl mx-auto">
                Our digital marketing experts will craft a customized strategy
                to elevate your brand and drive real results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Buttons
                  second_label="Book Consultation"
                  buttonActionTwo={handleContactModel}
                  icon={true}
                  second_styles="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/80 hover:border-white text-white hover:bg-white/10 font-semibold rounded-lg hover:scale-105 transition-transform backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalMarketing;
