import type { AccountCopy } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";
import type { AppSection } from "./AuthenticatedAppShell";

type EmptyStateContent = {
  title: string;
  eyebrow: string;
  body: string;
  action: string;
  safety: string;
  icon: AppIconName;
  tone: string;
};

export function AppSectionEmptyState({ copy, section }: { copy: AccountCopy; section: Exclude<AppSection, "home"> }) {
  const content = getEmptyStateContent(copy, section);

  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="app-section-title">
      <div className="mx-auto max-w-[980px]">
        <div className="flex min-w-0 items-start gap-4">
          <span className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${content.tone}`} aria-hidden="true">
            <AppIcon name={content.icon} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{content.eyebrow}</p>
            <h1 id="app-section-title" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy">
              {content.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-navy/78">{content.body}</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.appSectionPreviewTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-navy/66">{content.safety}</p>
            </div>
            <button className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-[#dce2ec] bg-[#f8fafc] px-5 text-sm font-black text-navy/54" disabled type="button">
              {content.action}
            </button>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </section>
  );
}

function getEmptyStateContent(copy: AccountCopy, section: Exclude<AppSection, "home">): EmptyStateContent {
  const common = {
    eyebrow: copy.appSectionPreviewEyebrow
  };

  if (section === "pets") {
    return {
      ...common,
      title: copy.appSectionPetsTitle,
      body: copy.appSectionPetsBody,
      action: copy.appSectionPetsAction,
      safety: copy.appSectionPetsSafety,
      icon: "paw",
      tone: "bg-[#fff3e5] text-[#d97706]"
    };
  }

  if (section === "timeline") {
    return {
      ...common,
      title: copy.appSectionTimelineTitle,
      body: copy.appSectionTimelineBody,
      action: copy.appSectionTimelineAction,
      safety: copy.appSectionTimelineSafety,
      icon: "clock",
      tone: "bg-[#eef2ff] text-[#7651e6]"
    };
  }

  if (section === "documents") {
    return {
      ...common,
      title: copy.appSectionDocumentsTitle,
      body: copy.appSectionDocumentsBody,
      action: copy.appSectionDocumentsAction,
      safety: copy.appSectionDocumentsSafety,
      icon: "document",
      tone: "bg-[#eef8ff] text-[#0876a8]"
    };
  }

  if (section === "reminders") {
    return {
      ...common,
      title: copy.appSectionRemindersTitle,
      body: copy.appSectionRemindersBody,
      action: copy.appSectionRemindersAction,
      safety: copy.appSectionRemindersSafety,
      icon: "bell",
      tone: "bg-[#e8f8f0] text-[#0d8b5f]"
    };
  }

  if (section === "ask") {
    return {
      ...common,
      title: copy.appSectionAskTitle,
      body: copy.appSectionAskBody,
      action: copy.appSectionAskAction,
      safety: copy.appSectionAskSafety,
      icon: "chat",
      tone: "bg-[#eef2ff] text-[#7651e6]"
    };
  }

  if (section === "sharing") {
    return {
      ...common,
      title: copy.appSectionSharingTitle,
      body: copy.appSectionSharingBody,
      action: copy.appSectionSharingAction,
      safety: copy.appSectionSharingSafety,
      icon: "users",
      tone: "bg-[#fff3e5] text-[#d97706]"
    };
  }

  return {
    ...common,
    title: copy.appSectionSettingsTitle,
    body: copy.appSectionSettingsBody,
    action: copy.appSectionSettingsAction,
    safety: copy.appSectionSettingsSafety,
    icon: "settings",
    tone: "bg-[#f1f5f9] text-navy"
  };
}
