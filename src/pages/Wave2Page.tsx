import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import wave2HeroArt from "../../spec/notes/landing/image 5.png";
import { AnalyticsConsentPopup } from "../components/AnalyticsConsentPopup";
import { WaitlistForm } from "../components/WaitlistForm";
import type { Language } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";

type Wave2PageProps = {
  language: Language;
};

const pageCopy = {
  pl: {
    eyebrow: "Wave 2 · Eksploracja",
    title: "Zaufane usługi dla pupili, starannie wybrane.",
    body:
      "Po MVP Caniello bada zaufany marketplace usług dla zwierząt, który pomoże znaleźć najlepszą opiekę dla pupila - kuratorowaną, sprawdzaną i połączoną z historią zdrowia.",
    conceptNote: "To przyszła koncepcja. Badamy popyt.",
    providerCta: "Dołącz jako usługodawca",
    conceptCta: "Zobacz koncepcję",
    valueCards: [
      {
        title: "Odkrywaj zaufanych usługodawców",
        body: "Znajdź wysoko ocenianych, wstępnie sprawdzonych specjalistów na każdym etapie opieki."
      },
      {
        title: "Trzymaj wszystko w jednym miejscu",
        body: "Rezerwacje, wiadomości i usługi połączone z informacjami o zdrowiu pupila."
      },
      {
        title: "Sprawdzaj wiarygodne szczegóły",
        body: "Zobacz uprawnienia, opinie, zasady i ceny, by wybierać z większą pewnością."
      },
      {
        title: "Zapisuj ulubione usługi",
        body: "Wracaj do opiekunów i usług, które Twój pupil już zna i lubi."
      }
    ],
    ownerPanelTitle: "Dla opiekunów",
    ownerPanelBody: "Pomóż nam zrozumieć Twoje potrzeby.",
    ownerPanelCta: "Jestem opiekunem",
    ownerPanelNote: "Powiedz, co jest dla Ciebie ważne",
    researchTitle: "Badanie w toku",
    researchBody:
      "Wave 2 to przyszła koncepcja. Uruchomimy marketplace tylko po walidacji silnego popytu opiekunów i partnerów.",
    researchSteps: [
      { title: "Słuchamy opiekunów", body: "przez ankiety i rozmowy" },
      { title: "Rozmawiamy z usługodawcami", body: "o potrzebach i wyzwaniach" },
      { title: "Budujemy właściwe doświadczenie", body: "razem ze społecznością" }
    ],
    providerPanelTitle: "Dla usługodawców",
    providerPanelBody: "Dowiedz się jako pierwszy, kiedy będziemy gotowi testować Wave 2.",
    providerPanelCta: "Jestem usługodawcą",
    providerPanelNote: "Opowiedz nam o swojej firmie",
    footerTitle: "Pomóż ukształtować przyszłość opieki nad pupilami",
    footerBody: "Dołącz do listy po aktualizacje, wczesne badania i informacje o Wave 2.",
    footerPrivacy: "Szanujemy prywatność. Zero spamu.",
    fields: {
      organization: "Nazwa firmy lub usługi",
      context: "Kategoria usługi lub lokalizacja",
      website: "Strona internetowa"
    },
    success: "Dziękujemy. Zapisaliśmy zainteresowanie badaniem Wave 2."
  },
  en: {
    eyebrow: "Wave 2 · Exploration",
    title: "Trusted pet services, carefully curated.",
    body:
      "After our MVP, Caniello is exploring a trusted pet services marketplace to help you find the best care for your pet - curated, reviewed, and connected to your pet's health.",
    conceptNote: "This is a future concept. We're researching demand.",
    providerCta: "Join as provider",
    conceptCta: "See the concept",
    valueCards: [
      {
        title: "Discover trusted providers",
        body: "Find highly rated, vetted professionals for every stage of your pet's life."
      },
      {
        title: "Keep everything in one place",
        body: "Book, message, and manage services alongside your pet's health information."
      },
      {
        title: "View trusted details",
        body: "See credentials, reviews, policies, and pricing so you can choose with confidence."
      },
      {
        title: "Save favorite services",
        body: "Save providers you love and revisit care your pet already knows and trusts."
      }
    ],
    ownerPanelTitle: "For pet owners",
    ownerPanelBody: "Help us understand your needs.",
    ownerPanelCta: "I'm a pet owner",
    ownerPanelNote: "Share what matters to you",
    researchTitle: "Research in progress",
    researchBody:
      "Wave 2 is a future concept. We will launch this marketplace only after validating strong demand from pet owners and partners.",
    researchSteps: [
      { title: "Listening to owners", body: "through surveys and research" },
      { title: "Talking with providers", body: "to understand needs and challenges" },
      { title: "Building the right experience", body: "together with our community" }
    ],
    providerPanelTitle: "For pet service providers",
    providerPanelBody: "Be the first to know when we're ready to test Wave 2.",
    providerPanelCta: "I'm a pet service provider",
    providerPanelNote: "Tell us about your business",
    footerTitle: "Help shape the future of pet care",
    footerBody: "Join our waitlist for updates, early research opportunities, and the latest news on Wave 2.",
    footerPrivacy: "We respect your privacy. No spam, ever.",
    fields: {
      organization: "Business or service name",
      context: "Service category or location",
      website: "Website"
    },
    success: "Thank you. Your Wave 2 research interest has been noted."
  }
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  body: string;
  conceptNote: string;
  providerCta: string;
  conceptCta: string;
  valueCards: Array<{ title: string; body: string }>;
  ownerPanelTitle: string;
  ownerPanelBody: string;
  ownerPanelCta: string;
  ownerPanelNote: string;
  researchTitle: string;
  researchBody: string;
  researchSteps: Array<{ title: string; body: string }>;
  providerPanelTitle: string;
  providerPanelBody: string;
  providerPanelCta: string;
  providerPanelNote: string;
  footerTitle: string;
  footerBody: string;
  footerPrivacy: string;
  fields: { organization: string; context: string; website: string };
  success: string;
}>;

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
      <section className="bg-white px-5 pb-8 pt-2 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1664px]">
          <div className="grid items-center gap-8 pt-4 lg:grid-cols-[0.86fr_1.4fr] lg:gap-10 lg:pt-8">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-2xl bg-cream px-4 py-2 text-sm font-bold text-gold">
                <PetServiceIcon />
                <span>{text.eyebrow}</span>
              </div>
              <h1 className="mt-6 max-w-[620px] font-serif text-5xl font-bold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
                {text.title}
              </h1>
              <p className="mt-5 max-w-[580px] text-base leading-7 text-navy sm:text-[17px]">{text.body}</p>
              <p className="mt-5 flex items-center gap-3 text-sm font-semibold text-navy/72">
                <LockIcon />
                {text.conceptNote}
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a className="inline-flex h-12 items-center rounded-lg bg-navy px-8 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft" href="#provider-interest">
                  {text.providerCta}
                </a>
                <a className="inline-flex h-12 items-center gap-3 rounded-lg px-2 text-sm font-bold text-navy transition hover:text-gold" href="#concept">
                  {text.conceptCta}
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <div className="relative" id="concept">
              <img
                className="h-auto w-full rounded-[28px] object-contain"
                src={wave2HeroArt}
                alt="Wave 2 trusted pet services marketplace concept with provider cards and a dog"
              />
            </div>
          </div>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" id="features" aria-label={language === "pl" ? "Korzyści Wave 2" : "Wave 2 benefits"}>
            {text.valueCards.map((card, index) => (
              <article className="grid grid-cols-[68px_1fr] gap-4 rounded-lg border border-navy/10 bg-white p-4 shadow-sm" key={card.title}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-navy">
                  <ValueIcon index={index} />
                </span>
                <div>
                  <h2 className="text-sm font-bold leading-5 text-navy">{card.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-navy">{card.body}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-4 grid gap-0 overflow-hidden rounded-lg bg-cream md:grid-cols-[0.75fr_1.35fr_0.75fr]" id="research">
            <SidePanel
              body={text.ownerPanelBody}
              cta={text.ownerPanelCta}
              href="/#waitlist"
              icon={<OwnerIcon />}
              note={text.ownerPanelNote}
              title={text.ownerPanelTitle}
            />
            <div className="border-y border-navy/10 bg-white/30 px-5 py-6 text-center md:border-x md:border-y-0 lg:px-8" id="how-it-works">
              <h2 className="font-serif text-3xl font-bold leading-tight text-navy">{text.researchTitle}</h2>
              <p className="mx-auto mt-3 max-w-[620px] text-sm font-semibold leading-6 text-navy">{text.researchBody}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {text.researchSteps.map((step, index) => (
                  <div className="grid grid-cols-[34px_1fr] gap-3 text-left" key={step.title}>
                    <span className="text-navy">
                      <ResearchIcon index={index} />
                    </span>
                    <p className="text-xs leading-5 text-navy">
                      <strong className="block">{step.title}</strong>
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <SidePanel
              body={text.providerPanelBody}
              cta={text.providerPanelCta}
              href="#provider-interest"
              icon={<StoreIcon />}
              note={text.providerPanelNote}
              title={text.providerPanelTitle}
            />
          </section>

          <section className="mt-4 overflow-hidden rounded-lg bg-cream px-5 py-5 sm:px-8" id="provider-interest">
            <div className="grid gap-5 md:grid-cols-[72px_1fr] md:items-center lg:grid-cols-[72px_minmax(360px,0.95fr)_minmax(420px,0.8fr)_92px]">
              <span className="hidden h-14 w-14 items-center justify-center rounded-full bg-white text-navy md:flex" aria-hidden="true">
                <MailIcon />
              </span>
              <div>
                <h2 className="font-serif text-3xl font-bold leading-tight text-navy">{text.footerTitle}</h2>
                <p className="mt-2 max-w-[620px] text-sm font-semibold leading-6 text-navy">{text.footerBody}</p>
              </div>
              <WaitlistForm
                buttonClassName="sm:min-w-[170px]"
                className="max-w-[620px] md:col-span-2 lg:col-span-1 lg:justify-self-end"
                compactConsent
                interestWave="wave_2"
                language={language}
                role="pet_service_provider"
                source="landing_page_wave2"
                submitLabel={sharedText.navCta}
                successMessage={text.success}
              />
              <span className="hidden justify-self-end text-gold lg:block" aria-hidden="true">
                <FooterPawIcon />
              </span>
            </div>
          </section>
        </div>
      </section>

      {analyticsChoice === null ? <AnalyticsConsentPopup text={sharedText} onSelect={(granted) => void handleAnalyticsConsent(granted)} /> : null}
    </>
  );
}

function SidePanel({ body, cta, href, icon, note, title }: { body: string; cta: string; href: string; icon: ReactNode; note: string; title: string }) {
  return (
    <div className="grid gap-4 px-5 py-6 sm:grid-cols-[80px_1fr] md:block lg:px-8">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-navy">{icon}</span>
      <div className="md:mt-4">
        <h2 className="text-base font-bold text-navy">{title}</h2>
        <p className="mt-1 text-sm font-semibold leading-6 text-navy">{body}</p>
        <a className="mt-4 inline-flex h-10 items-center rounded-md bg-white px-5 text-sm font-bold text-navy shadow-sm transition hover:text-gold" href={href}>
          {cta}
        </a>
        <p className="mt-3 text-xs text-navy/70">{note}</p>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12" />
      <path d="m11 5 5 5-5 5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <path d="M6 11h12v9H6z" />
    </svg>
  );
}

function PetServiceIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10h16l-1.2-4H5.2L4 10Z" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
      <path d="M3.5 10c0 1.5 1.1 2.6 2.5 2.6S8.5 11.5 8.5 10" />
      <path d="M8.5 10c0 1.5 1.1 2.6 2.5 2.6s2.5-1.1 2.5-2.6" />
      <path d="M13.5 10c0 1.5 1.1 2.6 2.5 2.6s2.5-1.1 2.5-2.6" />
    </svg>
  );
}

function ValueIcon({ index }: { index: number }) {
  const icons = [SearchIcon, CalendarIcon, ShieldIcon, HeartIcon] as const;
  const Icon = icons[index] ?? SearchIcon;
  return <Icon />;
}

function ResearchIcon({ index }: { index: number }) {
  const icons = [OwnerIcon, ShieldIcon, CommunityIcon] as const;
  const Icon = icons[index] ?? OwnerIcon;
  return <Icon small />;
}

function SearchIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 5 5" />
      <path d="m8 10 1.8 1.8L13.5 8" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5h14v15H5z" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M5 10h14" />
      <path d="M8 14h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

function ShieldIcon({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "h-7 w-7" : "h-8 w-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 4.5 6v5.5c0 4.5 3 7.8 7.5 9.5 4.5-1.7 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-7-4.4-9.2-8.3C.9 8.2 2.9 5 6.2 5c1.8 0 3.2 1 3.9 2.1C10.8 6 12.2 5 14 5c3.3 0 5.3 3.2 3.4 6.7C17.1 15.7 12 20 12 20Z" />
    </svg>
  );
}

function PawOutlineIcon() {
  return (
    <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="18" cy="14" r="2" />
      <path d="M8.5 18.5c0-2.2 1.6-4 3.5-4s3.5 1.8 3.5 4c0 1.2-.8 2-2 2h-3c-1.2 0-2-.8-2-2Z" />
    </svg>
  );
}

function FooterPawIcon() {
  return (
    <svg className="h-20 w-20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <ellipse cx="21" cy="20" rx="6" ry="9" />
      <ellipse cx="33" cy="15" rx="6" ry="9" />
      <ellipse cx="45" cy="20" rx="6" ry="9" />
      <ellipse cx="15" cy="34" rx="6" ry="8" />
      <ellipse cx="50" cy="34" rx="6" ry="8" />
      <path d="M20 48c0-9 6-16 13-16s13 7 13 16c0 5-3 8-8 8H28c-5 0-8-3-8-8Z" />
    </svg>
  );
}

function OwnerIcon({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "h-7 w-7" : "h-12 w-12"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="10" cy="7" r="4" />
      <path d="M3.5 21a6.5 6.5 0 0 1 13 0" />
      <circle cx="18" cy="15" r="1.8" />
      <circle cx="15" cy="18" r="1.5" />
      <circle cx="21" cy="18" r="1.5" />
      <path d="M16.5 21c0-1.4 1-2.6 2.2-2.6s2.2 1.2 2.2 2.6c0 .8-.5 1.3-1.3 1.3h-1.8c-.8 0-1.3-.5-1.3-1.3Z" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 10h16l-1.2-4H5.2L4 10Z" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
      <path d="M8 15.5c0-1 .7-1.8 1.5-1.8.5 0 .9.3 1.2.8.3-.5.7-.8 1.2-.8.8 0 1.5.8 1.5 1.8 0 1.5-2.7 3.2-2.7 3.2S8 17 8 15.5Z" />
    </svg>
  );
}

function CommunityIcon({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "h-7 w-7" : "h-8 w-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M16 12a3.5 3.5 0 1 0 0-7" />
      <path d="M2.5 21a5.5 5.5 0 0 1 11 0" />
      <path d="M14.5 16.5A5 5 0 0 1 21.5 21" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
