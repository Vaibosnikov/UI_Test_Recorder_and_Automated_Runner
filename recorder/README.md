# TestCraft Recorder

Chrome extension (Manifest V3) that captures user interactions in the browser and exports them to JSON format for use with TestCraft's script generator.

## Features

- Captures clicks, typing, navigation, and form submissions
- Exports to TestCraft-compatible JSON format
- Custom selector support
- Wait condition configuration

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select this `recorder/` folder
5. The TestCraft icon should appear in your toolbar

## Usage

1. Click the TestCraft icon to open the recorder popup
2. Click "Start Recording"
3. Interact with your web application
4. Click "Stop Recording"
5. Click "Export" to download the JSON file

## File Structure

```
recorder/
├── manifest.json          # Extension configuration
├── src/
│   ├── background/
│   │   ├── background.js
│   │   └── service-worker.js
│   ├── content-scripts/
│   │   ├── overlay.js
│   │   └── recorder.js
│   ├── icons/
│   │   └── icon*.png
│   ├── ui/
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.js
│   └── utils/
│       ├── exporter.js
│       └── selector.js
└── samples/
    └── *.json
```

## Development

### Debugging

- **Service Worker**: Open `chrome://extensions/`, click "Service Worker" under the extension
- **Popup**: Right-click the extension icon → "Inspect popup"
- **Content Scripts**: Open DevTools on any page → Console tab

### Testing

Use the sample recordings in `samples/` to verify the script generator compatibility.

## License

MIT License
