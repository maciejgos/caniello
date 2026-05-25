import { BrandWordmark } from "../../marketing/components/BrandWordmark";
import { LanguageToggle } from "../../marketing/components/LanguageToggle";
import type { AccountCopy, AccountLanguage } from "../content";
import { AppIcon } from "./AppIcon";

type AppTopBarProps = {
  copy: AccountCopy;
  language: AccountLanguage;
  onLanguageChange: (language: AccountLanguage) => void;
  onLogout: () => Promise<void>;
};

export function AppTopBar({ copy, language, onLanguageChange, onLogout }: AppTopBarProps) {
  return (
    <header className="border-b border-[#e6e9ef] bg-white px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <a className="mr-auto block lg:hidden" href="/" aria-label="Caniello">
          <BrandWordmark small />
        </a>
        <AppSearch copy={copy} />
        <PetSelector copy={copy} />
        <NotificationsButton copy={copy} />
        <AccountMenu copy={copy} onLogout={onLogout} />
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
}

function AppSearch({ copy }: { copy: AccountCopy }) {
  return (
    <label className="order-last flex min-h-11 w-full min-w-0 items-center gap-3 rounded-lg border border-[#dce2ec] bg-white px-4 text-sm font-bold text-navy/72 sm:order-none sm:ml-auto sm:w-[min(34vw,340px)]">
      <span className="shrink-0 text-navy/70" aria-hidden="true">
        <AppIcon name="search" />
      </span>
      <span className="sr-only">{copy.appSearchLabel}</span>
      <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-navy/56" placeholder={copy.appSearchPlaceholder} readOnly type="search" />
      <kbd aria-hidden="true" className="hidden rounded-md border border-[#d9dee8] px-2 py-1 text-xs font-black text-navy/58 sm:inline">⌘ K</kbd>
    </label>
  );
}

function PetSelector({ copy }: { copy: AccountCopy }) {
  return (
    <button className="flex min-h-11 items-center gap-3 rounded-lg border border-[#dce2ec] bg-white px-3 text-sm font-black text-navy" type="button" aria-label={copy.appPetSelectorLabel}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffe4bd] text-lg" aria-hidden="true">B</span>
      <span className="hidden sm:inline">{copy.appPetSelectorValue}</span>
      <span className="text-navy/62" aria-hidden="true"><AppIcon name="chevronDown" /></span>
    </button>
  );
}

function NotificationsButton({ copy }: { copy: AccountCopy }) {
  return (
    <button className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-[#dce2ec] bg-white text-navy" type="button" aria-label={copy.appNotificationsLabel}>
      <AppIcon name="bell" />
      <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#f04438]" aria-hidden="true" />
    </button>
  );
}

function AccountMenu({ copy, onLogout }: { copy: AccountCopy; onLogout: () => Promise<void> }) {
  return (
    <div className="flex min-h-11 items-center gap-3 rounded-lg border border-[#dce2ec] bg-white px-3" role="group" aria-label={copy.appAccountLabel}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ede6] text-sm font-black text-navy" aria-hidden="true">
        {copy.appAccountName.slice(0, 1)}
      </span>
      <span className="hidden text-sm font-black text-navy sm:inline">{copy.appAccountName}</span>
      <button className="rounded-md px-2 py-1 text-sm font-black text-[#7651e6] transition hover:bg-[#f6f2ff]" type="button" onClick={() => void onLogout()}>
        {copy.logoutAction}
      </button>
    </div>
  );
}
