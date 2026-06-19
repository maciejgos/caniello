import type {
  AccountSettingsApiResponse,
  PetProfileResponse,
} from "@caniello/contracts";
import { useEffect, useState } from "react";
import type { AccountCopy, AccountLanguage } from "../content";
import {
  AccountSafetyPanels,
  ConsentSettingsPanel,
  DeletionDialog,
  PetDefaultsSettingsPanel,
  PrivacySettingsPanel,
  ProfileSettingsPanel,
} from "./AccountSettingsPanels";
import { AppIcon } from "./AppIcon";

type AccountSettingsSectionProps = {
  copy: AccountCopy;
  language: AccountLanguage;
  pet: PetProfileResponse | null;
  onLanguageChange: (language: AccountLanguage) => void;
};

type SettingsSnapshot = Pick<
  AccountSettingsApiResponse,
  | "ownerEmail"
  | "profile"
  | "latestConsent"
  | "latestDataExportRequest"
  | "latestDeletionRequest"
>;

type SettingsAction = "loading" | "save" | "export" | "deletion" | null;
type Feedback = { tone: "success" | "error"; message: string } | null;

const EMPTY_SNAPSHOT: SettingsSnapshot = {
  ownerEmail: null,
  profile: null,
  latestConsent: null,
  latestDataExportRequest: null,
  latestDeletionRequest: null,
};

export function AccountSettingsSection({
  copy,
  language,
  pet,
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
  const [isDeletionOpen, setDeletionOpen] = useState(false);

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
          ownerEmail: result.ownerEmail ?? null,
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

  async function saveSettings() {
    setActiveAction("save");
    setFeedback(null);
    try {
      const [profileResponse, consentResponse] = await Promise.all([
        fetch("/api/account/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            displayName: displayName.trim() || undefined,
            language: settingsLanguage,
          }),
        }),
        fetch("/api/account/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "consent",
            payload: {
              analyticsConsent,
              marketingConsent,
              language: settingsLanguage,
            },
          }),
        }),
      ]);
      const profileResult =
        (await profileResponse.json()) as AccountSettingsApiResponse;
      const consentResult =
        (await consentResponse.json()) as AccountSettingsApiResponse;

      if (!profileResponse.ok || !profileResult.ok || !profileResult.profile) {
        setFeedback({
          tone: "error",
          message: profileResult.message ?? copy.settingsError,
        });
        return;
      }
      if (
        !consentResponse.ok ||
        !consentResult.ok ||
        !consentResult.latestConsent
      ) {
        setFeedback({
          tone: "error",
          message: consentResult.message ?? copy.settingsError,
        });
        return;
      }

      setSnapshot((current) => ({
        ...current,
        profile: profileResult.profile ?? null,
        latestConsent: consentResult.latestConsent ?? null,
      }));
      onLanguageChange(profileResult.profile.language);
      setFeedback({ tone: "success", message: copy.settingsSaved });
    } catch {
      setFeedback({ tone: "error", message: copy.settingsError });
    } finally {
      setActiveAction(null);
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
    setDeletionOpen(false);
  }

  async function postSettingsAction(
    action: "export" | "deletion",
    payload: unknown,
  ) {
    setActiveAction(action);
    setFeedback(null);
    try {
      const response = await fetch("/api/account/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: action === "export" ? "data_export" : "account_deletion",
          payload,
        }),
      });
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
      className="min-w-0 px-5 py-7 sm:px-8 lg:px-9 lg:py-8 xl:pl-[76px] xl:pr-6"
      aria-labelledby="account-settings-title"
    >
      <div className="mx-auto max-w-[1700px]">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span
              className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center text-[#ff8500]"
              aria-hidden="true"
            >
              <span className="scale-[1.7]">
                <AppIcon name="settings" />
              </span>
            </span>
            <div>
              <h1
                id="account-settings-title"
                className="font-serif text-[clamp(2.35rem,4vw,3.45rem)] font-bold leading-none tracking-[0] text-navy"
              >
                {copy.appNavSettings}
              </h1>
              <p className="mt-3 text-base font-semibold leading-6 text-[#314a7a]">
                {copy.settingsReferenceIntro
                  .replace("{ownerName}", displayName || copy.appAccountName)
                  .replace("{petName}", pet?.name ?? copy.settingsNoActivePet)}
              </p>
            </div>
          </div>
          <button
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-[8px] bg-[#092d73] px-7 text-base font-black text-white shadow-[0_12px_30px_rgba(9,45,115,0.16)] transition hover:bg-[#06245f] disabled:cursor-not-allowed disabled:bg-[#7183a5]"
            disabled={isLoading || activeAction === "save"}
            type="button"
            onClick={saveSettings}
          >
            <span aria-hidden="true">✓</span>
            {activeAction === "save"
              ? copy.settingsSaving
              : copy.settingsSaveAll}
          </button>
        </header>

        <div className="mt-4 min-h-10" aria-live="polite">
          {isLoading ? (
            <StatusNotice tone="loading" message={copy.settingsLoading} />
          ) : null}
          {feedback ? (
            <StatusNotice tone={feedback.tone} message={feedback.message} />
          ) : null}
        </div>

        <div
          className={`mt-3 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3 ${
            isLoading ? "pointer-events-none opacity-60" : ""
          }`}
          aria-busy={isLoading}
        >
          <ProfileSettingsPanel
            copy={copy}
            displayName={displayName}
            ownerEmail={snapshot.ownerEmail ?? null}
            language={settingsLanguage}
            isBusy={activeAction === "save"}
            onDisplayNameChange={setDisplayName}
            onLanguageChange={setSettingsLanguage}
          />
          <PetDefaultsSettingsPanel copy={copy} pet={pet} />
          <ConsentSettingsPanel
            copy={copy}
            latestConsent={snapshot.latestConsent ?? null}
            analyticsConsent={analyticsConsent}
            marketingConsent={marketingConsent}
            isBusy={activeAction === "save"}
            onAnalyticsChange={setAnalyticsConsent}
            onMarketingChange={setMarketingConsent}
          />
          <PrivacySettingsPanel
            copy={copy}
            exportRequest={snapshot.latestDataExportRequest ?? null}
            deletionRequest={snapshot.latestDeletionRequest ?? null}
            isExporting={activeAction === "export"}
            onExport={requestExport}
            onOpenDeletion={() => setDeletionOpen(true)}
          />
          <AccountSafetyPanels copy={copy} />
        </div>
      </div>

      {isDeletionOpen ? (
        <DeletionDialog
          copy={copy}
          request={snapshot.latestDeletionRequest ?? null}
          confirmation={deleteConfirmation}
          isBusy={activeAction === "deletion"}
          onConfirmationChange={setDeleteConfirmation}
          onClose={() => {
            if (activeAction !== "deletion") {
              setDeleteConfirmation("");
              setDeletionOpen(false);
            }
          }}
          onConfirm={requestDeletion}
        />
      ) : null}
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
      className={`inline-flex rounded-md border px-4 py-2 text-sm font-black ${toneClass}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {message}
    </p>
  );
}
