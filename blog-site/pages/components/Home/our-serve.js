"use client";

import Link from "next/link";
import { eco_services } from "@/data/ecod-services";
import Image from "next/image";
import { MoveRight } from "lucide-react";
const OurServices = () => {
  const displayedServices = eco_services.slice(0, 4);

  return (
    <section className="w-full py-20 px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          🚀 Our Premium Services
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          Empowering businesses with cutting-edge digital solutions tailored for
          success.
        </p>
      </div>

      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedServices.map((service, index) => (
          <Link key={index} href={service.href} className="group">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-[1.02] duration-300 border border-gray-200 hover:border-blue-500">
              {/* Image Section */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={service.image_url}
                  layout="fill"
                  objectFit="cover"
                  alt={service.label}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.label} {service.icon}
                </h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {service.description ||
                    "Discover the latest insights and trends."}
                </p>

                {/* Read More */}
                <div className="mt-3 text-blue-500 font-medium inline-flex items-center space-x-1 hover:underline">
                  <span>{service.cta}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-4 justify-center px-8 py-3 bg-indigo-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-500 hover:scale-105 transition-transform duration-300"
        >
          <span>Explore More Services</span> <MoveRight />
        </Link>
      </div>
    </section>
  );
};

export default OurServices;
