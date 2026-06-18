import type { PetProfileResponse } from "@caniello/contracts";
import type { ReactNode } from "react";
import type { AccountCopy } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";
import type { AppSection } from "./AuthenticatedAppShell";

type DashboardCard = {
  eyebrow: string;
  title: string;
  body: string;
  status: string;
  icon: AppIconName;
  tone: string;
};

type DashboardRow = {
  label: string;
  value: string;
};

type ReturningOwnerDashboardProps = {
  copy: AccountCopy;
  pet: PetProfileResponse;
  onSectionRequest: (section: AppSection) => void;
};

export function ReturningOwnerDashboard({
  copy,
  pet,
  onSectionRequest,
}: ReturningOwnerDashboardProps) {
  const nextCards: DashboardCard[] = [
    {
      eyebrow: copy.dashboardNextVaccineEyebrow,
      title: copy.dashboardNextVaccineTitle,
      body: copy.dashboardNextVaccineBody,
      status: copy.dashboardPreviewOnly,
      icon: "shield",
      tone: "bg-[#eef5ff] text-[#2d6cdf]",
    },
    {
      eyebrow: copy.dashboardNextVisitEyebrow,
      title: copy.dashboardNextVisitTitle,
      body: copy.dashboardNextVisitBody,
      status: copy.dashboardPreviewOnly,
      icon: "clock",
      tone: "bg-[#f3edff] text-[#7651e6]",
    },
    {
      eyebrow: copy.dashboardNextMedicationEyebrow,
      title: copy.dashboardNextMedicationTitle,
      body: copy.dashboardNextMedicationBody,
      status: copy.dashboardPreviewOnly,
      icon: "bell",
      tone: "bg-[#fff3e5] text-[#d97706]",
    },
    {
      eyebrow: copy.dashboardNextDocumentEyebrow,
      title: copy.dashboardNextDocumentTitle,
      body: copy.dashboardNextDocumentBody,
      status: copy.dashboardPreviewOnly,
      icon: "document",
      tone: "bg-[#eaf6ef] text-[#27764d]",
    },
  ];
  const healthRows: DashboardRow[] = [
    {
      label: copy.dashboardHealthAge,
      value: formatAge(copy, pet.birthDate),
    },
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
  const documents: DashboardRow[] = [
    {
      label: copy.dashboardDocumentVaccination,
      value: copy.dashboardDocumentVaccinationMeta,
    },
    {
      label: copy.dashboardDocumentVisit,
      value: copy.dashboardDocumentVisitMeta,
    },
    {
      label: copy.dashboardDocumentOther,
      value: copy.dashboardDocumentOtherMeta,
    },
  ];
  const timeline = [
    copy.dashboardTimelineVaccine,
    copy.dashboardTimelineVisit,
    copy.dashboardTimelineReminder,
  ];

  return (
    <div className="mt-7 space-y-6">
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {nextCards.map((card) => (
            <article
              className="grid min-h-[116px] grid-cols-[52px_1fr] gap-4 rounded-lg border border-[#e6e9ef] bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)]"
              key={card.eyebrow}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${card.tone}`}
                aria-hidden="true"
              >
                <AppIcon name={card.icon} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.06em] text-navy/52">
                  {card.eyebrow}
                </p>
                <h3 className="mt-1 text-sm font-black leading-5 text-navy">
                  {card.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold leading-5 text-navy/58">
                    {card.body}
                  </p>
                  <span className="rounded-full bg-[#fff8ee] px-2 py-1 text-[10px] font-black text-[#b45b00]">
                    {card.status}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.92fr_0.94fr_1.06fr_1.08fr]">
        <DashboardPanel
          icon="shield"
          title={copy.dashboardHealthTitle}
          action={copy.dashboardHealthAction}
          onAction={() => onSectionRequest("pets")}
        >
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
            {healthRows.map((row) => (
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
        </DashboardPanel>

        <DashboardPanel
          icon="document"
          title={copy.dashboardDocumentsTitle}
          action={copy.dashboardDocumentsAction}
          onAction={() => onSectionRequest("documents")}
        >
          <div className="space-y-3">
            {documents.map((document) => (
              <div
                className="flex min-w-0 items-center gap-3 border-b border-[#edf0f4] pb-3 last:border-b-0 last:pb-0"
                key={document.label}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff1f1] text-[#d92d20]"
                  aria-hidden="true"
                >
                  <AppIcon name="document" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-xs font-black text-navy">
                    {document.label}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold text-navy/52">
                    {document.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel
          icon="clock"
          title={copy.dashboardTimelineTitle}
          action={copy.dashboardTimelineAction}
          onAction={() => onSectionRequest("timeline")}
        >
          <ol className="space-y-4">
            {timeline.map((event, index) => (
              <li className="grid grid-cols-[30px_1fr] gap-3" key={event}>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff3e5] text-xs font-black text-[#d97706]"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <p className="text-xs font-bold leading-5 text-navy/68">
                  {event}
                </p>
              </li>
            ))}
          </ol>
        </DashboardPanel>

        <DashboardAskPanel copy={copy} petName={pet.name} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <DashboardBanner
          title={copy.dashboardSharingTitle}
          body={copy.dashboardSharingBody}
          action={copy.dashboardSharingAction}
          icon="users"
          onAction={() => onSectionRequest("sharing")}
        />
        <DashboardBanner
          title={copy.dashboardTipTitle}
          body={copy.dashboardTipBody}
          icon="sun"
        />
      </div>

      <p className="text-xs font-semibold leading-5 text-navy/48">
        {copy.dashboardPreviewDisclosure}
      </p>
    </div>
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
}: {
  copy: AccountCopy;
  petName: string;
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
        {formatPetCopy(copy.dashboardAskBody, petName)}
      </p>
      <label className="mt-5 block">
        <span className="sr-only">{copy.dashboardAskAction}</span>
        <span className="flex min-h-11 items-center justify-between rounded-md border border-[#dce2ec] bg-white px-4 text-xs font-semibold text-navy/48">
          {formatPetCopy(copy.dashboardAskPlaceholder, petName)}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </label>
      <div className="mt-auto space-y-2 pt-5">
        {copy.dashboardAskSuggestions.map((suggestion) => (
          <button
            className="w-full rounded-md border border-[#eadfce] bg-white px-3 py-2 text-left text-xs font-bold leading-5 text-navy/58"
            disabled
            key={suggestion}
            type="button"
          >
            {formatPetCopy(suggestion, petName)}
          </button>
        ))}
      </div>
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
  action?: string;
  icon: AppIconName;
  onAction?: () => void;
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
      {action && onAction ? (
        <button
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-xs font-black text-navy hover:bg-[#f8fafc]"
          type="button"
          onClick={onAction}
        >
          {action}
        </button>
      ) : null}
    </section>
  );
}

function formatPetCopy(template: string, petName: string) {
  return template.replaceAll("{petName}", petName);
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
