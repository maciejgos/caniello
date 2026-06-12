import type { AccountSettingsApiResponse } from "@caniello/contracts";
import { FormEvent, useEffect, useState } from "react";
import type { AccountCopy, AccountLanguage } from "../content";

type AccountSettingsSectionProps = {
  copy: AccountCopy;
  language: AccountLanguage;
  onLanguageChange: (language: AccountLanguage) => void;
};

type RequestState = "idle" | "loading" | "saving" | "success" | "error";

type SettingsSnapshot = Pick<
  AccountSettingsApiResponse,
  "profile" | "latestConsent" | "latestDataExportRequest" | "latestDeletionRequest"
>;

export function AccountSettingsSection({ copy, language, onLanguageChange }: AccountSettingsSectionProps) {
  const [state, setState] = useState<RequestState>("loading");
  const [snapshot, setSnapshot] = useState<SettingsSnapshot>({
    profile: null,
    latestConsent: null,
    latestDataExportRequest: null,
    latestDeletionRequest: null
  });
  const [displayName, setDisplayName] = useState("");
  const [settingsLanguage, setSettingsLanguage] = useState<AccountLanguage>(language);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      setState("loading");
      try {
        const response = await fetch("/api/account/settings");
        const result = (await response.json()) as AccountSettingsApiResponse;
        if (!active) return;

        if (!response.ok || !result.ok) {
          setState("error");
          return;
        }

        setSnapshot({
          profile: result.profile ?? null,
          latestConsent: result.latestConsent ?? null,
          latestDataExportRequest: result.latestDataExportRequest ?? null,
          latestDeletionRequest: result.latestDeletionRequest ?? null
        });
        setDisplayName(result.profile?.displayName ?? "");
        setSettingsLanguage(result.profile?.language ?? language);
        setAnalyticsConsent(result.latestConsent?.analyticsConsent ?? false);
        setMarketingConsent(result.latestConsent?.marketingConsent ?? false);
        setState("idle");
      } catch {
        if (active) setState("error");
      }
    }

    void loadSettings();

    return () => {
      active = false;
    };
  }, [language]);

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    try {
      const response = await fetch("/api/account/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim() || undefined,
          language: settingsLanguage
        })
      });
      const result = (await response.json()) as AccountSettingsApiResponse;
      if (!response.ok || !result.ok || !result.profile) {
        setState("error");
        return;
      }
      setSnapshot((current) => ({ ...current, profile: result.profile ?? null }));
      onLanguageChange(result.profile.language);
      setState("success");
    } catch {
      setState("error");
    }
  }

  async function submitConsent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await postSettingsAction("consent", {
      analyticsConsent,
      marketingConsent,
      language: settingsLanguage
    });
  }

  async function requestExport() {
    await postSettingsAction("data_export", { language: settingsLanguage });
  }

  async function requestDeletion() {
    await postSettingsAction("account_deletion", { confirmation: deleteConfirmation, language: settingsLanguage });
    setDeleteConfirmation("");
  }

  async function postSettingsAction(action: "consent" | "data_export" | "account_deletion", payload: unknown) {
    setState("saving");
    try {
      const response = await fetch("/api/account/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, payload })
      });
      const result = (await response.json()) as AccountSettingsApiResponse;
      if (!response.ok || !result.ok) {
        setState("error");
        return;
      }
      setSnapshot((current) => ({
        profile: current.profile,
        latestConsent: result.latestConsent ?? current.latestConsent ?? null,
        latestDataExportRequest: result.latestDataExportRequest ?? current.latestDataExportRequest ?? null,
        latestDeletionRequest: result.latestDeletionRequest ?? current.latestDeletionRequest ?? null
      }));
      setState("success");
    } catch {
      setState("error");
    }
  }

  const isBusy = state === "loading" || state === "saving";
  const exportStatus = snapshot.latestDataExportRequest?.status ?? copy.settingsNoRequest;
  const deletionStatus = snapshot.latestDeletionRequest?.status ?? copy.settingsNoRequest;

  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="account-settings-title">
      <div className="mx-auto max-w-[1040px]">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.settingsEyebrow}</p>
          <h1 id="account-settings-title" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy">
            {copy.settingsTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-navy/78">{copy.settingsIntro}</p>
        </div>

        {state === "loading" ? <p className="mt-8 text-sm font-black text-navy/64">{copy.settingsLoading}</p> : null}
        {state === "error" ? <p className="mt-8 rounded-md border border-[#ffd2d2] bg-[#fff7f7] px-4 py-3 text-sm font-black text-[#9f1d1d]">{copy.settingsError}</p> : null}
        {state === "success" ? <p className="mt-8 rounded-md border border-[#c9efd9] bg-[#f3fff7] px-4 py-3 text-sm font-black text-[#0d7a4f]">{copy.settingsSaved}</p> : null}

        <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <form className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" onSubmit={submitProfile}>
            <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.settingsProfileTitle}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.settingsProfileBody}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black text-navy" htmlFor="settings-display-name">
                {copy.settingsDisplayName}
                <input
                  id="settings-display-name"
                  className="min-h-11 rounded-md border border-[#dce2ec] px-3 text-base font-semibold text-navy outline-none transition focus:border-[#7651e6]"
                  value={displayName}
                  placeholder={copy.fullNamePlaceholder}
                  disabled={isBusy}
                  onChange={(event) => setDisplayName(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-navy" htmlFor="settings-language">
                {copy.settingsLanguage}
                <select
                  id="settings-language"
                  className="min-h-11 rounded-md border border-[#dce2ec] px-3 text-base font-semibold text-navy outline-none transition focus:border-[#7651e6]"
                  value={settingsLanguage}
                  disabled={isBusy}
                  onChange={(event) => setSettingsLanguage(event.target.value as AccountLanguage)}
                >
                  <option value="pl">{copy.settingsLanguagePl}</option>
                  <option value="en">{copy.settingsLanguageEn}</option>
                </select>
              </label>
            </div>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#7651e6] px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#b8a7ef]" disabled={isBusy} type="submit">
              {state === "saving" ? copy.settingsSaving : copy.settingsProfileAction}
            </button>
          </form>

          <form className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" onSubmit={submitConsent}>
            <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.settingsConsentTitle}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.settingsConsentBody}</p>
            <label className="mt-5 flex gap-3 text-sm font-bold leading-6 text-navy" htmlFor="settings-analytics-consent">
              <input id="settings-analytics-consent" className="mt-1 h-4 w-4" type="checkbox" checked={analyticsConsent} disabled={isBusy} onChange={(event) => setAnalyticsConsent(event.target.checked)} />
              <span>{copy.settingsAnalyticsConsent}</span>
            </label>
            <label className="mt-3 flex gap-3 text-sm font-bold leading-6 text-navy" htmlFor="settings-marketing-consent">
              <input id="settings-marketing-consent" className="mt-1 h-4 w-4" type="checkbox" checked={marketingConsent} disabled={isBusy} onChange={(event) => setMarketingConsent(event.target.checked)} />
              <span>{copy.settingsMarketingConsent}</span>
            </label>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.08em] text-navy/48">{copy.settingsLatestConsent}: {snapshot.latestConsent ? formatDate(snapshot.latestConsent.createdAt) : copy.settingsNoConsent}</p>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-navy/40" disabled={isBusy} type="submit">
              {copy.settingsConsentAction}
            </button>
          </form>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <div className="rounded-lg border border-[#e6e9ef] bg-[#fbfcff] p-5">
            <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.settingsExportTitle}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.settingsExportBody}</p>
            <p className="mt-4 text-sm font-black text-navy">{copy.settingsRequestStatus}: {exportStatus}</p>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-5 text-sm font-black text-navy disabled:cursor-not-allowed disabled:text-navy/44" disabled={isBusy} type="button" onClick={requestExport}>
              {copy.settingsExportAction}
            </button>
          </div>

          <div className="rounded-lg border border-[#f1d6d6] bg-[#fffafa] p-5">
            <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.settingsDeletionTitle}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.settingsDeletionBody}</p>
            <label className="mt-4 grid gap-2 text-sm font-black text-navy" htmlFor="settings-delete-confirmation">
              {copy.settingsDeletionConfirmation}
              <input
                id="settings-delete-confirmation"
                className="min-h-11 rounded-md border border-[#d8b4b4] px-3 text-base font-semibold text-navy outline-none transition focus:border-[#9f1d1d]"
                value={deleteConfirmation}
                disabled={isBusy}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
              />
            </label>
            <p className="mt-4 text-sm font-black text-navy">{copy.settingsRequestStatus}: {deletionStatus}</p>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#9f1d1d] px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#d8a4a4]" disabled={isBusy || deleteConfirmation !== "DELETE"} type="button" onClick={requestDeletion}>
              {copy.settingsDeletionAction}
            </button>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.settingsPrivacyNote}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </section>
  );
}

function formatDate(value: string): string {
  return value.slice(0, 10);
}
