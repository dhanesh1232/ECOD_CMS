import { eco_services } from "@/data/service_data";
import { services_ecod } from "@/data/service_data";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadSEO from "./components/Reusable/seo_head";

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
      <HeadSEO
        title="Expert Digital Services - Web Development, SEO & Marketing | ECOD"
        description="Get expert digital services from ECOD! We specialize in web development, SEO, and digital marketing to grow your business. Contact us for tailored solutions."
        canonicalUrl="https://ecoddigital.com/services"
        ogImage="https://ecoddigital.com/images/services-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/services-twitter-image.jpg"
        ogType="website"
        twitterCard="summary_large_image"
        noIndex={false}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "ECOD Digital Services",
          description:
            "Get expert digital services from ECOD, including web development, SEO, and digital marketing. We help businesses scale with modern, results-driven strategies.",
          url: "https://ecoddigital.com",
          logo: "https://ecoddigital.com/images/logo.png",
          sameAs: [
            "https://www.facebook.com/ecoddigital",
            "https://www.linkedin.com/company/ecoddigital",
            "https://www.instagram.com/ecoddigital",
            "https://twitter.com/ecoddigital",
          ],
          serviceType: [
            "Web Development",
            "SEO Optimization",
            "Digital Marketing",
            "Ecommerce Solutions",
            "Shopify Development",
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "Worldwide",
          },
          areaServed: {
            "@type": "GeoShape",
            addressCountry: ["US", "UK", "Canada", "Australia", "Worldwide"],
          },
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: "https://ecoddigital.com/contact",
            availableLanguage: ["English", "Spanish", "French"],
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "Contact for pricing",
              priceCurrency: "USD",
              eligibleQuantity: {
                "@type": "QuantitativeValue",
                value: "Custom",
              },
            },
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "120",
          },
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: { "@type": "Person", name: "Dhanesh" },
            reviewBody:
              "ECOD's digital services helped my business scale exponentially!",
          },
        }}
      />

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
