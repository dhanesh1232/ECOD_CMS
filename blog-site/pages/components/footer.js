import { TrustSVG } from "@/public/Assets/svg";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaLaptopCode,
  FaArrowRight,
  FaEnvelope,
  FaHeadset,
  FaPhoneAlt,
  FaStar,
} from "react-icons/fa";
import { policy_data } from "@/data/policies_data";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socialLinks = [
  {
    Icon: FaFacebookF,
    link: "#",
    name: "Facebook",
    color: "#1877F2",
    ariaLabel: "Visit our Facebook page",
  },
  {
    Icon: FaTwitter,
    link: "#",
    name: "Twitter",
    color: "#1DA1F2",
    ariaLabel: "Follow us on Twitter",
  },
  {
    Icon: FaLinkedinIn,
    link: "#",
    name: "LinkedIn",
    color: "#0077B5",
    ariaLabel: "Connect on LinkedIn",
  },
  {
    Icon: FaInstagram,
    link: "#",
    name: "Instagram",
    color: "#E4405F",
    ariaLabel: "Follow our Instagram",
  },
  {
    Icon: FaYoutube,
    link: "#",
    name: "YouTube",
    color: "#FF0000",
    ariaLabel: "Subscribe to our YouTube",
  },
  {
    Icon: FaLaptopCode,
    link: "/portfolio",
    name: "Portfolio",
    color: "#3b82f6",
    ariaLabel: "View our portfolio website",
    isPortfolio: true,
  },
];

const quickLinks = [
  { name: "About Us", path: "about-us" },
  { name: "Services", path: "services" },
  { name: "Blog", path: "blogs" },
  { name: "Contact", path: "contact" },
  { name: "FAQs", path: "faqs" },
  { name: "Disclaimer", path: "disclaimer" },
];

const services = [
  { label: "Web Development", slug: "/services/web-development" },
  { label: "Google | Meta Ads", slug: "/services/google-meta-ads" },
  { label: "SEO", slug: "seo" },
  {
    label: "Social Media Marketing",
    slug: "/services/social-media-marketing",
  },
  {
    label: "Shopify Optimization",
    slug: "/services/shopify-optimization",
  },
  { label: "Content Marketing", slug: "/services/content-marketing" },
  { label: "Email Marketing", slug: "/services/email-marketing" },
];

const testimonials = [
  {
    quote: "ECOD transformed our online presence. Highly recommended!",
    name: "John Doe",
    company: "Tech Solutions Inc.",
    rating: 5,
  },
  {
    quote: "Their SEO services helped our business rank higher in weeks!",
    name: "Jane Smith",
    company: "Ecommerce Store",
    rating: 4,
  },
];

const Footer = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Floating gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-30"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About ECOD */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-green-400 rounded-full"></div>
              <h3 className="text-xl font-bold">About ECOD</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              We create digital experiences that transform businesses and drive
              growth through innovative solutions.
            </p>
            <motion.div
              whileHover="hover"
              variants={itemVariants}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-gray-700/50 hover:border-green-400/30 transition-colors max-w-fit"
            >
              <TrustSVG width={40} height={48} color="#10B981" />
              <span className="text-sm text-gray-300">
                Trusted by 500+ businesses worldwide
              </span>
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-blue-400 rounded-full"></div>
              <h3 className="text-xl font-bold">Our Services</h3>
            </div>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={`${service.slug}`}
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group"
                    aria-label={`Learn more about ${service.label}`}
                  >
                    <motion.span
                      className="inline-block mr-3 group-hover:translate-x-1 transition-transform"
                      whileHover={{ x: 3 }}
                    >
                      <FaArrowRight className="text-xs text-blue-400" />
                    </motion.span>
                    {service.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-purple-400 rounded-full"></div>
              <h3 className="text-xl font-bold">Quick Links</h3>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={`/${link.path}`}
                    className={`${
                      router.pathname === `/${link.path}`
                        ? "text-purple-400"
                        : "text-gray-400 hover:text-purple-400"
                    } transition-colors flex items-center`}
                    aria-label={`Go to ${link.name}`}
                  >
                    <motion.span
                      className="inline-block mr-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        opacity: router.pathname === `/${link.path}` ? 1 : 0,
                      }}
                    >
                      <FaArrowRight className="text-xs text-purple-400" />
                    </motion.span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-yellow-400 rounded-full"></div>
              <h3 className="text-xl font-bold">Client Testimonials</h3>
            </div>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800/30 backdrop-blur-sm p-5 rounded-xl hover:bg-gray-800/50 transition-colors border border-gray-700/30 hover:border-yellow-400/20"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex mb-3">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}`}
                        />
                      ))}
                  </div>
                  <p className="text-gray-300 italic mb-3 leading-relaxed">
                    {`"${testimonial.quote}"`}
                  </p>
                  <div className="text-yellow-400 font-medium">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.company}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter & CTA */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Newsletter */}
          <motion.div
            whileHover="hover"
            variants={itemVariants}
            className="bg-gray-800/40 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 hover:border-green-500/30 transition-colors shadow-lg"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-xl bg-green-500/10 backdrop-blur-sm border border-green-500/20">
                <FaEnvelope className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Get the latest digital insights and exclusive offers straight to
              your inbox.
            </p>
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-900/30 border border-green-800/50 text-green-400 p-4 rounded-lg backdrop-blur-sm"
                >
                  Thank you for subscribing! Check your email for confirmation.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 hover:border-gray-500/50 transition-colors"
                    required
                    aria-label="Email address for newsletter subscription"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg transition-all font-medium backdrop-blur-sm ${
                      isLoading ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                    aria-label="Subscribe to newsletter"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            whileHover="hover"
            variants={itemVariants}
            className="bg-gray-800/40 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-colors shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20">
                  <FaHeadset className="text-blue-400 text-xl" />
                </div>
                <h3 className="text-xl font-bold">Need Help?</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our experts are ready to discuss your project and answer any
                questions.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium group backdrop-blur-sm"
              aria-label="Contact us"
            >
              <FaPhoneAlt className="group-hover:animate-pulse transition" />
              <span>Contact Us</span>
              <FaArrowRight className="ml-1 group-hover:translate-x-1 transition" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Portfolio Showcase Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 backdrop-blur-lg p-8 rounded-2xl border border-blue-700/30 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <FaLaptopCode className="text-blue-400 text-3xl" />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold mb-3">Explore Our Portfolio</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {`Discover our latest projects and see how we've helped businesses
                like yours succeed online.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 group backdrop-blur-sm"
                  aria-label="View our portfolio"
                >
                  <span>View Portfolio</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 group backdrop-blur-sm"
                  aria-label="See our services"
                >
                  <span>Our Services</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social & Legal */}
        <div className="pt-12 border-t border-gray-800/50">
          {/* Social Links with Description */}
          <motion.div
            className="flex flex-col items-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium text-gray-300 mb-6">
              Connect With Us
            </h3>
            <div className="flex flex-wrap justify-center gap-5 mb-8">
              {socialLinks.map(
                ({ Icon, link, name, color, isPortfolio }, index) => (
                  <motion.a
                    key={index}
                    href={link}
                    target={isPortfolio ? "_blank" : "_self"}
                    rel={isPortfolio ? "noopener noreferrer" : ""}
                    aria-label={
                      isPortfolio
                        ? "View our portfolio website"
                        : `Follow us on ${name}`
                    }
                    className={`flex flex-col items-center group w-16 h-16 rounded-2xl justify-center transition-all relative overflow-hidden backdrop-blur-sm border ${
                      isPortfolio
                        ? "border-blue-500/50 hover:border-blue-400/70 bg-blue-500/10 hover:bg-blue-500/20"
                        : "border-gray-700/50 hover:border-gray-600/50 bg-gray-800/50 hover:bg-gray-700/50"
                    }`}
                    whileHover={{
                      y: -5,
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ color }}
                  >
                    <Icon
                      className={`w-6 h-6 z-10 ${isPortfolio ? "text-blue-400" : ""}`}
                    />
                    <span className="absolute -bottom-5 text-xs font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {isPortfolio ? "Portfolio" : name}
                    </span>
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* Legal Links with Better Structure */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              {policy_data.policy_links.map((link, index) => {
                const href_link = link
                  .toLowerCase()
                  .replace(/[^a-z\s-]/g, "")
                  .replace(/\s+/g, "-");
                return (
                  <Link
                    key={index}
                    href={`/${href_link}`}
                    className="relative text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg group"
                    aria-label={`View our ${link}`}
                  >
                    {link}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-400 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Copyright Section */}
          <motion.div
            className=""
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 mx-auto border border-gray-700/30 max-w-4xl">
              <div className="flex items-center gap-3">
                <TrustSVG width={30} height={36} color="#6B7280" />
                <span className="text-gray-400 text-sm md:text-base">
                  &copy; {new Date().getFullYear()} ECOD Digital. All rights
                  reserved.
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                <span>Made with</span>
                <span className="text-red-400">❤️</span>
                <span>in India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
