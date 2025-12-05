import React from "react";

export default function TestPipelineFunnel() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h2 className="text-white mb-3">Test Execution Funnel</h2>

      <div className="space-y-3">
        <div className="bg-blue-600 w-full p-2 rounded">Recorded</div>
        <div className="bg-purple-600 w-4/5 p-2 rounded">Script Generated</div>
        <div className="bg-indigo-600 w-3/5 p-2 rounded">Execution Triggered</div>
        <div className="bg-green-600 w-2/5 p-2 rounded">Passed</div>
      </div>
    </div>
  );
}
