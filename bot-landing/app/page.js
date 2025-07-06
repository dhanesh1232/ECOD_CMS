"use client";
import { FeatureSection } from "@/components/home/feature";
import { FeatureHighlightSection } from "@/components/home/feature-highlight";
import PricingSection from "@/components/home/pricing";
import TestimonialsSection from "@/components/home/testimonials";
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
      <FeatureHighlightSection />

      {/* Testimonials */}
      <TestimonialsSection />

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
