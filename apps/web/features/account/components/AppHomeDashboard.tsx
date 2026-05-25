import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";
import { FirstRunOnboarding } from "./FirstRunOnboarding";

export function AppHomeDashboard({ copy }: { copy: AccountCopy }) {
  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="app-home-title">
      <div className="mx-auto max-w-[1300px]">
        <AppHomeHeader copy={copy} />
        <FirstRunOnboarding copy={copy} />
      </div>
    </section>
  );
}

function AppHomeHeader({ copy }: { copy: AccountCopy }) {
  return (
    <div className="flex max-w-4xl items-start gap-4">
      <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3e5] text-[#f59a23]" aria-hidden="true">
        <AppIcon name="sun" />
      </span>
      <div className="min-w-0">
        <h2 className="mb-2 text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.appTitle}</h2>
        <h1 id="app-home-title" className="font-serif text-[clamp(2.1rem,3vw,3.2rem)] font-black leading-tight tracking-[0] text-navy">
          {copy.onboardingTitle}
        </h1>
        <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-navy/82">{copy.onboardingIntro}</p>
        <p className="mt-1 max-w-3xl text-base font-semibold leading-7 text-navy/82">{copy.onboardingIntroNext}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </div>
  );
}
