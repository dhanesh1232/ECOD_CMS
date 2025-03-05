import Head from "next/head";

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

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    quote:
      "Their team transformed our website into a high-performing platform. Highly recommended!",
    image: "/images/john-doe.jpg",
  },
  {
    name: "Jane Smith",
    role: "Founder, EcoStore",
    quote:
      "The Shopify solutions they provided helped us double our sales in just 3 months.",
    image: "/images/jane-smith.jpg",
  },
  {
    name: "Alex Johnson",
    role: "Marketing Manager, BrightIdeas",
    quote:
      "Their SEO strategies brought us to the top of Google rankings. Amazing results!",
    image: "/images/alex-johnson.jpg",
  },
];

const faqs = [
  {
    question: "What technologies do you use?",
    answer:
      "We primarily use Next.js, Tailwind CSS, and modern JavaScript frameworks for web development.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Project timelines vary based on complexity, but we ensure timely delivery without compromising quality.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes, we provide dedicated support and maintenance packages for all our clients.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>ECOD Services - Next.js & Tailwind Experts</title>
        <meta
          name="description"
          content="High-quality development services with Next.js and Tailwind CSS."
        />
      </Head>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Build Scalable & Modern Web Apps
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          We specialize in high-performance websites using Next.js and Tailwind
          CSS.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/services"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-200 transition"
          >
            Explore Services
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-indigo-600 transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <p className="mt-3 text-gray-600">
            We provide cutting-edge digital solutions tailored to your business
            needs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              className="p-6 bg-white shadow-md rounded-lg text-center transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-indigo-600">
                {service.label}
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* Shopify & E-commerce Solutions */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Shopify & E-commerce Solutions
        </h2>
        <p className="mt-3 text-gray-600">
          Custom themes, store setup, and optimization for higher sales.
        </p>
        <a
          href="/services/shopify-themes"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
        >
          Learn More
        </a>
      </section>

      {/* Digital Marketing Solutions */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Digital Marketing & Branding
        </h2>
        <p className="mt-3 text-gray-600">
          Boost your online presence with SEO, PPC, and social media marketing.
        </p>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          What Our Clients Say
        </h2>
        <p className="mt-3 text-gray-600">
          Real stories from satisfied customers.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg shadow-sm text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 mx-auto rounded-full"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="mt-2 text-gray-600">{testimonial.role}</p>
              <p className="mt-4 text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800">FAQs</h2>
        <p className="mt-3 text-gray-600">
          Answers to commonly asked questions.
        </p>
        <div className="mt-10 max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800">
                {faq.question}
              </h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to Elevate Your Business?</h2>
        <p className="mt-3">Let's build something amazing together.</p>
        <a
          href="/contact"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 transition"
        >
          Get Started
        </a>
      </section>
    </>
  );
}
