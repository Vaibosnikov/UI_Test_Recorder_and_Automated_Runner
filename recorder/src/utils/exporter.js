// TestCraft Recorder - Event Exporter Utility

export class EventExporter {
  constructor() {
    this.format = 'testcraft-json-v1';
  }

  /**
   * Export captured events to TestCraft JSON format
   * @param {Array} events - Array of captured event objects
   * @param {Object} metadata - Optional metadata (name, description, etc.)
   * @returns {Object} Formatted JSON object
   */
  export(events, metadata = {}) {
    return {
      format: this.format,
      version: '1.0.0',
      metadata: {
        name: metadata.name || 'TestCraft Recording',
        description: metadata.description || '',
        createdAt: new Date().toISOString(),
        ...metadata
      },
      events: events.map(event => this.formatEvent(event))
    };
  }

  /**
   * Format a single event for export
   * @param {Object} event - Raw event object
   * @returns {Object} Formatted event
   */
  formatEvent(event) {
    return {
      type: event.type,
      timestamp: event.timestamp,
      target: {
        selector: event.target,
        value: event.value,
        text: event.text
      },
      coordinates: {
        x: event.x,
        y: event.y
      }
    };
  }

  /**
   * Convert export object to JSON string
   * @param {Object} exportData - Export object from export()
   * @returns {string} JSON string
   */
  toJSON(exportData) {
    return JSON.stringify(exportData, null, 2);
  }
}

export default EventExporter;
