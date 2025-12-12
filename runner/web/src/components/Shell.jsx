// Shell.jsx
import React from "react";
import DashboardPage from "../pages/DashboardPage";

export default function Shell() {
  // Shell should only be responsible for app layout or routing,
  // not for theme, since App.jsx already handles that.
  return <DashboardPage />;
}
