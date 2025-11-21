import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardPage from "../pages/DashboardPage";

export default function Shell() {
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}
