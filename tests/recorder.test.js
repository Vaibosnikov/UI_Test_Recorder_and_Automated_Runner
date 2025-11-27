// recorder.test.js
describe("Recorder Extension - Capture Logic", () => {
  beforeAll(async () => {
    // Simulate extension init
    await chrome.runtime.sendMessage({ action: "init" });
  });

  test("should capture click events", async () => {
    const event = { type: "click", target: "#btnSubmit" };
    const result = await chrome.runtime.sendMessage({ action: "capture", event });
    expect(result).toEqual({ success: true, event });
  });

  test("should capture input events", async () => {
    const event = { type: "input", target: "#username", value: "vaishnavi" };
    const result = await chrome.runtime.sendMessage({ action: "capture", event });
    expect(result.event.value).toBe("vaishnavi");
  });
});
