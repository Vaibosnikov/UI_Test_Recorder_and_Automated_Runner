// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";               // your existing App
import { ThemeProvider } from "./components/ThemeProvider";
import "./index.css";                  // Tailwind + transitions

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
