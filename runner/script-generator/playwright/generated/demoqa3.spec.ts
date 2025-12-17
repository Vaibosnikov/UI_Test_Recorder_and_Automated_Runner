import { test, expect } from "@playwright/test";

test("Recorded Flow (TestCraft)", async ({ page }) => {
  await page.click("div:nth-of-type(1)");
  
  await expect(page.locator("div:nth-of-type(1)")).toBeVisible();

  await page.click("#item-0");
  
  await expect(page.locator("#item-0")).toBeVisible();

  await page.goto("https://demoqa.com/text-box");
  
  await expect(page).toHaveURL("https://demoqa.com/text-box");

  await page.click("#userName");
  
  await expect(page.locator("#userName")).toBeVisible();

  await page.fill("#userName", "s");
  await page.fill("#userName", "sf");
  await page.fill("#userName", "sfs");
  await page.fill("#userName", "sfsr");
  await page.fill("#userName", "sfsrg");
  await page.fill("#userName", "sfsrgd");
  await page.fill("#userName", "sfsrgdr");
  await page.fill("#userName", "sfsrgdrg");
  await page.click("#userEmail");
  
  await expect(page.locator("#userEmail")).toBeVisible();

  await page.fill("#userEmail", "g");
  await page.fill("#userEmail", "gd");
  await page.fill("#userEmail", "gds");
  await page.fill("#userEmail", "gdsg");
  await page.fill("#userEmail", "gdsgr");
  await page.fill("#userEmail", "gdsgrd");
  await page.fill("#userEmail", "gdsgrdf");
  await page.fill("#userEmail", "gdsgrdfg");
  await page.click("#currentAddress");
  
  await expect(page.locator("#currentAddress")).toBeVisible();

  await page.fill("#currentAddress", "g");
  await page.fill("#currentAddress", "gd");
  await page.fill("#currentAddress", "gdx");
  await page.fill("#currentAddress", "gdxd");
  await page.fill("#currentAddress", "gdxdf");
  await page.fill("#currentAddress", "gdxdfb");
  await page.fill("#currentAddress", "gdxdfbd");
  await page.fill("#currentAddress", "gdxdfbdf");
  await page.click("#item-4");
  
  await expect(page.locator("#item-4")).toBeVisible();

  await page.goto("https://demoqa.com/buttons");
  
  await expect(page).toHaveURL("https://demoqa.com/buttons");

  await page.click("#HA3XW");
  
  await expect(page.locator("#HA3XW")).toBeVisible();

  await page.click("#doubleClickBtn");
  
  await expect(page.locator("#doubleClickBtn")).toBeVisible();

  await page.click("#doubleClickBtn");
  
  await expect(page.locator("#doubleClickBtn")).toBeVisible();

  await page.click("span:nth-of-type(1)");
  
  await expect(page.locator("span:nth-of-type(1)")).toBeVisible();

  await page.goto("https://demoqa.com/checkbox");
  
  await expect(page).toHaveURL("https://demoqa.com/checkbox");

  await page.click("svg:nth-of-type(1)");
  
  await expect(page.locator("svg:nth-of-type(1)")).toBeVisible();

  await page.click("#tree-node-home");
  
  await expect(page.locator("#tree-node-home")).toBeVisible();

  await page.fill("#tree-node-home", "on");
  await page.click("svg:nth-of-type(1)");
  
  await expect(page.locator("svg:nth-of-type(1)")).toBeVisible();

  await page.click("#tree-node-home");
  
  await expect(page.locator("#tree-node-home")).toBeVisible();

  await page.fill("#tree-node-home", "on");
});
