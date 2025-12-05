// Entry point for the backend API

import { createApp } from "./app.js";
import { config } from "./config/env.js";

const app = createApp();
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`✅ API server running at http://localhost:${PORT}`);
});