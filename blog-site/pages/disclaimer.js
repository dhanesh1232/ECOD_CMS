import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
const HeadSEO = dynamic(() => import("./components/Reusable/seo_head"));
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));

const contact = {
  address: "Tirupati, Andhra Pradesh, India",
  phone: "+91 8143963821",
  email: "support@ecod.com",
};

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

      <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
        <BackAndForward forward="/contact" />
        <hr className="my-4" />
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Disclaimer
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The information provided by <strong>ECOD</strong>
          {`("we," "us," or "our")`} on this website is for general
          informational purposes only. All information on this site is provided
          in good faith; however, we make no representation or warranty of any
          kind, express or implied, regarding the accuracy, reliability,
          availability, or completeness of any information.
        </p>

        {[
          {
            title: "Professional Disclaimer",
            content:
              "ECOD provides online presence services, including Google Ads, Meta Ads, Shopify management, content creation, and email marketing. While we strive to deliver accurate and up-to-date information, our content should not be considered professional advice for legal, financial, or business decisions. Always consult with a qualified professional before taking action based on the information found on this website.",
          },
          {
            title: "Service Performance Disclaimer",
            content:
              "The results of our services, such as Google Ads, Meta Ads, Shopify management, and email marketing campaigns, may vary depending on market conditions, industry trends, and client-specific factors. We do not guarantee specific outcomes, including sales, leads, or engagement metrics, as these are influenced by external variables beyond our control.",
          },
          {
            title: "External Links Disclaimer",
            content:
              "This website may contain affiliate links or links to third-party websites. We do not endorse, guarantee, or take responsibility for the accuracy or reliability of any information provided by external sites linked through our platform. Clicking on affiliate links may result in us earning a commission at no extra cost to you.",
          },
          {
            title: "Affiliate Disclaimer",
            content:
              "Some of the links on this site are affiliate links from services like Google Ads, Shopify, and other platforms. As an affiliate partner, we may earn a commission from purchases or subscriptions made through these links. This helps support our website and allows us to continue providing high-quality services.",
          },
          {
            title: "Limitation of Liability",
            content:
              "Under no circumstances shall ECOD be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our website, services, or reliance on any information provided. This includes but is not limited to losses related to Google Ads, Meta Ads, Shopify management, content creation, or email marketing campaigns. You use this website and our services at your own risk.",
          },
          {
            title: "Updates and Contact Information",
            content: `This disclaimer is subject to updates and changes. If you have any questions regarding this disclaimer, please contact us at:
            📧 Email: ${contact.email}
            📍 Address: ${contact.address}`,
          },
        ].map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="md:text-2xl text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Disclaimer;
