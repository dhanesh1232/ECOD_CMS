const chats = [
  { id: 1, name: "John Doe", lastMessage: "Hey!", platform: "WhatsApp" },
  {
    id: 2,
    name: "Jane Insta",
    lastMessage: "Order placed ✅",
    platform: "Instagram",
  },
  {
    id: 3,
    name: "Biz Page FB",
    lastMessage: "More info please?",
    platform: "Facebook",
  },
];

export default function ChatList({ onSelectChat }) {
  return (
    <div className="overflow-y-auto h-full p-4 space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <div className="font-semibold">{chat.name}</div>
          <div className="text-xs text-gray-500">{chat.platform}</div>
          <div className="text-sm truncate">{chat.lastMessage}</div>
        </div>
      ))}
    </div>
  );
}
