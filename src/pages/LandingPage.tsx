import { useEffect, useState } from "react";
import heroArt from "../assets/caniello-bruno-app-hero.png";
import waitlistPets from "../assets/puppys_transparent.png";
import { AnalyticsConsentPopup } from "../components/AnalyticsConsentPopup";
import { CareFlowCtaSection, FeatureOverviewSection } from "../components/CareStorySections";
import { WaitlistForm } from "../components/WaitlistForm";
import { WaveStorySection } from "../components/WaveStorySection";
import type { Language } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";
import { CheckIcon, LargePawIcon, LockIcon, PawIcon } from "../components/icons/LandingIcons";

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

      <FeatureOverviewSection features={text.features} title={text.featuresTitle} />

      <CareFlowCtaSection
        benefits={text.closingBenefits}
        body={text.closingBody}
        form={
          <WaitlistForm
            language={language}
            role="pet_owner"
            interestWave="wave_1"
            source="landing_page_mid_cta"
            className="max-w-[470px]"
            buttonClassName="sm:min-w-[128px]"
            compactConsent
          />
        }
        imageSrc={waitlistPets}
        steps={text.steps}
        stepsTitle={text.howTitle}
        title={text.closingTitle}
      />

      <section className="bg-white px-5 pb-0 pt-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1664px]">
          <WaveStorySection
            activeWave="wave_1"
            body={text.futureBody}
            foundation={text.futureFoundation}
            researchNote={text.futureResearchNote}
            title={text.futureTitle}
            waves={text.futureWaves}
          />

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
