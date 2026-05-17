import Link from "next/link";
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
        <Link className="text-sm font-bold text-navy/70 hover:text-gold" href="/">
          {text.legalBackLabel}
        </Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-gold">{page.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-navy sm:text-5xl">{page.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-navy">{page.intro}</p>
        <p className="mt-4 text-sm text-navy/70">{page.updated}</p>

        <div className="mt-10 grid gap-8">
          {page.sections.map((section) => (
            <section className="border-t border-navy/10 pt-7" key={section.title}>
              <h2 className="font-serif text-2xl font-bold leading-tight text-navy">{section.title}</h2>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-navy">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{renderParagraphWithEmailLinks(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

function renderParagraphWithEmailLinks(paragraph: string) {
  const emailPattern = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
  const parts = paragraph.split(emailPattern);

  return parts.map((part, index) => {
    if (emailPattern.test(part)) {
      emailPattern.lastIndex = 0;
      return (
        <a className="font-semibold text-gold hover:text-navy" href={`mailto:${part}`} key={`${paragraph}-${part}-${index}`}>
          {part}
        </a>
      );
    }

    emailPattern.lastIndex = 0;
    return part;
  });
}
