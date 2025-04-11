"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function MessageChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Messages Sent",
        data: [12, 19, 3, 5, 2, 3, 15],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Messages Read",
        data: [8, 15, 2, 4, 1, 2, 12],
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Message Activity</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
