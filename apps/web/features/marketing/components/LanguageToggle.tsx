import type { Language } from "../content";
import { languageOptions } from "../language";

type LanguageToggleProps = {
  language: Language;
  onChange: (language: Language) => void;
};

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-md border border-navy/10 bg-white p-1 shadow-sm" aria-label="Language">
      {languageOptions.map((option) => {
        const isActive = language === option.value;

        return (
          <button
            className={`min-h-9 min-w-11 rounded px-3 text-sm font-bold transition ${
              isActive ? "bg-navy text-white" : "text-navy hover:bg-cream"
            }`}
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
