"use client";

import { useEffect, useState } from "react";
import { MoveUp, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { policy_data } from "@/data/policies_data";
import { useRouter } from "next/router";
import HeadSEO from "./components/Reusable/seo_head";
import BackAndForward from "./components/Reusable/back-forw";

// Utility functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Enhanced Section Component
const PolicySection = ({ id, title, content, details, index }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      id={id}
      className="mt-8 scroll-mt-20 font-sans border-b border-gray-200 dark:border-gray-700 pb-8"
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
          <span className="mr-3 text-blue-600 dark:text-blue-400">
            {index + 1}.
          </span>
          {title}
        </h2>
        <ChevronRight
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
        />
      </div>

      {expanded && (
        <div className="mt-4 pl-8">
          <div
            className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {details && (
            <ul className="mt-4 space-y-3">
              {details.map((detail, i) => (
                <li key={i} className="flex">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">
                    •
                  </span>
                  <span
                    className="text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: detail }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default function PrivacyPolicy() {
  const router = useRouter();
  const { policy_id } = router.query;
  const policy = policy_data[policy_id];
  const [lastUpdated, setLastUpdated] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setLastUpdated(formatDate(new Date()));

    // Scroll to section on load if hash exists
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      scrollToSection(id, true);
      setActiveSection(id);
    }

    // Set up scroll event listener for ToC highlighting
    const handleScroll = debounce(() => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 200 &&
          window.scrollY < sectionTop + sectionHeight - 200
        ) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
      setShowBackToTop(window.scrollY > 500);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id, isPageLoad = false) => {
    const element = document.getElementById(id);
    if (!element) return;

    const header = document.querySelector("header");
    const headerHeight = header?.offsetHeight || 0;
    const yOffset = isPageLoad ? headerHeight + 40 : headerHeight + 20;

    window.scrollTo({
      top: element.offsetTop - yOffset,
      behavior: "smooth",
    });

    // Update URL without page reload
    if (!isPageLoad) {
      window.history.pushState({}, "", `#${id}`);
    }
  };

  const handleScroll = debounce((e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setActiveSection(id);
  }, 100);

  if (!policy) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Policy Not Found
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          The requested policy could not be found.
        </p>
      </div>
    );
  }

  return (
    <>
      <HeadSEO
        title={`${policy.title} - ECOD`}
        description={policy.meta_description}
        canonicalUrl={`https://ecoddigital.com/${policy_id}`}
        ogImage="https://ecoddigital.com/images/policy-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/policy-twitter-image.jpg"
        noIndex={false}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${policy.title} - ECOD`,
          description: policy.meta_description,
          url: `https://ecoddigital.com/${policy_id}`,
          datePublished: policy.effective_date,
          dateModified: new Date().toISOString().split("T")[0],
          publisher: {
            "@type": "Organization",
            name: "ECOD",
            logo: {
              "@type": "ImageObject",
              url: "https://ecoddigital.com/images/logo.png",
            },
          },
        }}
        additionalMetaTags={[
          <meta name="keywords" content={policy.keywords} key="keywords" />,
          <meta name="author" content="ECOD" key="author" />,
          <meta name="publisher" content="ECOD" key="publisher" />,
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackAndForward forward="/contact" />
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:w-1/4 lg:sticky lg:top-24 lg:self-start lg:h-screen">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-2 h-auto">
                {policy.sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleScroll(e, section.id)}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium">
                        {index + 1}.
                      </span>
                      {section.title}
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
                {policy.title}
              </h1>

              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Effective:
                  </span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">
                    {policy.effective_date}
                  </span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Last Updated:
                  </span>{" "}
                  <span className="text-gray-600 dark:text-gray-300">
                    {lastUpdated}
                  </span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none mt-8 text-gray-600 dark:text-gray-300">
                <p className="text-lg">{policy.intro}</p>
              </div>

              {/* Policy Sections */}
              <div className="mt-8">
                {policy.sections.map((section, index) => (
                  <PolicySection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    content={section.content}
                    details={section.details}
                    index={index}
                  />
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-12 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Contact Us
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  If you have any questions about this policy, please contact us
                  at:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Email:{" "}
                      <a
                        href="mailto:privacy@ecod.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        privacy@ecod.com
                      </a>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Phone:{" "}
                      <a
                        href="tel:+918143963821"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        +91 8143963821
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-5 z-40 left-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-300 ${showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          aria-label="Back to top"
        >
          <MoveUp className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
