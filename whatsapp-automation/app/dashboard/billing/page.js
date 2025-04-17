"use client";

import { useState } from "react";
import { FiCreditCard, FiCheck, FiX, FiPlus } from "react-icons/fi";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("plan");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiCreditCard className="mr-2" /> Billing
      </h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "plan"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("plan")}
        >
          Plan & Usage
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "invoices"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("invoices")}
        >
          Invoices
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "payment"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Payment Methods
        </button>
      </div>

      {/* Current Plan */}
      {activeTab === "plan" && (
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-6 border-b">
              <h2 className="font-medium text-lg">Current Plan</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">Professional</h3>
                  <p className="text-gray-500">$49/month</p>
                </div>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  Change Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Active Bots</h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-2">3</span>
                    <span className="text-gray-500">/ 5 included</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Conversations</h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-2">1,245</span>
                    <span className="text-gray-500">/ 2,000 included</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Automation Runs</h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold mr-2">3,456</span>
                    <span className="text-gray-500">/ 5,000 included</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Next Billing Date</h4>
                <p>
                  Your next payment of $49.00 will be processed on{" "}
                  <strong>June 15, 2023</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Upgrade Options */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="font-medium text-lg">Upgrade Options</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PlanCard
                  name="Starter"
                  price="$19"
                  period="month"
                  features={["3 Bots", "1,000 conversations", "Basic support"]}
                  current={false}
                />
                <PlanCard
                  name="Professional"
                  price="$49"
                  period="month"
                  features={[
                    "5 Bots",
                    "2,000 conversations",
                    "Priority support",
                    "Basic analytics",
                  ]}
                  current={true}
                />
                <PlanCard
                  name="Enterprise"
                  price="$99"
                  period="month"
                  features={[
                    "Unlimited Bots",
                    "5,000 conversations",
                    "24/7 support",
                    "Advanced analytics",
                    "API access",
                  ]}
                  current={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices */}
      {activeTab === "invoices" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="font-medium text-lg">Invoice History</h2>
          </div>
          <div className="divide-y">
            {[
              {
                id: "INV-2023-05",
                date: "May 15, 2023",
                amount: "$49.00",
                status: "Paid",
              },
              {
                id: "INV-2023-04",
                date: "Apr 15, 2023",
                amount: "$49.00",
                status: "Paid",
              },
              {
                id: "INV-2023-03",
                date: "Mar 15, 2023",
                amount: "$49.00",
                status: "Paid",
              },
              {
                id: "INV-2023-02",
                date: "Feb 15, 2023",
                amount: "$49.00",
                status: "Paid",
              },
              {
                id: "INV-2023-01",
                date: "Jan 15, 2023",
                amount: "$49.00",
                status: "Paid",
              },
            ].map((invoice) => (
              <div
                key={invoice.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{invoice.amount}</p>
                  <p
                    className={`text-sm ${
                      invoice.status === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {invoice.status}
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Methods */}
      {activeTab === "payment" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="font-medium text-lg">Payment Methods</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium mb-4">Current Payment Method</h3>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-full mr-4">
                    <FiCreditCard size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 04/2025</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Update
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Add New Payment Method</h3>
              <div className="border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PlanCard = ({ name, price, period, features, current }) => (
  <div
    className={`border rounded-lg p-6 ${
      current ? "border-blue-600 bg-blue-50" : "hover:border-blue-300"
    }`}
  >
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <p className="text-3xl font-bold mb-4">
      {price}
      <span className="text-lg font-normal text-gray-500">/{period}</span>
    </p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <FiCheck className="mr-2 text-green-500" />
          {feature}
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-2 rounded-lg font-medium ${
        current
          ? "bg-blue-600 text-white"
          : "border border-blue-600 text-blue-600 hover:bg-blue-50"
      }`}
    >
      {current ? "Current Plan" : "Upgrade"}
    </button>
  </div>
);
