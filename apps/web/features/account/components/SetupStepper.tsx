import { OnboardingIcon, type OnboardingIconName } from "./OnboardingIcon";

export type SetupStep = {
  title: string;
  body: string;
  icon: Extract<OnboardingIconName, "paw" | "document" | "chat">;
};

export function SetupStepper({ steps }: { steps: SetupStep[] }) {
  return (
    <section className="rounded-lg border border-[#e6e9ef] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(7,31,73,0.04)]" aria-label="First-run setup path">
      <ol className="grid gap-5 lg:grid-cols-[1fr_28px_1fr_28px_1fr] lg:items-center">
        {steps.map((step, index) => (
          <StepItem index={index} step={step} key={step.title} />
        ))}
      </ol>
    </section>
  );
}

function StepItem({ step, index }: { step: SetupStep; index: number }) {
  return (
    <>
      <li className="grid min-w-0 grid-cols-[52px_44px_1fr] items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f0d9ba] bg-[#fff3e5] text-base font-black text-navy">
          {index + 1}
        </span>
        <span className="flex h-11 w-11 items-center justify-center text-navy" aria-hidden="true">
          <OnboardingIcon name={step.icon} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-black leading-5 text-navy">{step.title}</span>
          <span className="mt-1 block text-xs font-semibold leading-5 text-navy/68">{step.body}</span>
        </span>
      </li>
      {index < 2 ? (
        <li className="hidden justify-center lg:flex" aria-hidden="true">
          <span className="h-px w-full border-t border-dashed border-[#cfd6e3]" />
        </li>
      ) : null}
    </>
  );
}
