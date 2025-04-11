"use client";
export default function TemplateList() {
  const templates = [
    {
      id: 1,
      name: "Welcome Message",
      category: "Utility",
      language: "English",
      status: "approved",
      lastUsed: "2 days ago",
    },
    {
      id: 2,
      name: "Order Confirmation",
      category: "Transaction",
      language: "English",
      status: "approved",
      lastUsed: "1 week ago",
    },
    {
      id: 3,
      name: "Discount Offer",
      category: "Marketing",
      language: "Spanish",
      status: "pending",
      lastUsed: "Never",
    },
    {
      id: 4,
      name: "Appointment Reminder",
      category: "Utility",
      language: "English",
      status: "rejected",
      lastUsed: "3 weeks ago",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Language
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Last Used
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {templates.map((template) => (
            <tr key={template.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                {template.name}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.category}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.language}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    template.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : template.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {template.status}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.lastUsed}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
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
