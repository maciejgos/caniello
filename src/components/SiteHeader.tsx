import { Link } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { BrandWordmark } from "./BrandWordmark";
import type { Language } from "../content";
import { copy } from "../content";

type SiteHeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function SiteHeader({ language, onLanguageChange }: SiteHeaderProps) {
  const text = copy[language];

  return (
    <header className="mx-auto flex w-full max-w-[1664px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
      <Link className="block" to="/" aria-label="Caniello home">
        <BrandWordmark />
      </Link>

      <nav className="hidden items-center gap-10 text-[13px] font-bold text-navy lg:flex" aria-label="Primary">
        {text.navItems.map((item) => (
          <a className="transition hover:text-gold" href={`/${item.href}`} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <LanguageToggle language={language} onChange={onLanguageChange} />
        <a className="hidden rounded-lg bg-navy px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft sm:inline-flex" href="/#waitlist">
          {text.navCta}
        </a>
      </div>
    </header>
  );
}
