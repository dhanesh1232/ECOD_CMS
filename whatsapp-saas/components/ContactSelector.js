"use client";

import { useState } from "react";

export default function ContactSelector() {
  const [searchTerm, setSearchTerm] = useState("");
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1234567890",
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+1987654321",
      lastContact: "1 week ago",
    },
    {
      id: 3,
      name: "Mike Peterson",
      phone: "+1122334455",
      lastContact: "3 days ago",
    },
    {
      id: 4,
      name: "Emily Wilson",
      phone: "+1567890123",
      lastContact: "2 weeks ago",
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.phone}</p>
            <p className="text-xs text-gray-400">{contact.lastContact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
