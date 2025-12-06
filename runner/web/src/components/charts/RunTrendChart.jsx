import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function RunTrendChart({ theme = "dark" }) {
  // Determine colors based on theme
  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#1f2937"; // white or gray-800
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const data = {
    labels: ["Day 1", "Day 2", "Day 3"],
    datasets: [
      {
        label: "Passed",
        data: [5, 3, 4],
        borderColor: "#22c55e", // green
        backgroundColor: "#22c55e33",
      },
      {
        label: "Failed",
        data: [1, 2, 1],
        borderColor: "#ef4444", // red
        backgroundColor: "#ef444433",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className={`p-4 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
      <h2 className={`${isDark ? "text-white" : "text-gray-800"} mb-3`}>Daily Run Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
}
