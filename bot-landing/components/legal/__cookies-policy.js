"use client";
import { useState } from "react";

const CookiePolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-800/50 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Cookie Policy
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Last Updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {`This Cookie Policy explains how our SaaS chatbot platform ("we", "us",
          or "our") uses cookies and similar tracking technologies when you
          visit our website or use our services.`}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          By using our platform, you consent to the use of cookies in accordance
          with this policy. You can manage your preferences at any time as
          explained below.
        </p>
      </div>

      {/* What are Cookies */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
        <button
          className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
          onClick={() => toggleSection("whatAreCookies")}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            What are Cookies?
          </h2>
          <span className="text-gray-500 dark:text-gray-400">
            {openSection === "whatAreCookies" ? "−" : "+"}
          </span>
        </button>
        {openSection === "whatAreCookies" && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile) when you visit websites. They are
              widely used to make websites work more efficiently and to provide
              information to website owners.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We use both session cookies (which expire when you close your
              browser) and persistent cookies (which remain on your device for a
              set period or until deleted).
            </p>
          </div>
        )}
      </div>

      {/* Types of Cookies We Use */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
        <button
          className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
          onClick={() => toggleSection("typesOfCookies")}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Types of Cookies We Use
          </h2>
          <span className="text-gray-500 dark:text-gray-400">
            {openSection === "typesOfCookies" ? "−" : "+"}
          </span>
        </button>
        {openSection === "typesOfCookies" && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                1. Essential Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These cookies are necessary for the website to function and
                cannot be switched off. They are usually set in response to
                actions made by you such as logging in or filling in forms.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Authentication cookies to keep you logged in</li>
                <li>
                  Security cookies to protect against malicious activities
                </li>
                <li>Load balancing cookies for performance</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                2. Functional Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These enable the website to provide enhanced functionality and
                personalization. They may be set by us or by third-party
                providers whose services we have added to our pages.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Language preference cookies</li>
                <li>Chatbot conversation history cookies</li>
                <li>User interface customization cookies</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                3. Analytics Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our site. They help
                us know which pages are popular and how visitors move around the
                site.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Google Analytics cookies (_ga, _gid, _gat)</li>
                <li>Hotjar cookies for user behavior analysis</li>
                <li>Amplitude cookies for product analytics</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                4. Marketing Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These cookies are used to track visitors across websites. The
                intention is to display ads that are relevant and engaging for
                the individual user.
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Facebook Pixel cookies</li>
                <li>LinkedIn Insight Tag cookies</li>
                <li>Google Ads conversion tracking cookies</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Third-Party Cookies */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
        <button
          className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
          onClick={() => toggleSection("thirdPartyCookies")}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Third-Party Cookies
          </h2>
          <span className="text-gray-500 dark:text-gray-400">
            {openSection === "thirdPartyCookies" ? "−" : "+"}
          </span>
        </button>
        {openSection === "thirdPartyCookies" && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use several third-party services that may set cookies on your
              device. Here are the main third-party cookies you might encounter:
            </p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Google Analytics
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Used to analyze website traffic and user behavior. Cookies
                include _ga, _gid, and _gat.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Facebook Pixel
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Used for tracking conversions from Facebook ads, optimizing ads,
                and building targeted audiences.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Intercom
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Used for customer support and live chat functionality. Cookies
                include intercom-id and intercom-session.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Stripe
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Used for payment processing when you subscribe to our services.
                Cookies include __stripe_mid and __stripe_sid.
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">
              For more information about these third-party cookies, please refer
              to their respective privacy policies.
            </p>
          </div>
        )}
      </div>

      {/* Managing Cookies */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
        <button
          className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
          onClick={() => toggleSection("managingCookies")}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Managing Your Cookie Preferences
          </h2>
          <span className="text-gray-500 dark:text-gray-400">
            {openSection === "managingCookies" ? "−" : "+"}
          </span>
        </button>
        {openSection === "managingCookies" && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Browser Settings
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can control and/or delete cookies as you wish through your
                browser settings. You can delete all cookies that are already on
                your device and set most browsers to prevent them from being
                placed.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {`Here's how to manage cookies in popular browsers:`}
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Apple Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Note that if you disable cookies entirely, some features of our
                platform may not function properly.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Consent Management
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {`When you first visit our website, you'll see a cookie consent
                banner where you can choose which types of cookies to accept.
                You can change these preferences at any time by clicking the
                "Cookie Settings" link in the footer of our website.`}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We use a consent management platform to honor your choices and
                ensure compliance with privacy regulations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Opt-Out Tools
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For third-party cookies used for advertising and analytics, you
                can opt out through these services:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/ads/preferences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Facebook Ad Preferences
                  </a>
                </li>
                <li>
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Digital Advertising Alliance Opt-Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Compliance with Regulations */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
        <button
          className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
          onClick={() => toggleSection("compliance")}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Compliance with Privacy Regulations
          </h2>
          <span className="text-gray-500 dark:text-gray-400">
            {openSection === "compliance" ? "−" : "+"}
          </span>
        </button>
        {openSection === "compliance" && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                General Data Protection Regulation (GDPR)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For users in the European Economic Area (EEA), we comply with
                the GDPR requirements regarding cookies and tracking
                technologies. This includes:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>
                  Obtaining explicit consent before setting non-essential
                  cookies
                </li>
                <li>Providing clear information about cookie usage</li>
                <li>Making it easy for users to withdraw consent</li>
                <li>Documenting and storing consent records</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Under GDPR, you have the right to access, rectify, or erase your
                personal data. Contact us at privacy@ourplatform.com to exercise
                these rights.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                California Consumer Privacy Act (CCPA)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For California residents, we comply with CCPA requirements
                regarding cookies that collect personal information. This
                includes:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>Disclosing data collection practices</li>
                <li>
                  Providing the right to opt-out of the sale of personal
                  information
                </li>
                <li>
                  Offering the right to access and delete personal information
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                {`California residents can opt-out of the sale of their personal
                information by clicking the "Do Not Sell My Personal
                Information" link in our website footer.`}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Other Regulations
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {`We monitor and adapt our cookie practices to comply with other
                applicable privacy laws such as the ePrivacy Directive, Brazil's
                LGPD, and others as they come into effect.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Changes to This Policy */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
        <button
          className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
          onClick={() => toggleSection("changes")}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Changes to This Cookie Policy
          </h2>
          <span className="text-gray-500 dark:text-gray-400">
            {openSection === "changes" ? "−" : "+"}
          </span>
        </button>
        {openSection === "changes" && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300">
              {`We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the new policy on our website with a new "Last Updated"
              date.`}
            </p>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          If you have any questions about our use of cookies or this Cookie
          Policy, please contact us:
        </p>
        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
          <li>
            Email:{" "}
            <a
              href="mailto:privacy@ecodrix.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              privacy@ecodrix.com
            </a>
          </li>
          <li>Mailing Address: Tirupati</li>
          <li>
            Data Protection Officer:{" "}
            <a
              href="mailto:dpo@ecodrix.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              dpo@ecodrix.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CookiePolicy;
