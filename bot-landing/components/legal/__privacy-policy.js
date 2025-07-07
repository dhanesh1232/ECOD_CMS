"use client";
import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiLock,
  FiGlobe,
  FiDatabase,
} from "react-icons/fi";

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState({
    introduction: true,
    dataCollection: false,
    dataUse: false,
    thirdParty: false,
    cookies: false,
    retention: false,
    userRights: false,
    security: false,
    international: false,
    contact: false,
    updates: false,
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Privacy Policy
              </h1>
              <p className="text-blue-100">
                Last Updated:{" "}
                <span className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
            {/*<button className="mt-4 sm:mt-0 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm font-medium transition-colors flex items-center">
              Download PDF <FiExternalLink className="ml-2" />
            </button>*/}
          </div>
        </div>

        {/* Introduction */}
        <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Introduction
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  This Privacy Policy governs the use of our multi-channel SaaS
                  chatbot platform {`("Service")`} that integrates with
                  WhatsApp, Instagram, Facebook, and web widgets, including
                  AI-driven features. We are committed to protecting your
                  privacy and handling your data transparently and securely.
                </p>
                <p>
                  By using our Service, you consent to the collection, use, and
                  sharing of your information as described in this policy.
                </p>
                <p className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-700/50">
                  <strong>Important:</strong> This policy explains how we
                  collect, use, and protect your data. Please review carefully
                  to understand your rights and our responsibilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Data Collection */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("dataCollection")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                1. Data We Collect
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.dataCollection ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.dataCollection && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    1.1 Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Directly Provided
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Contact information (name, email, phone)</li>
                        <li>Account credentials</li>
                        <li>Payment details (via processors)</li>
                        <li>Profile information from social platforms</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Automatically Collected
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>IP address and device information</li>
                        <li>Usage data and analytics</li>
                        <li>Cookies and tracking technologies</li>
                        <li>Error logs and diagnostics</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    1.2 Chat Logs and Interactions
                  </h3>
                  <p>
                    We store conversation data from all integrated channels to
                    improve our Service:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="p-4 border rounded-lg border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Message Content
                      </h4>
                      <p className="text-sm">
                        Text, images, files shared through any channel
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Metadata
                      </h4>
                      <p className="text-sm">
                        Timestamps, channel information, device details
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        AI Training Data
                      </h4>
                      <p className="text-sm">
                        Anonymized interactions used to improve responses
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Sensitive Data Notice
                    </h4>
                    <p className="text-sm">
                      We do not intentionally collect sensitive personal data
                      (health, biometrics, etc.). Please avoid sharing such
                      information through the Service.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Use */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("dataUse")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                2. How We Use Your Data
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.dataUse ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.dataUse && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg border-indigo-200 dark:border-indigo-700/50 bg-indigo-50 dark:bg-indigo-900/20">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-lg mr-3">
                          <FiDatabase className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                            Service Operation
                          </h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Provide and maintain chatbot functionality</li>
                            <li>Process transactions and subscriptions</li>
                            <li>Authenticate users across channels</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg border-purple-200 dark:border-purple-700/50 bg-purple-50 dark:bg-purple-900/20">
                      <div className="flex items-start">
                        <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg mr-3">
                          <FiGlobe className="text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                            Improvement & Analytics
                          </h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Train and improve AI models</li>
                            <li>Analyze usage patterns</li>
                            <li>Develop new features</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg mr-3">
                          <FiMail className="text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                            Communication
                          </h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Respond to inquiries</li>
                            <li>Send service notifications</li>
                            <li>Provide customer support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20">
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg mr-3">
                          <FiShield className="text-green-600 dark:text-green-300" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                            Security & Compliance
                          </h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Detect and prevent fraud</li>
                            <li>Comply with legal obligations</li>
                            <li>Enforce our terms and policies</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                      Legal Bases for Processing (GDPR)
                    </h3>
                    <p>
                      For EU users, we process data under the following legal
                      bases:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        <strong>Contractual necessity:</strong> To provide the
                        Services you requested
                      </li>
                      <li>
                        <strong>Legitimate interests:</strong> For service
                        improvement and security
                      </li>
                      <li>
                        <strong>Consent:</strong> Where explicitly requested for
                        specific processing
                      </li>
                      <li>
                        <strong>Legal obligation:</strong> When required by law
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Third Party Services */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("thirdParty")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                3. Third-Party Services
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.thirdParty ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.thirdParty && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p>
                    We integrate with third-party services to provide full
                    functionality. These services have their own privacy
                    policies governing data handling:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                            Provider
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                            Purpose
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data Shared
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Meta Platforms (WhatsApp, Instagram, Facebook)
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Message delivery and channel integration
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Profile data, message content, metadata
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Twilio
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            WhatsApp message processing
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Phone numbers, message content
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Razorpay
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Payment processing
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Payment details, transaction amounts
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            AWS/Google Cloud
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Hosting and data storage
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            All service data
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Analytics Providers
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Usage tracking and metrics
                          </td>
                          <td className="py-3 px-4 text-sm dark:text-gray-400">
                            Anonymized usage data
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Data Processing Agreements
                    </h4>
                    <p className="text-sm">
                      We have Data Processing Agreements (DPAs) with all major
                      vendors to ensure GDPR and other regulatory compliance.
                      These agreements restrict how vendors can process your
                      data.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cookies */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("cookies")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                4. Cookies and Tracking
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.cookies ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.cookies && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Types of Tracking Technologies We Use
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Essential Cookies
                      </h4>
                      <p className="text-sm">
                        Required for core functionality (login, security,
                        preferences)
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Analytics Cookies
                      </h4>
                      <p className="text-sm">
                        Help us understand how users interact with our Service
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Marketing Cookies
                      </h4>
                      <p className="text-sm">
                        Used for advertising and retargeting (where applicable)
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    Managing Your Preferences
                  </h3>
                  <p>
                    You have several options to control tracking technologies:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>
                      Browser settings to block or delete cookies (may affect
                      functionality)
                    </li>
                    <li>
                      Our cookie consent banner (for non-essential cookies)
                    </li>
                    <li>
                      Opt-out links for specific third-party services (e.g.,
                      Google Analytics)
                    </li>
                    <li>
                      Do-Not-Track signals (we respond to browser DNT settings)
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Cookie Duration
                    </h4>
                    <p className="text-sm">
                      Session cookies expire when you close your browser.
                      Persistent cookies remain for up to 2 years unless deleted
                      earlier.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Retention */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("retention")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                5. Data Retention
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.retention ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.retention && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Our Retention Periods
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Account Data
                      </h4>
                      <p className="text-sm">
                        Retained until account deletion request + 30 day grace
                        period
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Chat Logs
                      </h4>
                      <p className="text-sm">
                        Up to 3 years unless required for legal purposes
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Payment Records
                      </h4>
                      <p className="text-sm">
                        7 years as required by financial regulations
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Backups
                      </h4>
                      <p className="text-sm">
                        Encrypted backups retained for up to 6 months
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    Deletion Process
                  </h3>
                  <p>
                    When data is deleted from our systems, we follow secure
                    deletion protocols:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Immediate logical deletion from active systems</li>
                    <li>
                      Physical deletion from backups within the retention period
                    </li>
                    <li>Verification processes to ensure complete erasure</li>
                  </ul>

                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Anonymized Data
                    </h4>
                    <p className="text-sm">
                      Data that has been properly anonymized or aggregated may
                      be retained indefinitely for analytics and research
                      purposes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Rights */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("userRights")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                6. Your Privacy Rights
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.userRights ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.userRights && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg border-indigo-200 dark:border-indigo-700/50 bg-indigo-50 dark:bg-indigo-900/20">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                        GDPR Rights (EU/UK)
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                          <strong>Access:</strong> Request copies of your data
                        </li>
                        <li>
                          <strong>Rectification:</strong> Correct inaccurate
                          data
                        </li>
                        <li>
                          <strong>Erasure:</strong> Request deletion under
                          certain conditions
                        </li>
                        <li>
                          <strong>Restriction:</strong> Limit processing of your
                          data
                        </li>
                        <li>
                          <strong>Portability:</strong> Receive your data in a
                          structured format
                        </li>
                        <li>
                          <strong>Objection:</strong> Object to certain
                          processing activities
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-purple-200 dark:border-purple-700/50 bg-purple-50 dark:bg-purple-900/20">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                        CCPA Rights (California)
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                          <strong>Know:</strong> What personal information is
                          collected
                        </li>
                        <li>
                          <strong>Delete:</strong> Request deletion of personal
                          information
                        </li>
                        <li>
                          <strong>Opt-out:</strong> Of sale of personal
                          information
                        </li>
                        <li>
                          <strong>Non-discrimination:</strong> For exercising
                          your rights
                        </li>
                        <li>
                          <strong>Correct:</strong> Inaccurate personal
                          information
                        </li>
                        <li>
                          <strong>Limit:</strong> Use of sensitive personal
                          information
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    Exercising Your Rights
                  </h3>
                  <p>
                    To exercise any of these rights, please contact us using the
                    information in Section 10. We may need to verify your
                    identity before processing requests.
                  </p>

                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Response Timeframes
                    </h4>
                    <p className="text-sm">
                      We respond to all legitimate requests within 30 days
                      (GDPR) or 45 days (CCPA). Complex requests may require
                      additional time as permitted by law.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Security */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("security")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                7. Data Security
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.security ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.security && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Our Security Measures
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg mr-3">
                          <FiLock className="text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                            Encryption
                          </h4>
                          <p className="text-sm">
                            End-to-end encryption for message transmission,
                            AES-256 encryption at rest
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20">
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg mr-3">
                          <FiShield className="text-green-600 dark:text-green-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                            Access Controls
                          </h4>
                          <p className="text-sm">
                            Role-based access, multi-factor authentication,
                            least-privilege principles
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg border-purple-200 dark:border-purple-700/50 bg-purple-50 dark:bg-purple-900/20">
                      <div className="flex items-start">
                        <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg mr-3">
                          <FiDatabase className="text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                            Infrastructure Security
                          </h4>
                          <p className="text-sm">
                            Regular patching, network segmentation, DDoS
                            protection, intrusion detection
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg border-orange-200 dark:border-orange-700/50 bg-orange-50 dark:bg-orange-900/20">
                      <div className="flex items-start">
                        <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-lg mr-3">
                          <FiGlobe className="text-orange-600 dark:text-orange-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                            Personnel Training
                          </h4>
                          <p className="text-sm">
                            Security awareness training, background checks,
                            confidentiality agreements
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    Security Certifications
                  </h3>
                  <p>
                    We maintain the following security certifications and
                    compliance standards:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">
                      SOC 2 Type II
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">
                      ISO 27001
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">
                      GDPR Compliance
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full">
                      CCPA Compliance
                    </span>
                  </div>

                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Breach Notification
                    </h4>
                    <p className="text-sm">
                      In the event of a data breach affecting your personal
                      information, we will notify you and relevant authorities
                      as required by applicable law (typically within 72 hours
                      for GDPR).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* International Transfers */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("international")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                8. International Data Transfers
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.international ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.international && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Global Data Processing
                  </h3>
                  <p>
                    As a global service, your data may be transferred to and
                    processed in countries outside your jurisdiction, including
                    the United States and India. We ensure such transfers comply
                    with applicable laws through:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>
                      EU Standard Contractual Clauses (SCCs) for transfers from
                      the EEA/UK
                    </li>
                    <li>
                      Adequacy decisions for transfers to countries with
                      recognized data protection standards
                    </li>
                    <li>Additional safeguards where required by local laws</li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    Data Localization
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        EU/UK Data
                      </h4>
                      <p className="text-sm">
                        Processed in EU-based data centers whenever possible,
                        with SCCs for any extra-EEA transfers
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Other Regions
                      </h4>
                      <p className="text-sm">
                        Processed in geographically proximate data centers to
                        optimize performance while maintaining protections
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Your Rights Regarding Transfers
                    </h4>
                    <p className="text-sm">
                      You may request information about the specific safeguards
                      applied to your data when transferred internationally by
                      contacting our Data Protection Officer.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-700/20">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              9. Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Privacy Inquiries
                </h3>
                <div className="flex items-start mb-3">
                  <FiMail className="text-indigo-600 dark:text-indigo-400 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </p>
                    <a
                      href="mailto:privacy@ecodrix.com"
                      className="text-indigo-600 dark:text-indigo-400 underline"
                    >
                      privacy@ecodrix.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <FiPhone className="text-indigo-600 dark:text-indigo-400 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Phone
                    </p>
                    <a
                      href="tel:+918143963821"
                      className="text-indigo-600 dark:text-indigo-400 underline"
                    >
                      +91 8143963821
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiMapPin className="text-indigo-600 dark:text-indigo-400 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Mailing Address
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      ECODrIx
                      <br />
                      Tirupati, Andhra Pradesh - 517501
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Data Protection Officer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  For GDPR-specific inquiries or to exercise your data
                  protection rights:
                </p>
                <a
                  href="mailto:dpo@ecodrix.com"
                  className="text-indigo-600 dark:text-indigo-400 underline"
                >
                  dpo@ecodrix.com
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Our DPO responds to all legitimate requests within 30 days as
                  required by GDPR.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("updates")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                10. Policy Updates
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.updates ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.updates && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Notification of Changes
                  </h3>
                  <p>
                    {`We may update this policy periodically to reflect changes in
                    our practices, services, or legal requirements. When we make
                    material changes, we'll notify you through:`}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>In-service notifications or banners</li>
                    <li>Email to your registered address</li>
                    <li>{`Updates to the "Last Updated" date`}</li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    Your Acceptance
                  </h3>
                  <p>
                    {`Your continued use of the Service after changes become
                    effective constitutes acceptance of the updated policy. If
                    you don't agree to the changes, you must stop using the
                    Service.`}
                  </p>

                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Archive of Previous Versions
                    </h4>
                    <p className="text-sm">
                      Previous versions of this policy are available upon
                      request. Significant historical versions are maintained
                      for compliance purposes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ECODrIx. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
