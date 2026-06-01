import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  langA: string;
  langB: string;
  scriptA: string;
  ollamaUrl: string;
  model: string;
}

interface OllamaChatResponse {
  message: { role: string; content: string };
  done: boolean;
}

const SYSTEM_PROMPT = "You are a translator. Output only the translation, nothing else.";

const SCRIPT_RANGES: Record<string, RegExp> = {
  cyrillic: /[Ѐ-ӿ]/g,
  arabic: /[؀-ۿ]/g,
  han: /[一-鿿]/g,
  hangul: /[가-힯]/g,
  hiragana: /[぀-ゟ]/g,
  katakana: /[゠-ヿ]/g,
  devanagari: /[ऀ-ॿ]/g,
  thai: /[฀-๿]/g,
  georgian: /[Ⴀ-ჿ]/g,
  armenian: /[԰-֏]/g,
  hebrew: /[֐-׿]/g,
  greek: /[Ͱ-Ͽ]/g,
};

function isLangA(text: string, scriptA: string): boolean {
  if (!scriptA) return false;
  const pattern = SCRIPT_RANGES[scriptA.toLowerCase()];
  if (!pattern) return false;
  const matches = text.match(pattern) || [];
  return matches.length > text.length * 0.3;
}

export async function translate(text: string): Promise<{ translation: string; direction: string }> {
  const { langA, langB, scriptA, ollamaUrl, model } = getPreferenceValues<Preferences>();

  const inputIsLangA = isLangA(text, scriptA);
  const targetLang = inputIsLangA ? langB : langA;
  const direction = inputIsLangA ? `${langA} → ${langB}` : `${langB} → ${langA}`;

  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Translate to ${targetLang}: ${text}` },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Ollama error (${response.status}): ${body}`);
  }

  const data = (await response.json()) as OllamaChatResponse;
  return { translation: data.message.content.trim(), direction };
}
