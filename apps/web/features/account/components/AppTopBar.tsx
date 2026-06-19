import { BrandWordmark } from "../../marketing/components/BrandWordmark";
import { LanguageToggle } from "../../marketing/components/LanguageToggle";
import type { PetProfileResponse } from "@caniello/contracts";
import type { AccountCopy, AccountLanguage } from "../content";
import { AppIcon } from "./AppIcon";

type AppTopBarProps = {
  copy: AccountCopy;
  language: AccountLanguage;
  onLanguageChange: (language: AccountLanguage) => void;
  onLogout: () => Promise<void>;
  pet: PetProfileResponse | null;
  isPetLoading: boolean;
};

export function AppTopBar({
  copy,
  language,
  onLanguageChange,
  onLogout,
  pet,
  isPetLoading,
}: AppTopBarProps) {
  return (
    <header className="border-b border-[#e1e6ee] bg-white px-4 py-3 sm:px-6 lg:min-h-[68px] lg:px-8">
      <div className="flex items-center gap-3">
        <a className="mr-auto block lg:hidden" href="/" aria-label="Caniello">
          <BrandWordmark small />
        </a>
        <div className="mr-auto hidden min-w-0 max-w-[700px] flex-1 xl:flex">
          <label className="flex min-h-11 w-full items-center gap-3 rounded-lg border border-[#dce2ec] bg-white px-4 text-navy/48">
            <span className="sr-only">{copy.appSearchPlaceholder}</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-navy outline-none placeholder:text-navy/42"
              placeholder={copy.appSearchPlaceholder}
              readOnly
              aria-readonly="true"
            />
            <AppIcon name="search" />
            <span className="rounded border border-[#dce2ec] px-2 py-1 text-xs font-bold text-navy/62">
              ⌘ K
            </span>
          </label>
        </div>
        <PetContext copy={copy} pet={pet} isLoading={isPetLoading} />
        <button
          className="hidden h-11 w-11 items-center justify-center border-x border-[#e1e6ee] text-navy/75 lg:flex"
          type="button"
          disabled
          aria-label={copy.appNotificationsUnavailable}
          title={copy.appNotificationsUnavailable}
        >
          <AppIcon name="bell" />
        </button>
        <AccountMenu copy={copy} onLogout={onLogout} />
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>
    </header>
  );
}

function PetContext({
  copy,
  pet,
  isLoading,
}: {
  copy: AccountCopy;
  pet: PetProfileResponse | null;
  isLoading: boolean;
}) {
  const petName = isLoading
    ? copy.appPetContextLoading
    : pet?.name || copy.appPetContextEmpty;

  return (
    <div
      className="flex min-h-11 items-center gap-3 rounded-lg border border-[#dce2ec] bg-white px-3 text-sm font-black text-navy"
      aria-label={copy.appPetSelectorLabel}
      role="status"
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff3e5] text-[#d97706]"
        aria-hidden="true"
      >
        <AppIcon name="paw" />
      </span>
      <span className="max-w-32 truncate sm:max-w-44">{petName}</span>
      {pet ? (
        <span className="hidden text-xs font-semibold text-navy/52 xl:inline">
          {copy.appPetContextSingle}
        </span>
      ) : null}
    </div>
  );
}

function AccountMenu({
  copy,
  onLogout,
}: {
  copy: AccountCopy;
  onLogout: () => Promise<void>;
}) {
  return (
    <div
      className="flex min-h-11 items-center gap-3 rounded-lg border border-[#dce2ec] bg-white px-3"
      role="group"
      aria-label={copy.appAccountLabel}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ede6] text-sm font-black text-navy"
        aria-hidden="true"
      >
        {copy.appAccountName.slice(0, 1)}
      </span>
      <span className="hidden text-sm font-black text-navy sm:inline">
        {copy.appAccountName}
      </span>
      <button
        className="rounded-md px-2 py-1 text-sm font-black text-[#7651e6] transition hover:bg-[#f6f2ff]"
        type="button"
        onClick={() => void onLogout()}
      >
        {copy.logoutAction}
      </button>
    </div>
  );
}
