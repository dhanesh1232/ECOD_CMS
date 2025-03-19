import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ service }) => {
  if (!service || !service.href || !service.label) {
    console.error("Invalid service data:", service);
    return null;
  }

  let nav_link;
  if (service.href && service.category) {
    nav_link = `/service/${service.category}/${service.href}`;
  } else {
    nav_link = service.href;
  }

  return (
    <Link href={nav_link} className="group">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-[1.02] duration-300 border border-gray-200 hover:border-blue-500">
        <div className="relative w-full h-52 overflow-hidden">
          {service?.image_url ? (
            <Image
              src={service.image_url}
              alt={service.label}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
              }}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-green-200 flex items-center justify-center text-4xl font-bold text-gray-800">
              {service.label.charAt(0)}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {service.label} {service.icon}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {service.description || "Discover the latest insights and trends."}
          </p>
          <div className="mt-3 text-blue-500 font-medium inline-flex items-center space-x-1 hover:underline">
            <span>{service.cta || "Read More"}</span>
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
