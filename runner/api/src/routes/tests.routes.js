import { Router } from 'express';

const router = Router();

function generatePlaywrightScript(events) {
  let script = `import { test, expect } from '@playwright/test';\n\n`;
  script += `test('Recorded test', async ({ page }) => {\n`;
  
  for (const event of events) {
    const selector = event.selector || event.target || 'body';
    
    if (event.type === 'click') {
      script += `  await page.click('${selector}');\n`;
    } else if (event.type === 'input' || event.type === 'type') {
      const value = event.value || '';
      script += `  await page.fill('${selector}', '${value}');\n`;
    } else if (event.type === 'navigate') {
      const url = event.url || 'about:blank';
      script += `  await page.goto('${url}');\n`;
    }
  }
  
  script += `});\n`;
  return script;
}

/**
 * POST /v1/generate-script
 * Generates a Playwright TypeScript test script from recorded events
 */
router.post('/generate-script', async (req, res) => {
  try {
    const { events } = req.body;
    
    if (!events || !Array.isArray(events)) {
      return res.status(400).json({ 
        error: 'Invalid request body. Expected "events" array.' 
      });
    }

    const script = generatePlaywrightScript(events);
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(script);
  } catch (error) {
    console.error('Error generating script:', error);
    res.status(500).json({ 
      error: 'Failed to generate script',
      message: error.message 
    });
  }
});

export default router;
