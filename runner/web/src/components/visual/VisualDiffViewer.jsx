import React from "react";

// Optional mock data for preview
const mockDiffs = [
  { name: "Login Page", status: "unchanged" },
  { name: "Signup Page", status: "changed" },
  { name: "Checkout Page", status: "unchanged" },
];

export default function VisualDiffViewer({ theme = "dark" }) {
  const isDark = theme === "dark";

  const containerClasses = `p-4 rounded-lg border transition-colors duration-300 ${
    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
  }`;

  const previewClasses = `w-full h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors duration-300 ${
    isDark ? "border-gray-600 bg-gray-900" : "border-gray-300 bg-gray-100"
  }`;

  const textClasses = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <div className={containerClasses}>
      <h2 className={`${isDark ? "text-white" : "text-gray-800"} mb-3 text-lg font-semibold`}>
        Visual Regression
      </h2>

      <div className={previewClasses}>
        {mockDiffs.map((diff) => {
          const isChanged = diff.status === "changed";

          const badgeClasses = isChanged
            ? isDark
              ? "bg-red-700 text-white"
              : "bg-red-200 text-red-800"
            : isDark
            ? "bg-green-700 text-white"
            : "bg-green-200 text-green-800";

          return (
            <div key={diff.name} className="flex items-center gap-2 mb-1">
              <span className={textClasses}>{diff.name}:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${badgeClasses}`}>
                {diff.status}
              </span>
            </div>
          );
        })}

        <span className={`${textClasses} mt-2`}>
          Image diff preview will appear here
        </span>
      </div>
    </div>
  );
}
