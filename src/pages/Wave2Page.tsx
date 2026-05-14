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
    backToWave1: "Wróć do etapu Dzisiaj",
    eyebrow: "Następnie · Eksploracja",
    heroTitle: "Caniello Care Network: zaufana pomoc wokół pupila.",
    heroBody:
      "Sprawdzamy, jak Caniello może pomagać opiekunom znaleźć sprawdzoną pomoc przy opiece nad zwierzęciem - od codziennych usług po wsparcie w szczególnych sytuacjach.",
    heroNote: "To przyszła koncepcja. Badamy popyt.",
    heroCta: "Dołącz jako usługodawca",
    featuresTitle: "Caniello Care Network",
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
        body: "Rynek usług ma mieć sens dopiero obok historii zdrowia, dokumentów i przypomnień."
      }
    ],
    stepsTitle: "Badanie w toku",
    steps: [
      { title: "Słuchamy opiekunów", body: "Sprawdzamy, kiedy szukanie usług jest stresujące i co buduje zaufanie." },
      { title: "Rozmawiamy z usługodawcami", body: "Badamy potrzeby firm, opiekunów i specjalistów pracujących ze zwierzętami." },
      { title: "Walidujemy właściwy zakres", body: "Kolejny etap uruchomimy tylko wtedy, gdy popyt i model zaufania będą potwierdzone." }
    ],
    closingTitle: "Pomóż ukształtować przyszłość opieki nad pupilami",
    closingBody: "Dołącz jako usługodawca i powiedz nam, jak powinien wyglądać zaufany sposób odkrywania usług dla zwierząt.",
    closingBenefits: [
      { title: "Wczesne rozmowy", body: "Zaprosimy Cię do badań, gdy będziemy testować założenia kolejnego etapu." },
      { title: "Wpływ na model zaufania", body: "Twoja perspektywa pomoże określić, co znaczy sprawdzony dostawca." },
      { title: "Bez obietnic rynku usług", body: "Na tym etapie badamy popyt, zakres i ryzyka." }
    ],
    success: "Dziękujemy. Zapisaliśmy zainteresowanie badaniem kolejnego etapu."
  },
  en: {
    backToWave1: "Back to Today",
    eyebrow: "Next · Exploration",
    heroTitle: "Caniello Care Network: trusted support around pet care.",
    heroBody:
      "We're exploring how Caniello could help caregivers find reliable support for their pet's care, from everyday services to help in specific situations.",
    heroNote: "This is a future concept. We're researching demand.",
    heroCta: "Join as provider",
    featuresTitle: "Caniello Care Network",
    features: [
      {
        title: "Verified providers",
        body: "We're researching how to surface trusted services, caregivers, and specialists."
      },
      {
        title: "Needs-based matching",
        body: "We want to connect pet needs, location, and caregiver preferences into a simpler choice."
      },
      {
        title: "Convenience and clarity",
        body: "We're exploring clear profiles, prices, policies, and easier service comparison."
      },
      {
        title: "Connected to care",
        body: "Trusted services make more sense when they connect to health history, documents, and reminders."
      }
    ],
    stepsTitle: "Research in progress",
    steps: [
      { title: "Listening to caregivers", body: "We're learning when service discovery is stressful and what creates trust." },
      { title: "Talking with providers", body: "We're researching the needs of businesses, caregivers, and pet specialists." },
      { title: "Validating the right scope", body: "Next launches only if demand and a trust model are validated." }
    ],
    closingTitle: "Help shape the future of pet care",
    closingBody: "Join as a provider and tell us what a trusted way to discover pet services should look like.",
    closingBenefits: [
      { title: "Early research", body: "We'll invite you when we're testing next-stage assumptions." },
      { title: "Shape trust signals", body: "Your perspective helps define what verified should mean." },
      { title: "No service launch promise", body: "At this stage, we're researching demand, scope, and risks." }
    ],
    success: "Thank you. Your interest in the next research stage has been noted."
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
        imageAlt="Next-stage trusted pet services concept with provider cards and pets"
        imageSrc={wave2HeroArt}
        note={text.heroNote}
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
