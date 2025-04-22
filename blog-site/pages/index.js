import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HeadSEO from "@/components/Reusable/seo_head";
import LowerContent from "@/components/lower-content";
import AutoScrollTags from "@/components/Home/scroll-section";
import HeroSection from "@/components/Home/hero-section";
import AboutSection from "@/components/Home/about-section";

//Heavy Components
const HomeBlog = dynamic(() => import("@/components/Home/blog-section"), {
  ssr: false,
});
const OurServices = dynamic(
  () => import("@/components/Home/services-section"),
  {
    ssr: false,
  }
);
const ShopifySection = dynamic(
  () => import("@/components/Home/shopify-section"),
  {
    ssr: false,
  }
);
const DigitalMarketing = dynamic(
  () => import("@/components/Home/digi-mark-section"),
  {
    ssr: false,
  }
);
const Testimonials = dynamic(
  () => import("@/components/Home/client-testi-section"),
  {
    ssr: false,
  }
);
const ECODFaqs = dynamic(() => import("@/components/Home/faq-section"), {
  ssr: false,
});
const CallToAction = dynamic(() => import("@/components/Home/call-to-action"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return (
    <>
      <HeadSEO
        title="Home - ECOD"
        description="Welcome to ECOD! We provide expert web development, SEO, and digital marketing services to grow your business. Get tailored solutions from industry experts."
        canonicalUrl="https://ecoddigital.com"
        ogImage="https://ecoddigital.com/images/home-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/home-twitter-image.jpg"
        ogType="website"
        twitterCard="summary_large_image"
        noIndex={false}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ECOD",
          url: "https://ecoddigital.com",
          logo: "https://ecoddigital.com/images/logo.png",
          description:
            "ECOD provides cutting-edge solutions for web development, SEO, and digital marketing to help businesses grow.",
          foundingDate: "2020-01-01",
          address: {
            "@type": "PostalAddress",
            streetAddress: "TIRUPATI",
            addressLocality: "INDIA",
            addressRegion: "IN",
            postalCode: "517520",
            addressCountry: "IN",
          },
          sameAs: [
            "https://www.facebook.com/ecoddigital",
            "https://www.linkedin.com/company/ecoddigital",
            "https://www.instagram.com/ecoddigital",
            "https://twitter.com/ecoddigital",
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+1-123-456-7890",
              contactType: "customer service",
              email: "support@ecoddigital.com",
              availableLanguage: ["English"],
            },
            {
              "@type": "ContactPoint",
              telephone: "+1-987-654-3210",
              contactType: "sales",
              email: "sales@ecoddigital.com",
              availableLanguage: ["English"],
            },
          ],
        }}
      />
      <div className="w-full" data-testid="home-container">
        {/* Hero Section */}
        <HeroSection />
        <AutoScrollTags />
        {/*About Section*/}
        <AboutSection />
        {/* Services Overview */}
        <OurServices />
        {/* Shopify & E-commerce Solutions */}
        <ShopifySection />
        {/*Blog Section */}
        <HomeBlog />
        {/* Digital Marketing Solutions */}
        <DigitalMarketing />
        {/* Client Testimonials */}
        <Testimonials />
        {/* FAQs Section */}
        <ECODFaqs />
        {/* Call to Action */}
        <CallToAction />
        <LowerContent />
      </div>
    </>
  );
}
