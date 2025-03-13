import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
const HomeBlog = dynamic(() => import("./components/Home/blog-section"));
const HeroSection = dynamic(() => import("./components/Home/hero-section"));
const OurServices = dynamic(() => import("./components/Home/services-section"));
const ShopifySection = dynamic(() => import("./components/Home/shopify-section"));
const DigitalMarketing = dynamic(() => import("./components/Home/digi-mark-section"));
const Testimonials = dynamic(() => import("./components/Home/client-testi-section"), {
  ssr: false,
});
const ECODFaqs = dynamic(() => import("./components/Home/faq-ecod"), {
  ssr: false,
});
const CallToAction = dynamic(() => import("./components/Home/call-to-action"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>ECOD Services - Elevate Your Digital Presence</title>
        <meta
          name="description"
          content="Empowering businesses with cutting-edge web development, e-commerce solutions, and digital marketing strategies to drive success online."
        />

        {/* Open Graph for social media preview */}
        <meta
          property="og:title"
          content="ECOD Services - Elevate Your Digital Presence"
        />
        <meta
          property="og:description"
          content="Boost your online business with expert web development, custom Shopify solutions, and results-driven digital marketing."
        />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ECOD Services - Elevate Your Digital Presence"
        />
        <meta
          name="twitter:description"
          content="Web development, Shopify solutions, and digital marketing strategies tailored to grow your business online."
        />
        <meta name="twitter:image" content="/assets/twitter-image.jpg" />
      </Head>
      {/* Hero Section */}
      <HeroSection />
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

      <Link
        href="/contact"
        className="fixed bottom-5 right-5 bg-indigo-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-indigo-500 transition z-50"
      >
        Contact Us
      </Link>
    </>
  );
}
