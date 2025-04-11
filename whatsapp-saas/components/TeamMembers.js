"use client";
export default function TeamMembers() {
  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Agent",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Agent",
      lastActive: "3 days ago",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Team Members</h3>
        <button className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700">
          + Invite Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Last Active
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                  {member.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {member.email}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {member.role}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {member.lastActive}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
