"use client";

import type { PetProfileResponse, ReminderResponse, RemindersApiResponse, TimelineEventResponse, TimelineEventsApiResponse, TimelineEventType } from "@caniello/contracts";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AccountCopy } from "../content";
import brunoImage from "../../marketing/assets/caniello-bruno-app-hero.png";
import { AppIcon } from "./AppIcon";

type CareTimelineSectionProps = {
  copy: AccountCopy;
  onPetsRequest: () => void;
  onRemindersRequest: () => void;
};

type TimelineFormState = {
  title: string;
  eventType: TimelineEventType;
  eventDate: string;
  notes: string;
};

const emptyTimelineForm: TimelineFormState = {
  title: "",
  eventType: "visit",
  eventDate: "",
  notes: ""
};

export function CareTimelineSection({ copy, onPetsRequest, onRemindersRequest }: CareTimelineSectionProps) {
  const [form, setForm] = useState<TimelineFormState>(emptyTimelineForm);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasPetProfile, setHasPetProfile] = useState(false);
  const [petName, setPetName] = useState("");
  const [petProfile, setPetProfile] = useState<PetProfileResponse | null>(null);
  const [events, setEvents] = useState<TimelineEventResponse[]>([]);
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadTimeline() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const [timelineResponse, remindersResponse] = await Promise.all([
          fetch("/api/timeline-events"),
          fetch("/api/reminders")
        ]);
        const timelineBody = (await timelineResponse.json()) as TimelineEventsApiResponse;
        const remindersBody = (await remindersResponse.json()) as RemindersApiResponse;

        if (!timelineResponse.ok || !timelineBody.ok) {
          throw new Error(timelineBody.message || "Timeline load failed.");
        }

        if (!remindersResponse.ok || !remindersBody.ok) {
          throw new Error(remindersBody.message || "Reminder load failed.");
        }

        if (!isMounted) return;
        const pet = timelineBody.pet ?? remindersBody.pet ?? null;
        setHasPetProfile(Boolean(pet));
        setPetName(pet?.name?.trim() || "");
        setPetProfile(pet);
        setEvents(timelineBody.events ?? []);
        setReminders(remindersBody.reminders ?? []);
      } catch {
        if (isMounted) setLoadError(copy.timelineLoadError);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadTimeline();

    return () => {
      isMounted = false;
    };
  }, [copy.timelineLoadError]);

  const sortedEvents = useMemo(
    () => [...events].sort((first, second) => second.eventDate.localeCompare(first.eventDate) || second.createdAt.localeCompare(first.createdAt)),
    [events]
  );
  const activeReminders = useMemo(() => getActiveReminders(reminders), [reminders]);
  const nextReminder = activeReminders[0] ?? null;
  const summaryItems = useMemo(() => getTimelineSummaryItems(copy, events), [copy, events]);
  const isFormLocked = isLoading || isSaving || !hasPetProfile;
  const displayPetName = petName || copy.timelinePetNameFallback;

  function updateField(field: keyof TimelineFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setValidationError(null);
    setSaveError(null);
  }

  async function submitTimelineEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError(null);
    setValidationError(null);

    if (!form.title.trim()) {
      setValidationError(copy.timelineValidationTitle);
      return;
    }

    if (!form.eventDate) {
      setValidationError(copy.timelineValidationDate);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/timeline-events", {
        method: editingEventId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editingEventId ? { id: editingEventId } : {}),
          ...createPayloadFromForm(form)
        })
      });
      const body = (await response.json()) as TimelineEventsApiResponse;

      if (!response.ok || !body.ok || !body.event) {
        throw new Error(body.message || "Timeline save failed.");
      }

      setEvents((current) => upsertTimelineEvent(current, body.event as TimelineEventResponse));
      resetForm();
    } catch {
      setSaveError(copy.timelineSaveError);
    } finally {
      setIsSaving(false);
    }
  }

  function editTimelineEvent(event: TimelineEventResponse) {
    setEditingEventId(event.id);
    setForm({
      title: event.title,
      eventType: event.eventType,
      eventDate: event.eventDate,
      notes: event.notes ?? ""
    });
    setValidationError(null);
    setSaveError(null);
  }

  function resetForm() {
    setEditingEventId(null);
    setForm(emptyTimelineForm);
    setValidationError(null);
    setSaveError(null);
  }

  return (
    <section className="min-w-0 bg-[#fdfcf9] px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-14" aria-labelledby="care-timeline-title">
      <div className="mx-auto max-w-[1328px]">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_410px] xl:items-start">
          <div className="flex min-w-0 items-start gap-5">
            <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#d8e3f8] bg-[#eef5ff] text-[#1e5bb8]" aria-hidden="true">
            <AppIcon name="clock" />
            </span>
            <div className="min-w-0 pt-1">
              <h1 id="care-timeline-title" className="font-serif text-[clamp(2.2rem,3.1vw,3.05rem)] font-black leading-none tracking-[0] text-navy">
              {formatPetCopy(copy.timelineTitle, displayPetName)}
              </h1>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-6 text-navy/70">{formatPetCopy(copy.timelineIntro, displayPetName)}</p>
            </div>
          </div>
          <TimelinePetCard copy={copy} pet={petProfile} petName={displayPetName} />
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm font-bold text-navy/66" role="status">
            {copy.timelineLoading}
          </p>
        ) : null}
        {loadError ? <p className="mt-6 text-sm font-bold text-[#b42318]">{loadError}</p> : null}

        {!isLoading && !hasPetProfile ? (
          <div className="mt-8 rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{copy.timelinePetRequiredTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-navy/66">{copy.timelinePetRequiredBody}</p>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white" type="button" onClick={onPetsRequest}>
              {copy.timelinePetRequiredAction}
            </button>
          </div>
        ) : null}

        <div className="mt-8 flex max-w-full flex-col gap-3 rounded-lg border border-[#e6e9ef] bg-white p-3 shadow-[0_14px_40px_rgba(15,23,42,0.04)] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-full gap-2 overflow-x-auto">
            <TimelineFilterPill active>{copy.timelineFilterAll}</TimelineFilterPill>
            <TimelineFilterPill>{copy.timelineFilterVaccines}</TimelineFilterPill>
            <TimelineFilterPill>{copy.timelineFilterVisits}</TimelineFilterPill>
            <TimelineFilterPill>{copy.timelineFilterMedication}</TimelineFilterPill>
            <TimelineFilterPill>{copy.timelineFilterLabResults}</TimelineFilterPill>
            <TimelineFilterPill>{copy.timelineFilterDocuments}</TimelineFilterPill>
          </div>
          <button className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-sm font-black text-navy/78 disabled:text-navy/42" disabled type="button">
            {copy.timelineExportAction}
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 rounded-lg border border-[#e6e9ef] bg-white px-4 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:px-5">
            {sortedEvents.length > 0 ? (
              <ol className="relative">
                {sortedEvents.map((event) => (
                  <TimelineEventListItem copy={copy} event={event} isBusy={isSaving} key={event.id} onEdit={editTimelineEvent} />
                ))}
              </ol>
            ) : (
              <div className="rounded-lg border border-dashed border-[#dce2ec] bg-[#f8fafc] p-5">
                <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.timelineEmptyTitle}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{formatPetCopy(copy.timelineEmptyBody, displayPetName)}</p>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <TimelineSummaryPanel copy={copy} items={summaryItems} totalEvents={events.length} />
            <NextUpcomingPanel copy={copy} isLoading={isLoading} nextReminder={nextReminder} onRemindersRequest={onRemindersRequest} />

            <div className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)]">
              <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.timelineAutomationTitle}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.timelineAutomationBody}</p>
              <button className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-sm font-black text-navy/54" disabled type="button">
                {copy.timelineAutomationAction}
              </button>
            </div>
          </aside>
        </div>

        <form className="mt-6 rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)]" onSubmit={submitTimelineEvent}>
          <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{editingEventId ? copy.timelineFormTitleEdit : copy.timelineFormTitleCreate}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <TimelineTextField
              disabled={isFormLocked}
              label={copy.timelineTitleLabel}
              name="title"
              onChange={(value) => updateField("title", value)}
              placeholder={copy.timelineTitlePlaceholder}
              required
              value={form.title}
            />
            <TimelineTypeSelect copy={copy} disabled={isFormLocked} onChange={(value) => updateField("eventType", value)} value={form.eventType} />
            <TimelineTextField
              disabled={isFormLocked}
              label={copy.timelineDateLabel}
              name="eventDate"
              onChange={(value) => updateField("eventDate", value)}
              required
              type="date"
              value={form.eventDate}
            />
            <TimelineTextareaField
              disabled={isFormLocked}
              label={copy.timelineNotesLabel}
              name="notes"
              onChange={(value) => updateField("notes", value)}
              placeholder={copy.timelineNotesPlaceholder}
              value={form.notes}
            />
          </div>

          {validationError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{validationError}</p> : null}
          {saveError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{saveError}</p> : null}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#94a3b8]" disabled={isFormLocked} type="submit">
              {isSaving ? copy.timelineSavingAction : editingEventId ? copy.timelineUpdateAction : copy.timelineCreateAction}
            </button>
            {editingEventId ? (
              <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-5 text-sm font-black text-navy" type="button" onClick={resetForm}>
                {copy.timelineCancelEditAction}
              </button>
            ) : null}
          </div>
        </form>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.timelinePrivacyNote}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </section>
  );
}

function TimelinePetCard({ copy, pet, petName }: { copy: AccountCopy; pet: PetProfileResponse | null; petName: string }) {
  const details = [
    pet?.breed,
    pet?.birthDate ? formatPetAge(pet.birthDate, copy.timelinePetAgeFallback) : null,
    pet?.sexOrGender,
    pet?.weightKg ? `${pet.weightKg} kg` : null
  ].filter(Boolean);

  return (
    <aside className="rounded-lg border border-[#e6e9ef] bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.04)]" aria-label={copy.timelinePetCardLabel}>
      <div className="flex items-center gap-4">
        <img
          className="h-16 w-16 shrink-0 rounded-full border border-[#ffe2b8] bg-[#ffe2b8] object-cover object-[82%_32%]"
          src={typeof brunoImage === "string" ? brunoImage : brunoImage.src}
          alt=""
        />
        <div className="min-w-0">
          <h2 className="font-serif text-2xl font-black leading-tight tracking-[0] text-navy">{petName}</h2>
          <p className="mt-1 text-sm font-semibold leading-5 text-navy/64">{details.length > 0 ? details.join(" • ") : copy.timelinePetCardFallback}</p>
        </div>
        <span className="ml-auto text-2xl font-light text-navy/40" aria-hidden="true">›</span>
      </div>
    </aside>
  );
}

function TimelineFilterPill({ active = false, children }: { active?: boolean; children: string }) {
  return (
    <button
      aria-pressed={active}
      className={`min-h-10 shrink-0 rounded-md px-5 text-sm font-black transition ${active ? "bg-[#eaf2ff] text-navy" : "bg-white text-navy/68 hover:bg-[#f8fafc] hover:text-navy"}`}
      type="button"
    >
      {children}
    </button>
  );
}

function TimelineSummaryPanel({ copy, items, totalEvents }: { copy: AccountCopy; items: Array<{ label: string; value: number; tone: string }>; totalEvents: number }) {
  return (
    <section className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)]" aria-labelledby="timeline-summary-title">
      <h2 id="timeline-summary-title" className="font-serif text-xl font-black tracking-[0] text-navy">{copy.timelineSummaryTitle}</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <SummaryTile label={copy.timelineSummaryTotalEvents} tone="blue" value={totalEvents} />
        {items.map((item) => (
          <SummaryTile key={item.label} label={item.label} tone={item.tone} value={item.value} />
        ))}
      </div>
    </section>
  );
}

function SummaryTile({ label, tone, value }: { label: string; tone: string; value: number }) {
  const toneClass = tone === "purple" ? "bg-[#f3e8ff] text-[#7e22ce]" : tone === "orange" ? "bg-[#fff7ed] text-[#c2410c]" : tone === "red" ? "bg-[#fee2e2] text-[#b42318]" : "bg-[#eaf2ff] text-[#1d4ed8]";

  return (
    <div className="grid min-h-[82px] grid-cols-[40px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-[#e6e9ef] bg-[#fbfdff] p-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneClass}`} aria-hidden="true">
        <AppIcon name="document" />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-black leading-none text-navy">{value}</p>
        <p className="mt-1 text-xs font-bold leading-4 text-navy/62">{label}</p>
      </div>
    </div>
  );
}

function NextUpcomingPanel({
  copy,
  isLoading,
  nextReminder,
  onRemindersRequest
}: {
  copy: AccountCopy;
  isLoading: boolean;
  nextReminder: ReminderResponse | null;
  onRemindersRequest: () => void;
}) {
  return (
    <section className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)]" aria-labelledby="timeline-next-upcoming-title">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff7ed] text-[#ea580c]" aria-hidden="true">
          <AppIcon name="bell" />
        </span>
        <h2 id="timeline-next-upcoming-title" className="font-serif text-xl font-black tracking-[0] text-navy">{copy.timelineNextUpcomingTitle}</h2>
      </div>
      {isLoading ? (
        <p className="mt-4 text-sm font-bold text-navy/66">{copy.timelineNextUpcomingLoading}</p>
      ) : nextReminder ? (
        <div className="mt-4 rounded-lg border border-[#e6e9ef] bg-[#fbfdff] p-4">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1d4ed8]" aria-hidden="true">
              <AppIcon name="bell" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-black leading-5 text-navy">{nextReminder.title}</h3>
              <p className="mt-2 text-xs font-bold text-navy/62">{nextReminder.dueDate}</p>
            </div>
            <span className="shrink-0 rounded-md bg-[#eef2ff] px-2.5 py-1 text-xs font-black text-[#3730a3]">{getReminderTypeLabel(copy, nextReminder.reminderType)}</span>
          </div>
          {nextReminder.notes ? <p className="mt-3 text-sm leading-6 text-navy/62">{nextReminder.notes}</p> : null}
        </div>
      ) : (
        <p className="mt-4 rounded-lg border border-dashed border-[#dce2ec] bg-[#f8fafc] p-4 text-sm font-semibold leading-6 text-navy/66">{copy.timelineNextUpcomingEmpty}</p>
      )}
      <button className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-sm font-black text-navy" type="button" onClick={onRemindersRequest}>
        {copy.timelineNextUpcomingAction}
      </button>
    </section>
  );
}

function TimelineEventListItem({
  copy,
  event,
  isBusy,
  onEdit
}: {
  copy: AccountCopy;
  event: TimelineEventResponse;
  isBusy: boolean;
  onEdit: (event: TimelineEventResponse) => void;
}) {
  return (
    <li
      className="relative grid gap-4 border-b border-[#e6e9ef] py-5 last:border-b-0 sm:grid-cols-[145px_36px_minmax(0,1fr)_auto] sm:items-center"
      data-testid="care-timeline-row"
    >
      <div className="text-sm font-bold leading-6 text-navy/78">
        <p className="font-black text-navy">{event.eventDate}</p>
        <p className="text-navy/56">{copy.timelineDefaultTime}</p>
      </div>
      <div className="relative hidden h-full min-h-20 items-center justify-center sm:flex">
        <span className="absolute inset-y-[-1.25rem] left-1/2 w-px -translate-x-1/2 bg-[#dbe4f0]" aria-hidden="true" />
        <span className="relative z-10 h-3 w-3 rounded-full border-2 border-white bg-[#0f3472] shadow-[0_0_0_1px_#0f3472]" aria-hidden="true" />
      </div>
      <div className="min-w-0 sm:grid sm:grid-cols-[54px_minmax(0,1fr)] sm:gap-4">
        <span className={`mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mb-0 ${getTimelineIconTone(event.eventType)}`} aria-hidden="true">
          <AppIcon name={event.eventType === "visit" ? "paw" : event.eventType === "medication" ? "bell" : "document"} />
        </span>
        <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 font-serif text-lg font-black leading-6 tracking-[0] text-navy">{event.title}</h3>
        </div>
        {event.notes ? <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{event.notes}</p> : null}
        <p className="mt-2 text-xs font-bold leading-5 text-navy/58">{copy.timelineProviderPrefix} {copy.timelineProviderFallback}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:justify-end">
        <span className={`rounded-md px-3 py-1 text-xs font-black ${getTimelineStatusTone(event.eventType)}`}>{getTimelineStatusLabel(copy, event.eventType)}</span>
      <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent bg-white text-2xl font-light text-navy/54 disabled:cursor-not-allowed disabled:text-navy/30"
        data-testid="care-timeline-edit"
          aria-label={`${copy.timelineEditAction}: ${event.title}`}
        disabled={isBusy}
        type="button"
        onClick={() => onEdit(event)}
      >
          ›
      </button>
      </div>
    </li>
  );
}

function TimelineTextField({
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
  name: keyof TimelineFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`care-timeline-field-${name}`}>
      {label}
      <input
        className="mt-2 min-h-11 w-full rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#9a5b00] focus:ring-2 focus:ring-[#fff0d1]"
        disabled={disabled}
        id={`care-timeline-field-${name}`}
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

function TimelineTypeSelect({
  copy,
  disabled,
  onChange,
  value
}: {
  copy: AccountCopy;
  disabled?: boolean;
  onChange: (value: TimelineEventType) => void;
  value: TimelineEventType;
}) {
  const options: TimelineEventType[] = ["vaccination", "medication", "deworming", "visit", "document", "note", "other"];

  return (
    <label className="block text-sm font-black text-navy" htmlFor="care-timeline-eventType">
      {copy.timelineTypeLabel}
      <select
        className="mt-2 min-h-11 w-full rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#9a5b00] focus:ring-2 focus:ring-[#fff0d1]"
        disabled={disabled}
        id="care-timeline-eventType"
        name="eventType"
        onChange={(event) => onChange(event.target.value as TimelineEventType)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {getTimelineTypeLabel(copy, option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function TimelineTextareaField({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  value
}: {
  disabled?: boolean;
  label: string;
  name: keyof TimelineFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`care-timeline-field-${name}`}>
      {label}
      <textarea
        className="mt-2 min-h-24 w-full resize-y rounded-md border border-[#dce2ec] bg-white px-3 py-3 text-base font-semibold text-navy outline-none transition focus:border-[#9a5b00] focus:ring-2 focus:ring-[#fff0d1]"
        disabled={disabled}
        id={`care-timeline-field-${name}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function createPayloadFromForm(form: TimelineFormState) {
  return {
    title: form.title,
    eventType: form.eventType,
    eventDate: form.eventDate,
    notes: form.notes
  };
}

function upsertTimelineEvent(events: TimelineEventResponse[], nextEvent: TimelineEventResponse) {
  const exists = events.some((event) => event.id === nextEvent.id);
  const nextEvents = exists
    ? events.map((event) => (event.id === nextEvent.id ? nextEvent : event))
    : [...events, nextEvent];

  return nextEvents.sort((first, second) => second.eventDate.localeCompare(first.eventDate) || second.createdAt.localeCompare(first.createdAt));
}

function getTimelineTypeLabel(copy: AccountCopy, type: TimelineEventType) {
  if (type === "vaccination") return copy.timelineTypeVaccination;
  if (type === "medication") return copy.timelineTypeMedication;
  if (type === "deworming") return copy.timelineTypeDeworming;
  if (type === "visit") return copy.timelineTypeVisit;
  if (type === "document") return copy.timelineTypeDocument;
  if (type === "note") return copy.timelineTypeNote;
  return copy.timelineTypeOther;
}

function getTimelineStatusLabel(copy: AccountCopy, type: TimelineEventType) {
  if (type === "document") return copy.timelineStatusUploaded;
  if (type === "note" || type === "other") return copy.timelineStatusNormal;
  return copy.timelineStatusCompleted;
}

function getTimelineStatusTone(type: TimelineEventType) {
  if (type === "document") return "bg-[#eaf2ff] text-[#1d4ed8]";
  if (type === "note" || type === "other") return "bg-[#eef8f1] text-[#2b7a3f]";
  return "bg-[#eaf8e9] text-[#2b7a3f]";
}

function getTimelineIconTone(type: TimelineEventType) {
  if (type === "vaccination") return "bg-[#f1e8ff] text-[#7e22ce]";
  if (type === "visit") return "bg-[#f1e8ff] text-[#7e22ce]";
  if (type === "medication") return "bg-[#fff3df] text-[#c46a16]";
  if (type === "document") return "bg-[#fee8e8] text-[#d92d20]";
  return "bg-[#eaf2ff] text-[#1d4ed8]";
}

function getReminderTypeLabel(copy: AccountCopy, type: ReminderResponse["reminderType"]) {
  if (type === "vaccination") return copy.remindersTypeVaccination;
  if (type === "medication") return copy.remindersTypeMedication;
  if (type === "deworming") return copy.remindersTypeDeworming;
  if (type === "visit") return copy.remindersTypeVisit;
  return copy.remindersTypeOther;
}

function getActiveReminders(reminders: ReminderResponse[]) {
  return [...reminders]
    .filter((reminder) => reminder.status !== "completed" && reminder.status !== "dismissed")
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate) || first.createdAt.localeCompare(second.createdAt));
}

function getTimelineSummaryItems(copy: AccountCopy, events: TimelineEventResponse[]) {
  return [
    { label: copy.timelineSummaryVisits, value: events.filter((event) => event.eventType === "visit").length, tone: "purple" },
    { label: copy.timelineSummaryVaccines, value: events.filter((event) => event.eventType === "vaccination").length, tone: "purple" },
    { label: copy.timelineSummaryMedications, value: events.filter((event) => event.eventType === "medication").length, tone: "orange" },
    { label: copy.timelineSummaryDocuments, value: events.filter((event) => event.eventType === "document").length, tone: "red" }
  ];
}

function formatPetCopy(template: string, petName: string) {
  return template.replace("{petName}", petName);
}

function formatPetAge(birthDate: string, fallback: string) {
  const birthYear = Number(birthDate.slice(0, 4));
  if (!Number.isFinite(birthYear)) return fallback;
  const age = Math.max(0, new Date().getFullYear() - birthYear);
  return `${age} ${fallback}`;
}
