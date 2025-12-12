import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      className={className || "theme-toggle"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggle}
    >
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}