import { OnboardingIcon } from "./OnboardingIcon";

type OnboardingFieldProps = {
  label: string;
  value: string;
  trailingIcon?: "calendar" | "chevron";
};

export function OnboardingField({ label, value, trailingIcon }: OnboardingFieldProps) {
  return (
    <label className="block min-w-0 space-y-2 text-xs font-black text-navy">
      <span>{label}</span>
      <span className="relative block">
        <input
          className="min-h-12 w-full rounded-md border border-[#d9dee8] bg-white px-4 pr-10 text-sm font-semibold text-navy outline-none placeholder:text-navy/42"
          readOnly
          type="text"
          value={value}
        />
        {trailingIcon ? (
          <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 text-navy/48" aria-hidden="true">
            <OnboardingIcon name={trailingIcon} small />
          </span>
        ) : null}
      </span>
    </label>
  );
}
