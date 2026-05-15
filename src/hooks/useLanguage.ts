import { useEffect, useState } from "react";
import type { Language } from "../content";

const languageStorageKey = "caniello.language";
const supportedLanguages = new Set<Language>(["pl", "en"]);

function isSupportedLanguage(value: string | null): value is Language {
  return value !== null && supportedLanguages.has(value as Language);
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "pl";
    }

    const storedLanguage = window.localStorage.getItem(languageStorageKey);

    return isSupportedLanguage(storedLanguage) ? storedLanguage : "pl";
  });

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
  }, [language]);

  return { language, setLanguage };
}
