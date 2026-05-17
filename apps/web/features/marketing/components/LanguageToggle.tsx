import type { Language } from "../content";

type LanguageToggleProps = {
  language: Language;
  onChange: (language: Language) => void;
};

const options: Array<{ value: Language; label: string }> = [
  { value: "pl", label: "PL" },
  { value: "en", label: "EN" }
];

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-md border border-navy/10 bg-white p-1 shadow-sm" aria-label="Language">
      {options.map((option) => {
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
