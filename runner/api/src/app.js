import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import runsRoutes from './routes/runs.routes.js';
import testsRoutes from './routes/tests.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1/health', healthRoutes);
app.use('/v1/runs', runsRoutes);
app.use('/v1/generate-script', testsRoutes);

export default app;
