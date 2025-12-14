export function convertToScriptGeneratorFormat(events, baseUrl="http://localhost:5000") {
  return {
    name: "Recorded Flow",
    description: "Generated using TestCraft Recorder",
    baseUrl,
    steps: events.map(ev => {
      if (ev.type === "click") {
        return { type: "click", selector: ev.selector };
      }
      if (ev.type === "fill") {
        return { type: "fill", selector: ev.selector, value: ev.value };
      }
      return ev;
    })
  };
}
