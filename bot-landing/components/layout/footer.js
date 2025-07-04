"use client";
import Link from "next/link";
import Logo from "../logo";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/hooks/mediaQuery";
export const Footer = () => {
  const isMobile = useMediaQuery("(max-width:640px)");
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
        //{ name: "Careers", href: "/careers", highlight: true },
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
    { name: "Privacy", href: "/legal/privacy-policy" },
    { name: "Terms", href: "/legal/terms-and-conditions" },
    { name: "Cookies", href: "/legal/cookies-policy" },
    { name: "DPA", href: "/legal/dpa" },
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
      <div className="container px-4 pt-12 pb-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Logo showSpan={false} />
              <span className="ml-2 text-xl font-semibold dark:text-white">
                ECODrIx
              </span>
            </Link>
            <p className="max-w-xs text-gray-500 dark:text-gray-400">
              Building the future of digital experiences with innovative
              solutions.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-4">
              <h4 className="text-sm font-medium dark:text-gray-200 mb-2">
                Subscribe to our newsletter
              </h4>
              <form className="flex items-center gap-2 w-full">
                <Input
                  size={isMobile ? "sm" : "md"}
                  type="email"
                  placeholder="Your email"
                  required
                />
                <Button
                  variant="primary"
                  size={isMobile ? "sm" : "md"}
                  type="submit"
                  className="focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wider uppercase dark:text-gray-200">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={`text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors ${
                          link.highlight
                            ? "font-medium text-primary-600 dark:text-primary-400"
                            : ""
                        }`}
                      >
                        {link.name}
                        {link.external && (
                          <span className="ml-1 inline-block">
                            <Icons.external className="w-3 h-3" />
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="pt-2 mt-4 border-t border-gray-100 dark:border-gray-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-3 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} <strong>ECODrIx</strong>. All rights reserved.
          </p>

          <div className="flex items-center flex-col sm:flex-row justify-between sm:w-full  md:w-1/2 gap-3">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                  aria-label={social.name}
                  style={{
                    color: social.lightColor,
                    // You could add dark mode specific colors if needed
                  }}
                >
                  {social.icon === "twitter" && (
                    <Icons.twitter className="w-4 h-4" />
                  )}
                  {social.icon === "github" && (
                    <Icons.github className="w-4 h-4" />
                  )}
                  {social.icon === "linkedin" && (
                    <Icons.linkedin className="w-4 h-4" />
                  )}
                  {social.icon === "discord" && (
                    <Icons.discord className="w-4 h-4" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
