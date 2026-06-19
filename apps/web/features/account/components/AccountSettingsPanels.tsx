import type {
  AccountDeletionRequestResponse,
  ConsentEventResponse,
  DataExportRequestResponse,
} from "@caniello/contracts";
import type { FormEvent, ReactNode } from "react";
import type { AccountCopy, AccountLanguage } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";

type SettingsPanelProps = {
  children: ReactNode;
  icon: AppIconName;
  title: string;
  tone?: "default" | "danger" | "warm";
};

export function SettingsPanel({
  children,
  icon,
  title,
  tone = "default",
}: SettingsPanelProps) {
  const toneClass =
    tone === "danger"
      ? "border-[#f0d1d1] bg-[#fffafa]"
      : tone === "warm"
        ? "border-[#f0dfc8] bg-[#fffaf2]"
        : "border-[#e5eaf2] bg-white";

  return (
    <section
      className={`min-w-0 rounded-[10px] border p-5 shadow-[0_12px_34px_rgba(15,23,42,0.045)] ${toneClass}`}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-white text-[#1e6de8]"
          aria-hidden="true"
        >
          <AppIcon name={icon} />
        </span>
        <h2 className="font-serif text-[1.35rem] font-black leading-tight tracking-[0] text-navy">
          {title}
        </h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type ProfileSettingsPanelProps = {
  copy: AccountCopy;
  displayName: string;
  language: AccountLanguage;
  isBusy: boolean;
  onDisplayNameChange: (value: string) => void;
  onLanguageChange: (value: AccountLanguage) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ProfileSettingsPanel({
  copy,
  displayName,
  language,
  isBusy,
  onDisplayNameChange,
  onLanguageChange,
  onSubmit,
}: ProfileSettingsPanelProps) {
  return (
    <SettingsPanel icon="user" title={copy.settingsProfileTitle}>
      <form onSubmit={onSubmit}>
        <p className="text-sm font-semibold leading-6 text-navy/66">
          {copy.settingsProfileBody}
        </p>
        <div className="mt-4 grid gap-4">
          <label
            className="grid gap-2 text-sm font-black text-navy"
            htmlFor="settings-display-name"
          >
            {copy.settingsDisplayName}
            <input
              id="settings-display-name"
              className="min-h-11 rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#1e6de8] focus:ring-2 focus:ring-[#dce9ff]"
              value={displayName}
              placeholder={copy.fullNamePlaceholder}
              disabled={isBusy}
              onChange={(event) => onDisplayNameChange(event.target.value)}
            />
          </label>
          <label
            className="grid gap-2 text-sm font-black text-navy"
            htmlFor="settings-language"
          >
            {copy.settingsLanguage}
            <select
              id="settings-language"
              className="min-h-11 rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#1e6de8] focus:ring-2 focus:ring-[#dce9ff]"
              value={language}
              disabled={isBusy}
              onChange={(event) =>
                onLanguageChange(event.target.value as AccountLanguage)
              }
            >
              <option value="pl">{copy.settingsLanguagePl}</option>
              <option value="en">{copy.settingsLanguageEn}</option>
            </select>
          </label>
        </div>
        <button
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-navy px-5 text-sm font-black text-white transition hover:bg-[#07245a] disabled:cursor-not-allowed disabled:bg-navy/40"
          disabled={isBusy}
          type="submit"
        >
          {isBusy ? copy.settingsSaving : copy.settingsProfileAction}
        </button>
      </form>
    </SettingsPanel>
  );
}

type ConsentSettingsPanelProps = {
  copy: AccountCopy;
  latestConsent: ConsentEventResponse | null;
  analyticsConsent: boolean;
  marketingConsent: boolean;
  isBusy: boolean;
  onAnalyticsChange: (value: boolean) => void;
  onMarketingChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ConsentSettingsPanel({
  copy,
  latestConsent,
  analyticsConsent,
  marketingConsent,
  isBusy,
  onAnalyticsChange,
  onMarketingChange,
  onSubmit,
}: ConsentSettingsPanelProps) {
  return (
    <SettingsPanel icon="shield" title={copy.settingsConsentTitle}>
      <form onSubmit={onSubmit}>
        <p className="text-sm font-semibold leading-6 text-navy/66">
          {copy.settingsConsentBody}
        </p>
        <label
          className="mt-4 flex gap-3 text-sm font-bold leading-6 text-navy"
          htmlFor="settings-analytics-consent"
        >
          <input
            id="settings-analytics-consent"
            className="mt-1 h-4 w-4 accent-[#1e6de8]"
            type="checkbox"
            checked={analyticsConsent}
            disabled={isBusy}
            onChange={(event) => onAnalyticsChange(event.target.checked)}
          />
          <span>{copy.settingsAnalyticsConsent}</span>
        </label>
        <label
          className="mt-3 flex gap-3 text-sm font-bold leading-6 text-navy"
          htmlFor="settings-marketing-consent"
        >
          <input
            id="settings-marketing-consent"
            className="mt-1 h-4 w-4 accent-[#1e6de8]"
            type="checkbox"
            checked={marketingConsent}
            disabled={isBusy}
            onChange={(event) => onMarketingChange(event.target.checked)}
          />
          <span>{copy.settingsMarketingConsent}</span>
        </label>
        <p className="mt-4 text-xs font-black uppercase tracking-[0.08em] text-navy/48">
          {copy.settingsLatestConsent}:{" "}
          {latestConsent
            ? formatDate(latestConsent.createdAt)
            : copy.settingsNoConsent}
        </p>
        <button
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#1e6de8] px-5 text-sm font-black text-white transition hover:bg-[#155bc7] disabled:cursor-not-allowed disabled:bg-[#9dbced]"
          disabled={isBusy}
          type="submit"
        >
          {isBusy ? copy.settingsSaving : copy.settingsConsentAction}
        </button>
      </form>
    </SettingsPanel>
  );
}

type DataExportSettingsPanelProps = {
  copy: AccountCopy;
  exportRequest: DataExportRequestResponse | null;
  isBusy: boolean;
  onExport: () => void;
};

export function DataExportSettingsPanel({
  copy,
  exportRequest,
  isBusy,
  onExport,
}: DataExportSettingsPanelProps) {
  return (
    <SettingsPanel icon="download" title={copy.settingsExportTitle}>
      <p className="text-sm font-semibold leading-6 text-navy/66">
        {copy.settingsExportBody}
      </p>
      <RequestStatus copy={copy} request={exportRequest} />
      <button
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#dce2ec] bg-white px-5 text-sm font-black text-navy transition hover:bg-[#f5f8fd] disabled:cursor-not-allowed disabled:text-navy/44"
        disabled={isBusy}
        type="button"
        onClick={onExport}
      >
        {isBusy ? copy.settingsSaving : copy.settingsExportAction}
      </button>
    </SettingsPanel>
  );
}

type AccountDeletionSettingsPanelProps = {
  copy: AccountCopy;
  deletionRequest: AccountDeletionRequestResponse | null;
  deleteConfirmation: string;
  isBusy: boolean;
  onDeleteConfirmationChange: (value: string) => void;
  onDeletion: () => void;
};

export function AccountDeletionSettingsPanel({
  copy,
  deletionRequest,
  deleteConfirmation,
  isBusy,
  onDeleteConfirmationChange,
  onDeletion,
}: AccountDeletionSettingsPanelProps) {
  return (
    <SettingsPanel
      icon="shield"
      title={copy.settingsDeletionTitle}
      tone="danger"
    >
      <p className="text-sm font-semibold leading-6 text-navy/66">
        {copy.settingsDeletionBody}
      </p>
      <label
        className="mt-4 grid gap-2 text-sm font-black text-navy"
        htmlFor="settings-delete-confirmation"
      >
        {copy.settingsDeletionConfirmation}
        <input
          id="settings-delete-confirmation"
          className="min-h-11 rounded-md border border-[#d8b4b4] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#9f1d1d] focus:ring-2 focus:ring-[#f8dddd]"
          value={deleteConfirmation}
          disabled={isBusy}
          autoComplete="off"
          onChange={(event) => onDeleteConfirmationChange(event.target.value)}
        />
      </label>
      <RequestStatus copy={copy} request={deletionRequest} />
      <button
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#9f1d1d] px-5 text-sm font-black text-white transition hover:bg-[#811717] disabled:cursor-not-allowed disabled:bg-[#d8a4a4]"
        disabled={isBusy || deleteConfirmation !== "DELETE"}
        type="button"
        onClick={onDeletion}
      >
        {isBusy ? copy.settingsSaving : copy.settingsDeletionAction}
      </button>
    </SettingsPanel>
  );
}

export function AccountSafetyPanels({ copy }: { copy: AccountCopy }) {
  return (
    <>
      <SettingsPanel icon="lock" title={copy.settingsSecurityTitle} tone="warm">
        <dl className="divide-y divide-[#eadfce] text-sm">
          <SafetyRow
            label={copy.settingsSecuritySession}
            value={copy.settingsSecuritySessionValue}
          />
          <SafetyRow
            label={copy.settingsSecurityStorage}
            value={copy.settingsSecurityStorageValue}
          />
          <SafetyRow
            label={copy.settingsSecurityOwnership}
            value={copy.settingsSecurityOwnershipValue}
          />
        </dl>
      </SettingsPanel>
      <SettingsPanel
        icon="shield"
        title={copy.settingsMedicalTitle}
        tone="warm"
      >
        <p className="text-sm font-semibold leading-6 text-navy/72">
          {copy.medicalBoundary}
        </p>
      </SettingsPanel>
    </>
  );
}

function RequestStatus({
  copy,
  request,
}: {
  copy: AccountCopy;
  request: DataExportRequestResponse | AccountDeletionRequestResponse | null;
}) {
  return (
    <p className="mt-3 rounded-md bg-[#f5f7fb] px-3 py-2 text-xs font-black uppercase tracking-[0.06em] text-navy/62">
      {copy.settingsRequestStatus}: {request?.status ?? copy.settingsNoRequest}
      {request ? ` · ${formatDate(request.requestedAt)}` : ""}
    </p>
  );
}

function SafetyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 first:pt-0 last:pb-0">
      <dt className="font-black text-navy">{label}</dt>
      <dd className="font-semibold text-navy/62">{value}</dd>
    </div>
  );
}

function formatDate(value: string): string {
  return value.slice(0, 10);
}
