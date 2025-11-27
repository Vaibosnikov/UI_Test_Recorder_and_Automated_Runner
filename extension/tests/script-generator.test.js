import { expect } from "chai";
import { generatePlaywrightScript } from "../../src/script-generator.js";

describe("Script Generator", () => {
  it("should generate a Playwright script from click event", () => {
    const events = [{ type: "click", targetId: "btn1" }];
    const script = generatePlaywrightScript(events);
    expect(script).to.include("await page.click('#btn1')");
  });

  it("should generate input typing commands", () => {
    const events = [{ type: "input", targetId: "txt1", value: "hello" }];
    const script = generatePlaywrightScript(events);
    expect(script).to.include("await page.fill('#txt1', 'hello')");
  });

  it("should handle multiple events in order", () => {
    const events = [
      { type: "click", targetId: "btn1" },
      { type: "input", targetId: "txt1", value: "hello" }
    ];
    const script = generatePlaywrightScript(events);
    expect(script).to.match(/page\.click.*page\.fill/s);
  });
});
