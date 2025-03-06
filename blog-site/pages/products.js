"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    description: "Experience immersive sound with active noise cancellation.",
    price: "$199.99",
    image: "/images/headphones.jpg",
    affiliateLink: "https://www.amazon.com/dp/example1", // Replace with real affiliate link
  },
  {
    id: 2,
    name: "Smartwatch with Fitness Tracking",
    description:
      "Stay connected and track your health with this premium smartwatch.",
    price: "$149.99",
    image: "/images/smartwatch.jpg",
    affiliateLink: "https://www.amazon.com/dp/example2", // Replace with real affiliate link
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    description: "Cinematic experience with vibrant colors and smart features.",
    price: "$499.99",
    image: "/images/smart-tv.jpg",
    affiliateLink: "https://www.amazon.com/dp/example3", // Replace with real affiliate link
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    description: "Comfortable and adjustable chair for long work hours.",
    price: "$129.99",
    image: "/images/office-chair.jpg",
    affiliateLink: "https://www.amazon.com/dp/example4", // Replace with real affiliate link
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Affiliate Products | ECOD</title>
        <meta
          name="description"
          content="Shop the best affiliate products curated by ECOD. High-quality and best deals available."
        />
      </Head>

      <div className="max-w-full mx-auto px-4 py-12">
        <h1 className="text-xl lg:text-2xl xl:text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Featured Products
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm my-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {product.price}
                  </p>

                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                  >
                    Buy Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
            No products found.
          </p>
        )}
      </div>
    </>
  );
};

export default Products;
