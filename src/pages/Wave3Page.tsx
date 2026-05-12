import { useEffect, useState } from "react";
import petsArt from "../assets/caniello-waitlist-pets.png";
import { AnalyticsConsentPopup } from "../components/AnalyticsConsentPopup";
import { WaitlistForm } from "../components/WaitlistForm";
import type { Language } from "../content";
import { copy } from "../content";
import { readUtmParams } from "../lib/landing-leads";
import { readAnalyticsConsent, readAnalyticsPreference, saveAnalyticsConsent, trackValidationEvent } from "../lib/validation-events";

type Wave3PageProps = {
  language: Language;
};

const pageCopy = {
  pl: {
    eyebrow: "Wave 3 · Badanie",
    title: "Współpraca klinik z kontekstem zaakceptowanym przez opiekuna.",
    body:
      "Caniello bada narzędzia, które pomagają klinikom i lekarzom widzieć udostępnione przez opiekuna rekordy zdrowia, dokumenty, oś czasu i przypomnienia - mniej szukania, więcej opieki.",
    conceptNote: "Etap badawczy. To nie jest produkt. Walidujemy zainteresowanie.",
    clinicCta: "Dołącz jako klinika lub wet.",
    conceptCta: "Zobacz koncepcję",
    heroPet: "Cooper",
    heroMeta: "Golden Retriever · samiec · 4 lata",
    heroOwner: "Opiekunka: Sarah Johnson",
    access: "Dostęp zatwierdzony przez opiekuna",
    valueCards: [
      {
        title: "Przejrzyj udostępnione rekordy przed wizytą",
        body: "Zobacz historię i dokumenty zaakceptowane przez opiekuna, aby prowadzić bardziej konkretne rozmowy."
      },
      {
        title: "Zobacz przypomnienia i ważne dokumenty",
        body: "Podgląd szczepień, wyników i dokumentów, które opiekun wybrał do udostępnienia."
      },
      {
        title: "Współpracuj z opiekunami",
        body: "Pracuj z rodzicami pupili na tym samym kontekście i wspieraj lepsze decyzje."
      },
      {
        title: "Ogranicz rozproszone informacje",
        body: "Łącz fragmenty tylko w zakresie, który opiekun zaakceptował do wglądu."
      }
    ],
    researchTitle: "Wave 3 to koncepcja badawcza.",
    researchBody: "Badamy, jak bezpieczne udostępnianie za zgodą opiekuna może wspierać współpracę z klinikami.",
    ownerCta: "Jestem opiekunem",
    ownerNote: "Dowiedz się, jak to może Ci pomóc.",
    trustTitle: "Bezpiecznie i pod kontrolą opiekuna",
    trustBody: "Zaufanie pacjentów jest najważniejsze. Wave 3 projektujemy z prywatnością, zgodami i przejrzystością w centrum.",
    trustItems: [
      { title: "Dostęp zatwierdzony przez opiekuna", body: "Klinika widzi tylko to, co zostało udostępnione." },
      { title: "Prywatność od początku", body: "Narzędzia badawcze zakładają bezpieczny, tylko-do-odczytu dostęp." },
      { title: "Lepsze przygotowanie wizyt", body: "Kontekst pomaga prowadzić bardziej spersonalizowaną opiekę." },
      { title: "Przejrzystość", body: "Opiekun może sprawdzić i aktualizować dostęp w każdej chwili." }
    ],
    footerTitle: "Bądź na bieżąco z Wave 3",
    footerBody: "Dołącz do listy zainteresowanych aktualizacjami dla klinik i lekarzy weterynarii.",
    success: "Dziękujemy. Zapisaliśmy zainteresowanie badaniem Wave 3."
  },
  en: {
    eyebrow: "Wave 3 · Research",
    title: "Clinic collaboration with owner-approved context.",
    body:
      "Caniello is exploring tools that could help clinics and vets view owner-approved pet health records, documents, timelines, and reminders - so you can spend less time searching and more time caring.",
    conceptNote: "Research stage. Not a product. Interest is being validated now.",
    clinicCta: "Join as clinic or vet",
    conceptCta: "Explore the concept",
    heroPet: "Cooper",
    heroMeta: "Golden Retriever · Male · 4 yrs",
    heroOwner: "Owner: Sarah Johnson",
    access: "Owner-approved access",
    valueCards: [
      {
        title: "Review shared records before visits",
        body: "See owner-approved history and documents to prepare for more focused conversations."
      },
      {
        title: "See reminders and important documents",
        body: "View upcoming care, vaccines, and documents owners have chosen to share."
      },
      {
        title: "Collaborate with owners",
        body: "Work together with pet parents using the same context to support better decisions."
      },
      {
        title: "Reduce fragmented information",
        body: "Bring trusted pieces together - only what the owner approves you to see."
      }
    ],
    researchTitle: "Wave 3 is a research-stage concept.",
    researchBody: "We're exploring how secure, owner-approved sharing could support clinic collaboration.",
    ownerCta: "I'm a pet owner",
    ownerNote: "Learn how this could help you.",
    trustTitle: "Secure and owner-controlled",
    trustBody: "Your patients' trust is everything. Wave 3 is designed with privacy, permission, and transparency at its core.",
    trustItems: [
      { title: "Owner-approved access", body: "You only see what is shared. Owners stay in control." },
      { title: "Privacy by design", body: "Research-grade tools explore secure, read-only access." },
      { title: "Better prepared visits", body: "Context helps support more personalized care." },
      { title: "Transparency", body: "Owners can review and update access anytime." }
    ],
    footerTitle: "Stay informed about Wave 3",
    footerBody: "Join the early-interest list for clinic and vet updates.",
    success: "Thank you. Your Wave 3 research interest has been noted."
  }
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  body: string;
  conceptNote: string;
  clinicCta: string;
  conceptCta: string;
  heroPet: string;
  heroMeta: string;
  heroOwner: string;
  access: string;
  valueCards: Array<{ title: string; body: string }>;
  researchTitle: string;
  researchBody: string;
  ownerCta: string;
  ownerNote: string;
  trustTitle: string;
  trustBody: string;
  trustItems: Array<{ title: string; body: string }>;
  footerTitle: string;
  footerBody: string;
  success: string;
}>;

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
      <section className="bg-white px-5 pb-8 pt-2 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1664px]">
          <div className="grid items-center gap-8 pt-4 lg:grid-cols-[0.78fr_1.42fr] lg:gap-10 lg:pt-8">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-2xl bg-cream px-4 py-2 text-sm font-bold text-navy">
                <LabIcon />
                <span>{text.eyebrow}</span>
              </div>
              <h1 className="mt-6 max-w-[650px] font-serif text-5xl font-bold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
                {text.title}
              </h1>
              <p className="mt-5 max-w-[590px] text-base leading-7 text-navy sm:text-[17px]">{text.body}</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a className="inline-flex h-12 items-center gap-3 rounded-lg bg-navy px-8 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft" href="#clinic-interest">
                  <ClinicIcon small />
                  {text.clinicCta}
                </a>
                <a className="inline-flex h-12 items-center gap-3 rounded-lg border border-navy/10 bg-white px-7 text-sm font-bold text-navy shadow-sm transition hover:text-gold" href="#concept">
                  {text.conceptCta}
                  <ArrowIcon />
                </a>
              </div>
              <p className="mt-5 flex items-center gap-3 text-sm font-semibold text-navy/72">
                <LockIcon />
                {text.conceptNote}
              </p>
            </div>

            <div className="relative min-h-[420px]" id="concept">
              <div className="absolute left-0 top-7 h-[82%] w-[88%] rounded-[44%_56%_42%_24%] bg-cream" />
              <ClinicDashboard text={text} />
              <span className="absolute bottom-8 left-1 hidden text-gold lg:block" aria-hidden="true">
                <PawIcon />
              </span>
              <span className="absolute right-1 top-[44%] hidden text-gold lg:block" aria-hidden="true">
                <HeartIcon />
              </span>
            </div>
          </div>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label={language === "pl" ? "Korzyści Wave 3" : "Wave 3 benefits"}>
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

          <section className="mt-4 grid gap-5 rounded-lg bg-cream px-5 py-5 sm:px-8 lg:grid-cols-[64px_1fr_0.82fr_0.82fr_72px] lg:items-center" id="research">
            <span className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-navy lg:flex" aria-hidden="true">
              <LabIcon large />
            </span>
            <div>
              <h2 className="font-serif text-2xl font-bold leading-tight text-navy">{text.researchTitle}</h2>
              <p className="mt-1 text-sm font-semibold leading-6 text-navy">{text.researchBody}</p>
            </div>
            <a className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-white px-5 text-sm font-bold text-navy shadow-sm transition hover:text-gold" href="#clinic-interest">
              <ClinicIcon small />
              {text.clinicCta}
              <ArrowIcon />
            </a>
            <a className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-white px-5 text-sm font-bold text-navy shadow-sm transition hover:text-gold" href="/#waitlist">
              <OwnerIcon small />
              {text.ownerCta}
              <ArrowIcon />
            </a>
            <span className="hidden justify-self-end text-gold lg:block" aria-hidden="true">
              <PawIcon />
            </span>
          </section>

          <section className="mt-4 grid gap-5 lg:grid-cols-[0.95fr_1fr]" id="clinic-interest">
            <div className="rounded-lg bg-white p-5 sm:p-6">
              <h2 className="font-serif text-3xl font-bold leading-tight text-navy">{text.trustTitle}</h2>
              <p className="mt-3 max-w-[620px] text-sm font-semibold leading-6 text-navy">{text.trustBody}</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {text.trustItems.map((item, index) => (
                  <div className="grid grid-cols-[36px_1fr] gap-3" key={item.title}>
                    <span className="text-navy">
                      <TrustIcon index={index} />
                    </span>
                    <p className="text-xs leading-5 text-navy">
                      <strong className="block">{item.title}</strong>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid overflow-hidden rounded-lg bg-cream lg:grid-cols-[1fr_260px]">
              <div className="p-5 sm:p-6">
                <h2 className="font-serif text-3xl font-bold leading-tight text-navy">{text.footerTitle}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-navy">{text.footerBody}</p>
                <div className="mt-5">
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
              </div>
              <div className="hidden items-end justify-end overflow-hidden lg:flex">
                <img className="h-full max-h-[260px] w-full object-cover object-[62%_center]" src={petsArt} alt="" aria-hidden="true" />
              </div>
            </div>
          </section>
        </div>
      </section>

      {analyticsChoice === null ? <AnalyticsConsentPopup text={sharedText} onSelect={(granted) => void handleAnalyticsConsent(granted)} /> : null}
    </>
  );
}

function ClinicDashboard({ text }: { text: (typeof pageCopy)[Language] }) {
  const timeline = ["Rabies", "DHPP", "Bordetella"];
  const docs = ["Annual Exam Summary", "Fecal Test Results", "Radiology Report"];
  const reminders = ["Heartworm preventive", "Wellness exam", "Vaccines"];

  return (
    <div className="relative ml-auto w-full max-w-[900px] rounded-[22px] border border-navy/10 bg-white p-4 shadow-soft lg:w-[92%]">
      <div className="grid gap-4 lg:grid-cols-[150px_1fr]">
        <aside className="hidden rounded-lg bg-[#f7f9fc] p-4 text-xs font-bold text-navy/75 lg:block">
          <p className="text-base text-navy">Caniello</p>
          {["Overview", "Records", "Documents", "Reminders", "Access", "Activity"].map((item, index) => (
            <span className={`mt-4 block rounded-md px-3 py-2 ${index === 0 ? "bg-[#eaf1ff] text-navy" : ""}`} key={item}>
              {item}
            </span>
          ))}
        </aside>
        <div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="grid grid-cols-[64px_1fr] gap-4">
              <img className="h-16 w-16 rounded-full object-cover object-[62%_center]" src={petsArt} alt="" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold text-navy">{text.heroPet}</h2>
                <p className="text-xs font-semibold leading-5 text-navy/70">{text.heroMeta}</p>
                <p className="text-xs font-semibold leading-5 text-navy/70">{text.heroOwner}</p>
              </div>
            </div>
            <div className="rounded-lg border border-navy/10 px-4 py-3 text-xs font-bold text-emerald-700">
              {text.access}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <DashboardPanel title="Vaccination timeline" items={timeline} />
            <DashboardPanel title="Recent documents" items={docs} />
            <DashboardPanel title="Reminders" items={reminders} />
          </div>

          <div className="mt-4 rounded-lg border border-navy/10 bg-white p-4">
            <h3 className="text-sm font-bold text-navy">Access & permissions</h3>
            <div className="mt-3 grid gap-3 text-[11px] font-semibold text-navy/72 sm:grid-cols-4">
              <span>Sharing: Standard</span>
              <span>Vaccinations: Shared</span>
              <span>Records: View only</span>
              <span>Reminders: Shared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-navy/10 bg-white p-4">
      <h3 className="text-sm font-bold text-navy">{title}</h3>
      <ul className="mt-3 grid gap-3">
        {items.map((item) => (
          <li className="flex items-center justify-between gap-2 text-xs font-semibold text-navy/75" key={item}>
            <span>{item}</span>
            <span className="rounded bg-[#eef3ff] px-2 py-1 text-[10px] text-navy">PDF</span>
          </li>
        ))}
      </ul>
    </section>
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

function LabIcon({ large = false }: { large?: boolean }) {
  return (
    <svg className={large ? "h-8 w-8" : "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 3h6" />
      <path d="M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V3" />
      <path d="M8 15h8" />
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

function ValueIcon({ index }: { index: number }) {
  const icons = [RecordsIcon, BellIcon, OwnerIcon, ShieldIcon] as const;
  const Icon = icons[index] ?? RecordsIcon;
  return <Icon />;
}

function TrustIcon({ index }: { index: number }) {
  const icons = [ShieldIcon, LockIcon, HeartIcon, EyeIcon] as const;
  const Icon = icons[index] ?? ShieldIcon;
  return <Icon />;
}

function RecordsIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h3" />
      <circle cx="17" cy="17" r="3" />
      <path d="m19.2 19.2 2 2" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 17H9a3 3 0 0 1-3-3v-2a6 6 0 1 1 12 0v2a3 3 0 0 1-3 3Z" />
      <path d="M10 20h4" />
      <path d="M12 4V2" />
    </svg>
  );
}

function ClinicIcon({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "h-5 w-5" : "h-8 w-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-6h6v6" />
      <path d="M12 8v4" />
      <path d="M10 10h4" />
      <circle cx="18" cy="17" r="3" />
    </svg>
  );
}

function OwnerIcon({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "h-5 w-5" : "h-8 w-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="7" r="4" />
      <path d="M2.5 21a6.5 6.5 0 0 1 13 0" />
      <path d="m16.5 13.5 1.8 1.8 3.7-4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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

function EyeIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="18" cy="14" r="2" />
      <path d="M8.5 18.5c0-2.2 1.6-4 3.5-4s3.5 1.8 3.5 4c0 1.2-.8 2-2 2h-3c-1.2 0-2-.8-2-2Z" />
    </svg>
  );
}
