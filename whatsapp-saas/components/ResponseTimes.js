"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function ResponseTimes() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Average Response Time (hours)",
        data: [3.2, 2.8, 2.5, 2.3, 2.1, 2.2, 2.0],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
        fill: true,
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
    scales: {
      y: {
        beginAtZero: false,
        min: 1,
        max: 4,
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Response Time Trend</h3>
      <Line data={data} options={options} />
    </div>
  );
}
