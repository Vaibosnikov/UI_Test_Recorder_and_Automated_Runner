/**
 * selector.js
 * Generates the most stable selector possible for an element
 */

export function getBestSelector(el) {
  if (!el || el.nodeType !== 1) return null;

  // 1. data-testid
  const testId = el.getAttribute("data-testid");
  if (testId) return `[data-testid="${testId}"]`;

  // 2. aria-label
  const aria = el.getAttribute("aria-label");
  if (aria) return `[aria-label="${aria}"]`;

  // 3. role + name
  const role = el.getAttribute("role");
  const name = el.textContent?.trim();
  if (role && name) return `[role="${role}"]:has-text("${name}")`;

  // 4. link href
  if (el.tagName === "A" && el.getAttribute("href")) {
    return `a[href="${el.getAttribute("href")}"]`;
  }

  // 5. fallback CSS path
  return buildCssPath(el);
}

function buildCssPath(el) {
  const path = [];
  while (el && el.nodeType === 1 && el.tagName !== "HTML") {
    let selector = el.tagName.toLowerCase();
    if (el.id) {
      selector += `#${el.id}`;
      path.unshift(selector);
      break;
    } else {
      let sib = el, nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.tagName === el.tagName) nth++;
      }
      selector += `:nth-of-type(${nth})`;
    }
    path.unshift(selector);
    el = el.parentElement;
  }
  return path.join(" > ");
}
