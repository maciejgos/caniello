import { BrandWordmark } from "../../marketing/components/BrandWordmark";
import type { AccountCopy } from "../content";
import { AppIcon, type AppIconName } from "./AppIcon";

type NavItem = {
  label: string;
  icon: AppIconName;
  href: string;
  active: boolean;
};

export function AppSidebar({ copy }: { copy: AccountCopy }) {
  return (
    <aside className="hidden min-h-screen flex-col bg-[#fdfcf9] px-4 py-6 lg:flex">
      <a className="mb-10 block px-2" href="/" aria-label="Caniello">
        <BrandWordmark small />
      </a>
      <AppNav copy={copy} orientation="vertical" />
      <DataSafetyCard copy={copy} />
    </aside>
  );
}

export function MobileAppNav({ copy }: { copy: AccountCopy }) {
  return (
    <div className="border-b border-[#e6e9ef] bg-[#fdfcf9] px-4 py-3 lg:hidden">
      <AppNav copy={copy} orientation="horizontal" />
    </div>
  );
}

function AppNav({ copy, orientation }: { copy: AccountCopy; orientation: "horizontal" | "vertical" }) {
  const items: NavItem[] = [
    { label: copy.appNavHome, icon: "home", href: "/app", active: true },
    { label: copy.appNavPets, icon: "paw", href: "/app/pets", active: false },
    { label: copy.appNavTimeline, icon: "clock", href: "/app/timeline", active: false },
    { label: copy.appNavDocuments, icon: "document", href: "/app/documents", active: false },
    { label: copy.appNavReminders, icon: "bell", href: "/app/reminders", active: false },
    { label: copy.appNavAsk, icon: "chat", href: "/app/ask", active: false },
    { label: copy.appNavSharing, icon: "users", href: "/app/sharing", active: false },
    { label: copy.appNavSettings, icon: "settings", href: "/app/settings", active: false }
  ];

  return (
    <nav aria-label="Caniello app">
      <ul className={orientation === "vertical" ? "space-y-2" : "flex gap-2 overflow-x-auto pb-1"}>
        {items.map((item) => (
          <li className={orientation === "horizontal" ? "shrink-0" : undefined} key={item.label}>
            <a
              className={`flex min-h-11 items-center gap-3 rounded-lg px-4 text-sm font-black transition ${
                item.active
                  ? "bg-[#fff1dc] text-navy shadow-[0_8px_24px_rgba(225,164,81,0.14)]"
                  : "text-navy/82 hover:bg-[#f5f7fb] hover:text-navy"
              }`}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
                <AppIcon name={item.icon} />
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DataSafetyCard({ copy }: { copy: AccountCopy }) {
  return (
    <div className="mt-auto rounded-lg border border-[#f1dcbf] bg-[#fff8ee] p-4 text-sm font-black leading-5 text-navy">
      <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-navy/12 bg-white text-navy" aria-hidden="true">
        <AppIcon name="shield" />
      </span>
      {copy.appDataSafety}
    </div>
  );
}
