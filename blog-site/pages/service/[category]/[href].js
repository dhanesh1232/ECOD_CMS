"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { services_list_ecod } from "@/data/service_data";
import Buttons from "@/components/Reusable/buttons";
import LowerContent from "@/components/lower-content";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const ServicePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { category, href } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [currentService, setCurrentService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);

  // Get the current service data and related services
  useEffect(() => {
    if (category && href) {
      const selectedCategory = services_list_ecod[category];
      if (selectedCategory) {
        const service = selectedCategory.find((item) => item.href === href);
        setCurrentService(service);
        // Get related services (same category, excluding current)
        const related = selectedCategory
          .filter((item) => item.href !== href)
          .slice(0, 3);
        setRelatedServices(related);
      }
    }
  }, [category, href]);

  const getDescription = () => {
    return (
      currentService?.description ||
      `Detailed information about ${href?.replace(/-/g, " ") || "this service"}`
    );
  };

  const getCategoryName = () => {
    if (!category) return "Service";
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getCategoryIcon = () => {
    switch (category) {
      case "seo":
        return "🔍";
      case "social-media-marketing":
        return "📱";
      case "shopify-optimization":
        return "🛒";
      case "content-marketing":
        return "✍️";
      case "email-marketing":
        return "✉️";
      case "google-meta-ads":
        return "📢";
      default:
        return "✨";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (href && category) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setContent({
          title: href,
          description: getDescription(),
          body: generateBodyContent(),
          lastUpdated: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [href, category, currentService]);

  const generateBodyContent = () => {
    return `
      <div class="service-header">
        <div class="category-badge">
          ${getCategoryIcon()} ${getCategoryName()}
        </div>
        <h2>${formattedTitle}</h2>
        <p class="service-description">${getDescription()}</p>
      </div>

      <div class="service-content">
        <div class="implementation-section">
          <h3>Implementation Guide</h3>
          <div class="implementation-card">
            <h4>How It Works:</h4>
            <p>${currentService?.how_it_works || "Professional service delivery based on industry best practices"}</p>
          </div>
          
          <div class="implementation-card">
            <h4>Best For:</h4>
            <ul>
              ${currentService?.business_implementation?.best_for?.map((item) => `<li>${item}</li>`).join("") || "<li>Businesses looking to improve their online presence</li>"}
            </ul>
          </div>
          
          <div class="implementation-card">
            <h4>Setup Process:</h4>
            <ol>
              ${currentService?.business_implementation?.setup?.map((step) => `<li>${step}</li>`).join("") || "<li>Initial consultation</li><li>Strategy development</li><li>Implementation</li>"}
            </ol>
          </div>
          
          <div class="implementation-card">
            <h4>Optimization Tips:</h4>
            <ul>
              ${currentService?.business_implementation?.optimization?.map((tip) => `<li>${tip}</li>`).join("") || "<li>Regular performance reviews</li><li>Continuous testing and improvement</li>"}
            </ul>
          </div>
        </div>

        ${
          currentService?.case_studies
            ? `
        <div class="case-studies">
          <h3>Success Stories</h3>
          <div class="case-study-grid">
            ${currentService.case_studies
              .map(
                (study) => `
              <div class="case-study-card">
                <h4>${study.title}</h4>
                <p>${study.description}</p>
                <div class="results">
                  <span>Results: ${study.results}</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        `
            : ""
        }
      </div>
    `;
  };

  const formattedTitle = href
    ? href
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  if (!href) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No service post found.
        </p>
      </div>
    );
  }

  const handleContactModel = () => {
    router.push(`${pathname}?modal=contact-bid`, { scroll: false });
  };

  return (
    <>
      <Head>
        <title>{`${formattedTitle} | ${getCategoryName()} Services | ECOD`}</title>
        <meta
          name="description"
          content={`${getDescription()} - Professional ${getCategoryName()} services from ECOD.`}
        />
        <meta property="og:title" content={`${formattedTitle} | ECOD`} />
        <meta property="og:description" content={getDescription()} />
        <meta property="og:type" content="service" />
      </Head>
      <main className="min-h-screen max-w-6xl bg-white dark:bg-gray-900 transition-colors duration-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="mt-8 space-y-4 w-full max-w-3xl">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{getCategoryIcon()}</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  {getCategoryName()}
                </span>
              </div>
              <h1 className="md:text-3xl text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {formattedTitle}
              </h1>
              <p className="md:text-lg text-base text-gray-600 dark:text-gray-300 mb-2">
                {content?.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                <strong>Last updated:</strong> {content?.lastUpdated}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content?.body }}
            />

            {relatedServices.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Related {getCategoryName()} Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedServices.map((service) => (
                    <div
                      key={service.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() =>
                        router.push(`/services/${category}/${service.href}`)
                      }
                    >
                      <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200 mb-2">
                        {service.label}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ready to get started with our {getCategoryName()} services?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Contact us today to learn how our {formattedTitle} service can
                help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Buttons
                  first_label={"Conatact Our Team"}
                  first_styles={`px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 ease-in-out
    bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
    dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900
    shadow-md hover:shadow-lg active:scale-[0.98] transform-gpu`}
                  buttonActionOne={handleContactModel}
                  second_label={"Explore All Services"}
                  second_styles="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
        <style jsx global>{`
          .service-header {
            margin-bottom: 2.5rem;
          }
          .category-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #3b82f6;
            background-color: #eff6ff;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            margin-bottom: 1rem;
          }
          .dark .category-badge {
            background-color: #1e3a8a;
            color: #93c5fd;
          }
          .service-description {
            font-size: 1.125rem;
            line-height: 1.75;
            color: #4b5563;
          }
          .dark .service-description {
            color: #d1d5db;
          }
          .implementation-section {
            margin-bottom: 3rem;
          }
          .implementation-card {
            background-color: #f9fafb;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .dark .implementation-card {
            background-color: #1f2937;
          }
          .case-studies {
            margin-top: 3rem;
          }
          .case-study-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
          .case-study-card {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1.5rem;
            transition: all 0.2s ease;
          }
          .dark .case-study-card {
            border-color: #374151;
          }
          .case-study-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .results {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px dashed #e5e7eb;
            font-weight: 500;
            color: #10b981;
          }
          .dark .results {
            border-top-color: #374151;
            color: #34d399;
          }
        `}</style>
      </main>
      <LowerContent />
    </>
  );
};

export default ServicePost;
