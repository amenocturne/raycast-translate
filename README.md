# Raycast Translate

Offline Russian ↔ English translation using local Ollama + translategemma.

## Setup

1. Install [Ollama](https://ollama.com) and pull the model:
   ```
   ollama pull translategemma
   ```
2. Clone and install:
   ```
   cd raycast-translate
   npm install
   npm run dev
   ```
3. In Raycast, search "Translate" and type your text.

## Usage

Type Russian text → get English. Type English text → get Russian. Language is auto-detected.
