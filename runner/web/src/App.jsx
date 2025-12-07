// src/App.jsx
import React from "react";
import DashboardPage from "./pages/DashboardPage.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-root">
        <header className="app-header">
          <h1>TestCraft Dashboard</h1>
          <p className="subtitle">
            UI Test Recorder and Automated Runner – Execution Overview
          </p>
        </header>

        <main className="app-main">
          <DashboardPage />
        </main>
      </div>
    </ThemeProvider>
  );
}
