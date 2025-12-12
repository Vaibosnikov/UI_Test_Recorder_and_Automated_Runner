// src/components/ThemeProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

<<<<<<< HEAD
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;

=======
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Sync Tailwind dark mode (class strategy) with state
  useEffect(() => {
    const root = document.documentElement;
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
<<<<<<< HEAD

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className="min-h-screen w-full transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
=======
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
