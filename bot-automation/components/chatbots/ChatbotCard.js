export default function ChatbotCard({ bot }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-2xl space-y-2">
      <h2 className="text-lg font-semibold">{bot.name}</h2>
      <p className="text-sm text-gray-500">Platform: {bot.platform}</p>
      <span
        className={`inline-block px-2 py-1 text-xs rounded ${
          bot.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {bot.status}
      </span>
    </div>
  );
}
