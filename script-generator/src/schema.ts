export type ClickEvent = { kind: 'click'; selector: string; text?: string; ts?: number; url?: string };
export type InputEvent = { kind: 'input'; selector: string; value: string; ts?: number; url?: string };
export type RecordedEvent = ClickEvent | InputEvent;
export type Recording = RecordedEvent[];
