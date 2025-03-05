import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const contact = {
  address: "Tirupati, Andhra Pradesh, India",
  phone: "+91 8143963821",
  email: "support@ecod.com",
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* About ECOD */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About ECOD</h2>
          <p className="text-gray-400 leading-relaxed">
            ECOD provides top-notch services to enhance your digital presence.
            Our solutions are designed to be efficient, cost-effective, and
            sustainable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {["About Us", "Services", "Blog", "Contact", "Privacy Policy"].map(
              (link, index) => (
                <li key={index}>
                  <a
                    href={`/${link.toLowerCase().replace(/\s/g, "-")}`}
                    className="hover:text-green-400 transition duration-300"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400">📧 {contact.email}</p>
          <p className="text-gray-400">📞 {contact.phone}</p>
          <p className="text-gray-400">📍 {contact.address}</p>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-3">Subscribe to our newsletter</p>
          <form className="flex items-center bg-gray-800 p-2 rounded-lg">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none flex-grow text-white px-2 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
        <div className="flex justify-center space-x-4">
          {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
            (Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-green-400 transition duration-300 p-3 border border-gray-700 rounded-full"
              >
                <Icon size={18} />
              </a>
            )
          )}
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
