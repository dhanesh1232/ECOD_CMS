"use client";

import FooterSection from "@/components/landing/footer";
import CallToAction from "@/components/landing/call-to-action";
import Faq from "@/components/landing/faqs";
import Price from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonial";
import DemoSection from "@/components/landing/demo";
import FeatureSection from "@/components/landing/feature";
import HeroSection from "@/components/landing/hero-section";
import AutoScroll from "@/components/landing/auto-scroll";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Trust Badges Bar */}
      <AutoScroll />
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <FeatureSection />
      {/* Demo Video Section */}
      <DemoSection />
      {/* Testimonials Section */}
      <Testimonials />
      {/* Pricing Section */}
      <Price />
      {/* FAQ Section */}
      <Faq />
      {/* Final CTA Section */}
      <CallToAction />
      {/* Footer */}
      <FooterSection />
    </div>
  );
}
