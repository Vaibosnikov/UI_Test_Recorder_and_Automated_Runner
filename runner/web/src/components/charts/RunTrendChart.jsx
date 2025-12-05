import React from "react";
import { Line } from "react-chartjs-2";

export default function RunTrendChart() {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3"],
    datasets: [
      {
        label: "Passed",
        data: [5, 3, 4],
        borderColor: "#22c55e",
      },
      {
        label: "Failed",
        data: [1, 2, 1],
        borderColor: "#ef4444",
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h2 className="text-white mb-3">Daily Run Trend</h2>
      <Line data={data} />
    </div>
  );
}
