/**
 * index.js
 * Stable Playwright spec generator
 * - Auto waits
 * - Navigation safety
 * - Timeout hardened
 * - Alert handling
 */

function escapeDQ(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

function escapeSQ(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

/**
 * Builds Playwright lines for a single step
 */
function buildStepLines(step, baseUrlExpr) {
  const lines = [];
  if (!step || !step.type) return lines;

  switch (step.type) {
    case "navigate": {
      const url = step.url || "/";
      const isAbsolute = /^https?:\/\//i.test(url);

      if (isAbsolute) {
        lines.push(
          `  await page.goto('${escapeSQ(url)}', { waitUntil: 'domcontentloaded', timeout: 30000 });`
        );
      } else {
        lines.push(
          `  await page.goto(${baseUrlExpr} + '${escapeSQ(url)}', { waitUntil: 'domcontentloaded', timeout: 30000 });`
        );
      }
      break;
    }

    case "click": {
      const selector = `"${escapeDQ(step.selector || "")}"`;
      lines.push(
        `  await page.waitForSelector(${selector}, { state: 'visible', timeout: 15000 });`
      );
      lines.push(`  await page.click(${selector});`);
      break;
    }

    case "fill": {
      const selector = `"${escapeDQ(step.selector || "")}"`;
      const value = `"${escapeDQ(step.value || "")}"`;
      lines.push(
        `  await page.waitForSelector(${selector}, { state: 'attached', timeout: 15000 });`
      );
      lines.push(`  await page.fill(${selector}, ${value});`);
      break;
    }

    case "assertText": {
      const selector = `"${escapeDQ(step.selector || "")}"`;
      const value = `"${escapeDQ(step.value || "")}"`;
      lines.push(
        `  await expect(page.locator(${selector})).toHaveText(${value});`
      );
      break;
    }

    default:
      lines.push(`  // ⚠ Unsupported step type: ${JSON.stringify(step)}`);
  }

  return lines;
}

/**
 * Generates Playwright spec (.spec.ts)
 */
export function generatePlaywrightSpec(recording) {
  const rec = recording || {};
  const name = rec.name || "Generated Flow";
  const baseUrl = rec.baseUrl || "http://localhost:5173";

  const steps = Array.isArray(rec.steps) ? rec.steps : [];
  const baseUrlExpr = `process.env.BASE_URL || "${escapeDQ(baseUrl)}"`;

  const lines = [];

  lines.push(`import { test, expect } from "@playwright/test";`);
  lines.push("");
  lines.push(`test("${escapeSQ(name)}", async ({ page }) => {`);
  lines.push(`  page.on("dialog", async d => await d.accept());`);

  // Ensure initial navigation
  if (!steps.length || steps[0].type !== "navigate") {
    lines.push(
      `  await page.goto(${baseUrlExpr}, { waitUntil: 'domcontentloaded', timeout: 30000 });`
    );
  }

  for (const step of steps) {
    const stepLines = buildStepLines(step, baseUrlExpr);
    for (const l of stepLines) lines.push(l);
  }

  lines.push("});");
  lines.push("");

  return lines.join("\n");
}
