/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Language A - First language (e.g. Russian, German, French) */
  "langA": string,
  /** Language B - Second language (e.g. English, Spanish, Japanese) */
  "langB": string,
  /** Language A Script - Unicode script regex for detection (e.g. Cyrillic, Han, Arabic). Leave empty for Latin-based languages. */
  "scriptA": string,
  /** Ollama URL - Base URL of the Ollama API */
  "ollamaUrl": string,
  /** Model - Ollama model to use for translation */
  "model": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `translate` command */
  export type Translate = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `translate` command */
  export type Translate = {
  /** Text to translate */
  "text": string
}
}

