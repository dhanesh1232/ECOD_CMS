const { default: Link } = require("next/link");

const HeroSection = () => {
  return (
    <section className="w-full h-96 md:h-[600px] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-indigo-400 text-white px-6">
      <h1 className="text-2xl md:text-4xl font-bold">
        Build Scalable & Modern Web Apps
      </h1>
      <p className="mt-4 text-base md:text-xl max-w-2xl">
        We specialize in high-performance websites using Next.js and Tailwind
        CSS.
      </p>
      <div className="mt-6 flex gap-2 md:gap-4">
        <Link
          href="/services"
          className="px-2 sm:px-6 py-2 sm:py-3 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-200 transition"
        >
          Explore Services
        </Link>
        <Link
          href="/contact"
          className="px-2 sm:px-6 py-2 sm:py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-indigo-600 transition"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};
export default HeroSection;
