import Link from "next/link";
import * as FaIcons from "react-icons/fa";

const contact = {
  address: "Tirupati, Andhra Pradesh, India",
  phone: "+91 8143963821",
  email: "support@ecod.com",
};

const socialLinks = [
  { Icon: FaIcons.FaFacebookF, link: "#", followers: "10k+" },
  { Icon: FaIcons.FaTwitter, link: "#", followers: "8.5k+" },
  { Icon: FaIcons.FaLinkedinIn, link: "#", followers: "12k+" },
  { Icon: FaIcons.FaInstagram, link: "#", followers: "15k+" },
];

const quickLinks = [
  "About Us",
  "Services",
  "Blog",
  "Contact",
  "Privacy Policy",
];

const services = [
  "Web Development",
  "SEO Optimization",
  "Digital Marketing",
  "Shopify Solutions",
  "Branding & Design",
];

const testimonials = [
  {
    quote: "ECOD transformed our online presence. Highly recommended!",
    name: "John Doe",
  },
  {
    quote: "Their SEO services helped our business rank higher in weeks!",
    name: "Jane Smith",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto justify-center flex-wrap px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
        {/* About ECOD */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About ECOD</h2>
          <p className="text-gray-300">
            ECOD provides top-notch services to enhance your digital presence.
            <span className="text-green-400 font-semibold">
              {" "}
              Our tailored strategies ensure maximum ROI and long-term business
              growth.
            </span>
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Services</h2>
          <ul className="space-y-2 flex flex-col items-center">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-gray-300 hover:text-blue-500 cursor-pointer"
              >
                <FaIcons.FaCheckCircle className="text-green-400" />
                <Link
                  href={`/services/${service
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={`/${link.toLowerCase().replace(/\s/g, "-")}`}
                  className="hover:text-green-400 transition duration-300"
                >
                  {link}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/faq"
                className="hover:text-green-400 transition duration-300"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        {/* Testimonials */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">What Our Clients Say</h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="text-gray-300 italic">
                {`" ${testimonial.quote} "`} <br />
                <span className="font-semibold text-green-400">
                  - {testimonial.name}
                </span>
                <div className="flex justify-center mt-2 text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FaIcons.FaStar key={i} />
                    ))}
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </div>

      <div className="grid mx-auto grid-cols-1 lg:grid-cols-2 mt-5">
        {/* Newsletter Signup */}
        <div className="mt-10 flex flex-col w-full justify-center items-center gap-6 px-2 sm:px-4">
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-semibold mb-2">
              📩 Stay Ahead of the Competition
            </h2>
            <p className="text-gray-300">
              Join 2,000+ business owners getting exclusive marketing tips.
            </p>
          </div>

          <form className="flex w-full max-w-lg bg-gray-800 p-1 rounded-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none flex-grow text-white px-2 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-base text-sm"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-4 py-2 rounded-lg transition duration-300 sm:text-base text-sm"
            >
              Subscribe Now 🚀
            </button>
          </form>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold mb-3">
            🚀 Ready to Scale Your Business?
          </h2>
          <p className="text-gray-300 mb-4">
            Book a free strategy call with our experts today!
          </p>
          <Link
            href="/contact"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300"
          >
            Get a Free Strategy Session 💡
          </Link>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
        <div className="flex justify-center flex-wrap gap-2">
          {socialLinks.map(({ Icon, link, followers }, index) => (
            <a
              key={index}
              href={link}
              className="flex items-center text-gray-300 hover:text-green-400 transition duration-300 px-3 py-2 border border-gray-700 rounded-full"
            >
              <Icon size={16} />
              <span className="ml-2 text-sm">{followers}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center border-t border-gray-700 pt-5 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ECOD. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
