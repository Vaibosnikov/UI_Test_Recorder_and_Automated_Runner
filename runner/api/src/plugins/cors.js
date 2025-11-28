// CORS plugin - configure allowed origins for the dashboard

import cors from "cors";

export function registerCors(app) {
  app.use(
    cors({
      origin: "http://localhost:5173", // dashboard dev server
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    })
  );
}