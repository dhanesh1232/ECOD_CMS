"use client";
export default function PerformanceMetrics() {
  const metrics = [
    { name: "Delivery Rate", value: "98.2%", trend: "up", change: "2.1%" },
    { name: "Read Rate", value: "84.5%", trend: "up", change: "3.7%" },
    { name: "Response Rate", value: "62.3%", trend: "down", change: "1.2%" },
    {
      name: "Avg Response Time",
      value: "2h 15m",
      trend: "down",
      change: "18m",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-semibold">{metric.value}</p>
            <div
              className={`flex items-center ${
                metric.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {metric.trend === "up" ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 5.414V6a1 1 0 01-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 01-1 1V14.586l-4.293-4.293a1 1 0 011.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L11 16.414V14a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="ml-1 text-sm">{metric.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
