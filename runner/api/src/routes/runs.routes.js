import { Router } from 'express';

const router = Router();

let runs = [];

router.get('/', (req, res) => {
  res.json(runs);
});

router.post('/', (req, res) => {
  const run = req.body;
  runs.push(run);
  res.json({ ok: true, id: runs.length });
});

export default router;
