export default function StatsCard({ title, value, change }) {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        <span
          className={`ml-2 text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
