import { useState } from "react";

export default function ContactsList() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+1234567890",
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1987654321",
      lastContact: "1 week ago",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Contacts</h2>
      </div>

      <div className="divide-y">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{contact.name}</h3>
              <p className="text-sm text-gray-500">{contact.phone}</p>
            </div>
            <div className="text-sm text-gray-500">{contact.lastContact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
