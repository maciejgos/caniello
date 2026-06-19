import type { AccountSettingsApiResponse } from "@caniello/contracts";
import { FormEvent, useEffect, useState } from "react";
import type { AccountCopy, AccountLanguage } from "../content";
import {
  AccountDeletionSettingsPanel,
  AccountSafetyPanels,
  ConsentSettingsPanel,
  DataExportSettingsPanel,
  ProfileSettingsPanel,
} from "./AccountSettingsPanels";
import { AppIcon } from "./AppIcon";

type AccountSettingsSectionProps = {
  copy: AccountCopy;
  language: AccountLanguage;
  onLanguageChange: (language: AccountLanguage) => void;
};

type SettingsSnapshot = Pick<
  AccountSettingsApiResponse,
  | "profile"
  | "latestConsent"
  | "latestDataExportRequest"
  | "latestDeletionRequest"
>;

type SettingsAction =
  | "loading"
  | "profile"
  | "consent"
  | "export"
  | "deletion"
  | null;
type Feedback = { tone: "success" | "error"; message: string } | null;

const EMPTY_SNAPSHOT: SettingsSnapshot = {
  profile: null,
  latestConsent: null,
  latestDataExportRequest: null,
  latestDeletionRequest: null,
};

export function AccountSettingsSection({
  copy,
  language,
  onLanguageChange,
}: AccountSettingsSectionProps) {
  const [activeAction, setActiveAction] = useState<SettingsAction>("loading");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [snapshot, setSnapshot] = useState<SettingsSnapshot>(EMPTY_SNAPSHOT);
  const [displayName, setDisplayName] = useState("");
  const [settingsLanguage, setSettingsLanguage] =
    useState<AccountLanguage>(language);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      setActiveAction("loading");
      setFeedback(null);
      try {
        const response = await fetch("/api/account/settings");
        const result = (await response.json()) as AccountSettingsApiResponse;
        if (!active) return;

        if (!response.ok || !result.ok) {
          setFeedback({
            tone: "error",
            message: result.message ?? copy.settingsError,
          });
          return;
        }

        const nextSnapshot = {
          profile: result.profile ?? null,
          latestConsent: result.latestConsent ?? null,
          latestDataExportRequest: result.latestDataExportRequest ?? null,
          latestDeletionRequest: result.latestDeletionRequest ?? null,
        };
        setSnapshot(nextSnapshot);
        setDisplayName(nextSnapshot.profile?.displayName ?? "");
        setSettingsLanguage(nextSnapshot.profile?.language ?? language);
        setAnalyticsConsent(
          nextSnapshot.latestConsent?.analyticsConsent ?? false,
        );
        setMarketingConsent(
          nextSnapshot.latestConsent?.marketingConsent ?? false,
        );
      } catch {
        if (active) setFeedback({ tone: "error", message: copy.settingsError });
      } finally {
        if (active) setActiveAction(null);
      }
    }

    void loadSettings();

    return () => {
      active = false;
    };
  }, [copy.settingsError, language]);

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await mutateSettings("profile", "/api/account/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: displayName.trim() || undefined,
        language: settingsLanguage,
      }),
    });
    if (!result?.profile) return;

    setSnapshot((current) => ({ ...current, profile: result.profile ?? null }));
    onLanguageChange(result.profile.language);
  }

  async function submitConsent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await postSettingsAction("consent", {
      analyticsConsent,
      marketingConsent,
      language: settingsLanguage,
    });
    if (result?.latestConsent) {
      setSnapshot((current) => ({
        ...current,
        latestConsent: result.latestConsent ?? null,
      }));
    }
  }

  async function requestExport() {
    const result = await postSettingsAction("export", {
      language: settingsLanguage,
    });
    if (result?.latestDataExportRequest) {
      setSnapshot((current) => ({
        ...current,
        latestDataExportRequest: result.latestDataExportRequest ?? null,
      }));
    }
  }

  async function requestDeletion() {
    const result = await postSettingsAction("deletion", {
      confirmation: deleteConfirmation,
      language: settingsLanguage,
    });
    if (!result?.latestDeletionRequest) return;

    setSnapshot((current) => ({
      ...current,
      latestDeletionRequest: result.latestDeletionRequest ?? null,
    }));
    setDeleteConfirmation("");
  }

  async function postSettingsAction(
    action: "consent" | "export" | "deletion",
    payload: unknown,
  ) {
    const apiAction =
      action === "export"
        ? "data_export"
        : action === "deletion"
          ? "account_deletion"
          : "consent";

    return mutateSettings(action, "/api/account/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: apiAction, payload }),
    });
  }

  async function mutateSettings(
    action: Exclude<SettingsAction, "loading" | null>,
    input: string,
    init: RequestInit,
  ) {
    setActiveAction(action);
    setFeedback(null);
    try {
      const response = await fetch(input, init);
      const result = (await response.json()) as AccountSettingsApiResponse;
      if (!response.ok || !result.ok) {
        setFeedback({
          tone: "error",
          message: result.message ?? copy.settingsError,
        });
        return null;
      }
      setFeedback({ tone: "success", message: copy.settingsSaved });
      return result;
    } catch {
      setFeedback({ tone: "error", message: copy.settingsError });
      return null;
    } finally {
      setActiveAction(null);
    }
  }

  const isLoading = activeAction === "loading";

  return (
    <section
      className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 xl:px-12"
      aria-labelledby="account-settings-title"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3 text-[#1e6de8]">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff]"
                aria-hidden="true"
              >
                <AppIcon name="settings" />
              </span>
              <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">
                {copy.settingsEyebrow}
              </p>
            </div>
            <h1
              id="account-settings-title"
              className="mt-3 font-serif text-[clamp(2.1rem,3vw,2.9rem)] font-black leading-[1.06] tracking-[0] text-navy"
            >
              {copy.settingsTitle}
            </h1>
            <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-navy/72">
              {copy.settingsIntro}
            </p>
          </div>
          <div className="rounded-lg border border-[#f0dfc8] bg-[#fff8ee] px-4 py-3 text-sm font-bold leading-6 text-navy/72 md:max-w-[310px]">
            {copy.settingsOwnerControlNote}
          </div>
        </div>

        <div className="mt-6 min-h-12" aria-live="polite">
          {isLoading ? (
            <StatusNotice tone="loading" message={copy.settingsLoading} />
          ) : null}
          {feedback ? (
            <StatusNotice tone={feedback.tone} message={feedback.message} />
          ) : null}
        </div>

        <div
          className={`mt-3 grid gap-5 md:grid-cols-2 xl:grid-cols-3 ${isLoading ? "pointer-events-none opacity-60" : ""}`}
          aria-busy={isLoading}
        >
          <ProfileSettingsPanel
            copy={copy}
            displayName={displayName}
            language={settingsLanguage}
            isBusy={activeAction === "profile"}
            onDisplayNameChange={setDisplayName}
            onLanguageChange={setSettingsLanguage}
            onSubmit={submitProfile}
          />
          <ConsentSettingsPanel
            copy={copy}
            latestConsent={snapshot.latestConsent ?? null}
            analyticsConsent={analyticsConsent}
            marketingConsent={marketingConsent}
            isBusy={activeAction === "consent"}
            onAnalyticsChange={setAnalyticsConsent}
            onMarketingChange={setMarketingConsent}
            onSubmit={submitConsent}
          />
          <DataExportSettingsPanel
            copy={copy}
            exportRequest={snapshot.latestDataExportRequest ?? null}
            isBusy={activeAction === "export"}
            onExport={requestExport}
          />
          <AccountDeletionSettingsPanel
            copy={copy}
            deletionRequest={snapshot.latestDeletionRequest ?? null}
            deleteConfirmation={deleteConfirmation}
            isBusy={activeAction === "deletion"}
            onDeleteConfirmationChange={setDeleteConfirmation}
            onDeletion={requestDeletion}
          />
          <AccountSafetyPanels copy={copy} />
        </div>

        <p className="mt-6 max-w-4xl text-sm font-semibold leading-6 text-navy/58">
          {copy.settingsPrivacyNote}
        </p>
      </div>
    </section>
  );
}

function StatusNotice({
  tone,
  message,
}: {
  tone: "loading" | "success" | "error";
  message: string;
}) {
  const toneClass =
    tone === "error"
      ? "border-[#ffd2d2] bg-[#fff7f7] text-[#9f1d1d]"
      : tone === "success"
        ? "border-[#c9efd9] bg-[#f3fff7] text-[#0d7a4f]"
        : "border-[#dce9ff] bg-[#f4f8ff] text-[#1e5ca8]";

  return (
    <p
      className={`rounded-md border px-4 py-3 text-sm font-black ${toneClass}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {message}
    </p>
  );
}
