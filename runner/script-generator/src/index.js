/**
 * index.js
 * Core generator: converts a recording JSON object into a Playwright .spec.ts string.
 */

/* ---------- Utils ---------- */

function escapeForDoubleQuotes(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, "\\\"");
}

function escapeForSingleQuotes(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

/* ---------- Step Builder ---------- */

function buildStepLines(step, baseUrlExpr) {
  const lines = [];
  if (!step || !step.type) return lines;

  switch (step.type) {
    case "navigate": {
      const url = step.url || "/";
      const isAbsolute = /^https?:\/\//i.test(url);

      if (isAbsolute) {
        lines.push(
          "  await page.goto('" + escapeForSingleQuotes(url) + "');"
        );
      } else {
        lines.push(
          "  await page.goto(" +
            baseUrlExpr +
            " + '" +
            escapeForSingleQuotes(url) +
            "');"
        );
      }
      break;
    }

    case "click": {
      const selector =
        "\"" + escapeForDoubleQuotes(step.selector || "") + "\"";
      lines.push(
        "  await page.waitForSelector(" +
          selector +
          ", { state: 'visible', timeout: 10000 });"
      );
      lines.push("  await page.click(" + selector + ");");
      break;
    }

    case "fill": {
      const selector =
        "\"" + escapeForDoubleQuotes(step.selector || "") + "\"";
      const value =
        "\"" + escapeForDoubleQuotes(step.value || "") + "\"";
      lines.push(
        "  await page.waitForSelector(" +
          selector +
          ", { state: 'visible' });"
      );
      lines.push(
        "  await page.fill(" + selector + ", " + value + ");"
      );
      break;
    }

    case "assertText": {
      const selector =
        "\"" + escapeForDoubleQuotes(step.selector || "") + "\"";
      const value =
        "\"" + escapeForDoubleQuotes(step.value || "") + "\"";
      lines.push(
        "  await expect(page.locator(" +
          selector +
          ")).toHaveText(" +
          value +
          ");"
      );
      break;
    }

    default:
      lines.push(
        "  // Unsupported step type: " + String(step.type)
      );
  }

  return lines;
}

/* ---------- Spec Generator ---------- */

export function generatePlaywrightSpec(recording) {
  const rec = recording || {};
  const name = rec.name || "Generated Flow";
  const description = rec.description || "";
  const baseUrl = rec.baseUrl || "http://localhost:5173";

  const safeName = escapeForSingleQuotes(name);
  const baseUrlExpr =
    "process.env.BASE_URL || \"" +
    escapeForDoubleQuotes(baseUrl) +
    "\"";

  const steps = Array.isArray(rec.steps) ? rec.steps : [];

  const lines = [];
  lines.push("import { test, expect } from '@playwright/test';");
  lines.push("");

  if (description) {
    lines.push("// " + description);
  }

  lines.push(
    "test('" + safeName + "', async ({ page }) => {"
  );

  // If first step is NOT navigate, ensure initial page load
  if (!steps.length || steps[0].type !== "navigate") {
    lines.push("  await page.goto(" + baseUrlExpr + ");");
  }

  for (const step of steps) {
    const stepLines = buildStepLines(step, baseUrlExpr);
    stepLines.forEach((line) => lines.push(line));
  }

  lines.push("});");
  lines.push("");

  return lines.join("\n");
}
