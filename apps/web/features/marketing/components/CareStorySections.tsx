import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import type { Feature } from "../content";
import { BenefitIcon, FeatureIcon, LargePawIcon, LockIcon } from "./icons/LandingIcons";

type ImageSource = string | StaticImageData;

type MarketingHeroSectionProps = {
  benefits: string[];
  body: string;
  eyebrow: string;
  form: ReactNode;
  imageAlt: string;
  imageSrc: ImageSource;
  layout?: "spacious" | "compact";
  proof: string;
  privacyNote?: string;
  title: string;
  tone?: "gold" | "violet";
};

type FeatureOverviewSectionProps = {
  features: Feature[];
  id?: string;
  spacing?: "normal" | "compact";
  title: string;
};

type CareFlowCtaSectionProps = {
  benefits: Feature[];
  body: string;
  form: ReactNode;
  imageAlt?: string;
  imageSrc: ImageSource;
  steps: Feature[];
  stepsTitle: string;
  title: string;
};

type FooterSignupSectionProps = {
  body: string;
  form: ReactNode;
  title: string;
};

type TrustSectionProps = {
  body: string;
  disclaimer: string;
  title: string;
};

export function MarketingHeroSection({
  benefits,
  body,
  eyebrow,
  form,
  imageAlt,
  imageSrc,
  layout = "spacious",
  proof,
  privacyNote,
  title,
  tone = "gold"
}: MarketingHeroSectionProps) {
  const isCompact = layout === "compact";

  return (
    <section className="overflow-hidden bg-white" id="top">
      <div
        className={`mx-auto grid w-full max-w-[1664px] items-start px-5 sm:px-8 lg:grid-cols-[minmax(520px,0.78fr)_minmax(0,1fr)] lg:px-12 xl:px-16 ${
          isCompact ? "gap-7 pb-0 pt-6 sm:pt-8 lg:gap-8 lg:pb-0 lg:pt-10" : "gap-10 pb-8 pt-8 sm:pt-10 lg:pb-10 lg:pt-14"
        }`}
      >
        <div className="relative z-10 max-w-[640px]">
          <div className={`inline-flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-bold ${tone === "gold" ? "bg-cream text-gold" : "bg-[#efecff] text-[#5448a8]"}`}>
            <HeroBadgeIcon tone={tone} />
            <span>{eyebrow}</span>
          </div>

          <h1 className={`${isCompact ? "mt-6" : "mt-7"} font-serif text-5xl font-bold leading-[1.02] tracking-normal text-navy sm:text-6xl lg:text-7xl`} aria-label={title}>
            {splitHeroTitle(title).map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className={`${isCompact ? "mt-5" : "mt-7"} max-w-[560px] text-base leading-[1.7] text-navy sm:text-[17px]`}>{body}</p>
          <p className="mt-3 max-w-[560px] text-sm font-semibold leading-6 text-navy/75">{proof}</p>

          <ul className={`${isCompact ? "mt-6" : "mt-7"} grid gap-4 text-[15px] font-medium text-navy`}>
            {benefits.map((benefit) => (
              <li className="flex items-center gap-4" key={benefit}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                  <MiniCheckIcon />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className={isCompact ? "mt-7" : "mt-9"}>{form}</div>
          {privacyNote ? (
            <p className={`${isCompact ? "mt-3" : "mt-4"} flex items-center gap-3 text-xs text-navy/62`}>
              <LockIcon />
              {privacyNote}
            </p>
          ) : null}
        </div>

        <div className={`relative ${isCompact ? "min-h-[220px] sm:min-h-[300px] lg:min-h-[390px]" : "min-h-[340px] sm:min-h-[480px] lg:min-h-[610px]"}`} aria-label={imageAlt}>
          <img
            className={`absolute inset-x-1/2 top-0 h-auto max-w-none -translate-x-1/2 object-contain object-bottom lg:left-auto lg:right-0 lg:translate-x-0 ${
              isCompact ? "w-[min(760px,112vw)] lg:w-[min(780px,50vw)]" : "w-[min(760px,118vw)] lg:w-[min(870px,52vw)]"
            }`}
            src={resolveImageSrc(imageSrc)}
            alt={imageAlt}
          />
        </div>
      </div>
    </section>
  );
}

function splitHeroTitle(title: string) {
  return title.split(". ").map((line) => (line.endsWith(".") ? line : `${line}.`));
}

export function FeatureOverviewSection({ features, id = "features", spacing = "normal", title }: FeatureOverviewSectionProps) {
  return (
    <section
      className={`bg-white px-5 pb-12 sm:px-8 lg:px-12 xl:px-16 ${spacing === "compact" ? "pt-2 lg:pt-4" : "pt-8 lg:pt-10"}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
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

function MiniCheckIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="m5 10 3 3 7-7" />
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
              <div className="relative z-10 max-w-[560px]">
                <h2 className="font-serif text-3xl font-bold leading-[1.08] text-navy sm:text-4xl">{title}</h2>
                <p className="mt-4 max-w-[520px] text-base leading-7 text-navy">{body}</p>
                <div className="mt-6">{form}</div>
              </div>
              <div className="pointer-events-none absolute bottom-4 right-0 h-[210px] w-[330px] overflow-hidden sm:bottom-5 sm:h-[275px] sm:w-[430px] lg:h-[330px] lg:w-[520px] xl:right-10 xl:h-[360px] xl:w-[570px] 2xl:right-20">
                <img className="h-full w-full object-contain object-bottom" src={resolveImageSrc(imageSrc)} alt={imageAlt} aria-hidden={imageAlt === "" ? "true" : undefined} />
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

function resolveImageSrc(imageSrc: ImageSource) {
  return typeof imageSrc === "string" ? imageSrc : imageSrc.src;
}

export function FooterSignupSection({ body, form, title }: FooterSignupSectionProps) {
  return (
    <section className="mt-4 overflow-hidden rounded-lg bg-cream px-5 py-5 sm:px-8" aria-labelledby="footer-signup-title">
      <div className="grid gap-5 md:grid-cols-[0.16fr_0.52fr_0.32fr] md:items-center">
        <div className="hidden justify-center text-gold md:flex">
          <LargePawIcon />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold leading-tight text-navy" id="footer-signup-title">
            {title}
          </h2>
          <p className="mt-2 text-base leading-6 text-navy">{body}</p>
        </div>
        {form}
      </div>
    </section>
  );
}

export function TrustSection({ body, disclaimer, title }: TrustSectionProps) {
  return (
    <section className="bg-white px-5 pb-10 pt-4 sm:px-8 lg:px-12 xl:px-16" id="trust" aria-labelledby="trust-title">
      <div className="mx-auto grid w-full max-w-[1664px] gap-6 rounded-lg border border-navy/10 bg-white p-6 shadow-sm md:grid-cols-[0.45fr_1fr] md:p-8">
        <h2 className="font-serif text-3xl font-bold leading-tight text-navy" id="trust-title">
          {title}
        </h2>
        <div className="grid gap-3 text-sm leading-6 text-navy">
          <p>{body}</p>
          <p>{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
