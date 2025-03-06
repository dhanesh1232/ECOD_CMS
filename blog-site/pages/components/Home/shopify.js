"use client";

const ShopifySection = () => {
  return (
    <section className="w-full py-20 px-8 bg-gradient-to-r from-blue-50 to-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          Elevate Your Shopify Store 🚀
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          We specialize in{" "}
          <span className="font-semibold text-blue-600">custom themes</span>,
          seamless{" "}
          <span className="font-semibold text-blue-600">store setup</span>, and
          high-converting{" "}
          <span className="font-semibold text-blue-600">
            one-click checkout
          </span>{" "}
          solutions.
        </p>
        <p className="mt-2 text-gray-600">
          Unlock unique designs and optimized performance for higher sales.
        </p>
        <a
          href="/services/shopify-themes"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300"
        >
          Explore Solutions
        </a>
      </div>
    </section>
  );
};

export default ShopifySection;
