import { eco_services } from "@/data/ecod-services";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchComponent from "./components/Reusable/search";
import { services_ecod } from "@/data/service_ecod";
import dynamic from "next/dynamic";
const CategorySelector = dynamic(() =>
  import("./components/Reusable/CategorySelector")
);
const BackAndForward = dynamic(() => import("./components/Reusable/back-forw"));
export default function ServicesGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = eco_services.filter((service) =>
    service.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => setSearchQuery(query);

  return (
    <div className="container mx-auto px-4 py-16 bg-white dark:bg-gray-900 transition-colors">
      <BackAndForward forward="/services/web-development" />
      <hr className="my-4 border-gray-300 dark:border-gray-700" />

      {/* Search Bar */}
      <SearchComponent searchValue={searchQuery} filterSearch={handleSearch} />

      <h2 className="text-2xl md:text-4xl font-bold text-center my-6 text-gray-800 dark:text-white">
        Our Premium Services
      </h2>

      <p className="text-center text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
        We provide cutting-edge digital solutions to help your business grow.
        Choose from a variety of services tailored to your needs.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredServices.map((service, index) => (
          <Link key={index} href={service.href} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-[1.02] duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400">
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.label} {service.icon}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-2">
                  {service.description ||
                    "Discover the latest insights and trends."}
                </p>

                {/* Read More */}
                <div className="mt-3 text-blue-500 dark:text-blue-400 font-medium inline-flex items-center space-x-1 hover:underline">
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

      <hr className="my-4 border-gray-300 dark:border-gray-700" />
      <CategorySelector services={services_ecod} page={"/services"} />
    </div>
  );
}
