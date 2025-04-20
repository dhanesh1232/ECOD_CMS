import {
  FiUsers,
  FiPlus,
  FiSearch,
  FiFilter,
  FiDownload,
} from "react-icons/fi";

export default function ContactsPage() {
  const contacts = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555-1234",
      tags: ["VIP", "Prospect"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 555-5678",
      tags: ["Customer"],
    },
    {
      id: 3,
      name: "Acme Corp",
      email: "contact@acme.com",
      phone: "+1 555-9012",
      tags: ["Enterprise"],
    },
    {
      id: 4,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 555-3456",
      tags: [],
    },
    {
      id: 5,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1 555-7890",
      tags: ["Customer", "VIP"],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiUsers className="mr-2" /> Contacts
      </h1>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border rounded-lg">
            <FiFilter className="mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 border rounded-lg">
            <FiDownload className="mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
            <FiPlus className="mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Contact List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium border-b">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-3">Tags</div>
          <div className="col-span-1">Actions</div>
        </div>

        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="grid grid-cols-12 p-4 border-b hover:bg-gray-50"
          >
            <div className="col-span-3 font-medium">{contact.name}</div>
            <div className="col-span-3 text-gray-600">{contact.email}</div>
            <div className="col-span-2 text-gray-600">{contact.phone}</div>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-1">
                {contact.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing 1 to 5 of 24 contacts
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
