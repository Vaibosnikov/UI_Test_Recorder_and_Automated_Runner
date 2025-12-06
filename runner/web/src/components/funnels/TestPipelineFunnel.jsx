import React from "react";

export default function TestPipelineFunnel() {
  return (
    <div
      className="
        p-4 rounded-lg border
        bg-white border-gray-300 text-gray-900
        dark:bg-slate-800 dark:border-slate-700 dark:text-white
        transition-colors duration-300
      "
    >
      <h2 className="text-lg font-semibold mb-3">Test Execution Funnel</h2>

      <div className="space-y-3">

        {/* Step 1 */}
        <div
          className="
            p-2 rounded font-medium text-white
            bg-blue-600 dark:bg-blue-700
            transition-all duration-300 w-full
          "
        >
          Recorded
        </div>

        {/* Step 2 */}
        <div
          className="
            p-2 rounded font-medium text-white
            bg-purple-600 dark:bg-purple-700
            transition-all duration-300 w-4/5
          "
        >
          Script Generated
        </div>

        {/* Step 3 */}
        <div
          className="
            p-2 rounded font-medium text-white
            bg-indigo-600 dark:bg-indigo-700
            transition-all duration-300 w-3/5
          "
        >
          Execution Triggered
        </div>

        {/* Step 4 */}
        <div
          className="
            p-2 rounded font-medium text-white
            bg-green-600 dark:bg-green-700
            transition-all duration-300 w-2/5
          "
        >
          Passed
        </div>

      </div>
    </div>
  );
}
