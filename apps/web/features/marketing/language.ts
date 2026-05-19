import type { LandingLeadLanguage } from "@caniello/contracts";
import type { Language } from "./content";

export const languageOptions: Array<{ value: Language; label: "PL" | "EN" }> = [
  { value: "pl", label: "PL" },
  { value: "en", label: "EN" }
];

export function getLanguageLabel(language: LandingLeadLanguage) {
  return languageOptions.find((option) => option.value === language)?.label ?? language.toUpperCase();
}
