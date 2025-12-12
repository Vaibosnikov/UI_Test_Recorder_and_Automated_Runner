import React from "react";
import DashboardPage from "./pages/DashboardPage";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider>
      <div className="app-root">
        {/* Header with centered title; ThemeToggle is placed absolutely to the right */}
        <Header>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <ThemeToggle />
          </div>
        </Header>

        <main className="app-main">
          <DashboardPage />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;