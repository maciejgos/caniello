import { FormEvent, useId, useState } from "react";
import type { InterestWave, Language, LeadRole, LeadSource } from "../content";
import { copy } from "../content";
import { isValidEmail, readUtmParams, submitLandingLead } from "../lib/landing-leads";
import { trackValidationEvent } from "../lib/validation-events";

type OptionalFieldLabels = {
  organization: string;
  context: string;
  website: string;
};

type WaitlistFormProps = {
  language: Language;
  role: LeadRole;
  interestWave: InterestWave;
  source: LeadSource;
  className?: string;
  buttonClassName?: string;
  submitLabel?: string;
  successMessage?: string;
  optionalFields?: OptionalFieldLabels;
  compactConsent?: boolean;
};

export function WaitlistForm({
  language,
  role,
  interestWave,
  source,
  className = "",
  buttonClassName = "",
  submitLabel,
  successMessage,
  optionalFields,
  compactConsent = false
}: WaitlistFormProps) {
  const text = copy[language];
  const id = useId();
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [context, setContext] = useState("");
  const [website, setWebsite] = useState("");
  const [hasLeadConsent, setHasLeadConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isResearch = interestWave !== "wave_1";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    setSubmitted(false);

    if (!isValidEmail(trimmedEmail)) {
      setError(text.emailError);
      return;
    }

    if (!hasLeadConsent) {
      setError(text.consentError);
      return;
    }

    setError("");
    setIsSubmitting(true);
    trackValidationEvent({
      name: "waitlist_submit",
      source,
      utm: readUtmParams()
    });

    try {
      const result = await submitLandingLead({
        email: trimmedEmail,
        role,
        interestWave,
        source,
        leadConsent: hasLeadConsent,
        language,
        organization: organization.trim() || undefined,
        context: context.trim() || undefined,
        website: website.trim() || undefined,
        utm: readUtmParams()
      });

      if (!result.ok) {
        throw new Error(result.message ?? text.submitError);
      }

      trackValidationEvent({
        name: interestWave === "wave_2" ? "wave2_interest" : interestWave === "wave_3" ? "wave3_interest" : "waitlist_success",
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
      setError(text.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={`grid w-full max-w-[520px] gap-3 ${className}`} onSubmit={handleSubmit} noValidate data-source={source}>
      <div className={`rounded-md border border-navy/10 bg-white shadow-sm ${optionalFields ? "grid gap-3 p-3" : "sm:flex sm:items-stretch"}`}>
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
            aria-invalid={Boolean(error)}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
              setSubmitted(false);
            }}
          />
        </div>

        {optionalFields ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <TextField id={`${id}-organization`} label={optionalFields.organization} value={organization} onChange={setOrganization} />
            <TextField id={`${id}-context`} label={optionalFields.context} value={context} onChange={setContext} />
            <TextField id={`${id}-website`} label={optionalFields.website} value={website} onChange={setWebsite} />
          </div>
        ) : null}

        <button
          className={`m-1 h-11 rounded-md bg-navy px-7 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft focus:outline-none focus:ring-4 focus:ring-navy/20 disabled:cursor-not-allowed disabled:bg-navy/45 sm:h-auto sm:min-w-[136px] ${optionalFields ? "m-0" : "w-[calc(100%-0.5rem)] sm:w-auto"} ${buttonClassName}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? text.pending : submitLabel ?? text.primaryCta}
        </button>
      </div>

      <label className={`flex items-start gap-3 rounded-md bg-white/70 text-xs leading-5 text-navy ${compactConsent ? "p-2" : "p-3"}`}>
        <input
          className="mt-1 h-4 w-4 shrink-0 accent-navy"
          type="checkbox"
          checked={hasLeadConsent}
          onChange={(event) => {
            setHasLeadConsent(event.target.checked);
            setError("");
          }}
        />
        <span>
          {text.leadConsentLabel}{" "}
          <a className="font-bold underline decoration-gold underline-offset-4 hover:text-gold" href="/privacy">
            {text.privacyLinkLabel}
          </a>
          .
        </span>
      </label>

      <p className="sr-only" id={`${id}-hint`}>
        {text.formHint}
      </p>
      <div id={`${id}-message`} aria-live="polite">
        {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
        {submitted ? (
          <p className="text-sm font-semibold text-emerald-700">{successMessage ?? (isResearch ? text.researchSuccess : text.emailSuccess)}</p>
        ) : null}
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  onChange
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        className="h-11 w-full rounded-md border border-navy/10 bg-white px-4 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-gold focus:ring-4 focus:ring-gold/20"
        id={id}
        value={value}
        placeholder={label}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
