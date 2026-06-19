import type {
  AccountDeletionRequestResponse,
  ConsentEventResponse,
  DataExportRequestResponse,
  PetProfileResponse,
} from "@caniello/contracts";
import type { ReactNode } from "react";
import type { AccountCopy, AccountLanguage } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";

type SettingsPanelProps = {
  children: ReactNode;
  icon: AppIconName;
  title: string;
  iconTone?: "blue" | "orange";
};

export function SettingsPanel({
  children,
  icon,
  title,
  iconTone = "orange",
}: SettingsPanelProps) {
  return (
    <section className="min-w-0 rounded-[10px] border border-[#dce3ee] bg-white px-6 py-6">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            iconTone === "blue"
              ? "bg-[#e7f0ff] text-[#176be8]"
              : "bg-[#fff0dc] text-[#d66b00]"
          }`}
          aria-hidden="true"
        >
          <AppIcon name={icon} />
        </span>
        <h2 className="font-serif text-[1.35rem] font-bold leading-tight tracking-[0] text-navy">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

type ProfileSettingsPanelProps = {
  copy: AccountCopy;
  displayName: string;
  ownerEmail: string | null;
  language: AccountLanguage;
  isBusy: boolean;
  onDisplayNameChange: (value: string) => void;
  onLanguageChange: (value: AccountLanguage) => void;
};

export function ProfileSettingsPanel({
  copy,
  displayName,
  ownerEmail,
  language,
  isBusy,
  onDisplayNameChange,
  onLanguageChange,
}: ProfileSettingsPanelProps) {
  return (
    <SettingsPanel icon="user" title={copy.settingsProfileTitle}>
      <div className="grid gap-1.5">
        <SettingsField label={copy.settingsDisplayName}>
          <input
            id="settings-display-name"
            className={fieldClassName}
            value={displayName}
            placeholder={copy.fullNamePlaceholder}
            disabled={isBusy}
            onChange={(event) => onDisplayNameChange(event.target.value)}
          />
        </SettingsField>
        <SettingsField label={copy.settingsEmail}>
          <input
            className={fieldClassName}
            value={ownerEmail ?? copy.settingsEmailUnavailable}
            readOnly
            aria-readonly="true"
          />
        </SettingsField>
        <SettingsField label={copy.settingsLanguage}>
          <select
            id="settings-language"
            className={fieldClassName}
            value={language}
            disabled={isBusy}
            onChange={(event) =>
              onLanguageChange(event.target.value as AccountLanguage)
            }
          >
            <option value="pl">{copy.settingsLanguagePl}</option>
            <option value="en">{copy.settingsLanguageEn}</option>
          </select>
        </SettingsField>
      </div>
    </SettingsPanel>
  );
}

export function PetDefaultsSettingsPanel({
  copy,
  pet,
}: {
  copy: AccountCopy;
  pet: PetProfileResponse | null;
}) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <SettingsPanel icon="paw" title={copy.settingsPetDefaultsTitle}>
      <div className="grid gap-1.5">
        <ReadOnlyField
          label={copy.settingsActivePet}
          value={pet?.name ?? copy.settingsNoActivePet}
        />
        <ReadOnlyField
          label={copy.settingsReminderTime}
          value={copy.settingsReminderTimeUnavailable}
        />
        <ReadOnlyField
          label={copy.settingsTimezone}
          value={timezone || copy.settingsTimezoneUnavailable}
        />
      </div>
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
};

export function ConsentSettingsPanel({
  copy,
  latestConsent,
  analyticsConsent,
  marketingConsent,
  isBusy,
  onAnalyticsChange,
  onMarketingChange,
}: ConsentSettingsPanelProps) {
  return (
    <SettingsPanel
      icon="bell"
      iconTone="blue"
      title={copy.settingsConsentTitle}
    >
      <div className="space-y-4">
        <SwitchRow
          id="settings-analytics-consent"
          label={copy.settingsAnalyticsConsent}
          checked={analyticsConsent}
          disabled={isBusy}
          onChange={onAnalyticsChange}
        />
        <SwitchRow
          id="settings-marketing-consent"
          label={copy.settingsMarketingConsent}
          checked={marketingConsent}
          disabled={isBusy}
          onChange={onMarketingChange}
        />
        <div className="flex items-center justify-between gap-4 pt-1 text-sm">
          <span className="font-semibold text-navy/68">
            {copy.settingsLatestConsent}
          </span>
          <span className="text-right font-bold text-navy">
            {latestConsent
              ? formatDate(latestConsent.createdAt)
              : copy.settingsNoConsent}
          </span>
        </div>
      </div>
    </SettingsPanel>
  );
}

type PrivacySettingsPanelProps = {
  copy: AccountCopy;
  exportRequest: DataExportRequestResponse | null;
  deletionRequest: AccountDeletionRequestResponse | null;
  isExporting: boolean;
  onExport: () => void;
  onOpenDeletion: () => void;
};

export function PrivacySettingsPanel({
  copy,
  exportRequest,
  deletionRequest,
  isExporting,
  onExport,
  onOpenDeletion,
}: PrivacySettingsPanelProps) {
  return (
    <SettingsPanel icon="shield" title={copy.settingsDataRightsTitle}>
      <div className="grid gap-2">
        <button
          className={outlineActionClassName}
          disabled={isExporting}
          type="button"
          onClick={onExport}
        >
          <AppIcon name="download" />
          {isExporting ? copy.settingsSaving : copy.settingsExportAction}
        </button>
        <button
          className={outlineActionClassName}
          type="button"
          onClick={onOpenDeletion}
        >
          <AppIcon name="shield" />
          {copy.settingsDeletionAction}
        </button>
      </div>
      <p className="mt-2 text-sm leading-5 text-[#3d5684]">
        {copy.settingsDataRightsNote}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-[0.04em] text-navy/48">
        <span>
          {copy.settingsExportShortStatus}:{" "}
          {exportRequest?.status ?? copy.settingsNoRequest}
        </span>
        <span>
          {copy.settingsDeletionShortStatus}:{" "}
          {deletionRequest?.status ?? copy.settingsNoRequest}
        </span>
      </div>
    </SettingsPanel>
  );
}

export function AccountSafetyPanels({ copy }: { copy: AccountCopy }) {
  return (
    <>
      <SettingsPanel icon="lock" title={copy.settingsSecurityTitle}>
        <dl className="space-y-4 text-sm">
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
      <SettingsPanel icon="shield" title={copy.settingsMedicalTitle}>
        <p className="text-sm font-medium leading-6 text-[#3d5684]">
          {copy.medicalBoundary}
        </p>
      </SettingsPanel>
    </>
  );
}

type DeletionDialogProps = {
  copy: AccountCopy;
  request: AccountDeletionRequestResponse | null;
  confirmation: string;
  isBusy: boolean;
  onConfirmationChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeletionDialog({
  copy,
  request,
  confirmation,
  isBusy,
  onConfirmationChange,
  onClose,
  onConfirm,
}: DeletionDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-navy/35 p-5"
      role="presentation"
    >
      <section
        className="w-full max-w-[520px] rounded-xl border border-[#e7c7c7] bg-white p-6 shadow-[0_24px_80px_rgba(6,27,69,0.24)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-deletion-dialog-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="settings-deletion-dialog-title"
              className="font-serif text-2xl font-bold text-navy"
            >
              {copy.settingsDeletionTitle}
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-navy/68">
              {copy.settingsDeletionBody}
            </p>
          </div>
          <button
            className="rounded-md px-2 py-1 text-xl text-navy/54 hover:bg-[#f5f7fb]"
            type="button"
            aria-label={copy.settingsCloseDialog}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <label
          className="mt-5 grid gap-2 text-sm font-black text-navy"
          htmlFor="settings-delete-confirmation"
        >
          {copy.settingsDeletionConfirmation}
          <input
            id="settings-delete-confirmation"
            className={`${fieldClassName} focus:border-[#9f1d1d] focus:ring-[#f8dddd]`}
            value={confirmation}
            disabled={isBusy}
            autoComplete="off"
            onChange={(event) => onConfirmationChange(event.target.value)}
          />
        </label>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.05em] text-navy/52">
          {copy.settingsRequestStatus}:{" "}
          {request
            ? `${request.status} · ${formatDate(request.requestedAt)}`
            : copy.settingsNoRequest}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="min-h-11 rounded-md border border-[#dce2ec] bg-white px-5 text-sm font-black text-navy"
            type="button"
            onClick={onClose}
          >
            {copy.settingsCancel}
          </button>
          <button
            className="min-h-11 rounded-md bg-[#9f1d1d] px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#d8a4a4]"
            disabled={isBusy || confirmation !== "DELETE"}
            type="button"
            onClick={onConfirm}
          >
            {isBusy ? copy.settingsSaving : copy.settingsConfirmDeletion}
          </button>
        </div>
      </section>
    </div>
  );
}

function SettingsField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid text-sm font-black text-navy">
      <span className="mb-2">{label}</span>
      {children}
    </label>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-sm font-black text-navy">{label}</p>
      <div className={`${fieldClassName} flex items-center`}>{value}</div>
    </div>
  );
}

function SwitchRow({
  id,
  label,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className="flex min-h-10 items-center justify-between gap-4 text-sm font-medium text-[#3d5684]"
      htmlFor={id}
    >
      <span>{label}</span>
      <span className="relative inline-flex h-6 w-11 shrink-0">
        <input
          id={id}
          className="peer sr-only"
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="absolute inset-0 rounded-full bg-[#bdc9dc] transition peer-checked:bg-[#176be8] peer-disabled:opacity-55" />
        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function SafetyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="font-black text-navy">{label}</dt>
      <dd className="text-right font-medium text-[#3d5684]">{value}</dd>
    </div>
  );
}

const fieldClassName =
  "min-h-12 w-full rounded-md border border-[#d8e0ec] bg-white px-4 text-sm font-bold text-navy outline-none transition focus:border-[#1e6de8] focus:ring-2 focus:ring-[#dce9ff] disabled:bg-[#f8f9fb]";

const outlineActionClassName =
  "inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-[#d8e0ec] bg-white px-5 text-sm font-black text-navy transition hover:bg-[#f8faff] disabled:cursor-not-allowed disabled:text-navy/44";

function formatDate(value: string): string {
  return value.slice(0, 10);
}
