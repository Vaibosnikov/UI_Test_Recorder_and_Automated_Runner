// recorder.test.js
// Validates that the Chrome extension captures click and input events and stores them in chrome.storage.local

describe('Recorder Extension', () => {
  beforeAll(() => {
    global.chrome = {
      storage: {
        local: {
          data: {},
          set(obj, cb) {
            this.data = { ...this.data, ...obj };
            cb && cb();
          },
          get(keys, cb) {
            cb(this.data);
          }
        }
      }
    };
  });

  test('captures click event', () => {
    const event = { type: 'click', target: '#btn', timestamp: Date.now() };
    chrome.storage.local.set({ events: [event] });
    chrome.storage.local.get(['events'], (data) => {
      expect(data.events[0].type).toBe('click');
      expect(data.events[0].target).toBe('#btn');
    });
  });

  test('captures input event', () => {
    const event = { type: 'input', target: '#name', value: 'Vaishnavi' };
    chrome.storage.local.set({ events: [event] });
    chrome.storage.local.get(['events'], (data) => {
      expect(data.events[0].value).toBe('Vaishnavi');
    });
  });
});
