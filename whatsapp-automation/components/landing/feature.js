import { motion } from "framer-motion";
import {
  FaRobot,
  FaSync,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaLightbulb,
  FaChevronRight,
} from "react-icons/fa";

export default function FeatureSection() {
  const features = [
    {
      icon: <FaRobot className="h-5 w-5" />,
      title: "AI-Powered Chatbots",
      description:
        "Smart chatbots that understand natural language and provide instant, accurate responses 24/7.",
      badge: "Most Popular",
      stats: ["95% accuracy", "24/7 availability"],
    },
    {
      icon: <FaSync className="h-5 w-5" />,
      title: "Workflow Automation",
      description:
        "Drag-and-drop visual builder to create complex automation sequences without coding.",
      stats: ["50+ templates", "No-code setup"],
    },
    {
      icon: <FaUsers className="h-5 w-5" />,
      title: "Team Collaboration",
      description:
        "Shared inbox with assignment, notes, and collision detection for seamless teamwork.",
      stats: ["Unlimited agents", "Real-time sync"],
    },
    {
      icon: <FaChartLine className="h-5 w-5" />,
      title: "Smart Campaigns",
      description:
        "Bulk messaging with dynamic personalization, scheduling, and performance tracking.",
      stats: ["99% deliverability", "40%+ CTR"],
    },
    {
      icon: <FaShieldAlt className="h-5 w-5" />,
      title: "Enterprise Security",
      description:
        "End-to-end encryption, data residency options, and compliance certifications.",
      stats: ["GDPR ready", "SOC 2 compliant"],
    },
    {
      icon: <FaLightbulb className="h-5 w-5" />,
      title: "Advanced Analytics",
      description:
        "Real-time dashboards with custom reports and actionable insights.",
      stats: ["30+ metrics", "Exportable data"],
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-50 opacity-30 -mr-32 -mb-32"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-50 rounded-full mb-4">
            Powerful Features
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Everything You Need for{" "}
            <span className="text-green-600">WhatsApp Automation</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            {`Fully compliant with WhatsApp's Business Policy and packed with
            enterprise-grade capabilities`}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Feature card */}
              <div className="relative h-full bg-white p-8 rounded-2xl shadow-md border border-gray-100 group-hover:border-green-200 transition-all duration-300 z-10">
                {/* Icon with gradient background */}
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 text-white shadow-lg mb-6">
                  {feature.icon}
                </div>

                {/* Badge */}
                {feature.badge && (
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full mb-4">
                    {feature.badge}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">{feature.description}</p>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {feature.stats.map((stat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-800"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learn more link */}
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 group"
                  >
                    Learn more
                    <FaChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your WhatsApp communication?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white text-gray-800 border border-gray-300 font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              See All Features
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
