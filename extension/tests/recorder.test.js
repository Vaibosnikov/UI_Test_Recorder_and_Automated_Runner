import { expect } from "chai";

// Mock Chrome APIs
global.chrome = {
  runtime: { sendMessage: () => {} },
  tabs: { sendMessage: () => {} }
};

describe("Recorder Extension", () => {
  it("should initialize background script without errors", () => {
    const bg = require("../src/background.js");
    expect(bg).to.exist;
  });

  it("should capture click events and serialize correctly", () => {
    const { serializeEvent } = require("../src/capture.js");
    const mockEvent = { type: "click", target: { id: "btn1" } };
    const result = serializeEvent(mockEvent);
    expect(result).to.include({ type: "click" });
    expect(result.targetId).to.equal("btn1");
  });

  it("should handle multiple events in sequence", () => {
    const { serializeEvents } = require("../src/capture.js");
    const events = [
      { type: "click", target: { id: "btn1" } },
      { type: "input", target: { id: "txt1" }, value: "hello" }
    ];
    const result = serializeEvents(events);
    expect(result).to.have.length(2);
  });
});
