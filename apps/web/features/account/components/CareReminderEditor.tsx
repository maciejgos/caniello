"use client";

import type {
  ReminderAdvanceNoticeDays,
  ReminderRepeatFrequency,
  ReminderType,
} from "@caniello/contracts";
import type { FormEvent, ReactNode } from "react";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";

export type ReminderFormState = {
  title: string;
  reminderType: ReminderType;
  dueDate: string;
  dueTime: string;
  repeatFrequency: ReminderRepeatFrequency;
  advanceNoticeDays: ReminderAdvanceNoticeDays;
  notes: string;
};

type CareReminderEditorProps = {
  copy: AccountCopy;
  form: ReminderFormState;
  isEditing: boolean;
  isSaving: boolean;
  petName: string;
  validationError: string | null;
  saveError: string | null;
  onCancel: () => void;
  onChange: <Field extends keyof ReminderFormState>(
    field: Field,
    value: ReminderFormState[Field],
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const fieldClassName =
  "mt-2 min-h-14 w-full rounded-lg border border-[#d9e0eb] bg-white px-4 text-base font-bold text-navy outline-none transition focus:border-[#1e6de8] focus:ring-2 focus:ring-[#dbeafe] disabled:cursor-not-allowed disabled:bg-[#f8fafc]";

export function CareReminderEditor({
  copy,
  form,
  isEditing,
  isSaving,
  petName,
  validationError,
  saveError,
  onCancel,
  onChange,
  onSubmit,
}: CareReminderEditorProps) {
  return (
    <section
      className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 xl:px-12"
      aria-labelledby="reminder-editor-title"
    >
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span
              className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center text-[#ff8a00]"
              aria-hidden="true"
            >
              <AppIcon name="bell" />
            </span>
            <div>
              <h1
                id="reminder-editor-title"
                className="font-serif text-[clamp(2.25rem,4vw,3.75rem)] font-black leading-[1.05] tracking-[0] text-navy"
              >
                {isEditing
                  ? copy.remindersFormTitleEdit
                  : copy.remindersFormTitleCreate}
              </h1>
              <p className="mt-4 text-base font-semibold leading-7 text-[#40547e] sm:text-lg">
                {formatPetCopy(copy.remindersCreateIntro, petName)}
              </p>
            </div>
          </div>
          <button
            className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-lg border border-[#d9e0eb] bg-white px-7 text-base font-black text-navy transition hover:bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#dbeafe]"
            type="button"
            onClick={onCancel}
          >
            {copy.remindersCancelAction}
          </button>
        </header>

        <div className="mt-9 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <form
            className="rounded-xl border border-[#dfe5ee] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-8"
            onSubmit={onSubmit}
          >
            <h2 className="font-serif text-[2rem] font-black tracking-[0] text-navy">
              {copy.remindersDetailsTitle}
            </h2>
            <div className="mt-8 grid gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
              <TextField
                label={copy.remindersTitleLabel}
                name="title"
                value={form.title}
                onChange={(value) => onChange("title", value)}
              />
              <SelectField
                label={copy.remindersTypeLabel}
                name="reminderType"
                value={form.reminderType}
                options={[
                  ["vaccination", copy.remindersTypeVaccination],
                  ["medication", copy.remindersTypeMedication],
                  ["deworming", copy.remindersTypeDeworming],
                  ["visit", copy.remindersTypeVisit],
                  ["other", copy.remindersTypeOther],
                ]}
                onChange={(value) =>
                  onChange("reminderType", value as ReminderType)
                }
              />
              <TextField
                label={copy.remindersDueDateLabel}
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={(value) => onChange("dueDate", value)}
              />
              <TextField
                label={copy.remindersTimeLabel}
                name="dueTime"
                type="time"
                value={form.dueTime}
                onChange={(value) => onChange("dueTime", value)}
              />
              <SelectField
                label={copy.remindersRepeatLabel}
                name="repeatFrequency"
                value={form.repeatFrequency}
                options={[
                  ["none", copy.remindersRepeatNone],
                  ["weekly", copy.remindersRepeatWeekly],
                  ["monthly", copy.remindersRepeatMonthly],
                  ["yearly", copy.remindersRepeatYearly],
                ]}
                onChange={(value) =>
                  onChange("repeatFrequency", value as ReminderRepeatFrequency)
                }
              />
              <SelectField
                label={copy.remindersAdvanceNoticeLabel}
                name="advanceNoticeDays"
                value={String(form.advanceNoticeDays)}
                options={[
                  ["0", copy.remindersAdvanceNone],
                  ["1", copy.remindersAdvanceOneDay],
                  ["2", copy.remindersAdvanceTwoDays],
                  ["7", copy.remindersAdvanceOneWeek],
                ]}
                onChange={(value) =>
                  onChange(
                    "advanceNoticeDays",
                    Number(value) as ReminderAdvanceNoticeDays,
                  )
                }
              />
            </div>

            <label
              className="mt-6 block text-base font-black text-navy"
              htmlFor="care-reminder-notes"
            >
              {copy.remindersNotesLabel}
              <textarea
                className={`${fieldClassName} min-h-32 resize-y py-4`}
                id="care-reminder-notes"
                name="notes"
                placeholder={copy.remindersNotesPlaceholder}
                value={form.notes}
                onChange={(event) => onChange("notes", event.target.value)}
              />
            </label>

            {validationError ? (
              <p className="mt-4 text-sm font-bold text-[#b42318]">
                {validationError}
              </p>
            ) : null}
            {saveError ? (
              <p className="mt-4 text-sm font-bold text-[#b42318]">
                {saveError}
              </p>
            ) : null}

            <button
              className="mt-6 inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-[#073382] px-7 text-base font-black text-white shadow-[0_12px_28px_rgba(7,51,130,0.2)] transition hover:bg-[#062b6d] focus:outline-none focus:ring-2 focus:ring-[#93c5fd] disabled:cursor-not-allowed disabled:bg-[#94a3b8]"
              disabled={isSaving}
              type="submit"
            >
              <span aria-hidden="true">
                <AppIcon name="check" />
              </span>
              {isSaving
                ? copy.remindersSavingAction
                : isEditing
                  ? copy.remindersUpdateAction
                  : copy.remindersCreateAction}
            </button>
          </form>

          <aside className="space-y-6">
            <InfoPanel
              icon="bell"
              iconTone="blue"
              title={copy.remindersPreviewTitle}
            >
              <div className="grid grid-cols-[48px_1fr] items-center gap-4 rounded-xl border border-[#dfe5ee] bg-white p-5">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0e8ff] text-[#7256b7]"
                  aria-hidden="true"
                >
                  <AppIcon name="document" />
                </span>
                <div className="min-w-0">
                  <strong className="block break-words text-lg font-black leading-7 text-navy">
                    {form.title || copy.remindersPreviewTitleFallback}
                  </strong>
                  <span className="mt-2 block text-base font-semibold text-[#5b6f99]">
                    {formatReminderDate(
                      form.dueDate,
                      form.dueTime,
                      copy.dashboardDateLocale,
                      copy.remindersPreviewDateFallback,
                    )}
                  </span>
                  <small className="mt-2 block text-sm font-semibold text-[#5b6f99]">
                    {formatRepeatSummary(copy, form)}
                  </small>
                </div>
              </div>
            </InfoPanel>

            <InfoPanel
              icon="document"
              iconTone="orange"
              title={copy.remindersCareContextTitle}
            >
              <dl className="space-y-5 text-sm">
                <ContextRow
                  label={copy.remindersCareContextSource}
                  value={copy.remindersCareContextManual}
                />
                <ContextRow
                  label={copy.remindersCareContextPet}
                  value={petName}
                />
                <ContextRow
                  label={copy.remindersCareContextStatus}
                  value={copy.remindersCareContextOwnerReviewed}
                />
                <ContextRow
                  label={copy.remindersCareContextNotification}
                  value={copy.remindersCareContextNotificationInactive}
                />
              </dl>
            </InfoPanel>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TextField({
  label,
  name,
  onChange,
  type = "text",
  value,
}: {
  label: string;
  name: keyof ReminderFormState;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label
      className="block text-base font-black text-navy"
      htmlFor={`care-reminder-${name}`}
    >
      {label}
      <input
        className={fieldClassName}
        id={`care-reminder-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  onChange,
  options,
  value,
}: {
  label: string;
  name: keyof ReminderFormState;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
  value: string;
}) {
  return (
    <label
      className="block text-base font-black text-navy"
      htmlFor={`care-reminder-${name}`}
    >
      {label}
      <select
        className={fieldClassName}
        id={`care-reminder-${name}`}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoPanel({
  children,
  icon,
  iconTone,
  title,
}: {
  children: ReactNode;
  icon: "bell" | "document";
  iconTone: "blue" | "orange";
  title: string;
}) {
  return (
    <section className="rounded-xl border border-[#dfe5ee] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="mb-6 flex items-center gap-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            iconTone === "blue"
              ? "bg-[#e9f2ff] text-[#1e6de8]"
              : "bg-[#fff0dc] text-[#d97706]"
          }`}
          aria-hidden="true"
        >
          <AppIcon name={icon} />
        </span>
        <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ContextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5">
      <dt className="font-black text-[#40547e]">{label}</dt>
      <dd className="text-right font-semibold text-[#5b6f99]">{value}</dd>
    </div>
  );
}

function formatReminderDate(
  dueDate: string,
  dueTime: string,
  locale: string,
  fallback: string,
) {
  if (!dueDate) return fallback;
  const date = new Date(`${dueDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return fallback;
  const formatted = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  return dueTime ? `${formatted} · ${dueTime}` : formatted;
}

function formatRepeatSummary(copy: AccountCopy, form: ReminderFormState) {
  const typeLabel =
    form.reminderType === "vaccination"
      ? copy.remindersTypeVaccination
      : form.reminderType === "medication"
        ? copy.remindersTypeMedication
        : form.reminderType === "deworming"
          ? copy.remindersTypeDeworming
          : form.reminderType === "visit"
            ? copy.remindersTypeVisit
            : copy.remindersTypeOther;
  const repeatLabel =
    form.repeatFrequency === "weekly"
      ? copy.remindersRepeatWeekly
      : form.repeatFrequency === "monthly"
        ? copy.remindersRepeatMonthly
        : form.repeatFrequency === "yearly"
          ? copy.remindersRepeatYearly
          : copy.remindersRepeatNone;
  return `${repeatLabel} · ${typeLabel}`;
}

function formatPetCopy(value: string, petName: string) {
  return value.replaceAll("{petName}", petName);
}
