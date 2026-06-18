import type {
  DocumentResponse,
  PetProfileResponse,
  ReminderResponse,
  ShareLinkResponse,
  TimelineEventResponse,
} from "@caniello/contracts";
import type { ReactNode } from "react";
import type { AccountCopy } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";
import type { AppSection } from "./AuthenticatedAppShell";
import type { DashboardData } from "./useDashboardData";

type ReturningOwnerDashboardProps = {
  copy: AccountCopy;
  data: DashboardData;
  hasLoadError: boolean;
  isLoading: boolean;
  pet: PetProfileResponse;
  onReload: () => void;
  onSectionRequest: (section: AppSection) => void;
};

export function ReturningOwnerDashboard({
  copy,
  data,
  hasLoadError,
  isLoading,
  pet,
  onReload,
  onSectionRequest,
}: ReturningOwnerDashboardProps) {
  const reminders = getUpcomingReminders(data.reminders);
  const documents = getRecentDocuments(data.documents);
  const timelineEvents = getRecentTimelineEvents(data.timelineEvents);
  const activeShareLink = getActiveShareLink(data.shareLinks);
  const tip = getDashboardTip(copy, pet, data);

  return (
    <div className="mt-7 space-y-6">
      {isLoading ? (
        <DashboardDataStatus body={copy.dashboardDataLoading} />
      ) : hasLoadError ? (
        <DashboardDataStatus
          action={copy.dashboardDataRetry}
          body={copy.dashboardDataLoadError}
          onAction={onReload}
          tone="error"
        />
      ) : null}

      <section aria-labelledby="dashboard-next-title">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2
            id="dashboard-next-title"
            className="font-serif text-2xl font-black tracking-[0] text-navy"
          >
            {copy.dashboardNextTitle}
          </h2>
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-black text-[#174c9f] hover:bg-[#f4f7fb]"
            type="button"
            onClick={() => onSectionRequest("reminders")}
          >
            {copy.dashboardViewReminders}
            <span aria-hidden="true">→</span>
          </button>
        </div>
        {isLoading || hasLoadError ? (
          <DashboardEmptyState body={copy.dashboardDataUnavailable} />
        ) : reminders.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reminders.map((reminder) => (
              <ReminderCard copy={copy} key={reminder.id} reminder={reminder} />
            ))}
          </div>
        ) : (
          <DashboardEmptyState
            action={copy.dashboardNextEmptyAction}
            body={copy.dashboardNextEmptyBody}
            onAction={() => onSectionRequest("reminders")}
          />
        )}
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.92fr_0.94fr_1.06fr_1.08fr]">
        <DashboardPanel
          icon="shield"
          title={copy.dashboardHealthTitle}
          action={copy.dashboardHealthAction}
          onAction={() => onSectionRequest("pets")}
        >
          <HealthSummary copy={copy} pet={pet} />
        </DashboardPanel>

        <DashboardPanel
          icon="document"
          title={copy.dashboardDocumentsTitle}
          action={copy.dashboardDocumentsAction}
          onAction={() => onSectionRequest("documents")}
        >
          {isLoading || hasLoadError ? (
            <DashboardPanelEmpty body={copy.dashboardDataUnavailable} />
          ) : documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((document) => (
                <DocumentRow
                  copy={copy}
                  document={document}
                  key={document.id}
                />
              ))}
            </div>
          ) : (
            <DashboardPanelEmpty body={copy.dashboardDocumentsEmpty} />
          )}
        </DashboardPanel>

        <DashboardPanel
          icon="clock"
          title={copy.dashboardTimelineTitle}
          action={copy.dashboardTimelineAction}
          onAction={() => onSectionRequest("timeline")}
        >
          {isLoading || hasLoadError ? (
            <DashboardPanelEmpty body={copy.dashboardDataUnavailable} />
          ) : timelineEvents.length > 0 ? (
            <ol className="space-y-4">
              {timelineEvents.map((event, index) => (
                <TimelineRow
                  copy={copy}
                  event={event}
                  index={index}
                  key={event.id}
                />
              ))}
            </ol>
          ) : (
            <DashboardPanelEmpty body={copy.dashboardTimelineEmpty} />
          )}
        </DashboardPanel>

        <DashboardAskPanel
          copy={copy}
          petName={pet.name}
          onRecordsRequest={() => onSectionRequest("documents")}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <DashboardBanner
          title={copy.dashboardSharingTitle}
          body={
            isLoading || hasLoadError
              ? copy.dashboardDataUnavailable
              : activeShareLink
                ? formatPetCopy(
                    copy.dashboardSharingActiveBody,
                    pet.name,
                  ).replace(
                    "{expiresAt}",
                    activeShareLink.expiresAt
                      ? formatDate(copy, activeShareLink.expiresAt)
                      : copy.dashboardSharingNoExpiry,
                  )
                : formatPetCopy(copy.dashboardSharingInactiveBody, pet.name)
          }
          action={copy.dashboardSharingAction}
          icon="users"
          onAction={() => onSectionRequest("sharing")}
        />
        <DashboardBanner
          title={copy.dashboardTipTitle}
          body={tip.body}
          action={tip.action}
          icon="sun"
          onAction={() => onSectionRequest(tip.section)}
        />
      </div>

      <p className="text-xs font-semibold leading-5 text-navy/48">
        {copy.dashboardLiveDisclosure}
      </p>
    </div>
  );
}

function ReminderCard({
  copy,
  reminder,
}: {
  copy: AccountCopy;
  reminder: ReminderResponse;
}) {
  const presentation = getReminderPresentation(copy, reminder);

  return (
    <article className="grid min-h-[116px] grid-cols-[52px_1fr] gap-4 rounded-lg border border-[#e6e9ef] bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${presentation.tone}`}
        aria-hidden="true"
      >
        <AppIcon name={presentation.icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-black uppercase tracking-[0.06em] text-navy/52">
          {presentation.type}
        </p>
        <h3 className="mt-1 text-sm font-black leading-5 text-navy">
          {reminder.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold leading-5 text-navy/58">
            {formatDate(copy, reminder.dueDate)}
          </p>
          <span className="rounded-full bg-[#fff8ee] px-2 py-1 text-[10px] font-black text-[#b45b00]">
            {reminder.status === "suggested"
              ? copy.dashboardReminderSuggested
              : copy.dashboardReminderActive}
          </span>
        </div>
      </div>
    </article>
  );
}

function HealthSummary({
  copy,
  pet,
}: {
  copy: AccountCopy;
  pet: PetProfileResponse;
}) {
  const rows = [
    { label: copy.dashboardHealthAge, value: formatAge(copy, pet.birthDate) },
    {
      label: copy.dashboardHealthWeight,
      value:
        pet.weightKg === null
          ? copy.dashboardValueMissing
          : `${pet.weightKg} kg`,
    },
    {
      label: copy.dashboardHealthAllergies,
      value: pet.allergies || copy.dashboardValueMissing,
    },
    {
      label: copy.dashboardHealthMicrochip,
      value: pet.microchipNumber || copy.dashboardValueMissing,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-3 border-b border-[#edf0f4] pb-4">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3e5] text-[#d97706]"
          aria-hidden="true"
        >
          <AppIcon name="paw" />
        </span>
        <div>
          <h3 className="font-serif text-lg font-black text-navy">
            {pet.name}
          </h3>
          <p className="mt-1 text-xs font-semibold text-navy/56">
            {copy.dashboardHealthBody}
          </p>
        </div>
      </div>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div
            className="flex items-start justify-between gap-3 text-xs"
            key={row.label}
          >
            <dt className="font-bold text-navy/56">{row.label}</dt>
            <dd className="max-w-[58%] text-right font-black text-navy">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function DocumentRow({
  copy,
  document,
}: {
  copy: AccountCopy;
  document: DocumentResponse;
}) {
  const metadata = [
    formatDate(copy, document.documentDate),
    document.providerName,
  ].filter((value): value is string => Boolean(value));

  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-[#edf0f4] pb-3 last:border-b-0 last:pb-0">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff1f1] text-[#d92d20]"
        aria-hidden="true"
      >
        <AppIcon name="document" />
      </span>
      <div className="min-w-0">
        <h3 className="truncate text-xs font-black text-navy">
          {document.title}
        </h3>
        <p className="mt-1 text-[11px] font-semibold text-navy/52">
          {metadata.join(" · ")}
        </p>
      </div>
    </div>
  );
}

function TimelineRow({
  copy,
  event,
  index,
}: {
  copy: AccountCopy;
  event: TimelineEventResponse;
  index: number;
}) {
  return (
    <li className="grid grid-cols-[30px_1fr] gap-3">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff3e5] text-xs font-black text-[#d97706]"
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <div>
        <p className="text-xs font-bold leading-5 text-navy/68">
          {event.title}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-navy/48">
          {formatDate(copy, event.eventDate)}
        </p>
      </div>
    </li>
  );
}

function DashboardPanel({
  icon,
  title,
  action,
  onAction,
  children,
}: {
  icon: AppIconName;
  title: string;
  action: string;
  onAction: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="flex min-h-[336px] flex-col rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)]"
      aria-label={title}
    >
      <div className="flex items-center gap-2">
        <span className="text-navy" aria-hidden="true">
          <AppIcon name={icon} />
        </span>
        <h2 className="font-serif text-lg font-black tracking-[0] text-navy">
          {title}
        </h2>
      </div>
      <div className="mt-4 flex-1">{children}</div>
      <button
        className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-xs font-black text-navy hover:bg-[#f8fafc]"
        type="button"
        onClick={onAction}
      >
        {action}
      </button>
    </section>
  );
}

function DashboardAskPanel({
  copy,
  petName,
  onRecordsRequest,
}: {
  copy: AccountCopy;
  petName: string;
  onRecordsRequest: () => void;
}) {
  return (
    <section
      className="flex min-h-[336px] flex-col rounded-lg border border-[#f0d9ba] bg-[#fffaf4] p-5 shadow-[0_12px_32px_rgba(88,54,20,0.05)]"
      aria-label={copy.dashboardAskTitle}
    >
      <div className="flex items-center gap-2">
        <span className="text-navy" aria-hidden="true">
          <AppIcon name="chat" />
        </span>
        <h2 className="font-serif text-lg font-black text-navy">
          {copy.dashboardAskTitle}
        </h2>
      </div>
      <p className="mt-4 text-sm font-semibold leading-6 text-navy/68">
        {formatPetCopy(copy.dashboardAskUnavailableBody, petName)}
      </p>
      <div className="mt-5 rounded-lg border border-dashed border-[#e2d4c1] bg-white/70 p-4 text-xs font-semibold leading-5 text-navy/58">
        {copy.dashboardAskBoundary}
      </div>
      <button
        className="mt-auto inline-flex min-h-10 w-full items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-xs font-black text-navy hover:bg-[#f8fafc]"
        type="button"
        onClick={onRecordsRequest}
      >
        {copy.dashboardAskRecordsAction}
      </button>
    </section>
  );
}

function DashboardBanner({
  title,
  body,
  action,
  icon,
  onAction,
}: {
  title: string;
  body: string;
  action: string;
  icon: AppIconName;
  onAction: () => void;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#f0d9ba] bg-[#fffaf4] px-5 py-4 shadow-[0_10px_28px_rgba(88,54,20,0.04)] sm:flex-row sm:items-center">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#d97706]"
        aria-hidden="true"
      >
        <AppIcon name={icon} />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="font-serif text-lg font-black text-navy">{title}</h2>
        <p className="mt-1 text-sm font-semibold leading-6 text-navy/64">
          {body}
        </p>
      </div>
      <button
        className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-xs font-black text-navy hover:bg-[#f8fafc]"
        type="button"
        onClick={onAction}
      >
        {action}
      </button>
    </section>
  );
}

function DashboardDataStatus({
  body,
  action,
  onAction,
  tone = "loading",
}: {
  body: string;
  action?: string;
  onAction?: () => void;
  tone?: "loading" | "error";
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm font-bold ${
        tone === "error"
          ? "border-[#f5c2c0] bg-[#fff4f3] text-[#9f2d26]"
          : "border-[#dce6f5] bg-[#f5f8fd] text-navy/68"
      }`}
      role="status"
    >
      <span>{body}</span>
      {action && onAction ? (
        <button
          className="min-h-9 rounded-md border border-current px-3 text-xs font-black"
          type="button"
          onClick={onAction}
        >
          {action}
        </button>
      ) : null}
    </div>
  );
}

function DashboardEmptyState({
  body,
  action,
  onAction,
}: {
  body: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[116px] flex-col items-start justify-center rounded-lg border border-dashed border-[#dce2ec] bg-[#f8fafc] p-5">
      <p className="text-sm font-semibold leading-6 text-navy/62">{body}</p>
      {action && onAction ? (
        <button
          className="mt-3 text-sm font-black text-[#174c9f]"
          type="button"
          onClick={onAction}
        >
          {action} →
        </button>
      ) : null}
    </div>
  );
}

function DashboardPanelEmpty({ body }: { body: string }) {
  return (
    <div className="flex min-h-[150px] items-center rounded-lg border border-dashed border-[#dce2ec] bg-[#f8fafc] p-4">
      <p className="text-xs font-semibold leading-5 text-navy/58">{body}</p>
    </div>
  );
}

function getUpcomingReminders(reminders: ReminderResponse[]) {
  return [...reminders]
    .filter(
      (reminder) =>
        reminder.status === "active" || reminder.status === "suggested",
    )
    .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
    .slice(0, 4);
}

function getRecentDocuments(documents: DocumentResponse[]) {
  return [...documents]
    .sort((left, right) => right.documentDate.localeCompare(left.documentDate))
    .slice(0, 3);
}

function getRecentTimelineEvents(events: TimelineEventResponse[]) {
  return [...events]
    .sort((left, right) => right.eventDate.localeCompare(left.eventDate))
    .slice(0, 3);
}

function getActiveShareLink(shareLinks: ShareLinkResponse[]) {
  const now = Date.now();
  return (
    shareLinks.find(
      (shareLink) =>
        shareLink.revokedAt === null &&
        (shareLink.expiresAt === null ||
          new Date(shareLink.expiresAt).getTime() > now),
    ) ?? null
  );
}

function getDashboardTip(
  copy: AccountCopy,
  pet: PetProfileResponse,
  data: DashboardData,
): { body: string; action: string; section: AppSection } {
  if (
    !pet.birthDate ||
    pet.weightKg === null ||
    !pet.allergies ||
    !pet.microchipNumber
  ) {
    return {
      body: copy.dashboardTipProfileBody,
      action: copy.dashboardTipProfileAction,
      section: "pets",
    };
  }
  if (getUpcomingReminders(data.reminders).length === 0) {
    return {
      body: copy.dashboardTipReminderBody,
      action: copy.dashboardTipReminderAction,
      section: "reminders",
    };
  }
  if (data.documents.length === 0) {
    return {
      body: copy.dashboardTipDocumentBody,
      action: copy.dashboardTipDocumentAction,
      section: "documents",
    };
  }
  return {
    body: copy.dashboardTipReadyBody,
    action: copy.dashboardTipReadyAction,
    section: "timeline",
  };
}

function getReminderPresentation(
  copy: AccountCopy,
  reminder: ReminderResponse,
): {
  type: string;
  icon: AppIconName;
  tone: string;
} {
  if (reminder.reminderType === "vaccination") {
    return {
      type: copy.remindersTypeVaccination,
      icon: "shield",
      tone: "bg-[#eef5ff] text-[#2d6cdf]",
    };
  }
  if (reminder.reminderType === "visit") {
    return {
      type: copy.remindersTypeVisit,
      icon: "clock",
      tone: "bg-[#f3edff] text-[#7651e6]",
    };
  }
  if (reminder.reminderType === "medication") {
    return {
      type: copy.remindersTypeMedication,
      icon: "bell",
      tone: "bg-[#fff3e5] text-[#d97706]",
    };
  }
  return {
    type:
      reminder.reminderType === "deworming"
        ? copy.remindersTypeDeworming
        : copy.remindersTypeOther,
    icon: "bell",
    tone: "bg-[#eaf6ef] text-[#27764d]",
  };
}

function formatPetCopy(template: string, petName: string) {
  return template.replaceAll("{petName}", petName);
}

function formatDate(copy: AccountCopy, value: string) {
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(copy.dashboardDateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatAge(copy: AccountCopy, birthDate: string | null) {
  if (!birthDate) return copy.dashboardValueMissing;

  const birth = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return copy.dashboardValueMissing;

  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());
  if (beforeBirthday) years -= 1;
  if (years < 0) return copy.dashboardValueMissing;

  return `${years} ${copy.dashboardPetAgeUnit}`;
}
