import type { ReactNode } from "react";
import type { Feature } from "../content";
import { BenefitIcon, FeatureIcon } from "./icons/LandingIcons";

type ResearchHeroSectionProps = {
  backHref?: string;
  backLabel?: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
  eyebrow: string;
  imageAlt: string;
  imageSrc: string;
  note: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
  tone?: "gold" | "violet";
};

type FeatureOverviewSectionProps = {
  features: Feature[];
  id?: string;
  title: string;
};

type CareFlowCtaSectionProps = {
  benefits: Feature[];
  body: string;
  form: ReactNode;
  imageAlt?: string;
  imageSrc: string;
  steps: Feature[];
  stepsTitle: string;
  title: string;
};

export function ResearchHeroSection({
  backHref,
  backLabel,
  body,
  ctaHref,
  ctaLabel,
  eyebrow,
  imageAlt,
  imageSrc,
  note,
  secondaryHref = "#future-waves",
  secondaryLabel,
  title,
  tone = "gold"
}: ResearchHeroSectionProps) {
  return (
    <section className="bg-white px-5 pb-8 pt-2 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto grid w-full max-w-[1664px] items-center gap-8 pt-4 lg:grid-cols-[0.86fr_1.4fr] lg:gap-10 lg:pt-8">
        <div className="relative z-10">
          <div className={`inline-flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-bold ${tone === "gold" ? "bg-cream text-gold" : "bg-[#efecff] text-[#5448a8]"}`}>
            <HeroBadgeIcon tone={tone} />
            <span>{eyebrow}</span>
          </div>
          <h1 className="mt-6 max-w-[660px] font-serif text-5xl font-bold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-5 max-w-[590px] text-base leading-7 text-navy sm:text-[17px]">{body}</p>
          <p className="mt-5 flex items-center gap-3 text-sm font-semibold text-navy/72">
            <LockMiniIcon />
            {note}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a className="inline-flex h-12 items-center rounded-lg bg-navy px-8 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft" href={ctaHref}>
              {ctaLabel}
            </a>
            {secondaryLabel ? (
              <a className="inline-flex h-12 items-center gap-3 rounded-lg px-2 text-sm font-bold text-navy transition hover:text-gold" href={secondaryHref}>
                {secondaryLabel}
                <ArrowMiniIcon />
              </a>
            ) : null}
          </div>
          {backHref && backLabel ? (
            <a className="mt-5 inline-flex text-sm font-bold text-navy/70 transition hover:text-gold" href={backHref}>
              {backLabel}
            </a>
          ) : null}
        </div>

        <div className={`relative overflow-hidden rounded-lg ${tone === "gold" ? "bg-cream/45" : "bg-[#f5f3ff]"}`}>
          <img className="h-auto min-h-[320px] w-full object-contain object-bottom lg:min-h-[430px]" src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}

export function FeatureOverviewSection({ features, id = "features", title }: FeatureOverviewSectionProps) {
  return (
    <section className="bg-white px-5 pb-12 pt-8 sm:px-8 lg:px-12 lg:pt-10 xl:px-16" id={id} aria-labelledby={`${id}-title`}>
      <div className="mx-auto w-full max-w-[1664px]">
        <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl" id={`${id}-title`}>
          {title}
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-14">
          {features.map((feature, index) => (
            <article className="text-center" key={feature.title}>
              <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full bg-cream text-navy">
                <FeatureIcon index={index} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-navy">{feature.title}</h3>
              <p className="mx-auto mt-3 max-w-[220px] text-xs leading-5 text-navy">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroBadgeIcon({ tone }: { tone: "gold" | "violet" }) {
  if (tone === "violet") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20V9l8-5 8 5v11" />
        <path d="M9 20v-6h6v6" />
        <path d="M12 8v4" />
        <path d="M10 10h4" />
        <circle cx="18" cy="17" r="3" />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10h16l-1.2-4H5.2L4 10Z" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
      <path d="M3.5 10c0 1.5 1.1 2.6 2.5 2.6S8.5 11.5 8.5 10" />
      <path d="M8.5 10c0 1.5 1.1 2.6 2.5 2.6s2.5-1.1 2.5-2.6" />
      <path d="M13.5 10c0 1.5 1.1 2.6 2.5 2.6s2.5-1.1 2.5-2.6" />
    </svg>
  );
}

function LockMiniIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <path d="M6 11h12v9H6z" />
    </svg>
  );
}

function ArrowMiniIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

export function CareFlowCtaSection({ benefits, body, form, imageAlt = "", imageSrc, steps, stepsTitle, title }: CareFlowCtaSectionProps) {
  return (
    <section className="bg-white px-5 pb-0 pt-10 sm:px-8 lg:px-12 xl:px-16" id="how-it-works">
      <div className="mx-auto w-full max-w-[1664px]">
        <div className="grid items-stretch gap-4 xl:grid-cols-[0.9fr_2.15fr]">
          <section className="flex h-full flex-col rounded-lg border border-navy/10 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="how-title">
            <h2 className="font-serif text-3xl font-bold leading-tight text-navy" id="how-title">
              {stepsTitle}
            </h2>
            <ol className="mt-5 grid gap-0">
              {steps.map((step, index) => (
                <li className="grid grid-cols-[42px_1fr] gap-4" key={step.title}>
                  <div className="flex flex-col items-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-sm font-bold text-navy">{index + 1}</span>
                    {index < steps.length - 1 ? <span className="h-16 w-px bg-navy/12" /> : null}
                  </div>
                  <div className="pb-5 pt-1">
                    <strong className="block text-sm font-bold text-navy">{step.title}</strong>
                    <span className="mt-1 block text-sm leading-6 text-navy">{step.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <aside className="flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-cream shadow-sm">
            <div className="relative flex-1 px-5 pb-6 pt-7 sm:px-8 xl:min-h-0">
              <div className="relative z-10 max-w-[430px]">
                <h2 className="font-serif text-3xl font-bold leading-[1.08] text-navy sm:text-4xl">{title}</h2>
                <p className="mt-4 max-w-[390px] text-base leading-7 text-navy">{body}</p>
                <div className="mt-6">{form}</div>
              </div>
              <div className="pointer-events-none absolute bottom-4 right-0 h-[210px] w-[330px] overflow-hidden sm:bottom-5 sm:h-[275px] sm:w-[430px] lg:h-[330px] lg:w-[520px] xl:h-[360px] xl:w-[570px]">
                <img className="h-full w-full object-contain object-bottom" src={imageSrc} alt={imageAlt} aria-hidden={imageAlt === "" ? "true" : undefined} />
              </div>
            </div>

            <div className="grid shrink-0 gap-5 border-t border-navy/10 bg-white/55 px-5 py-5 sm:px-8 md:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div className="grid grid-cols-[34px_1fr] gap-3" key={benefit.title}>
                  <BenefitIcon index={index} />
                  <div>
                    <h3 className="text-sm font-bold text-navy">{benefit.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-navy">{benefit.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
