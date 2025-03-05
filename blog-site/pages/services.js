import Link from "next/link";

const services = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Logo Design", href: "/services/logo-design" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "E-Commerce", href: "/services/e-commerce" },
  { label: "SEO", href: "/services/seo" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Digital Transformation", href: "/services/digital-transformation" },
  {
    label: "Shopify Theme Development",
    href: "/services/shopify-theme-development",
  },
  {
    label: "Custom Shopify Solutions",
    href: "/services/custom-shopify-solutions",
  },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Email Marketing", href: "/services/email-marketing" },
];

export default function ServicesGrid() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center my-6 text-gray-800">
        Our Premium Services
      </h2>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        We provide cutting-edge digital solutions to help your business grow.
        Choose from a variety of services tailored to your needs.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {services.map((service, index) => (
          <Link key={index} href={service.href}>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer text-center h-32 flex flex-col items-center justify-center border border-gray-200 hover:border-blue-500 hover:bg-blue-50">
              <h3 className="text-xl font-semibold text-gray-800">
                {service.label}
              </h3>
              <p className="text-sm text-gray-500 mt-2">Explore More →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
