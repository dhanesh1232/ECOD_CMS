import { useEffect, useState } from "react";
import { MoveUp } from "lucide-react";
import dynamic from "next/dynamic";

const HeadSEO = dynamic(() => import("./components/Reusable/seo_head"));
export default function PrivacyPolicy() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <>
      <HeadSEO
        title="Privacy Policy - ECOD"
        description="Read our Privacy Policy to understand how ECOD collects, uses, and protects your personal information."
        canonicalUrl="https://ecoddigital.com/privacy-policy"
        ogImage="https://ecoddigital.com/images/privacy-policy-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/privacy-policy-twitter-image.jpg"
        noIndex={true}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "PrivacyPolicy",
          name: "Privacy Policy - ECOD",
          description:
            "Read our Privacy Policy to understand how ECOD collects, uses, and protects your personal information.",
          url: "https://ecoddigital.com/privacy-policy",
          datePublished: "2023-01-01",
          dateModified: new Date().toISOString().split("T")[0],
          publisher: {
            "@type": "Organization",
            name: "ECOD",
            logo: {
              "@type": "ImageObject",
              url: "https://ecoddigital.com/images/logo.png",
            },
          },
          inLanguage: "en",
          accessibilityFeature: ["tableOfContents", "alternativeText"],
          accessibilityHazard: "none",
          accessibilityAPI: "ARIA",
        }}
        additionalMetaTags={[
          <meta name="robots" content="noindex, nofollow" key="robots" />,
          <meta name="language" content="en" key="language" />,
          <meta name="author" content="ECOD" key="author" />,
          <meta name="publisher" content="ECOD" key="publisher" />,
          <meta
            name="keywords"
            content="privacy policy, ECOD privacy, data protection, personal information, cookies policy"
            key="keywords"
          />,
          <meta name="theme-color" content="#3b82f6" key="theme-color" />,
          <meta
            name="referrer"
            content="strict-origin-when-cross-origin"
            key="referrer"
          />,
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            key="viewport"
          />,
          <link
            rel="alternate"
            href="https://ecoddigital.com/privacy-policy"
            hreflang="en"
            key="hreflang-en"
          />,
          <link
            rel="alternate"
            href="https://ecoddigital.com/es/politica-de-privacidad"
            hreflang="es"
            key="hreflang-es"
          />,
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
          Effective Date: July 1, 2024 | Last Updated: {lastUpdated}
        </p>

        {/* Table of Contents */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Table of Contents
          </h2>
          <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>
              <a href="#introduction" className="text-blue-500 hover:underline">
                Introduction
              </a>
            </li>
            <li>
              <a
                href="#information-we-collect"
                className="text-blue-500 hover:underline"
              >
                Information We Collect
              </a>
            </li>
            <li>
              <a
                href="#how-we-use-your-data"
                className="text-blue-500 hover:underline"
              >
                How We Use Your Data
              </a>
            </li>
            <li>
              <a
                href="#cookies-and-tracking"
                className="text-blue-500 hover:underline"
              >
                Cookies & Tracking
              </a>
            </li>
            <li>
              <a
                href="#data-protection"
                className="text-blue-500 hover:underline"
              >
                Data Protection
              </a>
            </li>
            <li>
              <a
                href="#third-party-services"
                className="text-blue-500 hover:underline"
              >
                Third-Party Services
              </a>
            </li>
            <li>
              <a href="#your-rights" className="text-blue-500 hover:underline">
                Your Rights
              </a>
            </li>
            <li>
              <a href="#updates" className="text-blue-500 hover:underline">
                Updates to This Policy
              </a>
            </li>
            <li>
              <a href="#contact-us" className="text-blue-500 hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </section>

        {/* Sections with IDs */}
        <section id="introduction" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            1. Introduction
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            Welcome to <strong>ECOD Services</strong>. Your privacy is important
            to us. This policy outlines how we collect, use, and protect your
            information when you visit our website or use our services.
          </p>
        </section>

        <section id="information-we-collect" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            2. Information We Collect
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            We collect both personal and non-personal information to enhance
            your experience.
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Personal Information:</strong> Name, email, phone,
              business name, billing details.
            </li>
            <li>
              <strong>Non-Personal Data:</strong> IP address, browser type,
              pages visited, cookies.
            </li>
          </ul>
        </section>

        <section id="how-we-use-your-data" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            3. How We Use Your Data
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            We use your data to provide and improve our services, personalize
            your experience, and ensure security.
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
            <li>Deliver and enhance our services.</li>
            <li>Process transactions securely.</li>
            <li>Send newsletters & promotions (you can opt out).</li>
            <li>Analyze website traffic for optimization.</li>
          </ul>
        </section>

        <section id="cookies-and-tracking" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            4. Cookies & Tracking
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            We use cookies to improve user experience. You can manage cookie
            settings in your browser.
          </p>
        </section>

        <section id="data-protection" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            5. Data Protection
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            We implement industry-standard security measures to protect your
            data, including encryption and regular audits.
          </p>
        </section>

        <section id="third-party-services" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            6. Third-Party Services
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            We may share necessary data with trusted service providers for
            payments, analytics, or marketing.
          </p>
        </section>

        <section id="your-rights" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            7. Your Rights
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            You can request access, updates, or deletion of your data anytime by
            contacting us.
          </p>
        </section>

        <section id="updates" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            8. Updates to This Policy
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            We may update this policy periodically. The latest version will
            always be available on our website.
          </p>
        </section>

        <section id="contact-us" className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            9. Contact Us
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-serif">
            If you have any questions, feel free to reach us at{" "}
            <a
              href="mailto:support@ecoddigital.com"
              className="text-blue-500 hover:underline"
            >
              support@ecoddigital.com
            </a>
            .
          </p>
        </section>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <MoveUp />
        </button>
      </div>
    </>
  );
}
