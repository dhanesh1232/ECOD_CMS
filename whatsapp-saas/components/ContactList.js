"use client";
import { useState } from "react";

export default function ContactList() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1234567890",
      group: "customers",
      tags: ["VIP"],
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+1987654321",
      group: "leads",
      tags: [],
      lastContact: "1 week ago",
    },
    {
      id: 3,
      name: "Mike Peterson",
      phone: "+1122334455",
      group: "customers",
      tags: ["recurring"],
      lastContact: "3 days ago",
    },
    {
      id: 4,
      name: "Emily Wilson",
      phone: "+1567890123",
      group: "inactive",
      tags: [],
      lastContact: "2 weeks ago",
    },
  ];

  const filteredContacts =
    selectedGroup === "all"
      ? contacts
      : contacts.filter((contact) => contact.group === selectedGroup);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-medium">
          All Contacts ({filteredContacts.length})
        </h2>
        <select
          className="border rounded p-1 text-sm"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="all">All Groups</option>
          <option value="customers">Customers</option>
          <option value="leads">Leads</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Group
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Last Contact
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {contact.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{contact.name}</p>
                      {contact.tags.length > 0 && (
                        <div className="flex space-x-1 mt-1">
                          {contact.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {contact.phone}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      contact.group === "customers"
                        ? "bg-green-100 text-green-800"
                        : contact.group === "leads"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {contact.group}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {contact.lastContact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
