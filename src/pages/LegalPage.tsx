import type { Language, LegalPageKey } from "../content";
import { copy } from "../content";

type LegalPageProps = {
  language: Language;
  pageKey: LegalPageKey;
};

export function LegalPage({ language, pageKey }: LegalPageProps) {
  const text = copy[language];
  const page = text.legalPages[pageKey];

  return (
    <article className="bg-white px-5 pb-14 pt-8 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <a className="text-sm font-bold text-navy/70 hover:text-gold" href="/">
          {text.legalBackLabel}
        </a>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-gold">{page.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-navy sm:text-5xl">{page.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-navy">{page.intro}</p>
        <p className="mt-5 rounded-lg border border-gold/30 bg-cream px-4 py-3 text-sm font-semibold leading-6 text-navy">{text.legalDraftNotice}</p>
        <p className="mt-4 text-sm text-navy/70">{page.updated}</p>

        <div className="mt-10 grid gap-8">
          {page.sections.map((section) => (
            <section className="border-t border-navy/10 pt-7" key={section.title}>
              <h2 className="font-serif text-2xl font-bold leading-tight text-navy">{section.title}</h2>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-navy">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
