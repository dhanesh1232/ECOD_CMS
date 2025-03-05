import { MoveLeft } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

const BlogPost = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>How to Boost Your Online Presence | ECOD Blog</title>
        <meta
          name="description"
          content="Learn effective digital strategies to enhance your online presence and grow your business with ECOD's expert insights."
        />
      </Head>

      <div className="max-w-3xl mx-auto p-6">
        <button
          className="hover:text-blue-600"
          type="button"
          onClick={() => {
            router.push("/blog-posts");
          }}
        >
          <MoveLeft />
        </button>
        <hr className="mb-6" />
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How to Boost Your Online Presence with Smart Digital Strategies
        </h1>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          In today’s competitive digital world, simply having a website is not
          enough. You need a strong online strategy to stand out and attract the
          right audience. Here are some expert tips from{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">
            ECOD
          </span>{" "}
          to help you grow your business online.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
          1. Optimize Your Website for Search Engines (SEO)
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          A well-optimized website improves visibility on search engines like
          Google. Use **relevant keywords**, create **high-quality content**,
          and ensure your site is **fast and mobile-friendly** for better
          rankings.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
          2. Leverage Social Media Marketing
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Social media platforms like Facebook, Instagram, and LinkedIn are
          powerful tools for brand awareness. Share valuable content, engage
          with your audience, and use **targeted ads** to increase reach.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
          3. Invest in Shopify for a Seamless E-commerce Experience
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          If you're in e-commerce, **Shopify** is a great platform to build and
          scale your online store. Optimize your store with **high-quality
          product pages, smooth navigation, and fast checkout options** for a
          better customer experience.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
          4. Run Data-Driven Digital Ads
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Running **Google Ads** and **Meta Ads (Facebook & Instagram)** allows
          you to target potential customers based on demographics, interests,
          and behavior. Use **A/B testing** to optimize ad performance.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
          5. Create Valuable Content to Build Trust
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Blogging, video marketing, and email newsletters help establish
          credibility in your niche. Provide useful insights, case studies, and
          how-to guides to build long-term trust with your audience.
        </p>

        <div className="mt-6 text-center">
          <a
            href="/services"
            className="px-5 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
          >
            Explore Our Services
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
