import { FormEvent, useId, useState } from "react";
import type { Language } from "../content";
import { copy } from "../content";

type WaitlistFormProps = {
  language: Language;
  className?: string;
  buttonClassName?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function WaitlistForm({ language, className = "", buttonClassName = "" }: WaitlistFormProps) {
  const text = copy[language];
  const id = useId();
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
      className={`relative w-full max-w-[420px] rounded-md border border-navy/10 bg-white shadow-sm sm:flex sm:items-stretch ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="min-w-0 flex-1">
        <label className="sr-only" htmlFor={id}>
          {text.emailLabel}
        </label>
        <input
          className="h-12 w-full rounded-md border-0 bg-white px-5 text-base text-navy outline-none transition placeholder:text-navy/40 focus:ring-4 focus:ring-gold/20 sm:h-[52px]"
          id={id}
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
        <p className="sr-only" id={`${id}-hint`}>
          {text.formHint}
        </p>
        <div className="absolute left-0 top-full mt-2 px-1" id={`${id}-message`} aria-live="polite">
          {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
          {submitted ? <p className="text-sm font-semibold text-emerald-700">{text.emailSuccess}</p> : null}
        </div>
      </div>
      <button
        className={`m-1 h-11 w-[calc(100%-0.5rem)] rounded-md bg-navy px-7 text-sm font-bold text-white shadow-sm transition hover:bg-navySoft focus:outline-none focus:ring-4 focus:ring-navy/20 sm:h-auto sm:w-auto sm:min-w-[136px] ${buttonClassName}`}
        type="submit"
      >
        {text.primaryCta}
      </button>
    </form>
  );
}
