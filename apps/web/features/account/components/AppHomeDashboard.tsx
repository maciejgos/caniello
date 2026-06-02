import { useState } from "react";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";
import { FirstRunOnboarding } from "./FirstRunOnboarding";
import { ReturningOwnerDashboard } from "./ReturningOwnerDashboard";

type DashboardMode = "returning" | "firstRun";

export function AppHomeDashboard({ copy }: { copy: AccountCopy }) {
  const [mode, setMode] = useState<DashboardMode>("returning");

  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="app-home-title">
      <div className="mx-auto max-w-[1300px]">
        <AppHomeHeader copy={copy} mode={mode} onModeChange={setMode} />
        {mode === "returning" ? <ReturningOwnerDashboard copy={copy} /> : <FirstRunOnboarding copy={copy} />}
      </div>
    </section>
  );
}

function AppHomeHeader({ copy, mode, onModeChange }: { copy: AccountCopy; mode: DashboardMode; onModeChange: (mode: DashboardMode) => void }) {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div className="flex max-w-4xl items-start gap-4">
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3e5] text-[#f59a23]" aria-hidden="true">
          <AppIcon name="sun" />
        </span>
        <div className="min-w-0">
          <h2 className="mb-2 text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.appTitle}</h2>
          <h1 id="app-home-title" className="font-serif text-[clamp(2.1rem,3vw,3.2rem)] font-black leading-tight tracking-[0] text-navy">
            {mode === "returning" ? copy.dashboardTitle : copy.onboardingTitle}
          </h1>
          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-navy/82">{mode === "returning" ? copy.dashboardIntro : copy.onboardingIntro}</p>
          {mode === "firstRun" ? <p className="mt-1 max-w-3xl text-base font-semibold leading-7 text-navy/82">{copy.onboardingIntroNext}</p> : null}
          <p className="mt-4 max-w-2xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
        </div>
      </div>
      <div className="flex w-full max-w-sm rounded-lg border border-[#e3e8f0] bg-[#f8fafc] p-1" aria-label={copy.appNavHome} role="group">
        <button
          className={`min-h-10 flex-1 rounded-md px-3 text-sm font-black transition ${mode === "returning" ? "bg-white text-navy shadow-[0_8px_20px_rgba(15,23,42,0.08)]" : "text-navy/64 hover:text-navy"}`}
          type="button"
          aria-pressed={mode === "returning"}
          onClick={() => onModeChange("returning")}
        >
          {copy.dashboardModeReturning}
        </button>
        <button
          className={`min-h-10 flex-1 rounded-md px-3 text-sm font-black transition ${mode === "firstRun" ? "bg-white text-navy shadow-[0_8px_20px_rgba(15,23,42,0.08)]" : "text-navy/64 hover:text-navy"}`}
          type="button"
          aria-pressed={mode === "firstRun"}
          onClick={() => onModeChange("firstRun")}
        >
          {copy.dashboardModeFirstRun}
        </button>
      </div>
    </div>
  );
}
