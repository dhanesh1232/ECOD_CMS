import Image from "next/image";
import dynamic from "next/dynamic";
import { CertifiedSVG, VerfiedSVG } from "@/public/Assets/svg";
const Buttons = dynamic(() => import("./Reusable/buttons"));
const LowerContent = () => {
  return (
    <div className="w-full mt-6 p-8 dark:bg-gray-100 bg-gray-700 rounded-t-lg shadow-lg text-center transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-50 dark:text-black mb-4">
        Discover Our Cutting-Edge Solutions
      </h2>
      <p className="text-gray-100 dark:text-gray-800 leading-relaxed max-w-2xl mx-auto">
        At{" "}
        <span className="font-semibold text-green-500 dark:text-green-400">
          ECOD
        </span>
        , we specialize in innovative and eco-friendly digital solutions
        designed to elevate your business. Let’s create something impactful
        together.
      </p>

      {/* Trust Badge Section */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <VerfiedSVG width={24} height={24} color="#000000" />
          <span className="text-gray-200 dark:text-gray-700 font-medium">
            100% Satisfaction
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CertifiedSVG />
          <span className="text-gray-200 dark:text-gray-700 font-medium">
            Certified Experts
          </span>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <Buttons
          first_label={"Explore"}
          second_label={"Contact"}
          first_nav="/services"
          first_styles="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          second_nav="/contact"
          second_styles="px-8 py-3 border-2 border-green-500 text-green-600 dark:text-green-400 dark:border-green-400 text-lg font-semibold rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

export default LowerContent;
