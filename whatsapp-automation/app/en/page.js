"use client";

import CallToAction from "@/components/landing/call-to-action";
import Faq from "@/components/landing/faqs";
import Price from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonial";
import DemoSection from "@/components/landing/demo";
import FeatureSection from "@/components/landing/feature";
import HeroSection from "@/components/landing/hero-section";
import AutoScroll from "@/components/landing/auto-scroll";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "authenticated") {
    return null;
  }
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
