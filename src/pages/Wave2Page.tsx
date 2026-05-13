import { useEffect, useState } from "react";
import wave2HeroArt from "../../spec/notes/landing/image 5.png";
import waitlistPets from "../assets/puppys_transparent.png";
import { AnalyticsConsentPopup } from "../components/AnalyticsConsentPopup";
import { CareFlowCtaSection, FeatureOverviewSection, ResearchHeroSection } from "../components/CareStorySections";
import { WaitlistForm } from "../components/WaitlistForm";
import { WaveStorySection } from "../components/WaveStorySection";
import type { Feature, Language } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";

type Wave2PageProps = {
  language: Language;
};

type WavePageCopy = {
  backToWave1: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroNote: string;
  heroCta: string;
  heroSecondaryCta: string;
  featuresTitle: string;
  features: Feature[];
  stepsTitle: string;
  steps: Feature[];
  closingTitle: string;
  closingBody: string;
  closingBenefits: Feature[];
  success: string;
};

const pageCopy = {
  pl: {
    backToWave1: "Wróć do Wave 1",
    eyebrow: "Wave 2 · Eksploracja",
    heroTitle: "Zaufane usługi dla pupili, starannie wybrane.",
    heroBody:
      "Po MVP Caniello bada zaufany marketplace usług dla zwierząt: kuratorowany, sprawdzany i połączony z kontekstem opieki nad pupilem.",
    heroNote: "To przyszła koncepcja. Badamy popyt.",
    heroCta: "Dołącz jako usługodawca",
    heroSecondaryCta: "Zobacz koncepcję",
    featuresTitle: "Zaufane usługi dla pupili",
    features: [
      {
        title: "Zweryfikowani dostawcy",
        body: "Badamy, jak pokazywać tylko sprawdzone usługi, opiekunów i specjalistów."
      },
      {
        title: "Dopasowanie do potrzeb",
        body: "Chcemy łączyć potrzeby pupila, lokalizację i preferencje opiekuna w prosty wybór."
      },
      {
        title: "Wygoda i transparentność",
        body: "Eksplorujemy jasne profile, ceny, zasady i łatwiejsze porównanie usług."
      },
      {
        title: "Połączone z opieką",
        body: "Marketplace ma mieć sens dopiero obok historii zdrowia, dokumentów i przypomnień."
      }
    ],
    stepsTitle: "Badanie w toku",
    steps: [
      { title: "Słuchamy opiekunów", body: "Sprawdzamy, kiedy szukanie usług jest stresujące i co buduje zaufanie." },
      { title: "Rozmawiamy z usługodawcami", body: "Badamy potrzeby firm, opiekunów i specjalistów pracujących ze zwierzętami." },
      { title: "Walidujemy właściwy zakres", body: "Wave 2 uruchomimy tylko wtedy, gdy popyt i model zaufania będą potwierdzone." }
    ],
    closingTitle: "Pomóż ukształtować przyszłość opieki nad pupilami",
    closingBody: "Dołącz jako usługodawca i powiedz nam, jak powinien wyglądać zaufany sposób odkrywania usług dla zwierząt.",
    closingBenefits: [
      { title: "Wczesne rozmowy", body: "Zaprosimy Cię do badań, gdy będziemy testować założenia Wave 2." },
      { title: "Wpływ na model zaufania", body: "Twoja perspektywa pomoże określić, co znaczy sprawdzony dostawca." },
      { title: "Bez obietnic marketplace'u", body: "Na tym etapie badamy popyt, zakres i ryzyka." }
    ],
    success: "Dziękujemy. Zapisaliśmy zainteresowanie badaniem Wave 2."
  },
  en: {
    backToWave1: "Back to Wave 1",
    eyebrow: "Wave 2 · Exploration",
    heroTitle: "Trusted pet services, carefully curated.",
    heroBody:
      "After our MVP, Caniello is exploring a trusted pet services marketplace: curated, reviewed, and connected to pet care context.",
    heroNote: "This is a future concept. We're researching demand.",
    heroCta: "Join as provider",
    heroSecondaryCta: "See the concept",
    featuresTitle: "Trusted pet services",
    features: [
      {
        title: "Verified providers",
        body: "We're researching how to surface trusted services, caregivers, and specialists."
      },
      {
        title: "Needs-based matching",
        body: "We want to connect pet needs, location, and owner preferences into a simpler choice."
      },
      {
        title: "Convenience and clarity",
        body: "We're exploring clear profiles, prices, policies, and easier service comparison."
      },
      {
        title: "Connected to care",
        body: "A marketplace only makes sense beside health history, documents, and reminders."
      }
    ],
    stepsTitle: "Research in progress",
    steps: [
      { title: "Listening to owners", body: "We're learning when service discovery is stressful and what creates trust." },
      { title: "Talking with providers", body: "We're researching the needs of businesses, caregivers, and pet specialists." },
      { title: "Validating the right scope", body: "Wave 2 launches only if demand and a trust model are validated." }
    ],
    closingTitle: "Help shape the future of pet care",
    closingBody: "Join as a provider and tell us what a trusted way to discover pet services should look like.",
    closingBenefits: [
      { title: "Early research", body: "We'll invite you when we're testing Wave 2 assumptions." },
      { title: "Shape trust signals", body: "Your perspective helps define what verified should mean." },
      { title: "No marketplace promise", body: "At this stage, we're researching demand, scope, and risks." }
    ],
    success: "Thank you. Your Wave 2 research interest has been noted."
  }
} satisfies Record<Language, WavePageCopy>;

export function Wave2Page({ language }: Wave2PageProps) {
  const [analyticsChoice, setAnalyticsChoice] = useState<"granted" | "declined" | null>(() =>
    typeof window !== "undefined" ? readAnalyticsPreference() : null
  );
  const text = pageCopy[language];
  const sharedText = copy[language];

  useEffect(() => {
    if (readAnalyticsConsent()) {
      trackValidationEvent({ name: "page_view", source: "landing_page_wave2", utm: readUtmParams() });
    }
  }, []);

  async function handleAnalyticsConsent(granted: boolean) {
    await saveAnalyticsConsent(granted, readUtmParams());
    setAnalyticsChoice(granted ? "granted" : "declined");

    if (granted) {
      trackValidationEvent({ name: "page_view", source: "landing_page_wave2", utm: readUtmParams() });
    }
  }

  return (
    <>
      <ResearchHeroSection
        backHref="/"
        backLabel={text.backToWave1}
        body={text.heroBody}
        ctaHref="#provider-interest"
        ctaLabel={text.heroCta}
        eyebrow={text.eyebrow}
        imageAlt="Wave 2 trusted pet services marketplace concept with provider cards and a dog"
        imageSrc={wave2HeroArt}
        note={text.heroNote}
        secondaryHref="#future-waves"
        secondaryLabel={text.heroSecondaryCta}
        title={text.heroTitle}
        tone="gold"
      />

      <FeatureOverviewSection features={text.features} title={text.featuresTitle} />

      <CareFlowCtaSection
        benefits={text.closingBenefits}
        body={text.closingBody}
        form={
          <div id="provider-interest">
            <WaitlistForm
              buttonClassName="sm:min-w-[170px]"
              className="max-w-[620px]"
              compactConsent
              interestWave="wave_2"
              language={language}
              role="pet_service_provider"
              source="landing_page_wave2"
              submitLabel={sharedText.navCta}
              successMessage={text.success}
            />
          </div>
        }
        imageSrc={waitlistPets}
        steps={text.steps}
        stepsTitle={text.stepsTitle}
        title={text.closingTitle}
      />

      <section className="bg-white px-5 pb-0 pt-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1664px]">
          <WaveStorySection
            activeWave="wave_2"
            body={sharedText.futureBody}
            foundation={sharedText.futureFoundation}
            researchNote={sharedText.futureResearchNote}
            title={sharedText.futureTitle}
            waves={sharedText.futureWaves}
          />
        </div>
      </section>

      {analyticsChoice === null ? <AnalyticsConsentPopup text={sharedText} onSelect={(granted) => void handleAnalyticsConsent(granted)} /> : null}
    </>
  );
}
