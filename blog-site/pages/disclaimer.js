import Head from "next/head";
const contact = {
  address: "Tirupati, Andhra Pradesh, India",
  phone: "+91 8143963821",
  email: "support@ecod.com",
};
const Disclaimer = () => {
  return (
    <>
      <Head>
        <title>Disclaimer | ECOD</title>
        <meta
          name="description"
          content="Read the disclaimer for ECOD regarding web development, digital marketing, and affiliate services."
        />
      </Head>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Disclaimer
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The information provided by <strong>ECOD</strong> ("we," "us," or
          "our") on this website is for general informational purposes only. All
          information on this site is provided in good faith; however, we make
          no representation or warranty of any kind, express or implied,
          regarding the accuracy, reliability, availability, or completeness of
          any information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Professional Disclaimer
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          ECOD specializes in **web development, digital marketing, and Shopify
          solutions**. While we strive to provide up-to-date and valuable
          insights, our content should not be considered professional advice for
          legal, financial, or business decisions. Always consult with a
          qualified professional before taking action based on the information
          found on this website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          External Links Disclaimer
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This website may contain **affiliate links** or links to third-party
          websites. We do not endorse, guarantee, or take responsibility for the
          accuracy or reliability of any information provided by external sites
          linked through our platform. Clicking on affiliate links may result in
          us earning a commission at no extra cost to you.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Affiliate Disclaimer
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Some of the links on this site are **affiliate links** from services
          like Amazon, eBay, and other online marketplaces. As an affiliate
          partner, we may earn a commission from purchases made through these
          links. This helps support our website and allows us to continue
          providing high-quality content.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Limitation of Liability
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Under no circumstances shall ECOD be held liable for any direct,
          indirect, incidental, consequential, or punitive damages arising from
          your use of our website, services, or reliance on any information
          provided. You use this website at your own risk.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Updates and Contact Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This disclaimer is subject to updates and changes. If you have any
          questions regarding this disclaimer, please contact us at:
        </p>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          📧 Email: {contact.email} 📍 Address: {contact.address}
        </p>
      </div>
    </>
  );
};

export default Disclaimer;
