import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Mail, Phone, MapPin, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const HeadSEO = dynamic(() => import("./components/Reusable/seo_head"));
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const contact = {
  address: "Tirupati, Andhra Pradesh, India",
  phone: "+91 8143963821",
  email: "support@ecod.com",
};

const disclaimerSections = [
  {
    title: "Professional Disclaimer",
    icon: <AlertTriangle className="w-5 h-5" />,
    content:
      "ECOD provides online presence services, including Google Ads, Meta Ads, Shopify management, content creation, and email marketing. While we strive to deliver accurate and up-to-date information, our content should not be considered professional advice for legal, financial, or business decisions. Always consult with a qualified professional before taking action based on the information found on this website.",
  },
  {
    title: "Service Performance Disclaimer",
    icon: <AlertTriangle className="w-5 h-5" />,
    content:
      "The results of our services, such as Google Ads, Meta Ads, Shopify management, and email marketing campaigns, may vary depending on market conditions, industry trends, and client-specific factors. We do not guarantee specific outcomes, including sales, leads, or engagement metrics, as these are influenced by external variables beyond our control.",
  },
  {
    title: "External Links Disclaimer",
    icon: <AlertTriangle className="w-5 h-5" />,
    content:
      "This website may contain affiliate links or links to third-party websites. We do not endorse, guarantee, or take responsibility for the accuracy or reliability of any information provided by external sites linked through our platform. Clicking on affiliate links may result in us earning a commission at no extra cost to you.",
  },
  {
    title: "Affiliate Disclaimer",
    icon: <AlertTriangle className="w-5 h-5" />,
    content:
      "Some of the links on this site are affiliate links from services like Google Ads, Shopify, and other platforms. As an affiliate partner, we may earn a commission from purchases or subscriptions made through these links. This helps support our website and allows us to continue providing high-quality services.",
  },
  {
    title: "Limitation of Liability",
    icon: <AlertTriangle className="w-5 h-5" />,
    content:
      "Under no circumstances shall ECOD be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our website, services, or reliance on any information provided. This includes but is not limited to losses related to Google Ads, Meta Ads, Shopify management, content creation, or email marketing campaigns. You use this website and our services at your own risk.",
  },
];

const Disclaimer = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return (
    <>
      <HeadSEO
        title="Disclaimer - ECOD"
        description="Read our Disclaimer to understand the limitations of liability and the terms of use for our website and services."
        canonicalUrl="https://ecoddigital.com/disclaimer"
        ogImage="https://ecoddigital.com/images/disclaimer-og-image.jpg"
        twitterImage="https://ecoddigital.com/images/disclaimer-twitter-image.jpg"
        noIndex={true}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-12"
      >
        <BackAndForward forward="/contact" />

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 mt-2 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium mb-4"
            >
              <AlertTriangle className="w-4 h-4 mr-2" /> Legal Notice
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Website Disclaimer
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Important legal information about our services and website usage
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose dark:prose-invert max-w-none"
          >
            <p className="mb-6">
              The information provided by{" "}
              <strong className="text-blue-600 dark:text-blue-400">ECOD</strong>
              {` ("we," "us," or "our")`} on this website is for general
              informational purposes only. All information on this site is
              provided in good faith; however, we make no representation or
              warranty of any kind, express or implied, regarding the accuracy,
              reliability, availability, or completeness of any information.
            </p>

            {disclaimerSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                className="mb-8 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="mt-4">{section.icon}</span>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Updates and Contact Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This disclaimer is subject to updates and changes. If you have
                any questions regarding this disclaimer, please contact us:
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {contact.address}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.main>
    </>
  );
};

export default Disclaimer;
