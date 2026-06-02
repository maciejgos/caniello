import type { ReactNode } from "react";
import type { AccountCopy } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";

type DashboardCard = {
  title: string;
  body: string;
  icon: AppIconName;
  tone: string;
};

type DashboardRow = {
  label: string;
  value: string;
};

export function ReturningOwnerDashboard({ copy }: { copy: AccountCopy }) {
  const nextCards: DashboardCard[] = [
    { title: copy.dashboardNextVaccineTitle, body: copy.dashboardNextVaccineBody, icon: "shield", tone: "bg-[#fff3e5] text-[#d97706]" },
    { title: copy.dashboardNextVisitTitle, body: copy.dashboardNextVisitBody, icon: "clock", tone: "bg-[#eef2ff] text-[#7651e6]" },
    { title: copy.dashboardNextMedicationTitle, body: copy.dashboardNextMedicationBody, icon: "bell", tone: "bg-[#e8f8f0] text-[#0d8b5f]" },
    { title: copy.dashboardNextDocumentTitle, body: copy.dashboardNextDocumentBody, icon: "document", tone: "bg-[#eef8ff] text-[#0876a8]" }
  ];
  const healthRows: DashboardRow[] = [
    { label: copy.dashboardHealthAge, value: copy.dashboardHealthAgeValue },
    { label: copy.dashboardHealthWeight, value: copy.dashboardHealthWeightValue },
    { label: copy.dashboardHealthAllergies, value: copy.dashboardHealthAllergiesValue },
    { label: copy.dashboardHealthMicrochip, value: copy.dashboardHealthMicrochipValue }
  ];
  const documents: DashboardRow[] = [
    { label: copy.dashboardDocumentVaccination, value: copy.dashboardDocumentVaccinationMeta },
    { label: copy.dashboardDocumentVisit, value: copy.dashboardDocumentVisitMeta }
  ];
  const timeline = [copy.dashboardTimelineVaccine, copy.dashboardTimelineVisit, copy.dashboardTimelineReminder];

  return (
    <div className="mt-7 space-y-6">
      <section aria-labelledby="dashboard-next-title">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 id="dashboard-next-title" className="font-serif text-2xl font-black tracking-[0] text-navy">{copy.dashboardNextTitle}</h2>
          <span className="rounded-full border border-[#ead7bd] bg-[#fffaf4] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-navy/58">{copy.dashboardDemoBadge}</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {nextCards.map((card) => (
            <article className="min-h-[152px] rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" key={card.title}>
              <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${card.tone}`} aria-hidden="true">
                <AppIcon name={card.icon} />
              </span>
              <h3 className="text-base font-black leading-6 text-navy">{card.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-navy/68">{card.body}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-navy/42">{copy.dashboardPreviewOnly}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <DashboardPanel title={copy.dashboardHealthTitle}>
          <p className="text-sm font-semibold leading-6 text-navy/64">{copy.dashboardHealthBody}</p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {healthRows.map((row) => (
              <div className="rounded-lg border border-[#e8edf4] bg-[#f8fafc] p-4" key={row.label}>
                <dt className="text-xs font-black uppercase tracking-[0.08em] text-navy/46">{row.label}</dt>
                <dd className="mt-1 text-base font-black text-navy">{row.value}</dd>
              </div>
            ))}
          </dl>
        </DashboardPanel>

        <DashboardPanel title={copy.dashboardDocumentsTitle}>
          <div className="space-y-3">
            {documents.map((document) => (
              <div className="flex min-w-0 items-center gap-4 rounded-lg border border-[#e8edf4] bg-[#f8fafc] p-4" key={document.label}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0876a8]" aria-hidden="true">
                  <AppIcon name="document" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-black text-navy">{document.label}</h3>
                  <p className="mt-1 text-xs font-bold text-navy/56">{document.value}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-[#dce2ec] bg-[#f8fafc] px-5 text-sm font-black text-navy/54" disabled type="button">
            {copy.dashboardDocumentsAction}
          </button>
        </DashboardPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.62fr)]">
        <DashboardPanel title={copy.dashboardTimelineTitle}>
          <ol className="space-y-4">
            {timeline.map((event, index) => (
              <li className="grid grid-cols-[34px_1fr] gap-3" key={event}>
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#fff3e5] text-sm font-black text-[#d97706]" aria-hidden="true">{index + 1}</span>
                <p className="rounded-lg border border-[#e8edf4] bg-[#f8fafc] px-4 py-3 text-sm font-bold leading-6 text-navy/72">{event}</p>
              </li>
            ))}
          </ol>
        </DashboardPanel>

        <div className="space-y-5">
          <DashboardActionPanel title={copy.dashboardAskTitle} body={copy.dashboardAskBody} action={copy.dashboardAskAction} icon="chat" />
          <DashboardActionPanel title={copy.dashboardSharingTitle} body={copy.dashboardSharingBody} action={copy.dashboardSharingAction} icon="users" />
        </div>
      </div>

      <section className="rounded-lg border border-[#f0d9ba] bg-[#fffaf4] px-5 py-4 shadow-[0_12px_35px_rgba(88,54,20,0.04)]" aria-label={copy.dashboardTipTitle}>
        <div className="flex min-w-0 gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#f59a23]" aria-hidden="true">
            <AppIcon name="sun" />
          </span>
          <div className="min-w-0">
            <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.dashboardTipTitle}</h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-navy/68">{copy.dashboardTipBody}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" aria-label={title}>
      <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DashboardActionPanel({ title, body, action, icon }: { title: string; body: string; action: string; icon: AppIconName }) {
  return (
    <section className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" aria-label={title}>
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eef2ff] text-[#7651e6]" aria-hidden="true">
        <AppIcon name={icon} />
      </span>
      <h2 className="mt-4 font-serif text-xl font-black tracking-[0] text-navy">{title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-navy/68">{body}</p>
      <button className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#dce2ec] bg-[#f8fafc] px-5 text-sm font-black text-navy/54" disabled type="button">
        {action}
      </button>
    </section>
  );
}
