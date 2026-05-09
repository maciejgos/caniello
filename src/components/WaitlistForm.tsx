import { FormEvent, useState } from "react";
import type { Language } from "../content";
import { copy } from "../content";

type WaitlistFormProps = {
  language: Language;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function WaitlistForm({ language }: WaitlistFormProps) {
  const text = copy[language];
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(email.trim())) {
      setError(text.emailError);
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  }

  return (
    <form
      className="w-full max-w-[440px] rounded-md border border-navy/10 bg-white p-0 shadow-sm sm:flex sm:items-stretch"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="min-w-0 flex-1">
        <label className="sr-only" htmlFor="waitlist-email">
          {text.emailLabel}
        </label>
        <input
          className="h-14 w-full rounded-md border-0 bg-white px-5 text-base text-navy outline-none transition placeholder:text-navy/40 focus:ring-4 focus:ring-gold/20"
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          placeholder={text.emailPlaceholder}
          aria-describedby="waitlist-message waitlist-hint"
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
            setSubmitted(false);
          }}
        />
        <p className="sr-only" id="waitlist-hint">
          {text.formHint}
        </p>
        <div className="px-5 pb-2" id="waitlist-message" aria-live="polite">
          {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
          {submitted ? <p className="text-sm font-semibold text-emerald-700">{text.emailSuccess}</p> : null}
        </div>
      </div>
      <button
        className="m-1 h-12 rounded-md bg-navy px-6 text-sm font-bold text-white transition hover:bg-navySoft focus:outline-none focus:ring-4 focus:ring-navy/20 sm:h-auto"
        type="submit"
      >
        {text.primaryCta}
      </button>
    </form>
  );
}
