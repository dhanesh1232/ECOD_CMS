import { useState } from "react";

export default function TemplateManager() {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Welcome Message", category: "Utility", status: "Approved" },
    {
      id: 2,
      name: "Order Confirmation",
      category: "Transaction",
      status: "Pending",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Message Templates</h2>
        <button className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
          + New Template
        </button>
      </div>

      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {templates.map((template) => (
            <tr key={template.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{template.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {template.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    template.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : template.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {template.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
