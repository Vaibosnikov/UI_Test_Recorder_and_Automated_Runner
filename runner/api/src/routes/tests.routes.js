import { Router } from 'express';
import { generatePlaywrightScript } from '../../../script-generator/src/index.js';

const router = Router();

/**
 * POST /v1/generate-script
 * Generates a Playwright TypeScript test script from recorded events
 * 
 * Request body:
 * {
 *   "events": [
 *     { "type": "click", "selector": "#button" },
 *     { "type": "input", "selector": "#name", "value": "John" }
 *   ]
 * }
 * 
 * Response: Plain text TypeScript code
 */
router.post('/generate-script', async (req, res) => {
  try {
    const { events } = req.body;
    
    if (!events || !Array.isArray(events)) {
      return res.status(400).json({ 
        error: 'Invalid request body. Expected "events" array.' 
      });
    }

    // Generate the Playwright script
    const script = generatePlaywrightScript(events);
    
    // Return as plain text (not JSON)
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
