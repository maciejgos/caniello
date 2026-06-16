import { useEffect, useState } from "react";
import type { Language } from "../content";

const languageStorageKey = "caniello.language";
const supportedLanguages = new Set<Language>(["pl", "en"]);

function isSupportedLanguage(value: string | null): value is Language {
  return value !== null && supportedLanguages.has(value as Language);
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("pl");
  const [hasLoadedStoredLanguage, setHasLoadedStoredLanguage] = useState(false);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    if (isSupportedLanguage(storedLanguage)) {
      setLanguage(storedLanguage);
    }
    setHasLoadedStoredLanguage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredLanguage) return;
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
  }, [hasLoadedStoredLanguage, language]);

  return { language, setLanguage };
}
