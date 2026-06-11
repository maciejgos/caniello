import { FormEvent, useEffect, useId, useState } from "react";
import Link from "next/link";
import type { Language, LeadSource } from "../content";
import { copy } from "../content";
import { isValidEmail, readUtmParams, submitLandingLead } from "../lib/landing-leads";
import { trackValidationEvent } from "../lib/validation-events";

type WaitlistFormProps = {
  language: Language;
  source: LeadSource;
  className?: string;
  buttonClassName?: string;
  submitLabel?: string;
  successMessage?: string;
  compactConsent?: boolean;
};

type FormError = {
  kind: "email" | "consent" | "submit";
  message: string;
};

export function WaitlistForm({
  language,
  source,
  className = "",
  buttonClassName = "",
  submitLabel,
  successMessage,
  compactConsent = false
}: WaitlistFormProps) {
  const text = copy[language];
  const id = useId();
  const [email, setEmail] = useState("");
  const [hasLeadConsent, setHasLeadConsent] = useState(false);
  const [error, setError] = useState<FormError | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    setSubmitted(false);

    if (!isValidEmail(trimmedEmail)) {
      setError({ kind: "email", message: text.emailError });
      return;
    }

    if (!hasLeadConsent) {
      setError({ kind: "consent", message: text.consentError });
      return;
    }

    setError(null);
    setIsSubmitting(true);
    trackValidationEvent({
      name: "waitlist_submit",
      source,
      utm: readUtmParams()
    });

    try {
      const result = await submitLandingLead({
        email: trimmedEmail,
        source,
        leadConsent: hasLeadConsent,
        language,
        utm: readUtmParams()
      });

      if (!result.ok) {
        throw new Error(result.message ?? text.submitError);
      }

      trackValidationEvent({
        name: "waitlist_success",
        source,
        utm: readUtmParams()
      });
      setSubmitted(true);
    } catch {
      trackValidationEvent({
        name: "waitlist_error",
        source,
        utm: readUtmParams()
      });
      setError({ kind: "submit", message: text.submitError });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={`grid w-full max-w-[520px] gap-3 ${className}`} onSubmit={handleSubmit} noValidate data-source={source}>
      <div className="rounded-md border border-navy/10 bg-white shadow-sm sm:flex sm:items-stretch">
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor={`${id}-email`}>
            {text.emailLabel}
          </label>
          <input
            className="h-12 w-full rounded-md border border-transparent bg-white px-5 text-base text-navy outline-none transition placeholder:text-navy/40 focus:border-gold focus:ring-4 focus:ring-gold/20 sm:h-[52px]"
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            placeholder={text.emailPlaceholder}
            aria-describedby={`${id}-message ${id}-hint`}
            aria-invalid={error?.kind === "email"}
            onChange={(event) => {
              setEmail(event.target.value);
              setError(null);
              setSubmitted(false);
            }}
          />
        </div>

        <button
          className={`m-1 h-11 w-[calc(100%-0.5rem)] rounded-md bg-navy px-7 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft focus:outline-none focus:ring-4 focus:ring-navy/20 disabled:cursor-not-allowed disabled:bg-navy/45 sm:h-auto sm:w-auto sm:min-w-[136px] ${buttonClassName}`}
          type="submit"
          disabled={!isHydrated || isSubmitting}
        >
          {isSubmitting ? text.pending : submitLabel ?? text.primaryCta}
        </button>
      </div>

      <label className={`flex items-start gap-3 rounded-md bg-white/70 text-xs leading-5 text-navy ${compactConsent ? "p-2" : "p-3"}`}>
        <input
          className="mt-1 h-4 w-4 shrink-0 accent-navy"
          type="checkbox"
          checked={hasLeadConsent}
          aria-describedby={`${id}-message`}
          aria-invalid={error?.kind === "consent"}
          onChange={(event) => {
            setHasLeadConsent(event.target.checked);
            setError(null);
          }}
        />
        <span>
          {text.leadConsentLabel}{" "}
          <Link className="font-bold underline decoration-gold underline-offset-4 hover:text-gold" href="/privacy">
            {text.privacyLinkLabel}
          </Link>
          .
        </span>
      </label>

      <p className="sr-only" id={`${id}-hint`}>
        {text.formHint}
      </p>
      <div id={`${id}-message`} aria-live="polite">
        {error ? <p className="text-sm font-semibold text-red-700">{error.message}</p> : null}
        {submitted ? (
          <p className="text-sm font-semibold text-emerald-700">{successMessage ?? text.emailSuccess}</p>
        ) : null}
      </div>
    </form>
  );
}
