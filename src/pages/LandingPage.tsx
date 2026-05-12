import { useEffect, useState } from "react";
import heroArt from "../assets/caniello-bruno-app-hero.png";
import waitlistPets from "../assets/puppys_transparent.png";
import { AnalyticsConsentPopup } from "../components/AnalyticsConsentPopup";
import { WaitlistForm } from "../components/WaitlistForm";
import type { Language } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";
import { BenefitIcon, CheckIcon, FeatureIcon, FutureWaveIcon, LargePawIcon, LockIcon, PawIcon } from "../components/icons/LandingIcons";

type LandingPageProps = {
  language: Language;
};

export function LandingPage({ language }: LandingPageProps) {
  const [analyticsChoice, setAnalyticsChoice] = useState<"granted" | "declined" | null>(() =>
    typeof window !== "undefined" ? readAnalyticsPreference() : null
  );
  const text = copy[language];

  useEffect(() => {
    if (readAnalyticsConsent()) {
      trackValidationEvent({ name: "page_view", utm: readUtmParams() });
    }
  }, []);

  async function handleAnalyticsConsent(granted: boolean) {
    await saveAnalyticsConsent(granted, readUtmParams());
    setAnalyticsChoice(granted ? "granted" : "declined");

    if (granted) {
      trackValidationEvent({ name: "page_view", utm: readUtmParams() });
    }
  }

  return (
    <>
      <section className="overflow-hidden bg-white" id="top">
        <div className="mx-auto grid w-full max-w-[1664px] items-start gap-10 px-5 pb-8 pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[minmax(520px,0.78fr)_minmax(0,1fr)] lg:px-12 lg:pb-10 lg:pt-14 xl:px-16">
          <div className="relative z-10 max-w-[640px]">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-cream px-4 py-2.5 text-sm font-bold text-navy">
              <PawIcon />
              <span>{text.eyebrow}</span>
            </div>

            <h1 className="mt-7 font-serif text-5xl font-bold leading-[1.02] tracking-normal text-navy sm:text-6xl lg:text-7xl" aria-label={text.heroTitle}>
              {text.heroTitle.split(". ").map((line) => (
                <span className="block" key={line}>
                  {line.endsWith(".") ? line : `${line}.`}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-[520px] text-base leading-[1.7] text-navy sm:text-[17px]">{text.heroBody}</p>
            <p className="mt-3 max-w-[520px] text-sm font-semibold leading-6 text-navy/75">{text.heroProof}</p>

            <ul className="mt-7 grid gap-4 text-[15px] font-medium text-navy">
              {text.benefits.map((benefit) => (
                <li className="flex items-center gap-4" key={benefit}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                    <CheckIcon />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9" id="waitlist">
              <WaitlistForm language={language} role="pet_owner" interestWave="wave_1" source="landing_page_hero" />
              <p className="mt-4 flex items-center gap-3 text-xs text-navy/62">
                <LockIcon />
                {text.privacyNote}
              </p>
            </div>
          </div>

          <div className="relative min-h-[340px] sm:min-h-[480px] lg:min-h-[610px]" aria-label="Caniello app preview">
            <img
              className="absolute inset-x-1/2 top-0 h-auto w-[min(760px,118vw)] max-w-none -translate-x-1/2 object-contain object-bottom lg:left-auto lg:right-0 lg:w-[min(870px,52vw)] lg:translate-x-0"
              src={heroArt}
              alt="Caniello app preview for Bruno beside a golden retriever"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-12 pt-8 sm:px-8 lg:px-12 lg:pt-10 xl:px-16" id="features" aria-labelledby="features-title">
        <div className="mx-auto w-full max-w-[1664px]">
          <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl" id="features-title">
            {text.featuresTitle}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-14">
            {text.features.map((feature, index) => (
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

      <section className="bg-white px-5 pb-0 pt-10 sm:px-8 lg:px-12 xl:px-16" id="how-it-works">
        <div className="mx-auto w-full max-w-[1664px]">
          <div className="grid items-stretch gap-4 xl:grid-cols-[0.9fr_2.15fr]">
            <section className="flex h-full flex-col rounded-lg border border-navy/10 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="how-title">
              <h2 className="font-serif text-3xl font-bold leading-tight text-navy" id="how-title">
                {text.howTitle}
              </h2>
              <ol className="mt-5 grid gap-0">
                {text.steps.map((step, index) => (
                  <li className="grid grid-cols-[42px_1fr] gap-4" key={step.title}>
                    <div className="flex flex-col items-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-sm font-bold text-navy">{index + 1}</span>
                      {index < text.steps.length - 1 ? <span className="h-16 w-px bg-navy/12" /> : null}
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
                  <h2 className="font-serif text-3xl font-bold leading-[1.08] text-navy sm:text-4xl">{text.closingTitle}</h2>
                  <p className="mt-4 max-w-[390px] text-base leading-7 text-navy">{text.closingBody}</p>
                  <div className="mt-6">
                    <WaitlistForm
                      language={language}
                      role="pet_owner"
                      interestWave="wave_1"
                      source="landing_page_mid_cta"
                      className="max-w-[470px]"
                      buttonClassName="sm:min-w-[128px]"
                      compactConsent
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute bottom-4 right-0 h-[210px] w-[330px] overflow-hidden sm:bottom-5 sm:h-[275px] sm:w-[430px] lg:h-[330px] lg:w-[520px] xl:h-[360px] xl:w-[570px]">
                  <img className="h-full w-full object-contain object-bottom" src={waitlistPets} alt="" aria-hidden="true" />
                </div>
              </div>

              <div className="grid shrink-0 gap-5 border-t border-navy/10 bg-white/55 px-5 py-5 sm:px-8 md:grid-cols-3">
                {text.closingBenefits.map((benefit, index) => (
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

          <section className="mt-4 rounded-[24px] border border-navy/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10" id="future-waves" aria-labelledby="future-waves-title">
            <h2 className="font-serif text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl" id="future-waves-title">
              {text.futureTitle}
            </h2>
            <p className="mt-4 max-w-[900px] text-lg font-semibold leading-8 text-navy sm:text-xl">{text.futureBody}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:px-8 xl:px-12">
              {text.futureWaves.map((wave, index) => (
                <article className="flex min-h-[310px] flex-col rounded-[24px] border border-navy/10 bg-white p-6 shadow-sm sm:p-7 lg:min-h-[340px]" key={wave.wave}>
                  <span className="inline-flex w-max rounded-lg bg-cream px-4 py-2 text-xl font-bold text-gold">{wave.wave}</span>
                  <div className="mt-7 grid flex-1 grid-cols-[minmax(0,1fr)_82px] gap-6">
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold leading-tight text-navy sm:text-3xl">{wave.title}</h3>
                      <p className="mt-5 max-w-[420px] text-lg font-semibold leading-8 text-navy">{wave.body}</p>
                    </div>
                    <FutureWaveIcon index={index} />
                  </div>
                  {index === 0 ? (
                    <a
                      className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg border border-navy/10 bg-white px-5 text-lg font-bold text-navy shadow-sm transition hover:border-gold hover:text-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                      href="/wave-2-exploration"
                    >
                      {wave.cta}
                    </a>
                  ) : (
                    <a
                      className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg border border-navy/10 bg-white px-5 text-lg font-bold text-navy shadow-sm transition hover:border-gold hover:text-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                      href="/wave-3-research"
                    >
                      {wave.cta}
                    </a>
                  )}
                </article>
              ))}
            </div>
            <p className="mt-8 flex shrink-0 items-center justify-center gap-4 text-lg font-semibold leading-7 text-navy">
              <LockIcon />
              {text.futureResearchNote}
            </p>
          </section>

          <section className="mt-4 overflow-hidden rounded-lg bg-cream px-5 py-5 sm:px-8" aria-labelledby="footer-signup-title">
            <div className="grid gap-5 md:grid-cols-[0.16fr_0.52fr_0.32fr] md:items-center">
              <div className="hidden justify-center text-gold md:flex">
                <LargePawIcon />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold leading-tight text-navy" id="footer-signup-title">
                  {text.footerSignupTitle}
                </h2>
                <p className="mt-2 text-base leading-6 text-navy">{text.footerSignupBody}</p>
              </div>
              <WaitlistForm language={language} role="pet_owner" interestWave="wave_1" source="landing_page_footer" className="md:justify-self-end" compactConsent />
            </div>
          </section>
        </div>
      </section>

      <section className="bg-white px-5 pb-10 pt-4 sm:px-8 lg:px-12 xl:px-16" id="trust" aria-labelledby="trust-title">
        <div className="mx-auto grid w-full max-w-[1664px] gap-6 rounded-lg border border-navy/10 bg-white p-6 shadow-sm md:grid-cols-[0.45fr_1fr] md:p-8">
          <h2 className="font-serif text-3xl font-bold leading-tight text-navy" id="trust-title">
            {text.trustTitle}
          </h2>
          <div className="grid gap-3 text-sm leading-6 text-navy">
            <p>{text.trustBody}</p>
            <p>{text.disclaimer}</p>
          </div>
        </div>
      </section>

      {analyticsChoice === null ? <AnalyticsConsentPopup text={text} onSelect={(granted) => void handleAnalyticsConsent(granted)} /> : null}
    </>
  );
}
