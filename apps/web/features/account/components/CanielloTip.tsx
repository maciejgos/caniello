import type { AccountCopy } from "../content";
import { OnboardingIcon } from "./OnboardingIcon";

export function CanielloTip({ copy }: { copy: AccountCopy }) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#f0d9ba] bg-[#fffaf4] px-5 py-4 shadow-[0_12px_35px_rgba(88,54,20,0.04)] md:flex-row md:items-center md:justify-between" aria-label={copy.onboardingTipTitle}>
      <div className="flex min-w-0 gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center text-[#f59a23]" aria-hidden="true">
          <OnboardingIcon name="bulb" />
        </span>
        <div className="min-w-0">
          <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.onboardingTipTitle}</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-navy/68">{copy.onboardingTipBody}</p>
        </div>
      </div>
      <button className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md border border-[#f0d9ba] bg-white px-5 text-sm font-black text-navy/72" disabled type="button">
        {copy.onboardingTipAction}
        <OnboardingIcon name="arrow" small />
      </button>
    </section>
  );
}
