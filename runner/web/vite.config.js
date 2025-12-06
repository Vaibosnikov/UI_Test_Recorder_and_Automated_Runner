import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    port: 5173
=======
<<<<<<< HEAD
    port: 5173
=======
    port: 5173,
    hmr: { overlay: true }
>>>>>>> f836e58a1da0bdfdfc4271e740d87ea28a0a59c5
>>>>>>> dev
  }
});
