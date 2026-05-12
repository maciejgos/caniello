import { useEffect, useState } from "react";
import type { Language } from "../content";

const languageStorageKey = "caniello.language";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "pl";
    }

    return (window.localStorage.getItem(languageStorageKey) as Language | null) ?? "pl";
  });

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
  }, [language]);

  return { language, setLanguage };
}
