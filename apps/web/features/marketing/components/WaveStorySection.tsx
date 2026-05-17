import Link from "next/link";
import type { FutureWave, WaveStoryStep } from "../content";
import { CheckIcon, LockIcon } from "./icons/LandingIcons";

type WaveStorySectionProps = {
  activeWave?: "wave_1" | "wave_2" | "wave_3";
  body: string;
  foundation: WaveStoryStep;
  researchNote: string;
  title: string;
  waves: [FutureWave, FutureWave];
};

const waveLinks = ["/marketplace", "/clinics"] as const;
const foundationLink = "/";

export function WaveStorySection({ activeWave = "wave_1", body, foundation, researchNote, title, waves }: WaveStorySectionProps) {
  const steps = [
    {
      ...foundation,
      id: "wave_1",
      tone: "green",
      statusLabel: `${foundation.wave} · ${foundation.status}`,
      cta: foundation.cta,
      href: foundationLink
    },
    {
      id: "wave_2",
      wave: waves[0].wave,
      status: waves[0].eyebrow,
      title: waves[0].title,
      body: waves[0].body,
      tone: "gold",
      statusLabel: `${waves[0].wave} · ${waves[0].eyebrow}`,
      cta: waves[0].timelineCta,
      href: waveLinks[0]
    },
    {
      id: "wave_3",
      wave: waves[1].wave,
      status: waves[1].eyebrow,
      title: waves[1].title,
      body: waves[1].body,
      tone: "violet",
      statusLabel: `${waves[1].wave} · ${waves[1].eyebrow}`,
      cta: waves[1].timelineCta,
      href: waveLinks[1]
    }
  ] as const;

  return (
    <section className="mt-4 rounded-lg border border-navy/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10" id="future-waves" aria-labelledby="future-waves-title">
      <h2 className="font-serif text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl" id="future-waves-title">
        {title}
      </h2>
      <p className="mt-4 max-w-[900px] text-lg font-semibold leading-8 text-navy sm:text-xl">{body}</p>

      <div className="mt-8 rounded-lg border border-navy/10 bg-white px-5 py-5 shadow-sm sm:px-7 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {steps.map((step) => (
            <WaveStepCard
              active={step.id === activeWave}
              body={step.body}
              cta={step.cta}
              href={step.href}
              key={step.wave}
              status={step.statusLabel}
              title={step.title}
              tone={step.tone}
            />
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

      <p className="mt-8 flex shrink-0 items-center justify-center gap-4 text-center text-base font-semibold leading-7 text-navy sm:text-lg">
        <LockIcon />
        {researchNote}
      </p>
    </section>
  );
}

function WaveStepCard({
  active,
  body,
  cta,
  href,
  status,
  title,
  tone
}: {
  active: boolean;
  body: string;
  cta: string;
  href: string;
  status: string;
  title: string;
  tone: "green" | "gold" | "violet";
}) {
  return (
    <article className={`grid min-h-[280px] grid-cols-[44px_1fr] gap-4 rounded-lg p-4 sm:p-5 ${active ? activeTimelineClass(tone) : "border border-transparent"}`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${badgeClass(tone)}`}>
        <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white ${markerClass(tone)}`}>
          {tone === "green" ? <CheckIcon /> : null}
        </span>
      </span>
      <span className="flex min-w-0 flex-col">
        <strong className={`block text-base font-bold ${textClass(tone)}`}>{status}</strong>
        <span className="mt-4 block text-sm font-bold leading-6 text-navy">{title}</span>
        <span className="mt-2 block text-sm font-semibold leading-6 text-navy/78 sm:text-base sm:leading-7">{body}</span>
        <Link
          className={`mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg px-4 text-sm font-bold transition focus:outline-none focus:ring-4 sm:mt-auto sm:w-max sm:min-w-[170px] ${buttonClass(
            tone,
            active
          )}`}
          href={href}
        >
          {cta}
        </Link>
      </span>
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

function activeTimelineClass(tone: "green" | "gold" | "violet") {
  if (tone === "green") {
    return "border border-emerald-200 bg-emerald-50/55";
  }

  if (tone === "gold") {
    return "border border-gold/25 bg-cream/55";
  }

  return "border border-[#5448a8]/20 bg-[#f5f3ff]";
}

function buttonClass(tone: "green" | "gold" | "violet", active: boolean) {
  if (active && tone === "green") {
    return "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 focus:ring-emerald-600/20";
  }

  if (active && tone === "gold") {
    return "bg-gold text-white shadow-sm hover:bg-gold/90 focus:ring-gold/20";
  }

  if (active && tone === "violet") {
    return "bg-[#5448a8] text-white shadow-sm hover:bg-[#463c91] focus:ring-[#5448a8]/20";
  }

  if (tone === "green") {
    return "border border-emerald-200 bg-white text-emerald-800 hover:border-emerald-500 hover:text-emerald-900 focus:ring-emerald-600/20";
  }

  if (tone === "gold") {
    return "border border-gold/25 bg-white text-gold hover:border-gold hover:text-gold focus:ring-gold/20";
  }

  return "border border-[#5448a8]/20 bg-white text-[#5448a8] hover:border-[#5448a8] hover:text-[#463c91] focus:ring-[#5448a8]/20";
}
