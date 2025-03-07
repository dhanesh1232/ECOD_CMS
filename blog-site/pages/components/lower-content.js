import Link from "next/link";
import Image from "next/image";

const LowerContent = () => {
  return (
    <div className="w-full mt-6 p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg text-center transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Discover Our Cutting-Edge Solutions
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
        At{" "}
        <span className="font-semibold text-green-600 dark:text-green-400">
          ECOD
        </span>
        , we specialize in innovative and eco-friendly digital solutions
        designed to elevate your business. Let’s create something impactful
        together.
      </p>

      {/* Trust Badge Section */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <Image
            src="/Images/trust-badge-1.svg" // Replace with your trust badge image
            alt="Trust Badge 1"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            100% Satisfaction
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/Images/trust-badge-2.svg" // Replace with your trust badge image
            alt="Trust Badge 2"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Eco-Friendly Solutions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/Images/trust-badge-3.svg" // Replace with your trust badge image
            alt="Trust Badge 3"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Certified Experts
          </span>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/services"
          className="px-5 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 dark:hover:bg-green-400 dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
        >
          Explore Services
        </Link>
        <Link
          href="/contact"
          className="px-5 py-3 border border-green-500 text-green-600 dark:text-green-400 dark:border-green-400 font-medium rounded-lg shadow-md hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default LowerContent;
