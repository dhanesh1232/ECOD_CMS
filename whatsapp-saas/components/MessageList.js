export default function MessageList() {
  const messages = [
    {
      id: 1,
      contact: "John Doe",
      preview: "Hey, when will my order...",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      contact: "Sarah Johnson",
      preview: "Thanks for your help!",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      contact: "Mike Peterson",
      preview: "Can we schedule a call...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      contact: "Emily Wilson",
      preview: "The product arrived damaged",
      time: "Mar 15",
      unread: false,
    },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
            message.unread ? "bg-blue-50" : ""
          }`}
        >
          <div className="flex justify-between">
            <h3
              className={`font-medium ${message.unread ? "text-blue-600" : ""}`}
            >
              {message.contact}
            </h3>
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
          <p className="text-sm text-gray-600 truncate">{message.preview}</p>
          {message.unread && (
            <div className="mt-1 flex justify-end">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
