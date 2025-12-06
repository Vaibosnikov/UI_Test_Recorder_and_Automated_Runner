import React from "react";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";

// Wrapper component to pass theme to Header and DashboardPage
function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header theme={theme} />

        {/* Dashboard */}
        <main className="flex-1 overflow-auto p-6">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
