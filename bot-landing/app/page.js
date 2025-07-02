"use client";
import PricingSection from "@/components/home/pricing";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Zap,
  BarChart2,
  Users,
  Mail,
  Settings,
  ArrowRight,
  Check,
  Star,
  ChevronRight,
} from "lucide-react";

const Homepage = () => {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            >
              Automate Your Business with{" "}
              <span className="text-indigo-600">AI Power</span>
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              The all-in-one platform for chatbot automation, CRM integration,
              and marketing workflows. Boost engagement and save hours every
              week.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                Get Started Free <ArrowRight className="ml-2" size={18} />
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center">
                See Features
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-100 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <MessageSquare
                        className="text-indigo-600 dark:text-indigo-300"
                        size={16}
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Hi! How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-indigo-600 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        {`I'd like to know about your pricing`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <MessageSquare
                        className="text-indigo-600 dark:text-indigo-300"
                        size={16}
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">
                        Our starter plan begins at $29/month. Would you like me
                        to send you more details?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale">
            {["Google", "Shopify", "Meta", "Slack", "Zoom", "Stripe"].map(
              (logo) => (
                <div key={logo} className="h-8 flex items-center">
                  <img
                    src={`https://logo.clearbit.com/${logo.toLowerCase()}.com`}
                    alt={logo}
                    className="h-6 dark:invert"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/150x50?text=${logo}`;
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to automate conversations, manage customers, and
            grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <MessageSquare size={24} />,
              title: "AI Chatbots",
              desc: "24/7 automated conversations that feel human",
            },
            {
              icon: <Zap size={24} />,
              title: "Marketing Automation",
              desc: "Create workflows that convert visitors to customers",
            },
            {
              icon: <BarChart2 size={24} />,
              title: "Analytics Dashboard",
              desc: "Real-time insights into your customer interactions",
            },
            {
              icon: <Users size={24} />,
              title: "CRM Integration",
              desc: "Sync with your existing customer database",
            },
            {
              icon: <Mail size={24} />,
              title: "Email Sequences",
              desc: "Automated follow-ups that boost engagement",
            },
            {
              icon: <Settings size={24} />,
              title: "Custom Workflows",
              desc: "Build automation tailored to your business",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Solutions for Your Industry
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tailored automation solutions that fit your specific business
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "SaaS Companies",
                desc: "Automate onboarding, support, and retention for your users",
                features: [
                  "User onboarding flows",
                  "In-app support",
                  "Feature adoption",
                ],
              },
              {
                title: "eCommerce",
                desc: "Boost sales with automated product recommendations and abandoned cart recovery",
                features: [
                  "Cart recovery",
                  "Product suggestions",
                  "Order updates",
                ],
              },
              {
                title: "Agencies",
                desc: "Manage multiple clients with white-labeled automation",
                features: [
                  "Client reporting",
                  "White-labeling",
                  "Multi-account",
                ],
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-5xl">📊</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {useCase.desc}
                </p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check
                        className="text-indigo-600 dark:text-indigo-400 mr-2"
                        size={16}
                      />
                      <span className="text-gray-700 dark:text-gray-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <PricingSection />

      {/* Feature Highlights Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful capabilities to scale your automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Omnichannel Support",
                description:
                  "Connect with customers across all major platforms",
                plans: {
                  free: "Web only",
                  starter: "+ Telegram",
                  pro: "+ SMS, Discord",
                  growth: "+ Slack, Voice",
                  enterprise: "+ Custom SDK",
                },
              },
              {
                title: "AI Model Training",
                description: "Train custom models for your specific use case",
                plans: {
                  free: false,
                  starter: false,
                  pro: false,
                  growth: "3 models",
                  enterprise: "Unlimited",
                },
              },
              {
                title: "White Labeling",
                description: "Remove our branding and use your own",
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
                description: "Dedicated support team for urgent issues",
                plans: {
                  free: false,
                  starter: false,
                  pro: true,
                  growth: true,
                  enterprise: true,
                },
              },
              {
                title: "API Access",
                description: "Full access to our developer API",
                plans: {
                  free: false,
                  starter: true,
                  pro: true,
                  growth: true,
                  enterprise: true,
                },
              },
              {
                title: "SLA Guarantee",
                description: "99.9% uptime service level agreement",
                plans: {
                  free: false,
                  starter: false,
                  pro: false,
                  growth: false,
                  enterprise: true,
                },
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {Object.entries(feature.plans).map(([planId, value]) => (
                    <div
                      key={planId}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-500 dark:text-gray-400 capitalize">
                        {planId}:
                      </span>
                      <span className="font-medium">
                        {typeof value === "boolean"
                          ? value
                            ? "✓"
                            : "✗"
                          : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-50 dark:bg-indigo-900/20 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {`Don't just take our word for it. Here's what our customers say.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "ECODrIx has transformed how we handle customer support. Response times are down 80%!",
                author: "Sarah Johnson",
                role: "CEO, TechStart",
                rating: 5,
              },
              {
                quote:
                  "The automation workflows saved us countless hours. Our team can focus on strategic work now.",
                author: "Michael Chen",
                role: "Marketing Director",
                rating: 5,
              },
              {
                quote:
                  "Implementation was seamless and the results were immediate. Highly recommend!",
                author: "David Martinez",
                role: "eCommerce Manager",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                  {`"${testimonial.quote}"`}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <span className="text-indigo-600 dark:text-indigo-300 font-bold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Latest From Our Blog</h2>
          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center">
            Visit Blog <ChevronRight className="ml-1" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "How AI Chatbots Boost Customer Satisfaction",
              excerpt:
                "Learn how automated conversations can improve your CSAT scores by 40% or more.",
              category: "Automation",
              date: "May 15, 2023",
            },
            {
              title: "5 Marketing Automation Workflows You Need",
              excerpt:
                "Essential automation sequences that every business should implement.",
              category: "Marketing",
              date: "April 28, 2023",
            },
            {
              title: "Integrating Chatbots with Your CRM",
              excerpt:
                "A step-by-step guide to connecting your automation platform with Salesforce.",
              category: "Integration",
              date: "April 10, 2023",
            },
          ].map((post, index) => (
            <div key={index} className="group">
              <div className="h-48 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-5xl opacity-80 group-hover:opacity-100 transition-opacity">
                  📝
                </div>
              </div>
              <span className="text-sm text-indigo-600 dark:text-indigo-400">
                {post.category}
              </span>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {post.excerpt}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of businesses automating their customer interactions
            and growing faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Get Started Free
            </button>
            <button className="px-6 py-3 border border-white rounded-lg hover:bg-indigo-700 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
