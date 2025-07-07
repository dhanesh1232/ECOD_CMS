"use client";
import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiClock,
} from "react-icons/fi";

const CancellationRefundPolicy = () => {
  const [openSection, setOpenSection] = useState({
    subscription: true,
    cancellation: false,
    refund: false,
    special: false,
    contact: false,
  });

  const toggleSection = (section) => {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Cancellation & Refund Policy
              </h1>
              <p className="text-indigo-100">
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
              Download Policy <FiExternalLink className="ml-2" />
            </button>*/}
          </div>
        </div>

        {/* Introduction */}
        <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300">
            This policy outlines the terms for canceling your subscription and
            requesting refunds for our services. Please read it carefully before
            making any purchase decisions.
          </p>
        </div>

        {/* Main Content */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Subscription Plans */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("subscription")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                1. Subscription Plans
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.subscription ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.subscription && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-4">
                  <p className="dark:text-gray-300 font-medium">
                    Our platform offers flexible subscription options:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 dark:text-gray-300">
                    <li>
                      <strong>Monthly plans</strong> - billed every 30 days with
                      no long-term commitment
                    </li>
                    <li>
                      <strong>Annual plans</strong> - billed every 365 days with
                      a{" "}
                      <span className="text-green-600 dark:text-green-400">
                        15% discount
                      </span>{" "}
                      compared to monthly billing
                    </li>
                    <li>
                      <strong>Enterprise plans</strong> - custom billing cycles
                      with volume discounts
                    </li>
                  </ul>
                </div>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    <strong>All subscriptions auto-renew</strong> until canceled
                    by the user. You will receive a reminder email 7 days before
                    each renewal.
                  </p>
                  <p>
                    <strong>Trial periods:</strong> Some plans may include a
                    free trial. Your subscription will automatically convert to
                    a paid plan at the end of the trial unless canceled.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cancellation Policy */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("cancellation")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                2. Cancellation Policy
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
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
                <div className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-r-lg">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    2.1 How to Cancel
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    You may cancel your subscription at any time through these
                    methods:
                  </p>
                  <ol className="list-decimal pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>
                      <strong>Online:</strong> Log into your account dashboard,
                      navigate to{" "}
                      <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm">
                        Billing → Subscription
                      </span>
                      , and follow the cancellation prompts
                    </li>
                    <li>
                      <strong>Email:</strong> Send a cancellation request to{" "}
                      <a
                        href="mailto:support@ecodrix.com"
                        className="text-indigo-600 dark:text-indigo-400 underline"
                      >
                        support@ecodrix.com
                      </a>{" "}
                      from your registered email address
                    </li>
                    <li>
                      <strong>Phone:</strong> Call our support line at{" "}
                      <a
                        href="tel:+918143963821"
                        className="text-indigo-600 dark:text-indigo-400 underline"
                      >
                        +91 8143963821
                      </a>{" "}
                      during business hours
                    </li>
                  </ol>
                </div>

                <div className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-r-lg">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    2.2 Cancellation Effects
                  </h3>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>
                      <strong>Service continuity:</strong> Paid features remain
                      accessible until the end of your current billing period
                    </li>
                    <li>
                      <strong>No prorated refunds:</strong>{" "}
                      {`We don't provide
                      partial refunds for unused time in your billing cycle`}
                    </li>
                    <li>
                      <strong>Auto-renewal:</strong> Future payments will be
                      stopped immediately
                    </li>
                    <li>
                      <strong>Data retention:</strong> Your data will be
                      preserved for 30 days after cancellation in case you wish
                      to reactivate
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Important Notes
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      Cancellation requests must be received at least{" "}
                      <strong>48 hours</strong> before your next billing date to
                      prevent auto-renewal
                    </li>
                    <li>
                      We recommend taking screenshots of your cancellation
                      confirmation for your records
                    </li>
                    <li>
                      {`If you cancel during a free trial, you won't be charged
                      when the trial ends`}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Refund Policy */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("refund")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                3. Refund Policy
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.refund ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.refund && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-6">
                <div className="p-4 rounded-lg border border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-2">
                      ✓
                    </span>
                    Eligible Refund Scenarios
                  </h3>
                  <ul className="list-disc pl-10 mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>
                      <strong>Technical failures:</strong> When our platform is
                      substantially non-functional for more than 24 hours
                    </li>
                    <li>
                      <strong>Duplicate charges:</strong> Verified cases where
                      you were charged multiple times for the same service
                    </li>
                    <li>
                      <strong>Annual plans:</strong> Canceled within{" "}
                      <strong>14 days</strong> of initial purchase (excluding
                      partial months)
                    </li>
                    <li>
                      <strong>Unauthorized charges:</strong> If your account was
                      charged without your authorization
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-red-200 dark:border-red-700/50 bg-red-50 dark:bg-red-900/20">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center mr-2">
                      ✗
                    </span>
                    Non-Refundable Situations
                  </h3>
                  <ul className="list-disc pl-10 mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>
                      <strong>Partial usage:</strong> Unused portions of
                      monthly/annual plans
                    </li>
                    <li>
                      <strong>Change of mind:</strong> After subscription has
                      been active
                    </li>
                    <li>
                      <strong>Feature limitations:</strong> If the service works
                      {`as described but doesn't meet your expectations`}
                    </li>
                    <li>
                      <strong>Failure to cancel:</strong> Before auto-renewal
                      occurs
                    </li>
                    <li>
                      <strong>Promotional discounts:</strong> Special offers
                      {`with explicit "no refund" terms`}
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    Refund Request Process
                  </h3>
                  <ol className="list-decimal pl-6 mt-3 space-y-3 text-gray-600 dark:text-gray-300">
                    <li>
                      <strong>Submit request:</strong> Email{" "}
                      <a
                        href="mailto:billing@ecodrix.com"
                        className="text-indigo-600 dark:text-indigo-400 underline"
                      >
                        billing@ecodrix.com
                      </a>{" "}
                      within <strong>30 days</strong> of the charge
                    </li>
                    <li>
                      <strong>Include:</strong>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>Your account email address</li>
                        <li>Transaction ID or receipt</li>
                        <li>Detailed reason for the request</li>
                        <li>Any supporting documentation</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Review period:</strong> Our team will evaluate
                      within <strong>5 business days</strong>
                    </li>
                    <li>
                      <strong>Processing:</strong> Approved refunds will be
                      issued via original payment method within{" "}
                      <strong>14 days</strong>
                    </li>
                    <li>
                      <strong>Notification:</strong>{" "}
                      {`You'll receive email
                      confirmation when the refund is processed`}
                    </li>
                  </ol>
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Note:</strong> Refunds to credit cards may take
                      5-10 additional business days to appear on your statement,
                      depending on your financial institution.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Special Circumstances */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("special")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                4. Special Circumstances
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.special ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.special && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Plan Downgrades
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Switching to a lower plan takes effect at the next billing
                      cycle. No credits are provided for the current billing
                      period.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Account Deletion
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {`Deleting your account automatically cancels any active
                      subscription but doesn't qualify for a refund of the
                      current billing period.`}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Service Termination
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {`If we discontinue a service you're subscribed to, you'll
                      receive a prorated refund for the remaining unused period.`}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Payment Disputes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Unauthorized charge disputes may result in immediate
                      account suspension. Please contact us first to resolve
                      billing issues.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700/50">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Enterprise Contracts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Customers with enterprise agreements may have different
                    terms specified in their contract.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Minimum contract periods may apply</li>
                    <li>Early termination fees may be specified</li>
                    <li>Custom refund terms may be negotiated</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <button
              className="w-full p-5 sm:p-6 text-left flex justify-between items-center"
              onClick={() => toggleSection("contact")}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                5. Contact & Support
              </h2>
              <span className="text-gray-400 ml-4">
                {openSection.contact ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {openSection.contact && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    For billing inquiries or refund requests:
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-3">
                        <FiMail className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </p>
                        <a
                          href="mailto:support@ecodrix.com"
                          className="text-indigo-600 dark:text-indigo-400 underline"
                        >
                          support@ecodrix.com
                        </a>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          For general inquiries
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-3">
                        <FiMail className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Refunds
                        </p>
                        <a
                          href="mailto:billing@ecodrix.com"
                          className="text-indigo-600 dark:text-indigo-400 underline"
                        >
                          billing@ecodrix.com
                        </a>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          For refund requests only
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-3">
                        <FiPhone className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
                      </div>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Mon-Fri, 9AM-6PM IST
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full mr-3">
                        <FiClock className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Response Time
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Within 2 business days
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Urgent issues marked as such may receive faster
                          response
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Mailing Address
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      ECODrIx
                      <br />
                      Attn: Billing Department
                      <br />
                      Tirupati, Andhra Pradesh - 517501
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/20">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Policy Updates
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {`We may update this policy periodically. The "Last Updated" date at the top of this page indicates when the policy was last revised. Your continued use of our services after changes constitutes acceptance of the updated terms.`}
          </p>
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Note:</strong> This policy is governed by and construed in
              accordance with the laws of India. Any disputes relating to this
              policy shall be subject to the exclusive jurisdiction of the
              courts in Tirupati, Andhra Pradesh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
