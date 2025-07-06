"use client";
import { BlogSection } from "@/components/home/blogSection";
import { CallToActionSection } from "@/components/home/callToAction";
import { FeatureSection } from "@/components/home/feature";
import { FeatureHighlightSection } from "@/components/home/feature-highlight";
import { NewsletterSection } from "@/components/home/newsletter";
import PricingSection from "@/components/home/pricing";
import TestimonialsSection from "@/components/home/testimonials";
import { UseCaseSection } from "@/components/home/use";
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

      {/* Feature Highlights Section */}
      <FeatureHighlightSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing Preview */}
      <PricingSection />

      {/* Newsletter Signup Section */}
      <NewsletterSection />

      {/* Blog Preview */}
      <BlogSection />

      {/* CTA Section */}
      <CallToActionSection />
    </div>
  );
};

export default Homepage;
