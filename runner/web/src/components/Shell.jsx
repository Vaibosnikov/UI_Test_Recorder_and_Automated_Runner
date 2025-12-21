// Shell.jsx
import React from "react";
import DashboardPage from "../pages/DashboardPage";

export default function Shell() {
  // Full viewport wrapper to center content
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full">
      <DashboardPage />
    </div>
  );
}
