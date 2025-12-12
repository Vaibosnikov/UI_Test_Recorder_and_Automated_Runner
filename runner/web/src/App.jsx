import React from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import Shell from "./components/Shell";

function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}

export default App;
