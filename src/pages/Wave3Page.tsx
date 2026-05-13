import { useEffect, useState } from "react";
import wave3HeroArt from "../../spec/notes/landing/image 6.png";
import petsArt from "../assets/caniello-waitlist-pets.png";
import { AnalyticsConsentPopup } from "../components/AnalyticsConsentPopup";
import { CareFlowCtaSection, FeatureOverviewSection, ResearchHeroSection } from "../components/CareStorySections";
import { WaitlistForm } from "../components/WaitlistForm";
import { WaveStorySection } from "../components/WaveStorySection";
import type { Feature, Language } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";

type Wave3PageProps = {
  language: Language;
};

type WavePageCopy = {
  backToWave1: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroNote: string;
  heroSecondaryCta: string;
  featuresTitle: string;
  features: Feature[];
  stepsTitle: string;
  steps: Feature[];
  closingTitle: string;
  closingBody: string;
  closingBenefits: Feature[];
  clinicCta: string;
  success: string;
};

const pageCopy = {
  pl: {
    backToWave1: "Wróć do Wave 1",
    eyebrow: "Wave 3 · Badanie",
    heroTitle: "Współpraca klinik z kontekstem zaakceptowanym przez opiekuna.",
    heroBody:
      "Caniello bada narzędzia, które pomagają klinikom i lekarzom widzieć udostępnione przez opiekuna rekordy zdrowia, dokumenty, oś czasu i przypomnienia.",
    heroNote: "Etap badawczy. To nie jest produkt. Walidujemy zainteresowanie.",
    heroSecondaryCta: "Zobacz koncepcję",
    featuresTitle: "Współpraca klinik z kontekstem opieki",
    features: [
      {
        title: "Dostęp za zgodą opiekuna",
        body: "Badamy udostępnianie tylko tych informacji, które opiekun świadomie wybierze."
      },
      {
        title: "Pełniejszy obraz zdrowia",
        body: "Historia, szczepienia, wyniki, dokumenty i przypomnienia mogą tworzyć jeden kontekst wizyty."
      },
      {
        title: "Mniej rozproszonych danych",
        body: "Klinika nie musi zaczynać od szukania fragmentów w mailach, zdjęciach i notatkach."
      },
      {
        title: "Prywatność od początku",
        body: "Wave 3 zakłada przejrzystość, kontrolę opiekuna i ograniczony dostęp badawczy."
      }
    ],
    stepsTitle: "Wave 3 to koncepcja badawcza",
    steps: [
      { title: "Mapujemy potrzeby klinik", body: "Sprawdzamy, jaki kontekst realnie pomaga przed wizytą i w trakcie opieki." },
      { title: "Projektujemy zgodę opiekuna", body: "Badamy prosty, czytelny sposób wyboru danych udostępnianych klinice." },
      { title: "Walidujemy bezpieczeństwo", body: "Nie budujemy portalu klinicznego bez potwierdzenia potrzeby, zaufania i ryzyk." }
    ],
    closingTitle: "Bądź na bieżąco z Wave 3",
    closingBody: "Dołącz jako klinika lub lekarz weterynarii i pomóż nam sprawdzić, gdzie kontekst opieki naprawdę wspiera współpracę.",
    closingBenefits: [
      { title: "Wczesny kontakt", body: "Odezwiemy się, gdy będziemy prowadzić rozmowy i testy badawcze." },
      { title: "Wpływ na zakres", body: "Twoja perspektywa pomoże oddzielić użyteczny kontekst od nadmiaru danych." },
      { title: "Kontrola i zaufanie", body: "Wave 3 rozwijamy wokół zgód, prywatności i przejrzystości." }
    ],
    clinicCta: "Dołącz jako klinika lub wet.",
    success: "Dziękujemy. Zapisaliśmy zainteresowanie badaniem Wave 3."
  },
  en: {
    backToWave1: "Back to Wave 1",
    eyebrow: "Wave 3 · Research",
    heroTitle: "Clinic collaboration with owner-approved context.",
    heroBody:
      "Caniello is exploring tools that could help clinics and vets view owner-approved pet health records, documents, timelines, and reminders.",
    heroNote: "Research stage. Not a product. Interest is being validated now.",
    heroSecondaryCta: "Explore the concept",
    featuresTitle: "Clinic collaboration with care context",
    features: [
      {
        title: "Owner-approved access",
        body: "We're researching sharing only the information an owner deliberately chooses."
      },
      {
        title: "Fuller health picture",
        body: "History, vaccines, results, documents, and reminders could form one visit context."
      },
      {
        title: "Less fragmented data",
        body: "Clinics should not have to start by searching across emails, photos, and notes."
      },
      {
        title: "Privacy from the start",
        body: "Wave 3 assumes transparency, owner control, and limited research-stage access."
      }
    ],
    stepsTitle: "Wave 3 is a research-stage concept",
    steps: [
      { title: "Mapping clinic needs", body: "We're learning what context actually helps before visits and during care." },
      { title: "Designing owner consent", body: "We're researching a clear way to choose which data is shared with a clinic." },
      { title: "Validating safety", body: "We won't build a clinic portal without validating need, trust, and risks." }
    ],
    closingTitle: "Stay informed about Wave 3",
    closingBody: "Join as a clinic or veterinarian and help us learn where care context truly supports collaboration.",
    closingBenefits: [
      { title: "Early contact", body: "We'll reach out when we run research conversations and tests." },
      { title: "Shape the scope", body: "Your perspective helps separate useful context from data overload." },
      { title: "Control and trust", body: "Wave 3 is shaped around consent, privacy, and transparency." }
    ],
    clinicCta: "Join as clinic or vet",
    success: "Thank you. Your Wave 3 research interest has been noted."
  }
} satisfies Record<Language, WavePageCopy>;

export function Wave3Page({ language }: Wave3PageProps) {
  const [analyticsChoice, setAnalyticsChoice] = useState<"granted" | "declined" | null>(() =>
    typeof window !== "undefined" ? readAnalyticsPreference() : null
  );
  const text = pageCopy[language];
  const sharedText = copy[language];

  useEffect(() => {
    if (readAnalyticsConsent()) {
      trackValidationEvent({ name: "page_view", source: "landing_page_wave3", utm: readUtmParams() });
    }
  }, []);

  async function handleAnalyticsConsent(granted: boolean) {
    await saveAnalyticsConsent(granted, readUtmParams());
    setAnalyticsChoice(granted ? "granted" : "declined");

    if (granted) {
      trackValidationEvent({ name: "page_view", source: "landing_page_wave3", utm: readUtmParams() });
    }
  }

  return (
    <>
      <ResearchHeroSection
        backHref="/"
        backLabel={text.backToWave1}
        body={text.heroBody}
        ctaHref="#clinic-interest"
        ctaLabel={text.clinicCta}
        eyebrow={text.eyebrow}
        imageAlt="Wave 3 clinic collaboration concept for owner-approved pet health context"
        imageSrc={wave3HeroArt}
        note={text.heroNote}
        secondaryHref="#future-waves"
        secondaryLabel={text.heroSecondaryCta}
        title={text.heroTitle}
        tone="violet"
      />

      <FeatureOverviewSection features={text.features} title={text.featuresTitle} />

      <CareFlowCtaSection
        benefits={text.closingBenefits}
        body={text.closingBody}
        form={
          <div id="clinic-interest">
            <WaitlistForm
              buttonClassName="sm:min-w-[190px]"
              className="max-w-[620px]"
              compactConsent
              interestWave="wave_3"
              language={language}
              role="clinic_vet"
              source="landing_page_wave3"
              submitLabel={text.clinicCta}
              successMessage={text.success}
            />
          </div>
        }
        imageSrc={petsArt}
        steps={text.steps}
        stepsTitle={text.stepsTitle}
        title={text.closingTitle}
      />

      <section className="bg-white px-5 pb-0 pt-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1664px]">
          <WaveStorySection
            activeWave="wave_3"
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
