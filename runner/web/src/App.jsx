import React from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Dashboard */}
          <main className="flex-1 overflow-auto p-6">
            <DashboardPage />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
