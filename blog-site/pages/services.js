import { eco_services } from "@/data/service_data";
import { services_ecod } from "@/data/service_data";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

// Dynamically importing components with error handling
const CategorySelector = dynamic(() =>
  import("./components/Reusable/CategorySelector")
);
const SearchComponent = dynamic(() => import("./components/Reusable/search"));
const ServiceCard = dynamic(() => import("./components/serviceCard"));
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const NoResults = ({ onClearSearch }) => (
  <div className="text-center py-10">
    <p className="text-gray-600 dark:text-gray-300 text-lg">
      No services found matching your search.
    </p>
    <button
      onClick={onClearSearch}
      className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      aria-label="Clear search"
    >
      Clear Search
    </button>
  </div>
);

const CallToAction = () => (
  <div className="mt-16 text-center">
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
      Ready to Transform Your Business?
    </h3>
    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
      Let’s work together to create innovative solutions that drive growth and
      success.
    </p>
    <Link
      href="/contact"
      className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-500 hover:scale-105 transition-transform duration-300"
    >
      Get Started
    </Link>
  </div>
);

export default function ServicesGrid() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const filteredServices = useMemo(() => {
    return eco_services.filter((service) =>
      service.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (query) => setSearchQuery(query);

  return (
    <>
      <Head>
        {/* Page Title */}
        <title>Our Premium Services - ECOD</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore our premium digital services tailored to grow your business. From web development to SEO, we provide cutting-edge solutions for your success."
        />

        {/* Open Graph Meta Tags (for social media) */}
        <meta property="og:title" content="Our Premium Services - ECOD" />
        <meta
          property="og:description"
          content="Explore our premium digital services tailored to grow your business. From web development to SEO, we provide cutting-edge solutions for your success."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecoddigital.com/services" />
        <meta
          property="og:image"
          content="https://ecoddigital.com/images/services-og-image.jpg"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Premium Services - ECOD" />
        <meta
          name="twitter:description"
          content="Explore our premium digital services tailored to grow your business. From web development to SEO, we provide cutting-edge solutions for your success."
        />
        <meta
          name="twitter:image"
          content="https://ecoddigital.com/images/services-twitter-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://ecoddigital.com/services" />

        {/* Schema Markup (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Our Premium Services",
            description:
              "Explore our premium digital services tailored to grow your business. From web development to SEO, we provide cutting-edge solutions for your success.",
            provider: {
              "@type": "Organization",
              name: "ECOD",
              url: "https://ecoddigital.com",
              logo: "https://yourwebsite.com/images/logo.png",
            },
            serviceType: ["Web Development", "SEO", "Digital Marketing"],
            areaServed: "Worldwide",
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: "https://yourwebsite.com/contact",
            },
          })}
        </script>
      </Head>
      <div className="container mx-auto px-4 py-16 bg-white dark:bg-gray-900 transition-colors">
        <BackAndForward forward="/services/web-development" />
        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        <SearchComponent
          searchValue={searchQuery}
          filterSearch={handleSearch}
        />

        <h2 className="text-2xl md:text-4xl font-bold text-center my-6 text-gray-800 dark:text-white">
          Our Premium Services
        </h2>
        <p className="text-center text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          We provide cutting-edge digital solutions to help your business grow.
          Choose from a variety of services tailored to your needs.
        </p>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices?.length > 0 ? (
              filteredServices.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))
            ) : (
              <p>Services Not Found 404</p>
            )}
          </div>
        ) : (
          <NoResults onClearSearch={() => setSearchQuery("")} />
        )}

        <CallToAction />

        <hr className="my-4 border-gray-300 dark:border-gray-700" />
        <CategorySelector services={services_ecod} page={"/services"} />
      </div>
    </>
  );
}
