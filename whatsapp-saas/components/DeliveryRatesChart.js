"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function DeliveryRatesChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Delivery Rate",
        data: [95, 96, 97, 98, 98, 98, 98],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
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
        min: 90,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Delivery Rate Trend</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
