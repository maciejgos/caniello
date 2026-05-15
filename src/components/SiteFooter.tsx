import { Link } from "react-router-dom";
import { BrandWordmark } from "./BrandWordmark";
import type { Language } from "../content";
import { copy } from "../content";

type SiteFooterProps = {
  language: Language;
};

export function SiteFooter({ language }: SiteFooterProps) {
  const text = copy[language];

  return (
    <footer className="mx-auto w-full max-w-[1664px] border-t border-navy/10 px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
      <div className="grid gap-8 md:grid-cols-[minmax(220px,1fr)_auto] md:items-start">
        <div>
          <BrandWordmark small />
          <p className="mt-4 max-w-[280px] text-sm leading-6 text-navy">{text.footerText}</p>
          <p className="mt-3 text-xs text-navy/70">© 2026 Caniello. All rights reserved.</p>
        </div>
        <div className="grid gap-4 text-sm text-navy sm:justify-items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end" aria-label="Footer">
            {text.footerLinks.map((item) => (
              <Link className="font-bold hover:text-gold" to={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="text-sm font-semibold text-navy/75 hover:text-gold" href={`mailto:${text.footerContactEmail}`}>
            {text.footerContactLabel}: {text.footerContactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
