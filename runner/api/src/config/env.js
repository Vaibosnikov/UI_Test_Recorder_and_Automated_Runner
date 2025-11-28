// Centralized environment configuration

import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "vaibh",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "testcraft_db"
  }
};