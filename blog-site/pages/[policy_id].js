import { useEffect, useState } from "react";
import { MoveUp } from "lucide-react";
import dynamic from "next/dynamic";
import { policy_data } from "@/data/policies_data";
import { useRouter } from "next/router";
import BackAndForward from "./components/Reusable/back-forw";

const HeadSEO = dynamic(() => import("./components/Reusable/seo_head"));

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Utility function to format dates
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Reusable Section Component
const PolicySection = ({ id, title, content, details }) => (
  <section id={id} className="mt-8 scroll-mt-20 font-sans">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h2>
    <p
      className="mt-2 text-gray-600 dark:text-gray-300 font-serif"
      dangerouslySetInnerHTML={{ __html: content }}
    />
    {details && (
      <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
        {details.map((detail, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: detail }} />
        ))}
      </ul>
    )}
  </section>
);

export default function PrivacyPolicy() {
  const router = useRouter();
  const { policy_id } = router.query;
  const policy = policy_data[policy_id];
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Set last updated date
    setLastUpdated(formatDate(new Date()));

    // Handle scroll to section on page load
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      scrollToSection(id, true); // true indicates page load
    }
  }, []);

  // Scroll to section with offset for header
  const scrollToSection = (id, isPageLoad = false) => {
    const element = document.getElementById(id);
    if (!element) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    // Set yOffset based on whether it's a page load or a click
    const yOffset = isPageLoad
      ? window.innerHeight * 0.1 + headerHeight // 10% of viewport height for page load
      : window.innerHeight * 0.02 + headerHeight; // 2% of viewport height for click

    const y = element.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Handle scroll with debounce
  const handleScroll = debounce((e, id) => {
    e.preventDefault();
    scrollToSection(id, false); // false indicates link click
  }, 100);

  if (!policy) {
    return <div>Policy not found.</div>;
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-md">
        <BackAndForward forward="/contact" />
        <hr className="border-b-1 my-1 border-gray-200 dark:border-gray-700" />
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-700 dark:text-white">
          {policy.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-center mt-2 text-sm md:text-base">
          <span className="font-bold text-black dark:text-white">
            Effective Date:
          </span>{" "}
          {policy.effective_date} |{" "}
          <span className="font-bold text-black dark:text-white">
            Last Updated:
          </span>{" "}
          {lastUpdated}
        </p>

        {/* Table of Contents */}
        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            Table of Contents
          </h2>
          <ul className="list-disc ml-6 md:ml-10 mt-2 text-gray-600 dark:text-gray-300">
            {policy.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 relative transition-all duration-300 
             after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-0.5 
             after:bg-blue-800 dark:after:bg-blue-400 after:transition-all after:duration-300 after:ease-in-out 
             after:origin-center hover:after:w-full hover:after:left-0"
                  onClick={(e) => handleScroll(e, section.id)}
                  aria-label={`Jump to ${section.title}`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Sections */}
        {policy.sections.map((section) => (
          <PolicySection
            key={section.id}
            id={section.id}
            title={section.title}
            content={section.content}
            details={section.details}
          />
        ))}

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-4 rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-400"
          aria-label="Back to top"
        >
          <MoveUp />
        </button>
      </div>
    </>
  );
}
