"use client";

import {
  Rocket,
  Zap,
  BarChart2,
  ShieldCheck,
  Bot,
  MessageSquare,
  Mail,
  Globe,
  Users,
  LayoutTemplate,
  ChevronRight,
} from "lucide-react";
import TestimonialsSection from "./components/testimonials";
import Link from "next/link";
import { LeadsForm } from "../layout/leads_form";
const isLive = process.env.NEXT_PUBLIC_LIVE === "true";
const domain = process.env.REDIRECT_DOMAIN || "https://app.ecodrix.com";
export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600 mb-6">
            Transform Your Business with AI Automation
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            ECODrIx helps businesses automate conversations, ads, and customer
            journeys with AI—so you can focus on what really matters: growing
            your business.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {isLive ? (
              <Link
                href={`${domain}/auth/login`}
                className="inline-flex items-center justify-center px-4 md:px-6 py-2 rounded-full font-bold text-base md:text-lg bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started for Free
                <Rocket className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <LeadsForm
                buttonText="Get Notified"
                icon={Rocket}
                iconPosition="right"
                className="inline-flex items-center justify-center px-4 md:px-6 py-2 rounded-full"
              />
            )}
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-4 md:px-6 py-2 rounded-full font-bold text-base md:text-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                1,000+
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Businesses Empowered
              </p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                85%
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Reduction in Response Time
              </p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                3.5x
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Higher Conversion Rates
              </p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                24/7
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Customer Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Vision for the Future</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {`In today's fast-paced digital world, businesses are drowning in
            repetitive tasks while struggling to deliver personalized
            experiences. We saw an opportunity to change that.`}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            ECODrIx was born from a simple idea:{" "}
            <span className="font-semibold text-green-500">
              what if AI could handle the routine work
            </span>
            , while humans focus on strategy and creativity? Our platform
            combines cutting-edge automation with intuitive design to help
            businesses of all sizes work smarter, not harder.
          </p>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900/50 mx-auto">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Automation First
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                We believe technology should handle repetitive tasks so your
                team can focus on creative problem-solving and strategic growth.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/50 mx-auto">
                <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Data-Driven Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Every feature is built to deliver measurable improvements in
                customer engagement and conversion rates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto">
                <ShieldCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Enterprise-Grade Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                We built with security and compliance at the core, so you can
                trust us with your most sensitive customer data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How ECODrIx Helps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          The ECODrIx Advantage
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Smart Chatbots That Learn
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI agents continuously improve from every interaction,
                  providing more accurate responses over time across all your
                  channels.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="#"
                className="text-green-600 dark:text-green-400 font-medium inline-flex items-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  End-to-End Customer Journeys
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  From first contact to loyal customer, automate personalized
                  journeys based on behavior and preferences.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="#"
                className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  AI-Optimized Advertising
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our system continuously tests and refines ad copy, targeting,
                  and budgets across platforms to maximize ROI.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="#"
                className="text-purple-600 dark:text-purple-400 font-medium inline-flex items-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
                <Globe className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">SEO That Converts</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Beyond rankings, our tools optimize for actual business
                  outcomes with data-driven content strategies.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="#"
                className="text-yellow-600 dark:text-yellow-400 font-medium inline-flex items-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
                <LayoutTemplate className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  High-Converting Landing Pages
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag-and-drop editor with AI suggestions to maximize
                  conversions from every visitor.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="#"
                className="text-red-600 dark:text-red-400 font-medium inline-flex items-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Seamless Team Collaboration
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Granular permissions and shared workflows keep your teams
                  aligned as you scale.
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="#"
                className="text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {`Join the thousands of businesses accelerating growth with ECODrIx's
            AI automation platform.`}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isLive ? (
              <Link
                href={`${domain}/auth/login`}
                className="px-4 py-2 bg-white text-green-700 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
              >
                Start Free Trial - No Credit Card Needed
              </Link>
            ) : (
              <LeadsForm
                buttonText="Notify Me When We Launch"
                className="
                 px-4 py-2 rounded-full font-semibold transition-all backdrop-blur-sm flex items-center justify-center"
              />
            )}
            <Link
              href="/demo"
              className="
               px-4 py-2 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:bg-opacity-10 transition-colors duration-300 flex items-center justify-center"
            >
              <span>Schedule Personalized Demo</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
