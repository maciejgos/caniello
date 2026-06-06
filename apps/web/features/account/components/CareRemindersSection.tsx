"use client";

import type { ReminderResponse, RemindersApiResponse, ReminderType } from "@caniello/contracts";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";

type CareRemindersSectionProps = {
  copy: AccountCopy;
  onPetsRequest: () => void;
};

type ReminderFormState = {
  title: string;
  reminderType: ReminderType;
  dueDate: string;
  notes: string;
};

type ReminderFilter = "upcoming" | "completed" | "medication" | "vaccination" | "visit";

const emptyReminderForm: ReminderFormState = {
  title: "",
  reminderType: "vaccination",
  dueDate: "",
  notes: ""
};

export function CareRemindersSection({ copy, onPetsRequest }: CareRemindersSectionProps) {
  const [form, setForm] = useState<ReminderFormState>(emptyReminderForm);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReminderFilter>("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [completeError, setCompleteError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasPetProfile, setHasPetProfile] = useState(false);
  const [petName, setPetName] = useState("");
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadReminders() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/reminders");
        const body = (await response.json()) as RemindersApiResponse;

        if (!response.ok || !body.ok) {
          throw new Error(body.message || "Reminder load failed.");
        }

        if (!isMounted) return;
        setHasPetProfile(Boolean(body.pet));
        setPetName(body.pet?.name?.trim() || "");
        setReminders(body.reminders ?? []);
      } catch {
        if (isMounted) setLoadError(copy.remindersLoadError);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadReminders();

    return () => {
      isMounted = false;
    };
  }, [copy.remindersLoadError]);

  const filteredReminders = useMemo(() => filterReminders(reminders, filter), [filter, reminders]);
  const isFormLocked = isLoading || isSaving || !hasPetProfile;
  const displayPetName = petName || copy.remindersPetNameFallback;

  function updateField(field: keyof ReminderFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setValidationError(null);
    setSaveError(null);
  }

  async function submitReminder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError(null);
    setValidationError(null);

    if (!form.title.trim()) {
      setValidationError(copy.remindersValidationTitle);
      return;
    }

    if (!form.dueDate) {
      setValidationError(copy.remindersValidationDueDate);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/reminders", {
        method: editingReminderId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editingReminderId ? { id: editingReminderId } : {}),
          ...createPayloadFromForm(form)
        })
      });
      const body = (await response.json()) as RemindersApiResponse;

      if (!response.ok || !body.ok || !body.reminder) {
        throw new Error(body.message || "Reminder save failed.");
      }

      const savedReminder = body.reminder;
      setReminders((current) => upsertReminder(current, savedReminder));
      resetForm();
      setFilter(savedReminder.status === "completed" ? "completed" : "upcoming");
    } catch {
      setSaveError(copy.remindersSaveError);
    } finally {
      setIsSaving(false);
    }
  }

  async function completeReminder(reminder: ReminderResponse) {
    setCompleteError(null);
    setIsSaving(true);
    try {
      const response = await fetch("/api/reminders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reminder.id, action: "complete" })
      });
      const body = (await response.json()) as RemindersApiResponse;

      if (!response.ok || !body.ok || !body.reminder) {
        throw new Error(body.message || "Reminder completion failed.");
      }

      const completedReminder = body.reminder;
      setReminders((current) => upsertReminder(current, completedReminder));
      setFilter("completed");
    } catch {
      setCompleteError(copy.remindersCompleteError);
    } finally {
      setIsSaving(false);
    }
  }

  function editReminder(reminder: ReminderResponse) {
    setEditingReminderId(reminder.id);
    setForm({
      title: reminder.title,
      reminderType: reminder.reminderType,
      dueDate: reminder.dueDate,
      notes: reminder.notes ?? ""
    });
    setValidationError(null);
    setSaveError(null);
  }

  function resetForm() {
    setEditingReminderId(null);
    setForm(emptyReminderForm);
    setValidationError(null);
    setSaveError(null);
  }

  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="care-reminders-title">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex min-w-0 flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fff3e5] text-[#d97706]" aria-hidden="true">
              <AppIcon name="bell" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.remindersEyebrow}</p>
              <h1 id="care-reminders-title" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy">
                {formatPetCopy(copy.remindersTitle, displayPetName)}
              </h1>
              <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-navy/78">{copy.remindersIntro}</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm font-bold text-navy/66" role="status">
            {copy.remindersLoading}
          </p>
        ) : null}
        {loadError ? <p className="mt-6 text-sm font-bold text-[#b42318]">{loadError}</p> : null}

        {!isLoading && !hasPetProfile ? (
          <div className="mt-8 rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{copy.remindersPetRequiredTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-navy/66">{copy.remindersPetRequiredBody}</p>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white" type="button" onClick={onPetsRequest}>
              {copy.remindersPetRequiredAction}
            </button>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
          <div className="min-w-0">
            <ReminderTabs copy={copy} activeFilter={filter} reminders={reminders} onFilterChange={setFilter} />
            <div className="mt-4 rounded-lg border border-[#e6e9ef] bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              {filteredReminders.length > 0 ? (
                <ul className="space-y-3">
                  {filteredReminders.map((reminder) => (
                    <ReminderListItem
                      copy={copy}
                      isBusy={isSaving}
                      key={reminder.id}
                      onComplete={completeReminder}
                      onEdit={editReminder}
                      reminder={reminder}
                    />
                  ))}
                </ul>
              ) : (
                <div className="rounded-lg border border-dashed border-[#dce2ec] bg-[#f8fafc] p-5">
                  <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.remindersEmptyTitle}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{formatPetCopy(copy.remindersEmptyBody, displayPetName)}</p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <form className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" onSubmit={submitReminder}>
              <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{editingReminderId ? copy.remindersFormTitleEdit : copy.remindersFormTitleCreate}</h2>
              <div className="mt-5 space-y-4">
                <ReminderTextField
                  disabled={isFormLocked}
                  label={copy.remindersTitleLabel}
                  name="title"
                  onChange={(value) => updateField("title", value)}
                  placeholder={copy.remindersTitlePlaceholder}
                  required
                  value={form.title}
                />
                <ReminderTypeSelect
                  copy={copy}
                  disabled={isFormLocked}
                  onChange={(value) => updateField("reminderType", value)}
                  value={form.reminderType}
                />
                <ReminderTextField
                  disabled={isFormLocked}
                  label={copy.remindersDueDateLabel}
                  name="dueDate"
                  onChange={(value) => updateField("dueDate", value)}
                  required
                  type="date"
                  value={form.dueDate}
                />
                <ReminderTextareaField
                  disabled={isFormLocked}
                  label={copy.remindersNotesLabel}
                  name="notes"
                  onChange={(value) => updateField("notes", value)}
                  placeholder={copy.remindersNotesPlaceholder}
                  value={form.notes}
                />
              </div>

              {validationError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{validationError}</p> : null}
              {saveError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{saveError}</p> : null}
              {completeError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{completeError}</p> : null}

              <div className="mt-5 flex flex-col gap-3">
                <button className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#94a3b8]" disabled={isFormLocked} type="submit">
                  {isSaving ? copy.remindersSavingAction : editingReminderId ? copy.remindersUpdateAction : copy.remindersCreateAction}
                </button>
                {editingReminderId ? (
                  <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-5 text-sm font-black text-navy" type="button" onClick={resetForm}>
                    {copy.remindersCancelEditAction}
                  </button>
                ) : null}
              </div>
            </form>

            <div className="rounded-lg border border-[#f2d7ac] bg-[#fffaf2] p-5">
              <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.remindersPreferencesTitle}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.remindersPreferencesBody}</p>
              <button className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-[#e7cfa8] bg-white px-4 text-sm font-black text-navy/54" disabled type="button">
                {copy.remindersPreferencesDisabled}
              </button>
            </div>
          </aside>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.remindersPrivacyNote}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </section>
  );
}

function ReminderTabs({
  activeFilter,
  copy,
  reminders,
  onFilterChange
}: {
  activeFilter: ReminderFilter;
  copy: AccountCopy;
  reminders: ReminderResponse[];
  onFilterChange: (filter: ReminderFilter) => void;
}) {
  const tabs: Array<{ filter: ReminderFilter; label: string; count: number }> = [
    { filter: "upcoming", label: copy.remindersUpcomingTab, count: filterReminders(reminders, "upcoming").length },
    { filter: "completed", label: copy.remindersCompletedTab, count: filterReminders(reminders, "completed").length },
    { filter: "medication", label: copy.remindersMedicationTab, count: filterReminders(reminders, "medication").length },
    { filter: "vaccination", label: copy.remindersVaccinationTab, count: filterReminders(reminders, "vaccination").length },
    { filter: "visit", label: copy.remindersVisitTab, count: filterReminders(reminders, "visit").length }
  ];

  return (
    <div className="flex max-w-full gap-2 overflow-x-auto rounded-lg border border-[#e6e9ef] bg-[#f8fafc] p-1">
      {tabs.map((tab) => (
        <button
          aria-pressed={activeFilter === tab.filter}
          className={`min-h-10 shrink-0 rounded-md px-4 text-sm font-black transition ${activeFilter === tab.filter ? "bg-white text-navy shadow-[0_8px_18px_rgba(15,23,42,0.08)]" : "text-navy/62 hover:text-navy"}`}
          key={tab.filter}
          type="button"
          onClick={() => onFilterChange(tab.filter)}
        >
          {tab.label} <span className="ml-1 rounded-full bg-[#e8f0ff] px-2 py-0.5 text-xs text-[#1d4ed8]">{tab.count}</span>
        </button>
      ))}
    </div>
  );
}

function ReminderListItem({
  copy,
  isBusy,
  reminder,
  onComplete,
  onEdit
}: {
  copy: AccountCopy;
  isBusy: boolean;
  reminder: ReminderResponse;
  onComplete: (reminder: ReminderResponse) => void;
  onEdit: (reminder: ReminderResponse) => void;
}) {
  const isCompleted = reminder.status === "completed";

  return (
    <li className="grid gap-4 rounded-lg border border-[#e6e9ef] bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 text-base font-black leading-6 text-navy">{reminder.title}</h3>
          <span className="rounded-full bg-[#eef8ff] px-2.5 py-1 text-xs font-black text-[#0876a8]">{getReminderTypeLabel(copy, reminder.reminderType)}</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-black ${isCompleted ? "bg-[#ecfdf3] text-[#027a48]" : "bg-[#fff7ed] text-[#c2410c]"}`}>
            {getReminderStatusLabel(copy, reminder.status)}
          </span>
        </div>
        <p className="mt-2 text-sm font-bold text-navy/66">{reminder.dueDate}</p>
        {reminder.notes ? <p className="mt-2 text-sm leading-6 text-navy/62">{reminder.notes}</p> : null}
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <button className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-sm font-black text-navy disabled:cursor-not-allowed disabled:text-navy/36" disabled={isBusy} type="button" onClick={() => onEdit(reminder)}>
          {copy.remindersEditAction}
        </button>
        <button className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#c7ead9] bg-[#f0fdf4] px-4 text-sm font-black text-[#027a48] disabled:cursor-not-allowed disabled:text-[#027a48]/40" disabled={isBusy || isCompleted} type="button" onClick={() => onComplete(reminder)}>
          {copy.remindersMarkCompleteAction}
        </button>
      </div>
    </li>
  );
}

function ReminderTextField({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value
}: {
  disabled?: boolean;
  label: string;
  name: keyof ReminderFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`care-reminder-${name}`}>
      {label}
      <input
        className="mt-2 min-h-11 w-full rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#ccfbf1]"
        disabled={disabled}
        id={`care-reminder-${name}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function ReminderTypeSelect({
  copy,
  disabled,
  onChange,
  value
}: {
  copy: AccountCopy;
  disabled?: boolean;
  onChange: (value: ReminderType) => void;
  value: ReminderType;
}) {
  const options: ReminderType[] = ["vaccination", "medication", "deworming", "visit", "other"];

  return (
    <label className="block text-sm font-black text-navy" htmlFor="care-reminder-reminderType">
      {copy.remindersTypeLabel}
      <select
        className="mt-2 min-h-11 w-full rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#ccfbf1]"
        disabled={disabled}
        id="care-reminder-reminderType"
        name="reminderType"
        onChange={(event) => onChange(event.target.value as ReminderType)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {getReminderTypeLabel(copy, option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReminderTextareaField({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  value
}: {
  disabled?: boolean;
  label: string;
  name: keyof ReminderFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`care-reminder-${name}`}>
      {label}
      <textarea
        className="mt-2 min-h-24 w-full resize-y rounded-md border border-[#dce2ec] bg-white px-3 py-3 text-base font-semibold text-navy outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#ccfbf1]"
        disabled={disabled}
        id={`care-reminder-${name}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function filterReminders(reminders: ReminderResponse[], filter: ReminderFilter) {
  if (filter === "completed") return reminders.filter((reminder) => reminder.status === "completed");
  if (filter === "upcoming") return reminders.filter((reminder) => reminder.status !== "completed" && reminder.status !== "dismissed");

  return reminders.filter((reminder) => reminder.reminderType === filter);
}

function createPayloadFromForm(form: ReminderFormState) {
  return {
    title: form.title,
    reminderType: form.reminderType,
    dueDate: form.dueDate,
    notes: form.notes
  };
}

function upsertReminder(reminders: ReminderResponse[], nextReminder: ReminderResponse) {
  const exists = reminders.some((reminder) => reminder.id === nextReminder.id);
  const nextReminders = exists
    ? reminders.map((reminder) => (reminder.id === nextReminder.id ? nextReminder : reminder))
    : [...reminders, nextReminder];

  return nextReminders.sort((first, second) => first.dueDate.localeCompare(second.dueDate));
}

function getReminderTypeLabel(copy: AccountCopy, type: ReminderType) {
  if (type === "vaccination") return copy.remindersTypeVaccination;
  if (type === "medication") return copy.remindersTypeMedication;
  if (type === "deworming") return copy.remindersTypeDeworming;
  if (type === "visit") return copy.remindersTypeVisit;
  return copy.remindersTypeOther;
}

function getReminderStatusLabel(copy: AccountCopy, status: ReminderResponse["status"]) {
  if (status === "completed") return copy.remindersCompletedBadge;
  if (status === "suggested") return copy.remindersSuggestedBadge;
  if (status === "dismissed") return copy.remindersDismissedBadge;
  return copy.remindersActiveBadge;
}

function formatPetCopy(value: string, petName: string) {
  return value.replaceAll("{petName}", petName);
}
