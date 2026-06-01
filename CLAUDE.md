# Raycast Translate

Offline RU↔EN translation via local Ollama + translategemma.

## Commands

```
npm run dev     # Develop in Raycast
npm run build   # Build extension
npm run lint    # Lint
```

## Architecture

- `src/ollama.ts` — Ollama API client, language detection, prompt construction
- `src/translate.tsx` — Raycast command (argument-based, Detail view)

## How it works

1. User invokes "Translate" with text argument
2. Language detection via Cyrillic character ratio
3. Sends chat request to local Ollama with system prompt for clean output
4. Shows translation with copy/paste actions
