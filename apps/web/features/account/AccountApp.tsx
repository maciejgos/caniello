"use client";

import { FormEvent, useState } from "react";
import petsImage from "./assets/auth-hero-pets.png";
import { BrandWordmark } from "../marketing/components/BrandWordmark";
import { LanguageToggle } from "../marketing/components/LanguageToggle";
import { useLanguage } from "../marketing/hooks/useLanguage";
import { accountCopy } from "./content";

export type AccountRoute = "signup" | "login" | "reset-password" | "app-home";

type AccountAppProps = {
  route: AccountRoute;
};

type FormState = "idle" | "submitting" | "success" | "error" | "authUnavailable" | "invalidCredentials";

type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

export function AccountApp({ route }: AccountAppProps) {
  const { language, setLanguage } = useLanguage();
  const copy = accountCopy[language];

  if (route === "app-home") {
    return (
      <main className="min-h-screen bg-[#fbfaf7] px-5 py-8 text-navy">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <a href="/" aria-label="Caniello">
              <BrandWordmark small />
            </a>
            <LanguageToggle language={language} onChange={setLanguage} />
          </div>
          <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm md:p-8">
            <ProtectedHome />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-navy">
      <section className="grid min-h-screen overflow-hidden bg-white lg:grid-cols-2">
        <AuthHero copy={copy} />
        <div className="relative flex min-h-screen flex-col bg-white px-6 py-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-end gap-4">
            <AuthSwitch route={route} copy={copy} />
          </div>
          <div className="flex flex-1 justify-center pt-[clamp(3rem,8vh,5.8rem)]">
            <div className="w-full max-w-[386px]">
              <AccountRouteView route={route} language={language} />
            </div>
          </div>
          <AuthLanguageSwitch language={language} onChange={setLanguage} />
        </div>
      </section>
    </main>
  );
}

function AuthLanguageSwitch({ language, onChange }: { language: ReturnType<typeof useLanguage>["language"]; onChange: (language: ReturnType<typeof useLanguage>["language"]) => void }) {
  return (
    <div className="absolute bottom-4 right-5 flex items-center gap-1 rounded-md bg-white/80 p-1 text-xs font-black text-navy/54 shadow-[0_4px_18px_rgba(7,31,73,0.06)]">
      <button
        className={`rounded px-2 py-1 transition ${language === "pl" ? "bg-navy text-white" : "hover:text-navy"}`}
        type="button"
        onClick={() => onChange("pl")}
      >
        PL
      </button>
      <button
        className={`rounded px-2 py-1 transition ${language === "en" ? "bg-navy text-white" : "hover:text-navy"}`}
        type="button"
        onClick={() => onChange("en")}
      >
        EN
      </button>
    </div>
  );
}

function AuthHero({ copy }: { copy: (typeof accountCopy)[keyof typeof accountCopy] }) {
  const features = [
    { title: copy.featureDocumentsTitle, body: copy.featureDocumentsBody, icon: "folder" },
    { title: copy.featureRemindersTitle, body: copy.featureRemindersBody, icon: "calendar" },
    { title: copy.featureAssistantTitle, body: copy.featureAssistantBody, icon: "chat" },
    { title: copy.featurePrivacyTitle, body: copy.featurePrivacyBody, icon: "shield" }
  ] as const;

  return (
    <aside className="relative hidden min-h-full overflow-hidden bg-[#f6efe7] lg:block">
      <img className="absolute bottom-0 right-[-20%] h-[72%] w-[145%] max-w-none object-cover object-[62%_100%]" src={typeof petsImage === "string" ? petsImage : petsImage.src} alt="" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,249,240,0.78)_36%,rgba(255,239,210,0.38)_55%,rgba(231,163,62,0.34)_76%,rgba(72,43,15,0.46)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,242,202,0.62),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.14)_48%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#2f1b08]/74 via-[#9d6726]/24 to-transparent" />
      <div className="relative z-10 flex min-h-full flex-col px-[clamp(3.4rem,5.4vw,5.8rem)] py-[clamp(2.5rem,4vw,3.2rem)]">
        <a href="/" aria-label="Caniello">
          <BrandWordmark small />
        </a>
        <div className="mt-[clamp(3rem,5vh,4.5rem)] max-w-[500px]">
          <h1 className="text-[clamp(2rem,2.15vw,2.62rem)] font-black leading-[1.18] tracking-[0] text-navy">{copy.heroTitle}</h1>
          <p className="mt-6 max-w-[430px] text-[17px] leading-8 text-navy/86">{copy.heroIntro}</p>
        </div>
        <div className="mt-[clamp(1.6rem,3vh,2.25rem)] grid max-w-[320px] gap-3">
          {features.map((feature) => (
            <div className="grid min-h-[68px] grid-cols-[44px_1fr] items-center gap-4 rounded-lg bg-white/74 px-4 py-3 shadow-[0_14px_35px_rgba(70,48,24,0.1)] backdrop-blur-md" key={feature.title}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eee8ff] text-[#7d55e7]" aria-hidden="true">
                <AuthIcon name={feature.icon} />
              </span>
              <span>
                <span className="block text-sm font-black leading-5 text-navy">{feature.title}</span>
                <span className="mt-1 block text-xs font-medium leading-5 text-navy/74">{feature.body}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-auto flex items-center gap-3 pb-4 text-sm font-black text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#9b6b22] shadow-[0_8px_20px_rgba(0,0,0,0.12)]" aria-hidden="true">
            <AuthIcon name="shield" />
          </span>
          {copy.heroTrust}
        </p>
      </div>
    </aside>
  );
}

function AuthSwitch({ route, copy }: { route: AccountRoute; copy: (typeof accountCopy)[keyof typeof accountCopy] }) {
  const isLogin = route === "login";

  if (route === "reset-password") {
    return (
      <a className="rounded-md border border-[#d8cfed] px-5 py-3 text-sm font-black text-[#7651e6] transition hover:bg-[#f6f2ff]" href="/login">
        {copy.loginLink}
      </a>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-4 text-sm text-navy/72">
      <span className="hidden sm:inline">{isLogin ? copy.signupPrompt : copy.loginPrompt}</span>
      <a className="rounded-md border border-[#d8cfed] px-5 py-3 font-black text-[#7651e6] transition hover:bg-[#f6f2ff]" href={isLogin ? "/signup" : "/login"}>
        {isLogin ? copy.signupLink : copy.loginLink}
      </a>
    </div>
  );
}

type AccountRouteViewProps = {
  route: AccountRoute;
  language: ReturnType<typeof useLanguage>["language"];
};

function AccountRouteView({ route, language }: AccountRouteViewProps) {
  const copy = accountCopy[language];

  if (route === "reset-password") {
    return (
      <AccountForm
        title={copy.resetTitle}
        intro={copy.resetIntro}
        actionLabel={copy.resetAction}
        endpoint="/api/account/reset-password"
        language={language}
        mode="reset"
        successTitle={copy.resetSent}
      />
    );
  }

  if (route === "login") {
    return (
      <AccountForm
        title={copy.loginTitle}
        intro={copy.loginIntro}
        actionLabel={copy.loginAction}
        endpoint="/api/account/login"
        language={language}
        mode="login"
        successTitle={copy.appTitle}
      />
    );
  }

  return (
    <AccountForm
      title={copy.signupTitle}
      intro={copy.signupIntro}
      actionLabel={copy.signupAction}
      endpoint="/api/account/signup"
      language={language}
      mode="signup"
      successTitle={copy.verifyTitle}
      successBody={copy.verifyBody}
    />
  );
}

type AccountFormProps = {
  title: string;
  intro: string;
  actionLabel: string;
  endpoint: string;
  language: ReturnType<typeof useLanguage>["language"];
  mode: "signup" | "login" | "reset";
  successTitle: string;
  successBody?: string;
};

function AccountForm({ title, intro, actionLabel, endpoint, language, mode, successTitle, successBody }: AccountFormProps) {
  const copy = accountCopy[language];
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    const acceptedTerms = form.get("acceptedTerms") === "on";
    const nextErrors = validateFields({ fullName, email, password, confirmPassword, acceptedTerms, mode, copy });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setState("submitting");
    const body = mode === "signup"
      ? { fullName, email, password, language, acceptedTerms }
      : mode === "login"
        ? { email, password }
        : { email, language };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = (await response.json().catch(() => null)) as { status?: string } | null;
      if (response.ok && mode === "login") {
        window.location.assign(getPostLoginRedirectPath());
        return;
      }
      setState(
        response.ok
          ? "success"
          : result?.status === "auth_unavailable"
            ? "authUnavailable"
            : result?.status === "invalid_credentials"
              ? "invalidCredentials"
              : "error"
      );
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div role="status" className="space-y-4 rounded-lg border border-[#d9d2ec] bg-[#fbf9ff] p-6">
        <h1 className="text-3xl font-black tracking-[0]">{successTitle}</h1>
        {successBody ? <p className="text-base leading-7 text-navy/76">{successBody}</p> : null}
        {mode === "login" ? <a className="font-bold text-[#7651e6] underline-offset-4 hover:underline" href="/app">{copy.appTitle}</a> : null}
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={(event) => void submit(event)} noValidate>
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-[clamp(1.55rem,4vw,1.9rem)] font-black leading-tight tracking-[0] text-navy">
          {title}
          <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a7af2]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a7af2]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a7af2]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a7af2]" />
          </span>
        </h1>
        <p className="text-sm leading-6 text-navy/68">{intro}</p>
      </div>
      {mode === "signup" ? <Field icon="user" label={copy.fullName} name="fullName" type="text" placeholder={copy.fullNamePlaceholder} error={errors.fullName} /> : null}
      <Field icon="mail" label={copy.email} name="email" type="email" placeholder={copy.emailPlaceholder} error={errors.email} />
      {mode !== "reset" ? (
        <Field
          icon="lock"
          label={copy.password}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder={mode === "login" ? copy.loginPasswordPlaceholder : copy.passwordPlaceholder}
          error={errors.password}
          revealLabel={showPassword ? "Hide password" : "Show password"}
          onReveal={() => setShowPassword((current) => !current)}
        />
      ) : null}
      {mode === "signup" ? <p className="-mt-3 text-xs font-medium leading-5 text-navy/66">{copy.passwordHint}</p> : null}
      {mode === "signup" ? (
        <Field
          icon="lock"
          label={copy.confirmPassword}
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder={copy.confirmPasswordPlaceholder}
          error={errors.confirmPassword}
          revealLabel={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
          onReveal={() => setShowConfirmPassword((current) => !current)}
        />
      ) : null}
      {mode === "login" ? (
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-3 font-semibold text-navy/78">
            <input className="h-4 w-4 rounded border-[#cfd4df] accent-[#7b55e7]" name="rememberMe" type="checkbox" />
            <span>{copy.rememberMe}</span>
          </label>
          <a className="font-black text-[#7651e6] underline-offset-4 hover:underline" href="/reset-password">{copy.resetLink}</a>
        </div>
      ) : null}
      {mode === "signup" ? (
        <label className="flex gap-3 text-sm leading-6 text-navy/78">
          <input className="mt-1 h-4 w-4 rounded border-[#cfd4df] accent-[#7b55e7]" name="acceptedTerms" type="checkbox" aria-invalid={errors.terms ? "true" : "false"} />
          <span>
            {copy.acceptedTermsLead} <a className="font-black text-[#7651e6] underline-offset-4 hover:underline" href="/terms">{copy.terms}</a> {copy.acceptedTermsMiddle} <a className="font-black text-[#7651e6] underline-offset-4 hover:underline" href="/privacy">{copy.privacy}</a>.
          </span>
        </label>
      ) : null}
      {errors.terms ? <p className="text-sm font-semibold text-red-700">{errors.terms}</p> : null}
      {state === "authUnavailable" ? <p className="text-sm font-semibold text-red-700">{copy.authUnavailable}</p> : null}
      {state === "invalidCredentials" ? <p className="text-sm font-semibold text-red-700">{copy.invalidCredentials}</p> : null}
      {state === "error" ? <p className="text-sm font-semibold text-red-700">{copy.genericError}</p> : null}
      <button
        className="min-h-12 w-full rounded-md bg-[#7651e6] px-5 py-3 text-sm font-black text-white shadow-[0_10px_28px_rgba(118,81,230,0.25)] transition hover:bg-[#6843dc] disabled:cursor-not-allowed disabled:bg-[#7651e6]/50"
        disabled={state === "submitting"}
        type="submit"
      >
        {actionLabel}
      </button>
      {mode !== "reset" ? <SocialAuthDivider label={mode === "login" ? copy.loginWith : copy.signupWith} /> : null}
      {mode !== "reset" ? (
        <div className="grid gap-3">
          <SocialButton provider="google" label={copy.continueGoogle} />
          <SocialButton provider="apple" label={copy.continueApple} />
        </div>
      ) : null}
      {mode === "reset" ? <a className="text-sm font-black text-[#7651e6] underline-offset-4 hover:underline" href="/login">{copy.loginLink}</a> : null}
      <div className="pt-6 text-center text-xs font-semibold leading-6 text-navy/64">
        <p className="mb-2 flex items-center justify-center gap-2 text-navy/78">
          <span aria-hidden="true"><AuthIcon name="lock" /></span>
          {copy.neverShare}
        </p>
        {mode === "login" ? (
          <p>
            {copy.legalAgreementLead} <a className="font-black text-[#7651e6] underline-offset-4 hover:underline" href="/terms">{copy.terms}</a> {copy.legalAgreementMiddle} <a className="font-black text-[#7651e6] underline-offset-4 hover:underline" href="/privacy">{copy.privacy}</a>.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function getPostLoginRedirectPath() {
  const fallbackPath = "/app";
  const nextPath = new URLSearchParams(window.location.search).get("next");

  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallbackPath;
  }

  return nextPath;
}

function Field({
  icon,
  label,
  name,
  type,
  placeholder,
  error,
  revealLabel,
  onReveal
}: {
  icon: IconName;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  revealLabel?: string;
  onReveal?: () => void;
}) {
  return (
    <label className="block space-y-2 text-sm font-black text-navy">
      <span>{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-navy/42" aria-hidden="true">
          <AuthIcon name={icon} />
        </span>
        <input
          className="min-h-12 w-full rounded-md border border-[#d9dee8] bg-white px-12 text-sm font-semibold text-navy outline-none transition placeholder:text-navy/42 focus:border-[#8663ee] focus:ring-2 focus:ring-[#8663ee]/20"
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
        />
        {onReveal ? (
          <button className="absolute right-4 top-1/2 flex -translate-y-1/2 text-navy/44 transition hover:text-navy" type="button" aria-label={revealLabel} onClick={onReveal}>
            <AuthIcon name="eye" />
          </button>
        ) : null}
      </span>
      {error ? <span className="block text-sm text-red-700">{error}</span> : null}
    </label>
  );
}

function SocialAuthDivider({ label }: { label: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-2 text-sm font-semibold text-navy/58">
      <span className="h-px bg-[#e0e3ea]" />
      <span>{label}</span>
      <span className="h-px bg-[#e0e3ea]" />
    </div>
  );
}

function SocialButton({ provider, label }: { provider: "google" | "apple"; label: string }) {
  return (
    <button className="grid min-h-12 grid-cols-[24px_1fr_24px] items-center rounded-md border border-[#e1e5ee] bg-white px-5 text-sm font-bold text-navy shadow-[0_1px_2px_rgba(7,31,73,0.02)] transition hover:border-[#cfd6e3] hover:bg-[#fbfcff]" type="button">
      <span className="flex h-6 w-6 items-center justify-center" aria-hidden="true">
        {provider === "google" ? <GoogleMark /> : <AppleMark />}
      </span>
      <span>{label}</span>
      <span />
    </button>
  );
}

function GoogleMark() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.74-.07-1.45-.19-2.14H12v4.05h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.44Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.51c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A9.99 9.99 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.41 13.89A6.02 6.02 0 0 1 6.1 12c0-.66.11-1.3.31-1.89V7.52H3.06A9.99 9.99 0 0 0 2 12c0 1.61.38 3.13 1.06 4.48l3.35-2.59Z" />
      <path fill="#EA4335" d="M12 5.99c1.47 0 2.79.5 3.82 1.5l2.87-2.87C16.96 3.01 14.7 2 12 2a9.99 9.99 0 0 0-8.94 5.52l3.35 2.59C7.2 7.75 9.4 5.99 12 5.99Z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.52 12.7c-.03-2.45 2-3.63 2.09-3.69-1.14-1.67-2.91-1.9-3.54-1.92-1.51-.15-2.94.89-3.7.89-.77 0-1.95-.87-3.2-.85-1.65.02-3.17.96-4.02 2.44-1.71 2.97-.44 7.37 1.23 9.78.82 1.18 1.79 2.51 3.07 2.46 1.23-.05 1.7-.8 3.18-.8 1.49 0 1.91.8 3.21.77 1.33-.03 2.17-1.2 2.98-2.39.94-1.37 1.33-2.7 1.35-2.77-.03-.01-2.59-.99-2.65-3.92ZM14.08 5.5c.68-.82 1.13-1.96 1.01-3.1-.98.04-2.16.65-2.86 1.47-.63.73-1.18 1.9-1.03 3.02 1.09.08 2.2-.56 2.88-1.39Z" />
    </svg>
  );
}

function ProtectedHome() {
  const { language } = useLanguage();
  const copy = accountCopy[language];

  async function logout() {
    await fetch("/api/account/logout", { method: "POST" });
    window.location.assign("/login");
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-black tracking-[0] md:text-4xl">{copy.appTitle}</h1>
      <p className="text-base leading-7 text-navy/76">{copy.appIntro}</p>
      <p className="rounded-md border border-forest/20 bg-forest/5 p-4 text-sm leading-6 text-navy/78">{copy.protectedNote}</p>
      <button className="min-h-12 rounded-md bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-forest" type="button" onClick={() => void logout()}>
        {copy.logoutAction}
      </button>
    </div>
  );
}

type ValidateInput = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  mode: "signup" | "login" | "reset";
  copy: (typeof accountCopy)[keyof typeof accountCopy];
};

function validateFields({ fullName, email, password, confirmPassword, acceptedTerms, mode, copy }: ValidateInput): FieldErrors {
  const errors: FieldErrors = {};
  if (mode === "signup" && fullName.length < 2) errors.fullName = copy.validationFullName;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = copy.validationEmail;
  if (mode !== "reset" && password.length < 12) errors.password = copy.validationPassword;
  if (mode === "signup" && password !== confirmPassword) errors.confirmPassword = copy.validationConfirmPassword;
  if (mode === "signup" && !acceptedTerms) errors.terms = copy.validationTerms;
  return errors;
}

type IconName = "calendar" | "chat" | "eye" | "folder" | "lock" | "mail" | "shield" | "user";

function AuthIcon({ name }: { name: IconName }) {
  const common = "h-5 w-5";

  if (name === "folder") {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 4 20v-4a7 7 0 1 1 3 1Z" />
        <path d="M9 10h.01M13 10h.01M17 10h.01" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4Z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10V8a5 5 0 0 1 10 0v2" />
        <path d="M6 10h12v10H6Z" />
      </svg>
    );
  }

  if (name === "eye") {
    return (
      <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
