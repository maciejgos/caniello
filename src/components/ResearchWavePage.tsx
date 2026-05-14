import { useEffect, useState } from "react";
import { AnalyticsConsentPopup } from "./AnalyticsConsentPopup";
import { CareFlowCtaSection, FeatureOverviewSection, FooterSignupSection, MarketingHeroSection, TrustSection } from "./CareStorySections";
import { WaitlistForm } from "./WaitlistForm";
import { WaveStorySection } from "./WaveStorySection";
import type { Feature, Language, LeadSource } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";

export type ResearchWaveCopy = {
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroNote: string;
  heroCta: string;
  featuresTitle: string;
  features: Feature[];
  stepsTitle: string;
  steps: Feature[];
  closingTitle: string;
  closingBody: string;
  closingBenefits: Feature[];
  success: string;
};

type ResearchWavePageProps = {
  activeWave: "wave_2" | "wave_3";
  buttonClassName: string;
  heroImageAlt: string;
  heroImageSrc: string;
  language: Language;
  pageCopy: ResearchWaveCopy;
  source: LeadSource;
  tone?: "gold" | "violet";
  waitlistImageSrc: string;
};

export function ResearchWavePage({
  activeWave,
  buttonClassName,
  heroImageAlt,
  heroImageSrc,
  language,
  pageCopy: text,
  source,
  tone = "gold",
  waitlistImageSrc
}: ResearchWavePageProps) {
  const [analyticsChoice, setAnalyticsChoice] = useState<"granted" | "declined" | null>(() =>
    typeof window !== "undefined" ? readAnalyticsPreference() : null
  );
  const sharedText = copy[language];

  useEffect(() => {
    if (readAnalyticsConsent()) {
      trackValidationEvent({ name: "page_view", source, utm: readUtmParams() });
    }
  }, [source]);

  async function handleAnalyticsConsent(granted: boolean) {
    await saveAnalyticsConsent(granted, readUtmParams());
    setAnalyticsChoice(granted ? "granted" : "declined");

    if (granted) {
      trackValidationEvent({ name: "page_view", source, utm: readUtmParams() });
    }
  }

  const heroBenefits = text.features.map((feature) => feature.title);
  const renderWaitlistForm = (className = "", compactConsent = false) => (
    <WaitlistForm
      buttonClassName={buttonClassName}
      className={className}
      compactConsent={compactConsent}
      language={language}
      source={source}
      submitLabel={text.heroCta}
      successMessage={text.success}
    />
  );

  return (
    <>
      <MarketingHeroSection
        benefits={heroBenefits}
        body={text.heroBody}
        eyebrow={text.eyebrow}
        form={renderWaitlistForm()}
        imageAlt={heroImageAlt}
        imageSrc={heroImageSrc}
        layout="compact"
        privacyNote={sharedText.privacyNote}
        proof={text.heroNote}
        title={text.heroTitle}
        tone={tone}
      />

      <FeatureOverviewSection features={text.features} spacing="compact" title={text.featuresTitle} />

      <CareFlowCtaSection
        benefits={text.closingBenefits}
        body={text.closingBody}
        form={renderWaitlistForm("max-w-[620px]", true)}
        imageSrc={waitlistImageSrc}
        steps={text.steps}
        stepsTitle={text.stepsTitle}
        title={text.closingTitle}
      />

      <section className="bg-white px-5 pb-0 pt-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1664px]">
          <WaveStorySection
            activeWave={activeWave}
            body={sharedText.futureBody}
            foundation={sharedText.futureFoundation}
            researchNote={sharedText.futureResearchNote}
            title={sharedText.futureTitle}
            waves={sharedText.futureWaves}
          />
          <FooterSignupSection
            body={sharedText.footerSignupBody}
            form={renderWaitlistForm("md:justify-self-end", true)}
            title={sharedText.footerSignupTitle}
          />
        </div>
      </section>

      <TrustSection body={sharedText.trustBody} disclaimer={sharedText.disclaimer} title={sharedText.trustTitle} />

      {analyticsChoice === null ? <AnalyticsConsentPopup text={sharedText} onSelect={(granted) => void handleAnalyticsConsent(granted)} /> : null}
    </>
  );
}
