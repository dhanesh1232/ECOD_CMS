import Link from "next/link";

const LowerContent = () => {
  return (
    <div className="w-full mt-6 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Discover Our Cutting-Edge Solutions
      </h2>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
        At{" "}
        <span className="font-semibold text-green-600 dark:text-green-400">
          ECOD
        </span>
        , we specialize in innovative and eco-friendly digital solutions
        designed to elevate your business. Let’s create something impactful
        together.
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/services"
          className="px-5 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          Explore Services
        </Link>
        <Link
          href="/contact"
          className="px-5 py-3 border border-green-500 text-green-500 font-medium rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default LowerContent;
