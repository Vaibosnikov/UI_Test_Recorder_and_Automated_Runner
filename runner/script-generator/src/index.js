/**
 * index.js
 * Core generator: converts a recording JSON object into a Playwright .spec.ts string.
 */

/**
 * Escape for JS double-quoted string literal.
 * @param {string} value
 * @returns {string}
 */
function escapeForDoubleQuotes(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

/**
 * Escape for JS single-quoted string literal.
 * @param {string} value
 * @returns {string}
 */
function escapeForSingleQuotes(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

/**
 * Build code lines for a single step.
 * @param {object} step
 * @param {string} baseUrlExpr
 * @returns {string[]}
 */
function buildStepLines(step, baseUrlExpr) {
  const lines = [];
  if (!step || !step.type) return lines;

  switch (step.type) {
    case "navigate": {
      const urlPart = step.url || "/";
      const urlLiteral = "'" + escapeForSingleQuotes(urlPart) + "'";
      lines.push("  await page.goto(" + baseUrlExpr + " + " + urlLiteral + ");");
      break;
    }
    case "click": {
      const selector = "\"" + escapeForDoubleQuotes(step.selector || "") + "\"";
      lines.push("  await page.click(" + selector + ");");
      break;
    }
    case "fill": {
      const selector = "\"" + escapeForDoubleQuotes(step.selector || "") + "\"";
      const value = "\"" + escapeForDoubleQuotes(step.value || "") + "\"";
      lines.push("  await page.fill(" + selector + ", " + value + ");");
      break;
    }
    case "assertText": {
      const selector = "\"" + escapeForDoubleQuotes(step.selector || "") + "\"";
      const value = "\"" + escapeForDoubleQuotes(step.value || "") + "\"";
      lines.push("  await expect(page.locator(" + selector + ")).toHaveText(" + value + ");");
      break;
    }
    default: {
      lines.push("  // TODO: unsupported step type \"" + String(step.type) + "\"");
      break;
    }
  }

  return lines;
}

/**
 * Generate a Playwright spec (.spec.ts) from a recording object.
 * @param {object} recording
 * @returns {string}
 */
export function generatePlaywrightSpec(recording) {
  const rec = recording || {};
  const name = rec.name || "Generated Flow";
  const description = rec.description || "";
  const baseUrl = rec.baseUrl || "http://localhost:5000";

  const safeName = escapeForSingleQuotes(name);
  const baseUrlLiteral = "\"" + escapeForDoubleQuotes(baseUrl) + "\"";
  const baseUrlExpr = "process.env.BASE_URL || " + baseUrlLiteral;

  const lines = [];
  lines.push("import { test, expect } from '@playwright/test';");
  lines.push("");
  if (description) {
    lines.push("// " + description);
  }
  lines.push("test('" + safeName + "', async ({ page }) => {");
  lines.push("  await page.goto(" + baseUrlExpr + ");");

  const steps = Array.isArray(rec.steps) ? rec.steps : [];
  for (const step of steps) {
    const stepLines = buildStepLines(step, baseUrlExpr);
    for (const line of stepLines) lines.push(line);
  }

  lines.push("});");
  lines.push("");

  return lines.join("\n");
}
