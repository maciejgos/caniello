import { BrandWordmark } from "../../marketing/components/BrandWordmark";
import type { AccountCopy } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";
import type { AppSection } from "./AuthenticatedAppShell";

type NavItem = {
  section: AppSection;
  label: string;
  icon: AppIconName;
};

type AppNavProps = {
  copy: AccountCopy;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
};

export function AppSidebar({
  copy,
  activeSection,
  onSectionChange,
}: AppNavProps) {
  return (
    <aside className="hidden min-h-screen flex-col bg-white px-4 py-6 lg:flex">
      <a className="mb-12 block px-5" href="/" aria-label="Caniello">
        <BrandWordmark small />
      </a>
      <AppNav
        copy={copy}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        orientation="vertical"
      />
      <DataSafetyCard copy={copy} />
    </aside>
  );
}

export function MobileAppNav({
  copy,
  activeSection,
  onSectionChange,
}: AppNavProps) {
  return (
    <div className="border-b border-[#e6e9ef] bg-[#fdfcf9] px-4 py-3 lg:hidden">
      <AppNav
        copy={copy}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        orientation="horizontal"
      />
    </div>
  );
}

function AppNav({
  copy,
  activeSection,
  onSectionChange,
  orientation,
}: AppNavProps & { orientation: "horizontal" | "vertical" }) {
  const items: NavItem[] = [
    { section: "home", label: copy.appNavHome, icon: "home" },
    { section: "pets", label: copy.appNavPets, icon: "paw" },
    { section: "timeline", label: copy.appNavTimeline, icon: "clock" },
    { section: "documents", label: copy.appNavDocuments, icon: "document" },
    { section: "reminders", label: copy.appNavReminders, icon: "bell" },
    { section: "ask", label: copy.appNavAsk, icon: "chat" },
    { section: "sharing", label: copy.appNavSharing, icon: "users" },
    { section: "settings", label: copy.appNavSettings, icon: "settings" },
  ];

  return (
    <nav aria-label="Caniello app">
      <ul
        className={
          orientation === "vertical"
            ? "space-y-3"
            : "flex gap-2 overflow-x-auto pb-1"
        }
      >
        {items.map((item) => (
          <li
            className={orientation === "horizontal" ? "shrink-0" : undefined}
            key={item.label}
          >
            <button
              className={`flex min-h-12 w-full items-center gap-4 rounded-lg px-5 text-base font-black transition ${
                activeSection === item.section
                  ? "bg-[#fff1dc] text-navy shadow-[0_8px_24px_rgba(225,164,81,0.14)]"
                  : "text-navy/82 hover:bg-[#f5f7fb] hover:text-navy"
              }`}
              type="button"
              aria-current={activeSection === item.section ? "page" : undefined}
              onClick={() => onSectionChange(item.section)}
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center"
                aria-hidden="true"
              >
                <AppIcon name={item.icon} />
              </span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DataSafetyCard({ copy }: { copy: AccountCopy }) {
  return (
    <div className="mt-auto max-w-[198px] rounded-lg border border-[#f1dcbf] bg-[#fffaf3] p-4 text-sm font-black leading-5 text-navy">
      <span
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-navy/12 bg-white text-navy"
        aria-hidden="true"
      >
        <AppIcon name="shield" />
      </span>
      {copy.appDataSafety}
    </div>
  );
}
