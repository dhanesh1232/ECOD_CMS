import AutoScroll from "@/components/auto-scroll";
import CallToAction from "@/components/call-to-action";
import DemoSection from "@/components/demo";
import Faq from "@/components/faqs";
import FeatureSection from "@/components/feature";
import HeroSection from "@/components/hero-section";
import Price from "@/components/pricing";
import Testimonials from "@/components/testimonial";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
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
    </div>
  );
}
