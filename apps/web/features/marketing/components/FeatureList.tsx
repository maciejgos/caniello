import type { Language } from "../content";
import { copy } from "../content";

type FeatureListProps = {
  language: Language;
};

export function FeatureList({ language }: FeatureListProps) {
  const text = copy[language];
  const icons = ["record", "bell", "people", "shield"];

  return (
    <section className="bg-white py-20 sm:py-24" id="features" aria-labelledby="features-title">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl font-bold text-navy sm:text-4xl" id="features-title">
          {text.featuresTitle}
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {text.features.map((feature, index) => (
            <article className="text-center" key={feature.title}>
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cream text-navy">
                <FeatureIcon name={icons[index]} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{feature.title}</h3>
              <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-navy/75">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name: string }) {
  if (name === "bell") {
    return (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 17H9a3 3 0 0 1-3-3v-2a6 6 0 1 1 12 0v2a3 3 0 0 1-3 3Z" />
        <path d="M10 20h4" />
        <path d="M12 4V2" />
      </svg>
    );
  }

  if (name === "people") {
    return (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M16 12a3.5 3.5 0 1 0 0-7" />
        <path d="M2.5 21a5.5 5.5 0 0 1 11 0" />
        <path d="M14.5 16.5A5 5 0 0 1 21.5 21" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 4.5 6v5.5c0 4.5 3 7.8 7.5 9.5 4.5-1.7 7.5-5 7.5-9.5V6L12 3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  return (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h3" />
      <path d="M17 16v6" />
      <path d="M14 19h6" />
    </svg>
  );
}
