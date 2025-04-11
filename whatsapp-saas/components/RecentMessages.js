export default function RecentMessages() {
  const messages = [
    { id: 1, to: "+1234567890", status: "Delivered", time: "2 mins ago" },
    { id: 2, to: "+1987654321", status: "Read", time: "15 mins ago" },
    { id: 3, to: "+1122334455", status: "Failed", time: "1 hour ago" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
      <div className="space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{message.to}</p>
              <p className="text-sm text-gray-500">{message.time}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                message.status === "Delivered"
                  ? "bg-blue-100 text-blue-800"
                  : message.status === "Read"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
