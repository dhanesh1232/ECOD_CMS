"use client";
import { FiHelpCircle, FiSearch, FiChevronRight } from "react-icons/fi";

export default function HelpCenterPage() {
  const categories = [
    {
      id: 1,
      name: "Getting Started",
      articles: [
        { id: 101, title: "Creating your first chatbot" },
        { id: 102, title: "Connecting channels" },
        { id: 103, title: "Basic setup guide" },
      ],
    },
    {
      id: 2,
      name: "Automations",
      articles: [
        { id: 201, title: "Building your first flow" },
        { id: 202, title: "Using triggers and actions" },
        { id: 203, title: "Advanced automation tips" },
      ],
    },
    {
      id: 3,
      name: "Integrations",
      articles: [
        { id: 301, title: "Connecting to Facebook" },
        { id: 302, title: "Zapier integration guide" },
        { id: 303, title: "API documentation" },
      ],
    },
    {
      id: 4,
      name: "Billing",
      articles: [
        { id: 401, title: "Managing your subscription" },
        { id: 402, title: "Understanding invoices" },
        { id: 403, title: "Upgrading your plan" },
      ],
    },
  ];

  const popularArticles = [
    { id: 501, title: "How to reset your password" },
    { id: 502, title: "Troubleshooting connection issues" },
    { id: 503, title: "Best practices for chatbot design" },
    { id: 504, title: "Exporting your data" },
    { id: 505, title: "Managing team members" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiHelpCircle className="mr-2" /> Help Center
      </h1>

      {/* Search */}
      <div className="relative mb-8">
        <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search help articles..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Popular Articles */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Popular Articles</h2>
        <div className="bg-white rounded-lg shadow divide-y">
          {popularArticles.map((article) => (
            <div
              key={article.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <p>{article.title}</p>
                <FiChevronRight className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-4 border-b">
              <h3 className="font-medium">{category.name}</h3>
            </div>
            <div className="divide-y">
              {category.articles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <p>{article.title}</p>
                    <FiChevronRight className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-medium mb-2">Still need help?</h2>
        <p className="text-gray-600 mb-4">
          Our support team is here to assist you
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Contact Support
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
}
