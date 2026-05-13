import type { FutureWave, WaveStoryStep } from "../content";
import { CheckIcon, FutureWaveIcon, LockIcon } from "./icons/LandingIcons";

type WaveStorySectionProps = {
  activeWave?: "wave_1" | "wave_2" | "wave_3";
  body: string;
  foundation: WaveStoryStep;
  researchNote: string;
  title: string;
  waves: [FutureWave, FutureWave];
};

const waveLinks = ["/wave-2-exploration", "/wave-3-research"] as const;

export function WaveStorySection({ activeWave = "wave_1", body, foundation, researchNote, title, waves }: WaveStorySectionProps) {
  const steps = [
    {
      ...foundation,
      id: "wave_1",
      tone: "green",
      statusLabel: `${foundation.wave} · ${foundation.status}`
    },
    {
      id: "wave_2",
      wave: waves[0].wave,
      status: waves[0].eyebrow,
      title: waves[0].title,
      body: waves[0].body,
      tone: "gold",
      statusLabel: `${waves[0].wave} · ${waves[0].eyebrow}`
    },
    {
      id: "wave_3",
      wave: waves[1].wave,
      status: waves[1].eyebrow,
      title: waves[1].title,
      body: waves[1].body,
      tone: "violet",
      statusLabel: `${waves[1].wave} · ${waves[1].eyebrow}`
    }
  ] as const;

  return (
    <section className="mt-4 rounded-lg border border-navy/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10" id="future-waves" aria-labelledby="future-waves-title">
      <h2 className="font-serif text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl" id="future-waves-title">
        {title}
      </h2>
      <p className="mt-4 max-w-[900px] text-lg font-semibold leading-8 text-navy sm:text-xl">{body}</p>

      <div className="mt-8 rounded-lg border border-navy/10 bg-white px-5 py-5 shadow-sm sm:px-7 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
          {steps.map((step, index) => (
            <WaveStepCard active={step.id === activeWave} body={step.body} key={step.wave} status={step.statusLabel} title={step.title} tone={step.tone} />
          ))}
        </div>
        <div className="relative mx-auto mt-5 hidden max-w-[1050px] px-16 lg:block" aria-hidden="true">
          <span className="absolute left-20 right-20 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-navy/18" />
          <span className={`absolute left-20 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-emerald-500/45 ${progressClass(activeWave)}`} />
          <div className="relative grid grid-cols-3">
            {steps.map((step, index) => (
              <span className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-white ${markerClass(step.tone)}`} key={step.wave}>
                {index === 0 ? <CheckIcon /> : null}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {waves.map((wave, index) => (
          <WaveDetailCard active={activeWave === `wave_${index + 2}`} href={getWaveHref(index, activeWave)} index={index} key={wave.wave} wave={wave} />
        ))}
      </div>

      <p className="mt-8 flex shrink-0 items-center justify-center gap-4 text-center text-base font-semibold leading-7 text-navy sm:text-lg">
        <LockIcon />
        {researchNote}
      </p>
    </section>
  );
}

function getWaveHref(index: number, activeWave: "wave_1" | "wave_2" | "wave_3") {
  if (index === 0 && activeWave === "wave_2") {
    return "#provider-interest";
  }

  if (index === 1 && activeWave === "wave_3") {
    return "#clinic-interest";
  }

  return waveLinks[index];
}

function WaveStepCard({
  active,
  body,
  status,
  title,
  tone
}: {
  active: boolean;
  body: string;
  status: string;
  title: string;
  tone: "green" | "gold" | "violet";
}) {
  return (
    <article className={`grid grid-cols-[44px_1fr] gap-4 rounded-lg p-4 ${active ? "border border-gold/20 bg-cream/45" : ""}`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${badgeClass(tone)}`}>
        <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white ${markerClass(tone)}`}>
          {tone === "green" ? <CheckIcon /> : null}
        </span>
      </span>
      <span>
        <strong className={`block text-base font-bold ${textClass(tone)}`}>{status}</strong>
        <span className="mt-4 block text-sm font-bold leading-6 text-navy">{title}</span>
        <span className="mt-2 block text-sm font-semibold leading-6 text-navy/78">{body}</span>
      </span>
    </article>
  );
}

function WaveDetailCard({ active, href, index, wave }: { active: boolean; href: string; index: number; wave: FutureWave }) {
  const tone = index === 0 ? "gold" : "violet";

  return (
    <article
      aria-current={active ? "step" : undefined}
      className={`flex min-h-[420px] flex-col rounded-lg border bg-white p-6 shadow-sm sm:p-7 lg:p-8 ${active ? activeCardClass(tone) : "border-navy/10"}`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_82px] gap-5">
        <div>
          <span className={`inline-flex w-max rounded-lg px-4 py-2 text-xl font-bold ${tone === "gold" ? "bg-cream text-gold" : "bg-[#efecff] text-[#5448a8]"}`}>
            {wave.wave}
          </span>
          <h3 className="mt-6 text-3xl font-bold leading-tight text-navy sm:text-4xl">{wave.title}</h3>
          <p className="mt-4 max-w-[520px] text-lg font-semibold leading-8 text-navy">{wave.body}</p>
        </div>
        <FutureWaveIcon index={index} />
      </div>

      <div className={`mt-7 grid flex-1 gap-4 rounded-lg p-5 sm:grid-cols-3 ${tone === "gold" ? "bg-cream/55" : "bg-[#f5f3ff]"}`}>
        {wave.highlights.map((highlight, highlightIndex) => (
          <div className="grid gap-3 sm:grid-rows-[56px_auto]" key={highlight.title}>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-sm">
              <HighlightIcon index={highlightIndex} tone={tone} />
            </span>
            <span>
              <strong className="block text-sm font-bold leading-5 text-navy">{highlight.title}</strong>
              <span className="mt-2 block text-xs font-semibold leading-5 text-navy/75">{highlight.body}</span>
            </span>
          </div>
        ))}
      </div>

      <a
        className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-lg border border-navy/10 bg-white px-5 text-lg font-bold text-navy shadow-sm transition hover:border-gold hover:text-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
        href={href}
      >
        {wave.cta}
      </a>
    </article>
  );
}

function badgeClass(tone: "green" | "gold" | "violet") {
  if (tone === "green") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (tone === "gold") {
    return "bg-cream text-gold";
  }

  return "bg-[#eeeaff] text-[#5448a8]";
}

function activeCardClass(tone: "gold" | "violet") {
  if (tone === "gold") {
    return "border-gold/35 shadow-md";
  }

  return "border-[#5448a8]/30 shadow-md";
}

function progressClass(activeWave: "wave_1" | "wave_2" | "wave_3") {
  if (activeWave === "wave_1") {
    return "w-[12%]";
  }

  if (activeWave === "wave_2") {
    return "w-[50%]";
  }

  return "w-[84%]";
}

function markerClass(tone: "green" | "gold" | "violet") {
  if (tone === "green") {
    return "border-emerald-500 text-emerald-700";
  }

  if (tone === "gold") {
    return "border-gold text-gold";
  }

  return "border-[#5448a8] text-[#5448a8]";
}

function textClass(tone: "green" | "gold" | "violet") {
  if (tone === "green") {
    return "text-emerald-700";
  }

  if (tone === "gold") {
    return "text-gold";
  }

  return "text-[#5448a8]";
}

function HighlightIcon({ index, tone }: { index: number; tone: "gold" | "violet" }) {
  const className = "h-8 w-8";

  if (tone === "gold" && index === 1) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10" cy="10" r="5" />
        <path d="m14 14 5 5" />
        <path d="M10 8v4" />
        <path d="M8 10h4" />
      </svg>
    );
  }

  if (tone === "gold" && index === 2) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 5h14v15H5z" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M5 10h14" />
        <path d="m8 15 2 2 5-5" />
      </svg>
    );
  }

  if (tone === "violet" && index === 0) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 11V8a5 5 0 0 1 10 0v3" />
        <path d="M6 11h12v9H6z" />
        <path d="m9 16 2 2 4-5" />
      </svg>
    );
  }

  if (tone === "violet" && index === 1) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 3h8l4 4v14H6V3Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h3" />
      </svg>
    );
  }

  if (tone === "violet" && index === 2) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="7" r="4" />
        <path d="M2.5 21a6.5 6.5 0 0 1 13 0" />
        <path d="M18 14v6" />
        <path d="M15 17h6" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 4.5 6v5.5c0 4.5 3 7.8 7.5 9.5 4.5-1.7 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}
