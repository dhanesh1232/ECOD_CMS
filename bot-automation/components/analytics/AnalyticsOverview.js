"use client";

export default function AnalyticsOverview() {
  const stats = [
    { title: "Total Conversations Today", value: 120 },
    { title: "Active Chatbots", value: 5 },
    { title: "New Contacts", value: 27 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="p-4 bg-white dark:bg-gray-800 shadow rounded-2xl"
        >
          <div className="text-sm text-gray-500">{stat.title}</div>
          <div className="text-2xl font-semibold mt-1">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
