import heroArt from "./assets/caniello-bruno-app-hero.png";
import darkWordmark from "./assets/caniello-dark-wordmark.png";
import waitlistPets from "./assets/puppys_transparent.png";
import { WaitlistForm } from "./components/WaitlistForm";
import { copy } from "./content";

const text = copy.en;

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-navy">
      <header className="mx-auto flex w-full max-w-[1664px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
        <a className="block" href="#top" aria-label="Caniello home">
          <BrandWordmark />
        </a>

        <nav className="hidden items-center gap-10 text-[13px] font-bold text-navy lg:flex" aria-label="Primary">
          {text.navItems.map((item) => (
            <a className="transition hover:text-gold" href={item === text.navItems[0] ? "#features" : "#waitlist"} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <a className="hidden rounded-lg bg-navy px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft sm:inline-flex" href="#waitlist">
          {text.navCta}
        </a>
      </header>

      <section className="overflow-hidden bg-white" id="top">
        <div className="mx-auto grid w-full max-w-[1664px] items-start gap-10 px-5 pb-8 pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[minmax(520px,0.78fr)_minmax(0,1fr)] lg:px-12 lg:pb-10 lg:pt-14 xl:px-16">
          <div className="relative z-10 max-w-[640px]">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-cream px-4 py-2.5 text-sm font-bold text-navy">
              <PawIcon />
              <span>{text.eyebrow}</span>
            </div>

            <h1 className="mt-7 font-serif text-5xl font-bold leading-[1.02] tracking-normal text-navy sm:text-6xl lg:text-7xl" aria-label="Better care. Stronger bond.">
              <span className="block">Better care.</span>
              <span className="block">Stronger bond.</span>
            </h1>
            <p className="mt-7 max-w-[520px] text-base leading-[1.7] text-navy sm:text-[17px]">{text.heroBody}</p>

            <ul className="mt-7 grid gap-4 text-[15px] font-medium text-navy">
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
              <WaitlistForm language="en" />
              <p className="mt-4 flex items-center gap-3 text-xs text-navy/62">
                <LockIcon />
                {text.privacyNote}
              </p>
            </div>
          </div>

          <div className="relative min-h-[340px] sm:min-h-[480px] lg:min-h-[610px]" aria-label="Caniello app preview">
            <img
              className="absolute inset-x-1/2 top-0 h-auto w-[min(760px,118vw)] max-w-none -translate-x-1/2 object-contain object-bottom lg:left-auto lg:right-0 lg:w-[min(870px,52vw)] lg:translate-x-0"
              src={heroArt}
              alt="Caniello app preview for Bruno beside a golden retriever"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-12 pt-8 sm:px-8 lg:px-12 lg:pt-10 xl:px-16" id="features" aria-labelledby="features-title">
        <div className="mx-auto w-full max-w-[1664px]">
          <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl" id="features-title">
            {text.featuresTitle}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-14">
            {text.features.map((feature, index) => (
              <article className="text-center" key={feature.title}>
                <div className="mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full bg-cream text-navy">
                  <FeatureIcon index={index} />
                </div>
                <h3 className="mt-4 text-sm font-bold text-navy">{feature.title}</h3>
                <p className="mx-auto mt-3 max-w-[220px] text-xs leading-5 text-navy">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 xl:px-16" id="how-it-works">
        <div className="mx-auto grid w-full max-w-[1664px] gap-10 lg:grid-cols-[minmax(260px,0.38fr)_minmax(0,1fr)] xl:gap-16">
          <div>
            <h2 className="font-serif text-3xl font-bold leading-tight text-navy sm:text-4xl">{text.howTitle}</h2>
            <ol className="mt-6 grid gap-0">
              {text.steps.map((step, index) => (
                <li className="grid grid-cols-[48px_1fr] gap-5" key={step.title}>
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-base font-bold text-navy">{index + 1}</span>
                    {index < text.steps.length - 1 ? <span className="h-[75px] w-px bg-navy/10" /> : null}
                  </div>
                  <div className="pb-6 pt-1">
                    <strong className="block text-base font-bold text-navy">{step.title}</strong>
                    <span className="mt-1 block text-sm leading-6 text-navy">{step.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="overflow-hidden rounded-3xl bg-cream shadow-sm">
            <div className="relative min-h-[320px] px-5 pb-8 pt-8 sm:px-8 lg:min-h-[370px] lg:px-10 lg:pt-10 xl:min-h-[410px]">
              <div className="relative z-10 max-w-[560px] xl:max-w-[600px]">
                <h2 className="max-w-[520px] font-serif text-3xl font-bold leading-[1.14] text-navy sm:text-4xl">{text.closingTitle}</h2>
                <p className="mt-5 max-w-[460px] text-base leading-7 text-navy">{text.closingBody}</p>
                <div className="mt-9">
                  <WaitlistForm language="en" className="max-w-[420px]" buttonClassName="sm:min-w-[112px]" />
                </div>
              </div>
              <div className="pointer-events-none absolute bottom-0 right-0 h-[190px] w-[220px] overflow-hidden sm:h-[232px] sm:w-[280px] lg:bottom-0 lg:right-0 lg:top-0 lg:h-auto lg:w-[540px] xl:w-[760px]">
                <img className="h-full w-full object-contain object-bottom" src={waitlistPets} alt="" aria-hidden="true" />
              </div>
            </div>

            <div className="grid gap-6 border-t border-navy/10 bg-white/45 px-5 py-7 sm:px-8 md:grid-cols-3 lg:px-10">
              {text.closingBenefits.map((benefit, index) => (
                <div className="grid grid-cols-[34px_1fr] gap-4" key={benefit.title}>
                  <BenefitIcon index={index} />
                  <div>
                    <h3 className="text-sm font-bold text-navy">{benefit.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-navy">{benefit.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1664px] border-t border-navy/10 px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <div>
            <BrandWordmark small />
            <p className="mt-4 max-w-[170px] text-sm leading-6 text-navy">{text.footerText}</p>
            <p className="mt-3 text-xs text-navy/70">© 2026 Caniello. All rights reserved.</p>
          </div>
          <div className="grid gap-8 text-xs text-navy sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <FooterColumn title="Product" items={["Features", "How it works", "Security"]} />
            <FooterColumn title="Company" items={["About us", "Contact", "Blog"]} />
            <FooterColumn title="Resources" items={["Help center", "Privacy policy", "Terms of service"]} />
            <div>
              <h2 className="font-bold text-navy">Follow us</h2>
              <div className="mt-7 flex items-center gap-5 text-navy">
                <SocialIcon name="instagram" />
                <SocialIcon name="facebook" />
                <SocialIcon name="twitter" />
                <SocialIcon name="linkedin" />
              </div>
            </div>
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

function BrandWordmark({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`block bg-left bg-no-repeat ${small ? "h-10 w-[160px] [background-size:190px_auto]" : "h-14 w-[190px] [background-size:220px_auto]"}`}
      style={{ backgroundImage: `url(${darkWordmark})` }}
      role="img"
      aria-label="Caniello"
    />
  );
}

function PawIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="18" cy="14" r="2" />
      <path d="M8.5 18.5c0-2.2 1.6-4 3.5-4s3.5 1.8 3.5 4c0 1.2-.8 2-2 2h-3c-1.2 0-2-.8-2-2Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6">
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

function FeatureIcon({ index }: { index: number }) {
  const className = "h-11 w-11";

  if (index === 1) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M15 17H9a3 3 0 0 1-3-3v-2a6 6 0 1 1 12 0v2a3 3 0 0 1-3 3Z" />
        <path d="M10 20h4" />
        <path d="M12 4V2" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M16 12a3.5 3.5 0 1 0 0-7" />
        <path d="M2.5 21a5.5 5.5 0 0 1 11 0" />
        <path d="M14.5 16.5A5 5 0 0 1 21.5 21" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3 4.5 6v5.5c0 4.5 3 7.8 7.5 9.5 4.5-1.7 7.5-5 7.5-9.5V6L12 3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h3" />
      <path d="M17 16v6" />
      <path d="M14 19h6" />
    </svg>
  );
}

function BenefitIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="mt-1 h-8 w-8 shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m21 3-8.5 18-3-7.5L3 10.5 21 3Z" />
        <path d="m9.5 13.5 4.5-4.5" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="mt-1 h-8 w-8 shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 12v8H4v-8" />
        <path d="M2.5 7h19v5h-19z" />
        <path d="M12 7v13" />
        <path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5c0 1.4 1 2.5 1 2.5Z" />
        <path d="M12 7h3.5A2.5 2.5 0 1 0 13 4.5c0 1.4-1 2.5-1 2.5Z" />
      </svg>
    );
  }

  return (
    <svg className="mt-1 h-8 w-8 shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20s-7-4.4-9.2-8.3C.9 8.2 2.9 5 6.2 5c1.8 0 3.2 1 3.9 2.1C10.8 6 12.2 5 14 5c3.3 0 5.3 3.2 3.4 6.7C15.2 15.6 12 20 12 20Z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  const label = name[0].toUpperCase() + name.slice(1);

  return (
    <a className="font-bold leading-none hover:text-gold" href="#waitlist" aria-label={label}>
      {name === "instagram" ? "◎" : name === "facebook" ? "f" : name === "twitter" ? "♥" : "in"}
    </a>
  );
}
