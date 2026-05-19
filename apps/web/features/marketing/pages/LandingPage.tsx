import { useEffect, useState } from "react";
import heroArt from "../assets/caniello-bruno-app-hero.png";
import waitlistPets from "../assets/puppys_transparent.png";
import { AnalyticsConsentPopup } from "../components/AnalyticsConsentPopup";
import { CareFlowCtaSection, FeatureOverviewSection, FooterSignupSection, MarketingHeroSection, TrustSection } from "../components/CareStorySections";
import { WaitlistForm } from "../components/WaitlistForm";
import { WaveStorySection } from "../components/WaveStorySection";
import type { Language } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";

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
      <MarketingHeroSection
        benefits={text.benefits}
        body={text.heroBody}
        eyebrow={text.eyebrow}
        form={
          <div id="waitlist">
            <WaitlistForm language={language} source="landing_page_hero" />
          </div>
        }
        imageAlt="Caniello app preview for Bruno beside a golden retriever"
        imageSrc={heroArt}
        privacyNote={text.privacyNote}
        proof={text.heroProof}
        title={text.heroTitle}
      />

      <FeatureOverviewSection features={text.features} title={text.featuresTitle} />

      <CareFlowCtaSection
        benefits={text.closingBenefits}
        body={text.closingBody}
        form={
          <WaitlistForm
            language={language}
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

          <FooterSignupSection
            body={text.footerSignupBody}
            form={<WaitlistForm language={language} source="landing_page_footer" className="md:justify-self-end" compactConsent />}
            title={text.footerSignupTitle}
          />
        </div>
      </section>

      <TrustSection body={text.trustBody} disclaimer={text.disclaimer} title={text.trustTitle} />

      {analyticsChoice === null ? <AnalyticsConsentPopup text={text} onSelect={(granted) => void handleAnalyticsConsent(granted)} /> : null}
    </>
  );
}
