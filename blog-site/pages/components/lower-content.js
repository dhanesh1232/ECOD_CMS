import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  ArrowRight,
  Check,
  Zap,
  Shield,
  BarChart2,
  Code,
  MessageSquare,
  ShoppingCart,
  Clock,
  Users,
  PieChart,
  Settings,
  Cpu,
  AlertCircle,
  Bot,
  Mail,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { SiGoogleads, SiMeta, SiShopify } from "react-icons/si";
import { FaCode } from "react-icons/fa";
import { FiBarChart2, FiSearch, FiTool } from "react-icons/fi";

const Buttons = dynamic(() => import("./Reusable/buttons"), {
  loading: () => (
    <div className="flex gap-4">
      <div className="px-8 py-3 rounded-lg bg-indigo-600/20 animate-pulse backdrop-blur-sm" />
      <div className="px-8 py-3 rounded-lg border-2 border-green-500/20 animate-pulse backdrop-blur-sm" />
    </div>
  ),
});

const LowerContent = () => {
  const packages = [
    {
      id: "starter",
      name: "Starter Package",
      price: "$299",
      bestFor: "Businesses starting with digital presence",
      description:
        "Essential digital package with basic automation and marketing",
      oneTimeServices: [
        {
          icon: <Code className="w-4 h-4" />,
          text: "Website Development (5 pages)",
        },
        {
          icon: <SiMeta className="w-4 h-4" />,
          text: "Meta Ads Setup (2 campaigns)",
        },
        {
          icon: <SiGoogleads className="w-4 h-4" />,
          text: "Google Ads Setup (1 campaign)",
        },
        {
          icon: <FiSearch className="w-4 h-4" />,
          text: "Free SEO Audit (First month)",
        },
      ],
      monthlyServices: [
        {
          title: "Basic Chatbot Automation (First month free, then $49/mo)",
          features: [
            {
              icon: <Bot className="w-4 h-4" />,
              text: "Whatsapp Automation chatbot",
            },
            {
              icon: <MessageSquare className="w-4 h-4" />,
              text: "20 predefined responses",
            },
            {
              icon: <Clock className="w-4 h-4" />,
              text: "Business hours automation",
            },
          ],
        },
        {
          title: "SEO Optimization (Free first month, then $14.99/mo)",
          features: [
            {
              icon: <FiSearch className="w-4 h-4" />,
              text: "Basic keyword optimization",
            },
            {
              icon: <FiBarChart2 className="w-4 h-4" />,
              text: "Monthly SEO reports",
            },
            {
              icon: <FiTool className="w-4 h-4" />,
              text: "Technical SEO fixes",
            },
          ],
        },
      ],
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      cta: "/onboarding/starter",
      details: "/pricing/starter",
      highlights: [
        "Free SEO audit for 3 months",
        "First month chatbot free",
        "500 conversations/month",
        "Basic lead capture",
      ],
    },
    {
      id: "growth",
      name: "Growth Package",
      price: "$599",
      bestFor: "Businesses scaling digital operations",
      description: "Advanced digital marketing with smart automation",
      oneTimeServices: [
        {
          icon: <FaCode className="w-4 h-4" />,
          text: "Custom Website Development",
        },
        {
          icon: <SiMeta className="w-4 h-4" />,
          text: "Meta Ads Full Strategy",
        },
        {
          icon: <SiGoogleads className="w-4 h-4" />,
          text: "Google Ads (3 campaigns)",
        },
        {
          icon: <FiSearch className="w-4 h-4" />,
          text: "Comprehensive SEO Audit (Free 3 months)",
        },
      ],
      monthlyServices: [
        {
          title: "Pro Chatbot Automation (First month free, then $99/mo)",
          features: [
            {
              icon: <Bot className="w-4 h-4" />,
              text: "IG + FB + WhatsApp integration",
            },
            {
              icon: <Cpu className="w-4 h-4" />,
              text: "AI-powered responses",
            },
            {
              icon: <Smartphone className="w-4 h-4" />,
              text: "Mobile notifications",
            },
          ],
        },
        {
          title: "Advanced SEO (Free first 3 months, then $49/mo)",
          features: [
            {
              icon: <FiSearch className="w-4 h-4" />,
              text: "Competitor analysis",
            },
            {
              icon: <FiBarChart2 className="w-4 h-4" />,
              text: "Advanced analytics",
            },
            {
              icon: <FiTool className="w-4 h-4" />,
              text: "Content optimization",
            },
          ],
        },
      ],
      popular: true,
      icon: <BarChart2 className="w-6 h-6 text-blue-400" />,
      cta: "/onboarding/growth",
      details: "/pricing/growth",
      highlights: [
        "Comprehensive SEO audit (3 months free)",
        "First month premium chatbot free",
        "2,000 conversations/month",
        "24-hour support",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise Solution",
      price: "Custom Quote",
      bestFor: "High-volume digital operations",
      description: "Complete enterprise digital solution",
      oneTimeServices: [
        {
          icon: <Code className="w-4 h-4" />,
          text: "Enterprise Web Application",
        },
        {
          icon: <SiMeta className="w-4 h-4" />,
          text: "Meta Ads Enterprise Setup",
        },
        {
          icon: <SiGoogleads className="w-4 h-4" />,
          text: "Google Ads Full Management",
        },
        {
          icon: <FiSearch className="w-4 h-4" />,
          text: "Enterprise SEO Audit (Free 6 months)",
        },
      ],
      monthlyServices: [
        {
          title: "Enterprise Chatbot (First month free, then $199/mo)",
          features: [
            {
              icon: <Bot className="w-4 h-4" />,
              text: "Unlimited platform connections",
            },
            {
              icon: <Cpu className="w-4 h-4" />,
              text: "Custom AI training",
            },
            {
              icon: <PieChart className="w-4 h-4" />,
              text: "Sentiment analysis",
            },
          ],
        },
        {
          title: "Enterprise SEO (Free first 6 months, then $99/mo)",
          features: [
            {
              icon: <FiSearch className="w-4 h-4" />,
              text: "Global SEO strategy",
            },
            {
              icon: <FiBarChart2 className="w-4 h-4" />,
              text: "Custom reporting",
            },
            {
              icon: <FiTool className="w-4 h-4" />,
              text: "Technical SEO audits",
            },
          ],
        },
      ],
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      cta: "/contact/enterprise",
      details: "/pricing/enterprise",
      highlights: [
        "Enterprise SEO audit (6 months free)",
        "First month enterprise chatbot free",
        "10,000+ conversations/month",
        "4-hour emergency support",
      ],
    },
  ];

  const serviceIcons = {
    "Meta Ads": <SiMeta className="w-5 h-5 text-blue-500" />,
    "Google Ads": <SiGoogleads className="w-5 h-5 text-green-500" />,
    "Web Development": <FaCode className="w-5 h-5 text-indigo-500" />,
    "Chatbot Automation": <Bot className="w-5 h-5 text-pink-500" />,
    Shopify: <SiShopify className="w-5 h-5 text-orange-500" />,
    SEO: <FiSearch className="w-5 h-5 text-yellow-400" />,
  };

  return (
    <div className="w-full mt-6 p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 dark:from-gray-100/80 dark:to-gray-200/80 rounded-t-3xl shadow-2xl text-center backdrop-blur-xl border-t border-gray-700/30 dark:border-gray-300/30 relative overflow-hidden">
      {/* Glass texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')] opacity-10"></div>

      {/* Gradient accents */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900 mb-6">
          Automated Conversation Solutions
        </h2>
        <motion.p
          className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          At{" "}
          <span className="font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            ECOD
          </span>
          , we specialize in <strong>chatbot automation</strong> for Instagram,
          Facebook, and WhatsApp to transform your customer interactions.
        </motion.p>
      </motion.div>

      {/* Packages Grid */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`relative p-6 rounded-2xl backdrop-blur-lg border ${
              pkg.popular
                ? "bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-purple-500/30 shadow-lg shadow-purple-500/10"
                : "bg-white/10 dark:bg-gray-800/20 border-white/10 dark:border-gray-700/30"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm">
                {pkg.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white dark:text-gray-900">
                  {pkg.name}
                </h3>
                <p className="text-sm text-gray-300 dark:text-gray-600">
                  {pkg.bestFor}
                </p>
              </div>
            </div>

            <div className="my-6">
              <span className="text-4xl font-bold text-white dark:text-gray-900">
                {pkg.price}
              </span>
              {!pkg.price.includes("Custom") && (
                <span className="text-sm text-gray-300 dark:text-gray-600 block mt-1">
                  one-time setup
                </span>
              )}
            </div>

            <div className="min-h-[100px] mb-4">
              <p className="text-gray-300 dark:text-gray-500 text-sm mb-4">
                {pkg.description}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <h4 className="font-medium text-white dark:text-gray-900 text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" /> One-Time Services
                </h4>
                <ul className="space-y-2 pl-6">
                  {pkg.oneTimeServices.map((service, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-300 dark:text-gray-700 text-sm"
                    >
                      <span className="mt-0.5">{service.icon}</span>
                      <span>{service.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-white dark:text-gray-900 text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-400" /> Monthly
                  Services
                </h4>
                {pkg.monthlyServices.map((serviceGroup, i) => (
                  <div key={i} className="pl-6">
                    <p className="text-gray-300 dark:text-gray-600 text-sm font-medium mt-2 mb-1">
                      {serviceGroup.title}
                    </p>
                    <ul className="space-y-1">
                      {serviceGroup.features.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-gray-300 dark:text-gray-700 text-xs"
                        >
                          <span className="mt-0.5">{feature.icon}</span>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <Link
                href={pkg.cta}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20"
                }`}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={pkg.details}
                className="text-sm text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 hover:underline flex items-center justify-center gap-1"
              >
                Know More{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Services Icons */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Object.entries(serviceIcons).map(([service, icon], index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg rounded-lg border border-white/10 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-colors"
          >
            {icon}
            <span className="text-white dark:text-gray-900 font-medium text-sm">
              {service}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LowerContent;
