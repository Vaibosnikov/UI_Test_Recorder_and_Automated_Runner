import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardPage from "../pages/DashboardPage";
import ThemeToggle from "../components/ThemeToggle"; // if applicable

export default function Shell() {
  return (
    <div className="min-h-screen flex bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Sidebar />

      <div className="flex-1">
        {/* Pass ThemeToggle to Header */}
        <Header>
          <ThemeToggle />
        </Header>

        <main className="p-6">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}
