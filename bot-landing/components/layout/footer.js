"use client";
import Link from "next/link";
import Logo from "../logo";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <Logo showSpan={false} />
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Building the future of digital experiences with innovative
              solutions.
            </p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "instagram", "linkedin"].map(
                (social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    aria-label={social}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <use href={`/icons/social.svg#${social}`} />
                    </svg>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Links columns */}
          {[
            {
              title: "Product",
              links: ["Features", "Integrations", "Pricing", "FAQ", "Roadmap"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Blog", "Press", "Contact"],
            },
            {
              title: "Resources",
              links: ["Documentation", "API", "Guides", "Community", "Status"],
            },
          ].map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-10"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
