import type { HTMLAttributes } from "react";
import { OnboardingIcon } from "./OnboardingIcon";

type OnboardingFieldProps = {
  disabled?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  trailingIcon?: "calendar";
  type?: "date" | "number" | "text";
  value: string;
};

export function OnboardingField({
  disabled,
  inputMode,
  label,
  name,
  onChange,
  placeholder,
  required,
  trailingIcon,
  type = "text",
  value,
}: OnboardingFieldProps) {
  return (
    <label
      className="block min-w-0 space-y-2 text-xs font-black text-navy"
      htmlFor={`onboarding-${name}`}
    >
      <span>{label}</span>
      <span className="relative block">
        <input
          className="min-h-12 w-full rounded-md border border-[#d9dee8] bg-white px-4 pr-10 text-sm font-semibold text-navy outline-none transition placeholder:text-navy/42 focus:border-[#174c9f] focus:ring-2 focus:ring-[#dbeafe] disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
          disabled={disabled}
          id={`onboarding-${name}`}
          inputMode={inputMode}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          step={type === "number" ? "0.1" : undefined}
          type={type}
          value={value}
        />
        {trailingIcon ? (
          <span
            className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 text-navy/48"
            aria-hidden="true"
          >
            <OnboardingIcon name={trailingIcon} small />
          </span>
        ) : null}
      </span>
    </label>
  );
}

type OnboardingSelectFieldProps = {
  disabled?: boolean;
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder: string;
  value: string;
};

export function OnboardingSelectField({
  disabled,
  label,
  name,
  onChange,
  options,
  placeholder,
  value,
}: OnboardingSelectFieldProps) {
  return (
    <label
      className="block min-w-0 space-y-2 text-xs font-black text-navy"
      htmlFor={`onboarding-${name}`}
    >
      <span>{label}</span>
      <span className="relative block">
        <select
          className="min-h-12 w-full appearance-none rounded-md border border-[#d9dee8] bg-white px-4 pr-10 text-sm font-semibold text-navy outline-none transition focus:border-[#174c9f] focus:ring-2 focus:ring-[#dbeafe] disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
          disabled={disabled}
          id={`onboarding-${name}`}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 text-navy/48"
          aria-hidden="true"
        >
          <OnboardingIcon name="chevron" small />
        </span>
      </span>
    </label>
  );
}
