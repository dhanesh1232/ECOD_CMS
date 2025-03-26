import { eco_services, services_ecod } from "@/data/service_data";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import HeadSEO from "./components/Reusable/seo_head";
import { Rocket, Search, X } from "lucide-react";

// Dynamically importing components with error handling
const CategorySelector = dynamic(
  () => import("./components/Reusable/CategorySelector"),
  {
    loading: () => (
      <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
    ),
  }
);
const SearchComponent = dynamic(() => import("./components/Reusable/search"));
const ServiceCard = dynamic(() => import("./components/serviceCard"));
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const NoResults = ({ onClearSearch }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
        <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No services found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {`Try adjusting your search or filter to find what you're looking for.`}
      </p>
      <button
        onClick={onClearSearch}
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        <X className="w-5 h-5 mr-2" /> Clear Search
      </button>
    </div>
  </motion.div>
);

const CallToAction = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mt-24 text-center"
  >
    <div className="relative max-w-2xl mx-auto px-8 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to Transform Your Business?
        </h3>
        <p className="text-blue-100 mb-8">
          {`Let's work together to create innovative solutions that drive growth
          and success.`}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 hover:text-blue-700 font-semibold rounded-lg hover:bg-gray-50 hover:scale-105 transition-transform"
        >
          <Rocket className="w-5 h-5" /> Get Started
        </Link>
      </div>
    </div>
  </motion.div>
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

      <div className="container mx-auto px-4 sm:px-6 py-12 bg-background text-foreground">
        <BackAndForward forward="/services/web-development" />
        <hr className="my-6 border-gray-200 dark:border-gray-800" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <SearchComponent
            searchValue={searchQuery}
            filterSearch={handleSearch}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We provide cutting-edge digital solutions to help your business
            grow. Choose from our expertly crafted services.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredServices.length > 0 ? (
            <motion.div
              key="services-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <NoResults onClearSearch={() => setSearchQuery("")} />
          )}
        </AnimatePresence>

        <CallToAction />

        <hr className="my-12 border-gray-200 dark:border-gray-800" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CategorySelector services={services_ecod} page={"/services"} />
        </motion.div>
      </div>
    </>
  );
}
