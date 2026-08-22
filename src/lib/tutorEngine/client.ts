import Anthropic from "@anthropic-ai/sdk";

export const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
// Used for the practice-phase reword/feedback-phrasing calls, which don't judge or reason —
// they just restate pre-computed data in Kip's voice, so a cheaper model is plenty.
export const HAIKU_MODEL = process.env.ANTHROPIC_HAIKU_MODEL || "claude-haiku-4-5";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
// Dev-only: set OLLAMA_MODEL in .env.local to route tutor calls to a local Ollama model
// instead of the Anthropic API, so local iteration doesn't spend API credits. Never active
// in production, regardless of env — mirrors the dev-login auth bypass's gating pattern.
const useOllama = process.env.NODE_ENV !== "production" && !!process.env.OLLAMA_MODEL;

interface CreateParams {
  model: string;
  max_tokens: number;
  system: Anthropic.TextBlockParam[];
  messages: Anthropic.MessageParam[];
  tools: Anthropic.Tool[];
  tool_choice: { type: "tool"; name: string };
}

interface LLMResponse {
  content: Anthropic.ContentBlock[];
}

interface LLMClient {
  messages: { create(params: CreateParams): Promise<LLMResponse> };
}

let anthropicClient: Anthropic | null = null;
function realAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.example).");
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

function flattenContent(content: Anthropic.MessageParam["content"]): string {
  if (typeof content === "string") return content;
  return content
    .map((block) => ("text" in block ? block.text : ""))
    .filter(Boolean)
    .join("\n");
}

async function ollamaCreate(params: CreateParams): Promise<LLMResponse> {
  const systemText = params.system.map((b) => b.text).join("\n\n");
  const messages = [
    { role: "system", content: systemText },
    ...params.messages.map((m) => ({ role: m.role, content: flattenContent(m.content) })),
  ];
  const tool = params.tools.find((t) => t.name === params.tool_choice.name) ?? params.tools[0];

  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL,
      messages,
      stream: false,
      tools: [{ type: "function", function: { name: tool.name, description: tool.description, parameters: tool.input_schema } }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Ollama request failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  const call = data?.message?.tool_calls?.[0];
  if (!call) {
    throw new Error(
      `Ollama model "${process.env.OLLAMA_MODEL}" did not return a tool call — it may not support tool calling well enough for this app. Try a larger/newer model (e.g. llama3.1, qwen2.5) or unset OLLAMA_MODEL to use the real Anthropic API.`
    );
  }
  const input = typeof call.function.arguments === "string" ? JSON.parse(call.function.arguments) : call.function.arguments;

  return {
    content: [{ type: "tool_use", id: "ollama-tool-call", name: call.function.name, input } as Anthropic.ContentBlock],
  };
}

export function getClient(): LLMClient {
  if (useOllama) {
    return { messages: { create: ollamaCreate } };
  }
  return realAnthropicClient() as unknown as LLMClient;
}
