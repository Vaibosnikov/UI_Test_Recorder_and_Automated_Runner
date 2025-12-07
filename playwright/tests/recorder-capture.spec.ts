import { test, expect } from '@playwright/test';

// Simulated capture logic test: verify serialization of browser events
test('Recorder: should serialize click and input events correctly', async () => {
  const serializeEvent = (event: any) => {
    if (event.type === 'click') return { type: 'click', selector: `#${event.target.id}` };
    if (event.type === 'input') return { type: 'input', selector: `[name='${event.target.name}']`, value: event.target.value };
    return null;
  };

  const clickEvent = { type: 'click', target: { id: 'btnSubmit' } };
  const inputEvent = { type: 'input', target: { name: 'username', value: 'vaishnavi' } };

  const clickResult = serializeEvent(clickEvent);
  const inputResult = serializeEvent(inputEvent);

  expect(clickResult).toEqual({ type: 'click', selector: '#btnSubmit' });
  expect(inputResult).toEqual({ type: 'input', selector: "[name='username']", value: 'vaishnavi' });
});
