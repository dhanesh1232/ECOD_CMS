import { TrustSVG } from "@/public/Assets/svg";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import { policy_data } from "@/data/policies_data";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socialLinks = [
  { Icon: FaIcons.FaFacebookF, link: "#", name: "Facebook", color: "#1877F2" },
  { Icon: FaIcons.FaTwitter, link: "#", name: "Twitter", color: "#1DA1F2" },
  { Icon: FaIcons.FaLinkedinIn, link: "#", name: "LinkedIn", color: "#0077B5" },
  { Icon: FaIcons.FaInstagram, link: "#", name: "Instagram", color: "#E4405F" },
  { Icon: FaIcons.FaYoutube, link: "#", name: "YouTube", color: "#FF0000" },
];

const quickLinks = [
  { name: "About Us", path: "about-us" },
  { name: "Services", path: "services" },
  { name: "Blog", path: "blog" },
  { name: "Contact", path: "contact" },
  { name: "FAQs", path: "faqs" },
  { name: "Disclaimer", path: "disclaimer" },
];

const services = [
  "Web Development",
  "SEO Optimization",
  "Digital Marketing",
  "Shopify Solutions",
  "UI/UX Design",
  "App Development",
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
      // Simulate API call
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
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 text-white pt-16 pb-8 backdrop-blur-lg relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About ECOD */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700/50 inline-block">
              About ECOD
            </h3>
            <p className="text-gray-400 mb-4">
              We create digital experiences that transform businesses and drive
              growth through innovative solutions.
            </p>
            <div className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/30 max-w-fit">
              <TrustSVG width={40} height={48} color="#10B981" />
              <span className="text-sm text-gray-400">
                Trusted by 500+ businesses worldwide
              </span>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700/50 inline-block">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={`/services/${service.toLowerCase().replace(/\s/g, "-")}`}
                    className="flex items-center text-gray-400 hover:text-green-400 transition-colors group"
                    aria-label={`Learn more about ${service}`}
                  >
                    <motion.span
                      className="inline-block mr-2 group-hover:translate-x-1 transition-transform"
                      whileHover={{ x: 3 }}
                    >
                      <FaIcons.FaArrowRight className="text-xs text-green-400" />
                    </motion.span>
                    {service}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700/50 inline-block">
              Quick Links
            </h3>
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
                        ? "text-green-400"
                        : "text-gray-400 hover:text-green-400"
                    } transition-colors flex items-center`}
                    aria-label={`Go to ${link.name}`}
                  >
                    <motion.span
                      className="inline-block mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        opacity: router.pathname === `/${link.path}` ? 1 : 0,
                      }}
                    >
                      <FaIcons.FaArrowRight className="text-xs text-green-400" />
                    </motion.span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700/50 inline-block">
              Client Testimonials
            </h3>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-700/30"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex mb-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <FaIcons.FaStar
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}`}
                        />
                      ))}
                  </div>
                  <p className="text-gray-300 italic mb-2">
                    {`"${testimonial.quote}"`}
                  </p>
                  <div className="text-green-400 font-medium">
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Newsletter */}
          <div className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10 backdrop-blur-sm border border-green-500/20">
                <FaIcons.FaEnvelope className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold">Newsletter</h3>
            </div>
            <p className="text-gray-400 mb-4">
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
          </div>

          {/* Contact CTA */}
          <div className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-colors shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 backdrop-blur-sm border border-blue-500/20">
                  <FaIcons.FaHeadset className="text-blue-400 text-xl" />
                </div>
                <h3 className="text-xl font-bold">Need Help?</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Our experts are ready to discuss your project and answer any
                questions.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium group backdrop-blur-sm"
              aria-label="Contact us"
            >
              <FaIcons.FaPhoneAlt className="group-hover:animate-pulse" />
              <span>Contact Us</span>
              <FaIcons.FaArrowRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </motion.div>

        {/* Social & Legal */}
        <div className="pt-8 border-t border-gray-800/50">
          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {socialLinks.map(({ Icon, link, name, color }, index) => (
              <motion.a
                key={index}
                href={link}
                aria-label={`Follow us on ${name}`}
                className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white flex items-center justify-center transition-colors relative overflow-hidden group backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{ color }}
              >
                <Icon className="w-5 h-5 z-10" />
                <span
                  className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Legal Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {policy_data.policy_links.map((link, index) => {
              const href_link = link
                .toLowerCase()
                .replace(/[^a-z\s-]/g, "")
                .replace(/\s+/g, "-");
              return (
                <Link
                  key={index}
                  href={`/${href_link}`}
                  className="text-gray-500 hover:text-gray-300 transition-colors hover:bg-gray-800/50 px-3 py-1 rounded backdrop-blur-sm"
                  aria-label={`View our ${link}`}
                >
                  {link}
                </Link>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 max-w-fit mx-auto border border-gray-700/30">
              <TrustSVG width={30} height={36} color="#6B7280" />
              <span>
                &copy; {new Date().getFullYear()} ECOD Digital. All rights
                reserved.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
