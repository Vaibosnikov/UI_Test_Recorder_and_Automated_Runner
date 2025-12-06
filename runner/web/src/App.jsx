// src/App.jsx
import React from "react";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./components/ThemeProvider";   // ✅ IMPORTANT

function App() {
  return (
    <ThemeProvider>   {/* ✅ WRAP EVERYTHING */}
      <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        
        {/* Top Right Toggle */}
        <div className="p-4 flex justify-end">
          <ThemeToggle />
        </div>

        {/* Dashboard content */}
        <div className="px-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {/* <TopStats /> */}
          {/* <RecentRuns /> */}
          {/* <RunFunnel /> */}
          {/* <TrendChart /> */}
          {/* <CohortHeatmap /> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
