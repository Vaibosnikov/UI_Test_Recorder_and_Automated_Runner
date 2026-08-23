# TestCraft Dashboard (v2)

Minimal React + Vite dashboard that displays API health and recorded test runs.

## Local development

```bash
npm install
npm run dev
```

By default it targets `http://localhost:5000`. To point at a deployed API, create a `.env` file:

```bash
VITE_API_URL=https://your-api.onrender.com
```

## Deploying on Render (Static Site)

- Root Directory: `runner/web`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment variable:
  - Key: `VITE_API_URL`
  - Value: `https://<your-api-service>.onrender.com` (no `VITE_API_URL=` prefix in the value, no extra spaces)

After setting or changing this variable, trigger **Manual Deploy → Clear build cache & deploy**, since Vite embeds `VITE_*` variables at build time.

The API base URL currently in use is shown directly on the dashboard for easy debugging.
