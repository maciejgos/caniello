import { useState } from "react";
import heroArt from "./assets/better-care-hero.png";
import darkWordmark from "./assets/caniello-dark-wordmark.png";
import { FeatureList } from "./components/FeatureList";
import { LanguageToggle } from "./components/LanguageToggle";
import { WaitlistForm } from "./components/WaitlistForm";
import { copy, type Language } from "./content";

export default function App() {
  const [language, setLanguage] = useState<Language>("pl");
  const text = copy[language];

  return (
    <main className="min-h-screen bg-white text-navy">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-7">
        <a className="flex items-center gap-3" href="#top" aria-label="Caniello home">
          <BrandWordmark />
        </a>

        <nav className="hidden items-center gap-10 text-sm font-bold text-navy lg:flex" aria-label="Primary">
          {text.navItems.map((item) => (
            <a className="transition hover:text-gold" href={item === text.navItems[0] ? "#features" : "#waitlist"} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle language={language} onChange={setLanguage} />
          <a
            className="hidden rounded-md bg-navy px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft sm:inline-flex"
            href="#waitlist"
          >
            {text.navCta}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden" id="top">
        <div className="mx-auto grid min-h-[700px] max-w-7xl items-center gap-8 px-6 pb-12 pt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-3 text-sm font-bold text-navy">
              <PawIcon />
              <span>{text.eyebrow}</span>
            </div>

            <h1 className="mt-9 max-w-2xl font-serif text-5xl font-bold leading-[0.98] tracking-normal text-navy sm:text-6xl lg:text-7xl">
              {text.heroTitle}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-navy/82">{text.heroBody}</p>

            <ul className="mt-7 grid gap-4 text-base font-semibold text-navy/90">
              {text.benefits.map((benefit) => (
                <li className="flex items-center gap-4" key={benefit}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                    <CheckIcon />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9" id="waitlist">
              <WaitlistForm language={language} />
              <p className="mt-4 flex items-center gap-2 text-sm text-navy/62">
                <LockIcon />
                {text.privacyNote}
              </p>
            </div>
          </div>

          <div className="relative min-h-[520px] lg:min-h-[640px]" aria-label="Caniello app preview">
            <HeroVisual />
          </div>
        </div>
      </section>

      <FeatureList language={language} />

      <section className="bg-white py-4 pb-24" id="how-it-works">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">{text.howTitle}</h2>
            <ol className="mt-8 grid gap-0">
              {text.steps.map((step, index) => (
                <li className="grid grid-cols-[48px_1fr] gap-4" key={step.title}>
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-base font-bold text-navy">
                      {index + 1}
                    </span>
                    {index < text.steps.length - 1 ? <span className="h-16 w-px bg-navy/10" /> : null}
                  </div>
                  <div className="pb-7">
                    <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-navy/72">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="overflow-hidden rounded-2xl bg-cream shadow-sm">
            <div className="grid gap-8 p-8 md:grid-cols-[0.58fr_0.42fr] md:p-10">
              <div>
                <h2 className="font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl">{text.closingTitle}</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-navy/80">{text.closingBody}</p>
                <div className="mt-8">
                  <WaitlistForm language={language} />
                </div>
              </div>
              <div className="relative hidden min-h-64 md:block">
                <img className="absolute bottom-0 right-0 h-full w-full object-cover object-right" src={heroArt} alt="" aria-hidden="true" />
              </div>
            </div>
            <div className="grid gap-4 border-t border-navy/10 bg-white/55 px-8 py-6 sm:grid-cols-3 md:px-10">
              {text.closingBenefits.map((benefit) => (
                <div className="flex gap-3" key={benefit.title}>
                  <HeartIcon />
                  <div>
                    <h3 className="text-sm font-bold text-navy">{benefit.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-navy/68">{benefit.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">{text.trustTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-navy/75">{text.trustBody}</p>
            <p className="mt-4 text-sm leading-6 text-navy/60">{text.disclaimer}</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-navy/10 bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandWordmark />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-navy/70">{text.footerText}</p>
            <p className="mt-5 text-sm text-navy/55">© 2026 Caniello. All rights reserved.</p>
          </div>
          <div className="grid gap-8 text-sm text-navy/70 sm:grid-cols-3">
            <FooterColumn title="Product" items={text.navItems.slice(0, 3)} />
            <FooterColumn title="Company" items={text.navItems.slice(3)} />
            <FooterColumn title="Resources" items={["Help center", "Privacy policy", "Terms of service"]} />
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-bold text-navy">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item}>
            <a className="hover:text-gold" href="#waitlist">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandWordmark() {
  return (
    <span
      className="block h-14 w-[200px] bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${darkWordmark})`, backgroundSize: "336px auto" }}
      role="img"
      aria-label="Caniello"
    />
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto mt-4 h-[540px] max-w-[640px] lg:h-[650px]">
      <img
        className="absolute inset-0 z-0 h-full w-full object-contain object-center"
        src={heroArt}
        alt="Golden retriever next to a Caniello app preview"
      />
      <PhoneMockup />
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="absolute bottom-0 left-6 z-10 h-[520px] w-[265px] rounded-[2.4rem] border-[10px] border-[#111111] bg-white shadow-2xl ring-1 ring-black/15 lg:left-10 lg:h-[620px] lg:w-[316px] lg:rounded-[3rem]">
      <div className="absolute left-1/2 top-3 h-7 w-28 -translate-x-1/2 rounded-full bg-black lg:h-8 lg:w-32" />
      <div className="flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-white px-5 pb-4 pt-12 lg:rounded-[2.35rem] lg:px-6 lg:pt-14">
        <div className="flex items-center justify-between text-[11px] font-bold text-navy">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-4 rounded-sm border border-navy/70" />
          </span>
        </div>

        <div className="mt-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-3xl">🐶</div>
          <div>
            <p className="text-xs font-semibold text-navy/50">Hi, Anna! 👋</p>
            <h2 className="text-2xl font-black text-navy">Bruno</h2>
            <p className="text-xs font-semibold text-navy/55">Golden Retriever · 3 years</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-3 text-center text-[10px] font-bold text-navy/75">
          {["Records", "Reminders", "Documents", "Share"].map((label) => (
            <div className="grid gap-2" key={label}>
              <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-cream/70 text-navy">
                {label === "Records" ? <FileIcon /> : label === "Reminders" ? <BellSmallIcon /> : label === "Documents" ? <DocIcon /> : <ShareIcon />}
              </span>
              {label}
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-base font-black text-navy">Upcoming</h3>
        <div className="mt-3 rounded-2xl border border-navy/8 bg-white p-4 shadow-[0_14px_35px_rgba(7,31,73,0.08)]">
          <PhoneEvent title="Vaccination" subtitle="DHPPI vaccine" date="May 24, 2024" badge="In 10 days" />
          <PhoneEvent title="Vet visit" subtitle="Annual check-up" date="May 30, 2024" badge="In 16 days" warm />
          <button className="mt-4 h-10 w-full rounded-xl border border-navy/10 text-xs font-black text-navy" type="button">
            View all
          </button>
        </div>

        <h3 className="mt-6 text-base font-black text-navy">Health overview</h3>
        <div className="mt-3 grid grid-cols-2 rounded-2xl border border-navy/8 bg-white p-4 shadow-[0_14px_35px_rgba(7,31,73,0.08)]">
          <div className="border-r border-navy/10 pr-3">
            <p className="text-[10px] font-bold text-navy/45">Weight</p>
            <p className="mt-1 text-lg font-black text-navy">24.5 kg</p>
            <p className="text-[10px] font-semibold text-navy/45">2 days ago</p>
          </div>
          <div className="pl-4">
            <p className="text-[10px] font-bold text-navy/45">Last check-up</p>
            <p className="mt-1 text-lg font-black text-navy">Apr 12, 2024</p>
            <p className="text-[10px] font-bold text-emerald-500">All good</p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-5 items-center border-t border-navy/8 pt-3 text-center text-[10px] font-bold text-navy/65">
          {["Home", "Care", "+", "Share", "More"].map((item) => (
            <span
              className={item === "+" ? "mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy text-3xl font-normal text-white" : ""}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneEvent({ title, subtitle, date, badge, warm = false }: { title: string; subtitle: string; date: string; badge: string; warm?: boolean }) {
  return (
    <div className="grid grid-cols-[32px_1fr_auto] items-start gap-3 py-2">
      <span className="mt-1 text-navy">
        <StarIcon />
      </span>
      <span>
        <strong className="block text-sm text-navy">{title}</strong>
        <span className="block text-xs font-semibold text-navy/55">{subtitle}</span>
        <span className="block text-xs font-semibold text-navy/55">{date}</span>
      </span>
      <span className={`rounded-full px-3 py-1 text-xs font-black ${warm ? "bg-cream text-gold" : "bg-[#eeebff] text-[#6357bc]"}`}>{badge}</span>
    </div>
  );
}

function PawIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="18" cy="14" r="2" />
      <path d="M8.5 18.5c0-2.2 1.6-4 3.5-4s3.5 1.8 3.5 4c0 1.2-.8 2-2 2h-3c-1.2 0-2-.8-2-2Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

function BellSmallIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M15 17H9a3 3 0 0 1-3-3v-2a6 6 0 1 1 12 0v2a3 3 0 0 1-3 3Z" />
      <path d="M10 20h4" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M7 4h7l3 3v13H7V4Z" />
      <path d="M14 4v4h4" />
      <path d="M9.5 12h5" />
      <path d="M9.5 15h4" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="7" cy="12" r="2.5" />
      <circle cx="17" cy="6" r="2.5" />
      <circle cx="17" cy="18" r="2.5" />
      <path d="m9.2 10.8 5.6-3.6" />
      <path d="m9.2 13.2 5.6 3.6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="m12 3 2.4 5 5.4.8-3.9 3.8.9 5.4-4.8-2.6L7.2 18l.9-5.4-3.9-3.8 5.4-.8L12 3Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
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

function HeartIcon() {
  return (
    <svg className="mt-1 h-6 w-6 shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20s-7-4.4-9.2-8.3C.9 8.2 2.9 5 6.2 5c1.8 0 3.2 1 3.9 2.1C10.8 6 12.2 5 14 5c3.3 0 5.3 3.2 3.4 6.7C15.2 15.6 12 20 12 20Z" />
    </svg>
  );
}
