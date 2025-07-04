"use client";
import Link from "next/link";
import Logo from "../logo";
import { Icons } from "../icons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Integrations", href: "/integrations" },
        { name: "Pricing", href: "/pricing" },
        { name: "FAQ", href: "/faq" },
        { name: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers", highlight: true },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API", href: "/api" },
        { name: "Guides", href: "/guides" },
        { name: "Community", href: "/community" },
        { name: "Status", href: "https://status.ecodrix.com", external: true },
      ],
    },
  ];

  const legalLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "DPA", href: "/dpa" },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      icon: "twitter",
      href: "#",
      lightColor: "#1DA1F2",
      darkColor: "#1DA1F2",
    },
    {
      name: "GitHub",
      icon: "github",
      href: "#",
      lightColor: "#181717",
      darkColor: "#f0f0f0",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      href: "#",
      lightColor: "#0077B5",
      darkColor: "#0A66C2",
    },
    {
      name: "Discord",
      icon: "discord",
      href: "#",
      lightColor: "#5865F2",
      darkColor: "#5865F2",
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100/80 dark:border-gray-800/30">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile: Single column, Sm: 2 columns, Md+: Full layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand column - full width on mobile, half on sm, 3 cols on md+ */}
          <div className="sm:col-span-2 md:col-span-1 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 focus-visible:ring-offset-2 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
            >
              <Logo showSpan={false} />
              <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent dark:from-primary-500 dark:to-primary-300">
                ECODrIx
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 origin-bottom-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            <p className="text-gray-500 dark:text-gray-400/90 text-sm leading-relaxed">
              Building the future of digital experiences with innovative
              solutions.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = Icons[social.icon];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/60 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-0.5 group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{
                        color: `var(--${social.icon}-color)`,
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 12px 0 ${social.lightColor}`,
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links columns - full width on mobile, half on sm, 3 cols each on md+ */}
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`space-y-5 ${index === 0 ? "sm:col-start-1" : ""}`}
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={`relative inline-flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400/90 dark:hover:text-white transition-all duration-200 text-sm group ${
                        link.highlight
                          ? "font-medium text-primary-600 dark:text-primary-400"
                          : ""
                      }`}
                    >
                      {link.name}
                      {link.external && (
                        <svg
                          className="ml-1.5 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      )}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary-500/70 to-primary-400/70 dark:from-primary-400/50 dark:to-primary-300/50 origin-bottom-right scale-x-0 group-hover:origin-bottom-left group-hover:scale-x-100 transition-transform duration-300 ease-out ${
                          link.highlight ? "scale-x-100" : ""
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/30 mt-4 sm:mt-6" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-gray-500/80 text-sm text-center sm:text-left">
            © {currentYear}{" "}
            <span className="font-medium text-gray-600 dark:text-gray-300/90">
              ECODrIx
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs transition-colors duration-200 hover:underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
