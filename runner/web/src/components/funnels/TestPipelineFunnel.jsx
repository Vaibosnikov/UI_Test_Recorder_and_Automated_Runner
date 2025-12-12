import React from "react";

export default function TestPipelineFunnel({ theme = "dark" }) {
  const isDark = theme === "dark";

  // Container background and text dynamically follow the theme
  const containerClasses = `p-4 rounded-lg border transition-colors duration-300 ${
    isDark
      ? "bg-slate-800 border-slate-700 text-white"
      : "bg-white border-gray-300 text-gray-900"
  }`;

  // Step styling function
  const stepClasses = (darkBg, lightBg, width) =>
    `p-2 rounded font-medium transition-all duration-300 ${width} ${
      isDark ? `${darkBg} text-white` : `${lightBg} text-gray-900`
    }`;

  return (
    <div className={containerClasses}>
      <h2
        className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Test Execution Funnel
      </h2>

      <div className="space-y-3">
        <div className={stepClasses("bg-blue-700", "bg-blue-200", "w-full")}>
          Recorded
        </div>
        <div className={stepClasses("bg-purple-700", "bg-purple-200", "w-4/5")}>
          Script Generated
        </div>
        <div className={stepClasses("bg-indigo-700", "bg-indigo-200", "w-3/5")}>
          Execution Triggered
        </div>
        <div className={stepClasses("bg-green-700", "bg-green-200", "w-2/5")}>
          Passed
        </div>
      </div>
    </div>
  );
}
