import Anthropic from "@anthropic-ai/sdk";

export const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
// Used for the practice-phase reword/feedback-phrasing calls, which don't judge or reason —
// they just restate pre-computed data in Kip's voice, so a cheaper model is plenty.
export const HAIKU_MODEL = process.env.ANTHROPIC_HAIKU_MODEL || "claude-haiku-4-5";

let client: Anthropic | null = null;
export function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.example).");
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}
