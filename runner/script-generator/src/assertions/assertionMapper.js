/**
 * assertionMapper.js
 * Converts recorder assertions into Playwright expect statements
 */

export function mapAssertion(assert) {
  if (!assert || !assert.type) return "";

  switch (assert.type) {
    case "visible":
      return `
  await expect(page.locator("${assert.target}")).toBeVisible();
`;

    case "url":
      return `
  await expect(page).toHaveURL("${assert.value}");
`;

    default:
      return "";
  }
}