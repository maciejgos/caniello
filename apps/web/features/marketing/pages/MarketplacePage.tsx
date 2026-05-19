import wave2HeroArt from "../assets/marketplace-hero.png";
import waitlistPets from "../assets/puppys_transparent.png";
import { ResearchWavePage, type ResearchWaveCopy } from "../components/ResearchWavePage";
import type { Language } from "../content";

type MarketplacePageProps = {
  language: Language;
};

const pageCopy = {
  pl: {
    eyebrow: "Następnie · Eksploracja",
    heroTitle: "Zaufana pomoc, gdy opieka potrzebuje wsparcia.",
    heroBody:
      "Badamy Marketplace Caniello jako miejsce, które pomaga opiekunom odkrywać sprawdzone usługi dla pupila - spokojniej, czytelniej i bliżej realnych potrzeb.",
    heroNote: "To przyszła koncepcja. Badamy popyt.",
    heroCta: "Dołącz do listy",
    featuresTitle: "Usługi, którym opiekun może zaufać",
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
    closingTitle: "Budujemy zaufany rynek usług razem z opiekunami.",
    closingBody:
      "Dołącz do listy i pomóż nam sprawdzić, jak Caniello powinno łączyć opiekunów ze sprawdzoną pomocą, zanim uruchomimy ten obszar.",
    closingBenefits: [
      { title: "Wczesne rozmowy", body: "Zaprosimy Cię do badań, gdy będziemy testować założenia kolejnego etapu." },
      { title: "Wpływ na model zaufania", body: "Twoja perspektywa pomoże określić, co znaczy sprawdzony dostawca." },
      { title: "Bez obietnic rynku usług", body: "Na tym etapie badamy popyt, zakres i ryzyka." }
    ],
    success: "Dziękujemy. Zapisaliśmy Cię na listę Caniello. Szczegóły zbierzemy później w ankiecie."
  },
  en: {
    eyebrow: "Next · Exploration",
    heroTitle: "Trusted help when pet care needs support.",
    heroBody:
      "We're researching trusted service discovery as a clearer way for caregivers to find pet services shaped around real care needs.",
    heroNote: "This is a future concept. We're researching demand.",
    heroCta: "Join Waitlist",
    featuresTitle: "Services caregivers can trust",
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
    closingTitle: "We're researching trusted services with caregivers.",
    closingBody: "Join the waitlist and help us learn how Caniello should connect caregivers with reliable support before this area launches.",
    closingBenefits: [
      { title: "Early research", body: "We'll invite you when we're testing next-stage assumptions." },
      { title: "Shape trust signals", body: "Your perspective helps define what verified should mean." },
      { title: "No service launch promise", body: "At this stage, we're researching demand, scope, and risks." }
    ],
    success: "Thank you. You're on the Caniello waitlist. We'll collect details later in a survey."
  }
} satisfies Record<Language, ResearchWaveCopy>;

export function MarketplacePage({ language }: MarketplacePageProps) {
  return (
    <ResearchWavePage
      activeWave="wave_2"
      buttonClassName="sm:min-w-[170px]"
      heroImageAlt="Next-stage trusted pet services concept with provider cards and pets"
      heroImageSrc={wave2HeroArt}
      language={language}
      pageCopy={pageCopy[language]}
      source="landing_page_wave2"
      waitlistImageSrc={waitlistPets}
    />
  );
}
