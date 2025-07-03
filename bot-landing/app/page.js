"use client";
import { FeatureSection } from "@/components/home/feature";
import PricingSection from "@/components/home/pricing";
import { UseCaseSection } from "@/components/home/use";
import { Check, Star, ChevronRight, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
const HeroSection = dynamic(
  () => import("@/components/home/hero").then((mod) => mod.HeroSection),
  {
    ssr: false,
  }
);

const Homepage = () => {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Use Cases Section */}
      <UseCaseSection />

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
      <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to transform your business?
          </h3>
          <p className="text-indigo-100 mb-8">
            Join thousands of businesses growing with our platform. Start your
            free trial today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
