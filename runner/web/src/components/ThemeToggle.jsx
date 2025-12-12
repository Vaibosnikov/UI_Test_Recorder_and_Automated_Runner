// src/components/ThemeToggle.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className={`
        relative flex items-center justify-center
        w-12 h-12 rounded-full
        shadow-md hover:shadow-lg
        transition-all duration-300
        ${isDark ? "bg-slate-700" : "bg-gray-200"}
        ${className}
      `}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {/* Glow ring behind the icon */}
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isDark
            ? "rgba(147,197,253,0.25)" // light blue glow
            : "rgba(251,191,36,0.25)", // warm yellow glow
          scale: 1.15,
        }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 rounded-full pointer-events-none"
      />

      {/* Smooth icon fade + rotate animation */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.25 }}
          >
            <Moon className="w-6 h-6 text-blue-300 drop-shadow" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.25 }}
          >
            <Sun className="w-6 h-6 text-yellow-500 drop-shadow" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
