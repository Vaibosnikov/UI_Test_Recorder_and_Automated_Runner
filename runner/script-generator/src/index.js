/**
 * index.js
 * Stable Playwright spec generator (timeouts + waits + safety)
 */

function escDQ(v) {
  return String(v).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}
function escSQ(v) {
  return String(v).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function buildStep(step, baseUrlExpr) {
  const out = [];
  if (!step || !step.type) return out;

  switch (step.type) {
    case "navigate": {
      const url = step.url || "/";
      const abs = /^https?:\/\//i.test(url);
      out.push(
        abs
          ? `  await page.goto('${escSQ(url)}', { waitUntil: 'domcontentloaded' });`
          : `  await page.goto(${baseUrlExpr} + '${escSQ(url)}', { waitUntil: 'domcontentloaded' });`
      );
      out.push(`  await page.waitForLoadState('networkidle');`);
      break;
    }

    case "click": {
      if (!step.selector) break;
      const s = `"${escDQ(step.selector)}"`;
      out.push(`  await page.waitForSelector(${s}, { state: 'visible', timeout: 15000 });`);
      out.push(`  await page.click(${s});`);
      break;
    }

    case "fill": {
      if (!step.selector) break;
      const s = `"${escDQ(step.selector)}"`;
      const v = `"${escDQ(step.value || "")}"`;
      out.push(`  await page.waitForSelector(${s}, { state: 'attached', timeout: 15000 });`);
      out.push(`  await page.fill(${s}, ${v});`);
      break;
    }

    case "assertText": {
      const s = `"${escDQ(step.selector)}"`;
      const v = `"${escDQ(step.value || "")}"`;
      out.push(`  await expect(page.locator(${s})).toHaveText(${v});`);
      break;
    }
  }

  return out;
}

export function generatePlaywrightSpec(recording) {
  const name = recording?.name || "Recorded Flow";
  const baseUrl = recording?.baseUrl || "http://localhost:5173";
  const steps = Array.isArray(recording?.steps) ? recording.steps : [];

  const baseExpr = `process.env.BASE_URL || "${escDQ(baseUrl)}"`;

  const lines = [];
  lines.push(`import { test, expect } from "@playwright/test";`);
  lines.push(``);
  lines.push(`test("${escSQ(name)}", async ({ page }) => {`);
  lines.push(`  page.on('dialog', d => d.accept());`);

  if (!steps.length || steps[0].type !== "navigate") {
    lines.push(`  await page.goto(${baseExpr}, { waitUntil: 'domcontentloaded' });`);
    lines.push(`  await page.waitForLoadState('networkidle');`);
  }

  for (const step of steps) {
    for (const l of buildStep(step, baseExpr)) lines.push(l);
  }

  lines.push(`});`);
  lines.push(``);

  return lines.join("\n");
}
