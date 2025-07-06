import {
  Check,
  ChevronRight,
  Zap,
  ShoppingCart,
  Rocket,
  Briefcase,
  Banknote,
  GraduationCap,
  HeartPulse,
  Building2,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import { PLANS } from "@/data/pricing.plan";
export const UseCaseSection = () => {
  const useCases = [
    {
      title: "SaaS Companies",
      icon: <Rocket className="w-6 h-6" />,
      desc: "Automate onboarding, support, and retention workflows for your users",
      features: [
        "User onboarding flows",
        "In-app support automation",
        "Feature adoption campaigns",
        "Usage analytics",
        "Subscription management",
      ],
      recommendedPlan: "growth",
      highlights: [
        `${PLANS.growth.limits.monthly.automationRules} automation rules`,
        `${PLANS.growth.limits.monthly.dripCampaigns} drip campaigns`,
        `${PLANS.growth.limits.monthly.teamRoles} team roles`,
        "Dynamic content personalization",
      ],
      channels: PLANS.growth.features.chatbotAutomation.channels,
    },
    {
      title: "eCommerce",
      icon: <ShoppingCart className="w-6 h-6" />,
      desc: "Convert more visitors with AI-powered product recommendations and abandoned cart recovery",
      features: [
        "Cart recovery automation",
        "Personalized product suggestions",
        "Order status updates",
        "Post-purchase follow-ups",
        "Customer loyalty programs",
      ],
      recommendedPlan: "pro",
      highlights: [
        `${PLANS.pro.limits.monthly.adCampaigns} ad campaigns`,
        `${PLANS.pro.limits.monthly.adCredits} ad credits/mo`,
        `${PLANS.pro.limits.monthly.landingPages} landing pages`,
        "Multi-channel retargeting",
      ],
      channels: PLANS.pro.features.chatbotAutomation.channels,
    },
    {
      title: "Marketing Agencies",
      icon: <Briefcase className="w-6 h-6" />,
      desc: "Manage multiple clients with white-labeled automation solutions",
      features: [
        "Client reporting dashboards",
        "White-label branding",
        "Multi-account management",
        "Campaign templates",
        "Performance benchmarking",
      ],
      recommendedPlan: "enterprise",
      highlights: [
        "Unlimited chatbots",
        "White-label solution",
        "Priority support",
        "Dedicated account manager",
      ],
      channels: PLANS.enterprise.features.chatbotAutomation.channels,
    },
    {
      title: "Financial Services",
      icon: <Banknote className="w-6 h-6" />,
      desc: "Deliver secure, compliant financial guidance and support",
      features: [
        "Account onboarding",
        "Fraud detection alerts",
        "Personalized financial advice",
        "Document verification",
        "Compliance monitoring",
      ],
      recommendedPlan: "enterprise",
      highlights: [
        "HIPAA compliance",
        "Data residency options",
        "Audit logs",
        "Enterprise-grade security",
      ],
      channels: PLANS.enterprise.features.chatbotAutomation.channels,
    },
    {
      title: "Healthcare",
      icon: <HeartPulse className="w-6 h-6" />,
      desc: "Improve patient engagement with HIPAA-compliant automation",
      features: [
        "Appointment scheduling",
        "Medication reminders",
        "Symptom checking",
        "Patient education",
        "Follow-up care",
      ],
      recommendedPlan: "enterprise",
      highlights: [
        "HIPAA compliance",
        "Secure messaging",
        "PHI protection",
        "Integration with EHR systems",
      ],
      channels: PLANS.enterprise.features.chatbotAutomation.channels,
    },
    {
      title: "Education",
      icon: <GraduationCap className="w-6 h-6" />,
      desc: "Enhance student engagement and administrative efficiency",
      features: [
        "Admissions chatbots",
        "Course recommendations",
        "Assignment reminders",
        "Student support",
        "Alumni engagement",
      ],
      recommendedPlan: "growth",
      highlights: [
        "Multilingual support",
        "Learning management integrations",
        "Automated grading",
        "Student progress tracking",
      ],
      channels: PLANS.growth.features.chatbotAutomation.channels,
    },
    {
      title: "Real Estate",
      icon: <Building2 className="w-6 h-6" />,
      desc: "Automate lead nurturing and property inquiries 24/7",
      features: [
        "Property recommendations",
        "Virtual tour scheduling",
        "Lead qualification",
        "Document collection",
        "Closing follow-ups",
      ],
      recommendedPlan: "pro",
      highlights: [
        "CRM integrations",
        "Lead scoring",
        "Automated follow-ups",
        "Property alert triggers",
      ],
      channels: PLANS.pro.features.chatbotAutomation.channels,
    },
    {
      title: "Mobile Apps",
      icon: <Smartphone className="w-6 h-6" />,
      desc: "Increase engagement and retention with in-app automation",
      features: [
        "Push notification automation",
        "In-app messaging",
        "Feature adoption flows",
        "User feedback collection",
        "Personalized content",
      ],
      recommendedPlan: "growth",
      highlights: [
        "Deep linking",
        "Behavioral triggers",
        "A/B testing",
        "Cross-platform sync",
      ],
      channels: PLANS.growth.features.chatbotAutomation.channels,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-100/30 dark:bg-purple-900/10 rounded-full filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Industry-Specific Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight"
          >
            Tailored Automation for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Industry
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-3xl mx-auto"
          >
            Our platform adapts to your specific business needs with
            industry-optimized workflows and integrations.
          </motion.p>
        </div>

        {/* Use Case Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
            >
              {/* Recommended plan badge */}
              <div
                className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-medium ${
                  useCase.recommendedPlan === "enterprise"
                    ? "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300"
                    : useCase.recommendedPlan === "growth"
                    ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300"
                    : "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300"
                }`}
              >
                {PLANS[useCase.recommendedPlan].name} Recommended
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-indigo-600 dark:text-indigo-300">
                  {useCase.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {useCase.desc}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  KEY FEATURES
                </h4>
                <ul className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        className="text-indigo-500 dark:text-indigo-400 mt-0.5 mr-2 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-gray-700 dark:text-gray-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Channels */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  SUPPORTED CHANNELS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {useCase.channels.map((channel, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300"
                    >
                      {channel.charAt(0).toUpperCase() + channel.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plan Highlights */}
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  PLAN HIGHLIGHTS
                </h4>
                <ul className="space-y-1">
                  {useCase.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                    >
                      <Check className="text-green-500 mr-2" size={14} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button className="mt-6 w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium text-indigo-600 dark:text-indigo-300">
                View {useCase.title} solution
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col items-center">
            <button className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-lg group overflow-hidden">
              <span className="relative z-10">
                Get Customized Recommendations
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </button>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              {`Not sure which plan is right for you? We'll help you choose.`}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
