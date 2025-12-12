import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("tc_theme");
      return saved || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    // keep body class in sync; prefer a single class for styling
    const body = document.body;
    const other = theme === "dark" ? "theme-light" : "theme-dark";
    body.classList.remove(other);
    body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");

    try {
      localStorage.setItem("tc_theme", theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;