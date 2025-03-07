import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Use named import for Link

const ServiceCard = ({ service }) => {
  return (
    <Link href={service.href} className="group">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-[1.02] duration-300 border border-gray-200 hover:border-blue-500">
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={service.image_url}
            alt={service.label}
            fill // Use `fill` instead of `layout="fill"`
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add `sizes` for responsive images
            style={{
              objectFit: "cover", // Use `style` for object-fit
            }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {service.label} {service.icon}
          </h3>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {service.description || "Discover the latest insights and trends."}
          </p>
          <div className="mt-3 text-blue-500 font-medium inline-flex items-center space-x-1 hover:underline">
            <span>{service.cta}</span>
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
