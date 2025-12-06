// src/components/ThemeProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for theme
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // default theme

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
    }
  }, []);

  // Apply theme to <html> and save to localStorage
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between dark and light
  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {/* wrapper ensures smooth transition */}
      <div className="transition-colors duration-300 min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook to consume theme
export const useTheme = () => useContext(ThemeContext);
