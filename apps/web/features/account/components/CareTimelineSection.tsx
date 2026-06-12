"use client";

import type { TimelineEventResponse, TimelineEventsApiResponse, TimelineEventType } from "@caniello/contracts";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";

type CareTimelineSectionProps = {
  copy: AccountCopy;
  onPetsRequest: () => void;
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

export function CareTimelineSection({ copy, onPetsRequest }: CareTimelineSectionProps) {
  const [form, setForm] = useState<TimelineFormState>(emptyTimelineForm);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasPetProfile, setHasPetProfile] = useState(false);
  const [petName, setPetName] = useState("");
  const [events, setEvents] = useState<TimelineEventResponse[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadTimeline() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/timeline-events");
        const body = (await response.json()) as TimelineEventsApiResponse;

        if (!response.ok || !body.ok) {
          throw new Error(body.message || "Timeline load failed.");
        }

        if (!isMounted) return;
        setHasPetProfile(Boolean(body.pet));
        setPetName(body.pet?.name?.trim() || "");
        setEvents(body.events ?? []);
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
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="care-timeline-title">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fff4e6] text-[#9a5b00]" aria-hidden="true">
            <AppIcon name="clock" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.timelineEyebrow}</p>
            <h1 id="care-timeline-title" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy">
              {formatPetCopy(copy.timelineTitle, displayPetName)}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-navy/78">{copy.timelineIntro}</p>
          </div>
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

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 rounded-lg border border-[#e6e9ef] bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            {sortedEvents.length > 0 ? (
              <ol className="space-y-3">
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
            <form className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" onSubmit={submitTimelineEvent}>
              <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{editingEventId ? copy.timelineFormTitleEdit : copy.timelineFormTitleCreate}</h2>
              <div className="mt-5 space-y-4">
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

              <div className="mt-5 flex flex-col gap-3">
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

            <div className="rounded-lg border border-[#f2d7a8] bg-[#fffaf0] p-5">
              <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.timelineAutomationTitle}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.timelineAutomationBody}</p>
              <button className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-[#edcd94] bg-white px-4 text-sm font-black text-navy/54" disabled type="button">
                {copy.timelineAutomationAction}
              </button>
            </div>
          </aside>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.timelinePrivacyNote}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
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
      className="grid gap-4 rounded-lg border border-[#e6e9ef] bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center"
      data-testid="care-timeline-row"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 text-base font-black leading-6 text-navy">{event.title}</h3>
          <span className="rounded-full bg-[#fff4e6] px-2.5 py-1 text-xs font-black text-[#9a5b00]">{getTimelineTypeLabel(copy, event.eventType)}</span>
          <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-xs font-black text-navy/62">{copy.timelineManualBadge}</span>
        </div>
        <p className="mt-2 text-sm font-bold text-navy/66">{event.eventDate}</p>
        {event.notes ? <p className="mt-2 text-sm leading-6 text-navy/62">{event.notes}</p> : null}
      </div>
      <button
        className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-sm font-black text-navy disabled:cursor-not-allowed disabled:text-navy/36"
        data-testid="care-timeline-edit"
        disabled={isBusy}
        type="button"
        onClick={() => onEdit(event)}
      >
        {copy.timelineEditAction}
      </button>
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

function formatPetCopy(template: string, petName: string) {
  return template.replace("{petName}", petName);
}
