import { useEffect, useState } from "react";
import wave3HeroArt from "../../spec/notes/landing/image 6.png";
import waitlistPets from "../assets/puppys_transparent.png";
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
    backToWave1: "Wróć do etapu Dzisiaj",
    eyebrow: "Przyszłość · Badanie",
    heroTitle: "Caniello Clinic Connect: historia opieki przy wizycie.",
    heroBody:
      "Badamy rozwiązanie, w którym lekarz może łatwo wprowadzić dane pacjenta, zobaczyć historię zwierzęcia albo otrzymać ją od klienta za zgodą opiekuna.",
    heroNote: "Etap badawczy. To nie jest jeszcze aktywny produkt. Walidujemy zainteresowanie klinik.",
    featuresTitle: "Caniello Clinic Connect",
    features: [
      {
        title: "Szybkie dodawanie danych",
        body: "Lekarz może po wizycie dopisać ważne informacje do historii pacjenta bez zbędnej pracy administracyjnej."
      },
      {
        title: "Historia zwierzęcia",
        body: "Szczepienia, wyniki, dokumenty, zalecenia i wcześniejsze wizyty mogą tworzyć jeden kontekst opieki."
      },
      {
        title: "Dane od klienta",
        body: "Opiekun może udostępnić klinice historię zwierzęcia przed wizytą lub w trakcie leczenia."
      },
      {
        title: "Prywatność od początku",
        body: "Przyszłość zakłada przejrzystość, kontrolę opiekuna i jasne zasady dostępu dla kliniki."
      }
    ],
    stepsTitle: "Badanie w toku",
    steps: [
      { title: "Mapujemy pracę lekarza", body: "Sprawdzamy, które dane warto dodać po wizycie i co realnie skraca pracę kliniki." },
      { title: "Projektujemy udostępnianie", body: "Badamy prosty sposób przekazania historii zwierzęcia klinice przez klienta." },
      { title: "Walidujemy bezpieczeństwo", body: "Nie budujemy portalu klinicznego bez potwierdzenia potrzeby, zaufania i ryzyk." }
    ],
    closingTitle: "Pomóż ukształtować przyszłość opieki nad pupilami",
    closingBody:
      "Dołącz jako klinika i powiedz nam, jak powinno wyglądać proste wprowadzanie danych pacjenta oraz bezpieczna praca z historią udostępnioną przez klienta.",
    closingBenefits: [
      { title: "Wczesny kontakt", body: "Odezwiemy się, gdy będziemy prowadzić rozmowy i testy badawcze." },
      { title: "Wpływ na zakres", body: "Twoja perspektywa pomoże oddzielić użyteczną historię pacjenta od nadmiaru danych." },
      { title: "Kontrola i zaufanie", body: "Przyszłość rozwijamy wokół zgód, prywatności i przejrzystości." }
    ],
    clinicCta: "Dołącz jako klinika",
    success: "Dziękujemy. Zapisaliśmy zainteresowanie badaniem przyszłego etapu."
  },
  en: {
    backToWave1: "Back to Today",
    eyebrow: "Future · Research",
    heroTitle: "Caniello Clinic Connect: care history ready for the visit.",
    heroBody:
      "We're researching a solution where veterinarians can easily enter patient data, review a pet's history, or receive that history from the client with caregiver consent.",
    heroNote: "Research stage. Not yet an active product. Clinic interest is being validated now.",
    featuresTitle: "Caniello Clinic Connect",
    features: [
      {
        title: "Fast data entry",
        body: "A veterinarian can add important visit information to the patient history without unnecessary admin work."
      },
      {
        title: "Pet history",
        body: "Vaccines, results, documents, recommendations, and earlier visits can create one care context."
      },
      {
        title: "Client-shared data",
        body: "The caregiver can share the pet's history with the clinic before a visit or during treatment."
      },
      {
        title: "Privacy from the start",
        body: "Future assumes transparency, caregiver control, and clear clinic access rules."
      }
    ],
    stepsTitle: "Research in progress",
    steps: [
      { title: "Mapping vet workflows", body: "We're learning which data should be added after a visit and what actually saves clinic time." },
      { title: "Designing sharing", body: "We're researching a simple way for the client to share a pet's history with the clinic." },
      { title: "Validating safety", body: "We won't build a clinic portal without validating need, trust, and risks." }
    ],
    closingTitle: "Help shape the future of pet care",
    closingBody: "Join as a clinic and tell us what simple patient data entry and secure work with client-shared history should look like.",
    closingBenefits: [
      { title: "Early contact", body: "We'll reach out when we run research conversations and tests." },
      { title: "Shape the scope", body: "Your perspective helps separate useful patient history from data overload." },
      { title: "Control and trust", body: "Future is shaped around consent, privacy, and transparency." }
    ],
    clinicCta: "Join as clinic",
    success: "Thank you. Your interest in the future research stage has been noted."
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
        imageAlt="Future clinic collaboration concept for caregiver-approved pet health context"
        imageSrc={wave3HeroArt}
        note={text.heroNote}
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
        imageSrc={waitlistPets}
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
