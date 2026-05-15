import wave3HeroArt from "../../spec/notes/landing/image 6.png";
import waitlistPets from "../assets/puppys_transparent.png";
import { ResearchWavePage, type ResearchWaveCopy } from "../components/ResearchWavePage";
import type { Language } from "../content";

type ClinicPageProps = {
  language: Language;
};

const pageCopy = {
  pl: {
    eyebrow: "Przyszłość · Badanie",
    heroTitle: "Pełniejszy kontekst pacjenta przed wizytą.",
    heroBody:
      "Badamy Clinic Caniello jako sposób, w którym lekarz może pracować z historią opieki udostępnioną przez klienta i szybciej zobaczyć to, co ważne dla pacjenta.",
    heroNote: "Etap badawczy. To nie jest jeszcze aktywny produkt. Walidujemy zainteresowanie klinik.",
    featuresTitle: "Kontekst opieki, który pomaga w rozmowie z klientem",
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
    closingTitle: "Budujemy współpracę z klinikami wokół lepszego kontekstu pacjenta.",
    closingBody:
      "Dołącz do listy i pomóż nam sprawdzić, jak Caniello może ułatwić klinikom pracę z historią opieki udostępnioną przez opiekuna.",
    closingBenefits: [
      { title: "Wczesny kontakt", body: "Odezwiemy się, gdy będziemy prowadzić rozmowy i testy badawcze." },
      { title: "Wpływ na zakres", body: "Twoja perspektywa pomoże oddzielić użyteczną historię pacjenta od nadmiaru danych." },
      { title: "Kontrola i zaufanie", body: "Przyszłość rozwijamy wokół zgód, prywatności i przejrzystości." }
    ],
    heroCta: "Dołącz do listy",
    success: "Dziękujemy. Zapisaliśmy Cię na listę Caniello. Szczegóły zbierzemy później w ankiecie."
  },
  en: {
    eyebrow: "Future · Research",
    heroTitle: "A clearer patient story before the visit.",
    heroBody:
      "We're researching Caniello Clinic as a way for veterinary teams to work with caregiver-shared care history and see the context that matters sooner.",
    heroNote: "Research stage. Not yet an active product. Clinic interest is being validated now.",
    featuresTitle: "Care context that supports the client conversation",
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
    closingTitle: "We're shaping clinic collaboration around clearer patient context.",
    closingBody: "Join the waitlist and help us learn how Caniello can support veterinary teams working with caregiver-shared care history.",
    closingBenefits: [
      { title: "Early contact", body: "We'll reach out when we run research conversations and tests." },
      { title: "Shape the scope", body: "Your perspective helps separate useful patient history from data overload." },
      { title: "Control and trust", body: "Future is shaped around consent, privacy, and transparency." }
    ],
    heroCta: "Join Waitlist",
    success: "Thank you. You're on the Caniello waitlist. We'll collect details later in a survey."
  }
} satisfies Record<Language, ResearchWaveCopy>;

export function ClinicPage({ language }: ClinicPageProps) {
  return (
    <ResearchWavePage
      activeWave="wave_3"
      buttonClassName="sm:min-w-[190px]"
      heroImageAlt="Future clinic collaboration concept for caregiver-approved pet health context"
      heroImageSrc={wave3HeroArt}
      language={language}
      pageCopy={pageCopy[language]}
      source="landing_page_wave3"
      tone="violet"
      waitlistImageSrc={waitlistPets}
    />
  );
}
