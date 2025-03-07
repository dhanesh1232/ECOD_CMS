import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full h-[400px] md:h-[600px] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Build Scalable & Modern Web Apps
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-8">
        We specialize in high-performance websites using Next.js and Tailwind
        CSS.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/services"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          aria-label="Explore Services"
        >
          Explore Services
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
          aria-label="Contact Us"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
