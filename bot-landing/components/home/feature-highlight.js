"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  Check,
  Code,
  Cpu,
  Database,
  Headset,
  Languages,
  MessageSquare,
  MessagesSquare,
  Paintbrush,
  ShieldCheck,
  Users,
  Workflow,
  X,
} from "lucide-react";
import Link from "next/link";
import { Icons } from "../icons";

export const FeatureHighlightSection = () => {
  const planColors = {
    free: "bg-gray-100 dark:bg-gray-700",
    starter: "bg-blue-50 dark:bg-blue-900/20",
    pro: "bg-purple-50 dark:bg-purple-900/20",
    growth: "bg-green-50 dark:bg-green-900/20",
    enterprise: "bg-indigo-50 dark:bg-indigo-900/20",
  };

  const features = [
    // Communication Features
    {
      title: "Omnichannel Support",
      description: "Connect with customers across all platforms",
      icon: (
        <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: (
          <div className="flex gap-1 items-center">
            <Icons.web className="h-4 w-4 text-blue-500" />{" "}
            {/* generic blue for web */}
            <Icons.instagram className="h-4 w-4" style={{ color: "#E1306C" }} />
            <Icons.facebook className="h-4 w-4 text-[#1877F2]" />
            <Icons.whatsapp className="h-4 w-4 text-[#25D366]" />
          </div>
        ),
        starter: (
          <div className="flex items-center gap-2">
            <span>Free +</span>
            <div className="flex flex-row items-center gap-1">
              <Icons.telegram className="h-4 w-4 text-[#229ED9]" />
            </div>
          </div>
        ),
        pro: (
          <div className="flex items-center gap-2">
            <span>Starter +</span>
            <div className="flex flex-row items-center gap-1">
              <Icons.sms className="h-4 w-4 text-[#3c3c3c] dark:text-[#d9d9d9]" />{" "}
              {/* SMS grayish */}
              <Icons.discord className="h-4 w-4 text-[#5865F2]" />
            </div>
          </div>
        ),
        growth: (
          <div className="flex items-center gap-2">
            <span>Pro +</span>
            <div className="flex flex-row items-center gap-1">
              <Icons.slack className="h-4 w-4 text-[#941d96]" />
              <Icons.voice className="h-4 w-4 text-[#1DB954]" />{" "}
              {/* voice: Spotify green (example) */}
            </div>
          </div>
        ),
        enterprise: (
          <div className="flex items-center gap-2">
            <span>Growth +</span>
            <div className="flex flex-row items-center gap-1">
              <Icons.customSDK className="h-4 w-4 text-[#FF9900]" />{" "}
              {/* SDK - orange generic */}
            </div>
          </div>
        ),
      },
    },
    {
      title: "Conversation Capacity",
      description: "Monthly conversation limits",
      icon: (
        <MessagesSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: "300",
        starter: "2,000",
        pro: "5,000",
        growth: "25,000",
        enterprise: "Unlimited",
      },
    },

    // AI Features
    {
      title: "AI Model Training",
      description: "Custom AI model training",
      icon: <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />,
      plans: {
        free: false,
        starter: false,
        pro: "Basic tuning",
        growth: "3 custom models",
        enterprise: "Unlimited models",
      },
    },
    {
      title: "Multilingual Support",
      description: "Number of supported languages",
      icon: (
        <Languages className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: "1 language",
        starter: "2 languages",
        pro: "5 languages",
        growth: "15 languages",
        enterprise: "Unlimited",
      },
    },

    // Business Features
    {
      title: "Team Members",
      description: "Number of user seats",
      icon: <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />,
      plans: {
        free: "1",
        starter: "3",
        pro: "10",
        growth: "30",
        enterprise: "Unlimited",
      },
    },
    {
      title: "Storage Space",
      description: "File storage capacity",
      icon: (
        <Database className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: "0.5GB",
        starter: "3GB",
        pro: "10GB",
        growth: "25GB",
        enterprise: "Unlimited",
      },
    },

    // Automation Features
    {
      title: "Automation Rules",
      description: "Workflow automation capacity",
      icon: (
        <Workflow className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: false,
        starter: "3 rules",
        pro: "10 rules",
        growth: "30 rules",
        enterprise: "Unlimited",
      },
    },
    {
      title: "Drip Campaigns",
      description: "Sequential messaging flows",
      icon: (
        <CalendarRange className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: false,
        starter: "2 campaigns",
        pro: "5 campaigns",
        growth: "20 campaigns",
        enterprise: "Unlimited",
      },
    },

    // Enterprise Features
    {
      title: "White Labeling",
      description: "Remove all branding",
      icon: (
        <Paintbrush className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: false,
        starter: false,
        pro: false,
        growth: true,
        enterprise: true,
      },
    },
    {
      title: "Priority Support",
      description: "Dedicated support access",
      icon: (
        <Headset className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: "Community only",
        starter: "Email support",
        pro: "24hr response",
        growth: "12hr response",
        enterprise: "24/7 with manager",
      },
    },
    {
      title: "API Access",
      description: "Developer API limits",
      icon: <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />,
      plans: {
        free: "1k calls/mo",
        starter: "10k calls/mo",
        pro: "50k calls/mo",
        growth: "100k calls/mo",
        enterprise: "Unlimited",
      },
    },
    {
      title: "SLA Guarantee",
      description: "Uptime service agreement",
      icon: (
        <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
      ),
      plans: {
        free: false,
        starter: false,
        pro: false,
        growth: false,
        enterprise: "99.9% uptime",
      },
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Plan Feature Highlights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Compare key capabilities across all pricing tiers to find your
            perfect fit
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600 flex flex-col h-full"
            >
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 mr-4">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto space-y-3">
                {Object.entries(feature.plans).map(([planId, value]) => (
                  <div
                    key={planId}
                    className="flex items-center justify-between"
                  >
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded capitalize ${planColors[planId]}`}
                    >
                      {planId}
                    </span>
                    <span className="text-sm font-medium ml-2 text-right">
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="h-4 w-4 text-green-500 inline" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 inline" />
                        )
                      ) : (
                        value
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            View Full Feature Comparison
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
