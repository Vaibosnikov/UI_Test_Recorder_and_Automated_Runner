import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Generate script endpoint
app.post('/generate', (req, res) => {
  const { actions } = req.body;
  
  if (!actions || !Array.isArray(actions)) {
    return res.status(400).json({ error: 'Invalid actions array' });
  }

  // Generate Playwright TypeScript test
  const testCode = generatePlaywrightTest(actions);
  
  res.json({ script: testCode });
});

function generatePlaywrightTest(actions) {
  let code = `import { test, expect } from '@playwright/test';

test('Generated test', async ({ page }) => {
`;

  for (const action of actions) {
    switch (action.type) {
      case 'navigate':
        code += `  await page.goto('${action.url}');\n`;
        break;
      case 'click':
        code += `  await page.click('${action.selector}');\n`;
        break;
      case 'fill':
        code += `  await page.fill('${action.selector}', '${action.value}');\n`;
        break;
      case 'assert':
        code += `  await expect(page.locator('${action.selector}')).toBeVisible();\n`;
        break;
    }
  }

  code += `});\n`;
  return code;
}

export default app;
