"use client";
import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const TermsAndConditions = () => {
  const [openSection, setOpenSection] = useState({
    introduction: true,
    eligibility: false,
    security: false,
    acceptableUse: false,
    payments: false,
    cancellation: false,
    availability: false,
    ip: false,
    law: false,
    general: false,
    changes: false,
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
                Terms and Conditions
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
                  {`These Terms and Conditions ("Terms") govern your access to and
                  use of ECODrIx's SaaS Chatbot Platform ("Platform"), including
                  all associated services, features, content, and applications
                  (collectively, the "Services").`}
                </p>
                <p>
                  By accessing or using our Platform, you agree to be bound by
                  these Terms and our Privacy Policy. If you are using the
                  Platform on behalf of an organization, you are agreeing to
                  these Terms for that organization and representing that you
                  have authority to bind that organization.
                </p>
                <p className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-700/50">
                  <strong>Important:</strong> These Terms contain provisions
                  that limit our liability and require individual arbitration
                  for disputes. Please review carefully.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Eligibility */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("eligibility")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                1. Eligibility and Account Registration
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.eligibility ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.eligibility && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    1.1 Eligibility Requirements
                  </h3>
                  <p>To use our Platform, you must:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Be at least 18 years old or the age of majority in your
                      jurisdiction
                    </li>
                    <li>
                      Have the legal capacity to enter into binding contracts
                    </li>
                    <li>
                      Not be barred from receiving services under applicable
                      laws
                    </li>
                    <li>
                      Not be a competitor of ECODrIx or using the Platform for
                      competitive analysis
                    </li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    1.2 Account Registration
                  </h3>
                  <p>
                    To access certain features, you must register for an account
                    by providing:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A valid email address</li>
                    <li>Accurate and complete registration information</li>
                    <li>Any other information requested during onboarding</li>
                  </ul>
                  <p>
                    You agree to maintain and promptly update your account
                    information to keep it current and complete.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    1.3 Account Types
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Free Accounts
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>Basic functionality only</li>
                        <li>Limited message volume</li>
                        <li>ECODrIx branding</li>
                        <li>Community support</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Paid Accounts
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>Full feature access</li>
                        <li>Higher message limits</li>
                        <li>White-label options</li>
                        <li>Priority support</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Enterprise Accounts
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>Custom contracts</li>
                        <li>Dedicated infrastructure</li>
                        <li>SLA guarantees</li>
                        <li>24/7 support</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Verification Requirements
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      For certain high-volume or commercial use cases, we may
                      require:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>Business registration documents</li>
                      <li>Identity verification</li>
                      <li>Payment method verification</li>
                      <li>Additional compliance documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account Security */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("security")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                2. Account Security and Access
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
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    2.1 Security Responsibilities
                  </h3>
                  <p>You are responsible for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Maintaining the confidentiality of your login credentials
                    </li>
                    <li>All activities that occur under your account</li>
                    <li>
                      Implementing appropriate security measures for your
                      systems
                    </li>
                    <li>Promptly notifying us of any unauthorized access</li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    2.2 Security Features
                  </h3>
                  <p>
                    We provide several security features to help protect your
                    account:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Available for all accounts. We strongly recommend
                        enabling this additional security layer.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Login Notifications
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Receive alerts for new logins from unrecognized devices
                        or locations.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Session Management
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        View and control active sessions, with ability to
                        remotely log out devices.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        API Key Rotation
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Regularly rotate API keys and implement IP restrictions
                        where possible.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Security Violations
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We reserve the right to immediately suspend accounts
                      involved in:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>Brute force attacks</li>
                      <li>Credential stuffing attempts</li>
                      <li>Distributed denial of service (DDoS) activity</li>
                      <li>
                        Any other activity that threatens platform security
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Acceptable Use */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("acceptableUse")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                3. Acceptable Use Policy
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.acceptableUse ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.acceptableUse && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p>
                    Your use of the Platform must comply with all applicable
                    laws and regulations. You agree not to engage in any of the
                    following prohibited activities:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg border-red-200 dark:border-red-700/50 bg-red-50 dark:bg-red-900/20">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                        Illegal Activities
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Violating any applicable laws or regulations</li>
                        <li>Facilitating illegal transactions</li>
                        <li>Promoting illegal substances or activities</li>
                        <li>Engaging in fraud or money laundering</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-red-200 dark:border-red-700/50 bg-red-50 dark:bg-red-900/20">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                        Harmful Content
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Creating or distributing malware or viruses</li>
                        <li>Phishing or social engineering attempts</li>
                        <li>Hate speech or discriminatory content</li>
                        <li>Extreme violence or graphic content</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-orange-200 dark:border-orange-700/50 bg-orange-50 dark:bg-orange-900/20">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                        Platform Abuse
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Reverse engineering or decompiling</li>
                        <li>
                          Creating multiple accounts to bypass restrictions
                        </li>
                        <li>Overloading system resources</li>
                        <li>Scraping or harvesting data without permission</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-orange-200 dark:border-orange-700/50 bg-orange-50 dark:bg-orange-900/20">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                        Commercial Restrictions
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                          Reselling or white-labeling without authorization
                        </li>
                        <li>Using free accounts for commercial purposes</li>
                        <li>Violating third-party terms of service</li>
                        <li>Impersonating other businesses or individuals</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                      Industry-Specific Restrictions
                    </h3>
                    <p className="text-sm mb-3">
                      Certain industries have additional usage restrictions:
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-sm text-gray-800 dark:text-white mb-1">
                          Healthcare
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Must comply with HIPAA and patient privacy laws
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-sm text-gray-800 dark:text-white mb-1">
                          Finance
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Subject to FINRA, SEC, and other financial regulations
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-sm text-gray-800 dark:text-white mb-1">
                          Gambling
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Prohibited in many jurisdictions
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                      Enforcement
                    </h3>
                    <p>
                      We reserve the right to investigate violations and may:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Remove or disable access to violating content</li>
                      <li>Suspend or terminate accounts without refund</li>
                      <li>Report illegal activity to law enforcement</li>
                      <li>Cooperate with legal investigations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payments */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("payments")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                4. Payments and Billing
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.payments ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.payments && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    4.1 Subscription Plans
                  </h3>
                  <p>
                    We offer several subscription tiers with different features
                    and pricing:
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Starter
                      </h4>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        $10.99
                        <span className="text-sm font-normal text-gray-500">
                          /month
                        </span>
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>1,000 messages/month</li>
                        <li>Basic integrations</li>
                        <li>Email support</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-indigo-300 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Professional
                      </h4>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        $29.99
                        <span className="text-sm font-normal text-gray-500">
                          /month
                        </span>
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>10,000 messages/month</li>
                        <li>Advanced integrations</li>
                        <li>Priority support</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-green-300 dark:border-green-500 bg-green-50 dark:bg-green-900/30">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Growth
                      </h4>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        $59.99
                        <span className="text-sm font-normal text-gray-500">
                          /month
                        </span>
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>25,000 messages/month</li>
                        <li>Advanced integrations</li>
                        <li>Priority support</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Enterprise
                      </h4>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        $230
                        <span className="text-sm font-normal text-gray-500">
                          /month
                        </span>
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Unlimited messages</li>
                        <li>Dedicated infrastructure</li>
                        <li>24/7 support</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    4.2 Payment Terms
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payment Methods
                      </h4>
                      <p className="text-sm">
                        We accept all major credit cards (Visa, Mastercard,
                        American Express) and PayPal. Enterprise customers may
                        qualify for invoice billing.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Billing Cycle
                      </h4>
                      <p className="text-sm">
                        Subscriptions renew automatically on monthly or annual
                        basis. You will be charged the then-current rate for
                        your plan.
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    4.3 Taxes
                  </h3>
                  <p>
                    All fees are exclusive of taxes. You are responsible for
                    paying all applicable sales, use, VAT, GST, or other taxes
                    associated with your subscription, except for taxes on our
                    net income.
                  </p>

                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Price Changes
                    </h4>
                    <p className="text-sm">
                      We may change prices with 30 days notice. Existing
                      subscriptions will maintain current pricing until renewal.
                      Continued use after price changes constitutes acceptance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cancellation */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("cancellation")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                5. Cancellation and Termination
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.cancellation ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.cancellation && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    5.1 User Cancellation
                  </h3>
                  <p>
                    You may cancel your subscription at any time through your
                    account settings. Cancellation will take effect at the end
                    of your current billing period.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    5.2 Our Termination Rights
                  </h3>
                  <p>
                    We may suspend or terminate your account immediately if you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Violate these Terms or our Acceptable Use Policy</li>
                    <li>Use the Platform unlawfully or fraudulently</li>
                    <li>Fail to pay fees when due after 5 days notice</li>
                    <li>Create risk or legal exposure for ECODrIx</li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    5.3 Effect of Termination
                  </h3>
                  <p>Upon termination:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Your right to use the Platform ceases immediately</li>
                    <li>
                      We may delete your data after 30 days (except as required
                      by law)
                    </li>
                    <li>
                      No refunds will be provided for partial billing periods
                    </li>
                    <li>
                      You remain liable for all charges incurred prior to
                      termination
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Data Export
                    </h4>
                    <p className="text-sm">
                      Prior to cancellation, you may export your data through
                      our self-service tools. After cancellation, data recovery
                      may be subject to additional fees.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("availability")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                6. Service Availability and Support
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.availability ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.availability && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    6.1 Service Level Agreement (SLA)
                  </h3>
                  <p>
                    We strive to maintain the following service availability:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Standard Plans
                      </h4>
                      <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        99.5%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Monthly uptime guarantee
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-indigo-300 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Growth Plans
                      </h4>
                      <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        99.9%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Monthly uptime guarantee
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg border-green-300 dark:border-green-500 bg-green-50 dark:bg-green-900/30">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Enterprise
                      </h4>
                      <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        99.99%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        With SLA credits
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    6.2 Scheduled Maintenance
                  </h3>
                  <p>
                    We perform regular maintenance which may result in temporary
                    service interruptions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>
                      Routine maintenance: Typically 2 hours monthly, announced
                      72 hours in advance
                    </li>
                    <li>
                      Emergency maintenance: As needed for critical updates or
                      security patches
                    </li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    6.3 Support Services
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Standard Support
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Email support only</li>
                        <li>48 hour response time</li>
                        <li>Business hours (9am-5pm EST)</li>
                        <li>Community forum access</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg border-indigo-300 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                        Priority Support
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>24/7 email and chat</li>
                        <li>4 hour response time</li>
                        <li>Dedicated support engineer</li>
                        <li>Phone support available</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Outage Credits
                    </h4>
                    <p className="text-sm">
                      If we fail to meet our SLA commitments, eligible customers
                      may request service credits according to their contract
                      terms.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Intellectual Property */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("ip")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                7. Intellectual Property Rights
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.ip ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.ip && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    7.1 Our Intellectual Property
                  </h3>
                  <p>ECODrIx owns all rights, title, and interest in and to:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>The Platform and all underlying software</li>
                    <li>Our trademarks, logos, and brand elements</li>
                    <li>
                      Documentation, knowledge bases, and training materials
                    </li>
                    <li>Aggregate usage data and analytics</li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    7.2 Your Content
                  </h3>
                  <p>
                    {`You retain ownership of all content you upload or create
                    using our Platform ("Customer Content"). You grant us a
                    worldwide, non-exclusive license to use, process, and
                    display your Customer Content solely to provide the
                    Services.`}
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    7.3 Feedback
                  </h3>
                  <p>
                    Any feedback, suggestions, or ideas you provide about our
                    Platform may be used by ECODrIx without compensation or
                    attribution.
                  </p>

                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Brand Usage
                    </h4>
                    <p className="text-sm">
                      You may use our name and logos to identify your use of our
                      Platform, subject to our Brand Guidelines. All other uses
                      require written permission.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Governing Law */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("law")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                8. Governing Law and Dispute Resolution
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.law ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.law && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    8.1 Governing Law
                  </h3>
                  <p>
                    These Terms shall be governed by and construed in accordance
                    with the laws of India, without regard to its conflict of
                    law provisions.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    8.2 Dispute Resolution
                  </h3>
                  <p>
                    {`Before filing any claim, you agree to attempt informal
                    resolution by contacting us at legal@ecodrix.com. If we
                    can't resolve the dispute within 60 days, you agree to
                    binding arbitration as follows:`}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Arbitration will be conducted in Tirupati, India</li>
                    <li>Proceedings will be in English</li>
                    <li>Each party bears their own costs</li>
                    <li>Arbitration is confidential</li>
                  </ul>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    8.3 Class Action Waiver
                  </h3>
                  <p>
                    Both parties waive any right to pursue disputes on a class
                    or representative basis. Claims may only be brought in an
                    individual capacity.
                  </p>

                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Exceptions
                    </h4>
                    <p className="text-sm">
                      Either party may bring suit in court for: (1) intellectual
                      property infringement, (2) unauthorized access or use of
                      the Platform, or (3) injunctive relief.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* General */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("general")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                9. General Provisions
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.general ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.general && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    9.1 Entire Agreement
                  </h3>
                  <p>
                    These Terms, along with our Privacy Policy and any
                    supplemental terms, constitute the entire agreement between
                    you and ECODrIx regarding the Platform.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    9.2 Severability
                  </h3>
                  <p>
                    If any provision of these Terms is found unenforceable, the
                    remaining provisions will remain in full effect.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    9.3 No Waiver
                  </h3>
                  <p>
                    Our failure to enforce any right or provision will not be
                    deemed a waiver of future enforcement.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    9.4 Assignment
                  </h3>
                  <p>
                    You may not assign these Terms without our prior written
                    consent. We may assign these Terms in connection with a
                    merger, acquisition, or sale of assets.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    9.5 Independent Contractors
                  </h3>
                  <p>
                    The parties are independent contractors. Nothing in these
                    Terms creates any agency, partnership, or joint venture.
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    9.6 Force Majeure
                  </h3>
                  <p>
                    We are not liable for any failure to perform due to causes
                    beyond our reasonable control, including natural disasters,
                    war, or internet outages.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Changes */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("changes")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                10. Changes to Terms
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.changes ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.changes && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    10.1 Modification Rights
                  </h3>
                  <p>
                    {`We may modify these Terms at any time. When we make material
                    changes, we'll notify you through the Platform or via email
                    at least 30 days before changes take effect.`}
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    10.2 Your Acceptance
                  </h3>
                  <p>
                    {`Continued use of the Platform after changes become effective
                    constitutes acceptance of the revised Terms. If you don't
                    agree to changes, you must stop using the Platform.`}
                  </p>

                  <h3 className="font-medium text-gray-800 dark:text-white mt-6">
                    10.3 Historical Versions
                  </h3>
                  <p>
                    {`Previous versions of these Terms are archived and available
                    upon request. The "Last Updated" date at the top indicates
                    when changes were last made.`}
                  </p>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Material Changes
                    </h4>
                    <p className="text-sm">
                      We consider these types of changes to be material: (1)
                      pricing changes, (2) reduction of your rights, (3)
                      increased liability, or (4) significant feature changes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-700/20">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Legal Notices
                </h3>
                <div className="flex items-start mb-3">
                  <FiMail className="text-indigo-600 dark:text-indigo-400 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </p>
                    <a
                      href="mailto:legal@ecodrix.com"
                      className="text-indigo-600 dark:text-indigo-400 underline"
                    >
                      legal@ecodrix.com
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
                  Customer Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  For account or technical issues, please contact our support
                  team:
                </p>
                <a
                  href="mailto:support@ecodrix.com"
                  className="text-indigo-600 dark:text-indigo-400 underline"
                >
                  support@ecodrix.com
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Response times vary by support plan. Enterprise customers
                  receive priority response.
                </p>
              </div>
            </div>
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

export default TermsAndConditions;
