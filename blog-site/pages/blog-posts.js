import { MoveLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "How to Boost Your Online Presence",
    description:
      "Learn digital marketing strategies to improve SEO, social media reach, and ads performance.",
    image: "/images/blog1.jpg",
    link: "/blog/boost-online-presence",
  },
  {
    id: 2,
    title: "Shopify vs WooCommerce: Which One is Best?",
    description:
      "Comparing Shopify and WooCommerce to help you decide the best platform for your online store.",
    image: "/images/blog2.jpg",
    link: "/blog/shopify-vs-woocommerce",
  },
  {
    id: 3,
    title: "Meta & Google Ads: A Complete Guide",
    description:
      "A step-by-step guide to running successful ad campaigns on Facebook, Instagram, and Google.",
    image: "/images/blog3.jpg",
    link: "/blog/meta-google-ads-guide",
  },
];

const BlogPosts = () => {
  return (
    <>
      <Head>
        <title>Blog - ECOD</title>
        <meta
          name="description"
          content="Read our latest blog posts on web development, digital marketing, and eCommerce strategies."
        />
      </Head>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="w-full">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            <MoveLeft />
          </Link>

          <div className="flex justify-end">
            <Link
              href="/post"
              className="ml-4 text-green-600 dark:text-green-400 font-medium"
            >
              Blog
            </Link>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Our Latest Blog Posts
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {blog.description}
                </p>

                <Link
                  href={blog.link}
                  className="mt-4 inline-block text-green-600 dark:text-green-400 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
