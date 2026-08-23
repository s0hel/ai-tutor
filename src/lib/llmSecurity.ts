import type { ChatMessage } from "./types";

const MAX_TEXT_CHARS = 1000;
const MAX_HISTORY_MESSAGES = 25;
const MAX_REQUEST_BYTES = 32 * 1024;

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions?/i,
  /ignore\s+(the\s+)?system\s+prompt?/i,
  /reveal\s+(the\s+)?system\s+prompt?/i,
  /show\s+(your\s+)?hidden\s+instructions?/i,
  /developer\s+mode/i,
  /jailbreak/i,
  /override\s+(your\s+)?instructions?/i,
  /act\s+as\s+(an?\s+)?(developer|admin|system|god|root)/i,
  /you\s+are\s+now/i,
  /pretend\s+to\s+be/i,
  /bypass\s+(safety|security|filters?)/i,
  /do\s+not\s+follow\s+the\s+above/i,
  /disregard\s+(all\s+)?prior\s+instructions?/i,
  /output\s+(the\s+)?raw\s+prompt/i,
  /exfiltrate/i,
];

function normalizeText(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

export function containsPromptInjectionAttempt(value: string): boolean {
  const normalized = normalizeText(value).toLowerCase();
  return normalized.length > 0 && PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function sanitizeLlmText(value: string, options?: { maxChars?: number }): string {
  const maxChars = options?.maxChars ?? MAX_TEXT_CHARS;
  const normalized = normalizeText(String(value ?? ""));

  if (!normalized) return "";
  if (containsPromptInjectionAttempt(normalized)) {
    return "[User message omitted because it appears to contain instructions intended to override the tutor, reveal hidden prompts, or bypass safety rules.]";
  }

  return normalized.slice(0, maxChars);
}

export function sanitizeHistoryForModel(history: ChatMessage[]): ChatMessage[] {
  return history.slice(-MAX_HISTORY_MESSAGES).map((message) => ({
    ...message,
    text: sanitizeLlmText(message.text),
  }));
}

export function validateRequestSize(payload: unknown): void {
  const serialized = JSON.stringify(payload ?? {});
  const size = Buffer.byteLength(serialized ?? "", "utf8");
  if (size > MAX_REQUEST_BYTES) {
    throw new Error("Request payload too large.");
  }
}
