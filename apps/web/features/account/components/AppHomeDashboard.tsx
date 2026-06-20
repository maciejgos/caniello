import type { PetProfileResponse } from "@caniello/contracts";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";
import type { AppSection } from "./AuthenticatedAppShell";
import { FirstRunOnboarding } from "./FirstRunOnboarding";
import { PetAvatar } from "./PetAvatar";
import { ReturningOwnerDashboard } from "./ReturningOwnerDashboard";
import { useDashboardData } from "./useDashboardData";

type AppHomeDashboardProps = {
  copy: AccountCopy;
  pet: PetProfileResponse | null;
  isPetLoading: boolean;
  hasPetLoadError: boolean;
  onPetsRequest: () => void;
  onSectionRequest: (section: AppSection) => void;
  onPetSaved: (pet: PetProfileResponse) => void;
};

export function AppHomeDashboard({
  copy,
  pet,
  isPetLoading,
  hasPetLoadError,
  onPetsRequest,
  onSectionRequest,
  onPetSaved,
}: AppHomeDashboardProps) {
  const dashboardData = useDashboardData(Boolean(pet));

  return (
    <section
      className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-8 xl:px-12"
      aria-labelledby="app-home-title"
    >
      <div className="mx-auto max-w-[1380px]">
        {isPetLoading ? (
          <DashboardStatus
            copy={copy}
            title={copy.dashboardLoadingTitle}
            body={copy.dashboardLoadingBody}
          />
        ) : hasPetLoadError ? (
          <DashboardStatus
            copy={copy}
            title={copy.dashboardLoadErrorTitle}
            body={copy.dashboardLoadErrorBody}
            actionLabel={copy.dashboardLoadErrorAction}
            onAction={onPetsRequest}
          />
        ) : pet ? (
          <>
            <ReturningDashboardHeader
              copy={copy}
              pet={pet}
              onPetRequest={onPetsRequest}
            />
            <ReturningOwnerDashboard
              copy={copy}
              data={dashboardData.data}
              hasLoadError={dashboardData.hasLoadError}
              isLoading={dashboardData.isLoading}
              pet={pet}
              onReload={dashboardData.reload}
              onSectionRequest={onSectionRequest}
            />
          </>
        ) : (
          <>
            <FirstRunHeader copy={copy} />
            <FirstRunOnboarding copy={copy} onPetSaved={onPetSaved} />
          </>
        )}
      </div>
    </section>
  );
}

function ReturningDashboardHeader({
  copy,
  pet,
  onPetRequest,
}: {
  copy: AccountCopy;
  pet: PetProfileResponse;
  onPetRequest: () => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] xl:items-center">
      <div className="flex min-w-0 items-start gap-4">
        <span
          className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3e5] text-[#f59a23]"
          aria-hidden="true"
        >
          <AppIcon name="sun" />
        </span>
        <div className="min-w-0">
          <h1
            id="app-home-title"
            className="font-serif text-[clamp(2.05rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy"
          >
            {copy.dashboardTitle}
          </h1>
          <p className="mt-2 text-base font-semibold leading-7 text-navy/72">
            {formatPetCopy(copy.dashboardIntro, pet.name)}
          </p>
        </div>
      </div>
      <PetIdentityCard copy={copy} pet={pet} onPetRequest={onPetRequest} />
    </div>
  );
}

function PetIdentityCard({
  copy,
  pet,
  onPetRequest,
}: {
  copy: AccountCopy;
  pet: PetProfileResponse;
  onPetRequest: () => void;
}) {
  const metadata = [
    pet.breed || pet.species,
    formatAge(copy, pet.birthDate),
    pet.sexOrGender,
    pet.weightKg === null ? null : `${pet.weightKg} kg`,
  ].filter((value): value is string => Boolean(value));

  return (
    <button
      className="flex min-w-0 items-center gap-4 rounded-lg border border-[#e3e8f0] bg-white px-5 py-4 text-left shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:border-[#bfd0e8] hover:bg-[#fbfdff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174c9f] focus-visible:ring-offset-2"
      aria-label={copy.dashboardPetSummaryLabel}
      onClick={onPetRequest}
      type="button"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#fff3e5] text-[#d97706]">
        <PetAvatar className="h-full w-full object-cover" pet={pet} />
      </span>
      <div className="min-w-0">
        <h2 className="truncate font-serif text-xl font-black text-navy">
          {pet.name}
        </h2>
        <p className="mt-1 line-clamp-2 text-sm font-semibold text-navy/58">
          {metadata.length > 0
            ? metadata.join(" · ")
            : copy.dashboardPetSummaryFallback}
        </p>
      </div>
      <span className="ml-auto text-navy/42" aria-hidden="true">
        <AppIcon name="chevronRight" />
      </span>
    </button>
  );
}

function FirstRunHeader({ copy }: { copy: AccountCopy }) {
  return (
    <div className="flex max-w-4xl items-start gap-4">
      <span
        className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3e5] text-[#f59a23]"
        aria-hidden="true"
      >
        <AppIcon name="sun" />
      </span>
      <div className="min-w-0">
        <h1
          id="app-home-title"
          className="font-serif text-[clamp(2.05rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy"
        >
          {copy.onboardingTitle}
        </h1>
        <p className="mt-2 text-base font-semibold leading-7 text-navy/72">
          {copy.onboardingIntro}
        </p>
        <p className="text-base font-semibold leading-7 text-navy/72">
          {copy.onboardingIntroNext}
        </p>
      </div>
    </div>
  );
}

function DashboardStatus({
  copy,
  title,
  body,
  actionLabel,
  onAction,
}: {
  copy: AccountCopy;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <section className="max-w-xl rounded-lg border border-[#e3e8f0] bg-white p-8 text-center shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <span
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff3e5] text-[#d97706]"
          aria-hidden="true"
        >
          <AppIcon name="paw" />
        </span>
        <h1
          id="app-home-title"
          className="mt-5 font-serif text-3xl font-black text-navy"
        >
          {title}
        </h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-navy/64">
          {body}
        </p>
        {actionLabel && onAction ? (
          <button
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 text-sm font-black text-white"
            type="button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
        <p className="mt-5 text-xs font-semibold leading-5 text-navy/48">
          {copy.medicalBoundary}
        </p>
      </section>
    </div>
  );
}

function formatPetCopy(template: string, petName: string) {
  return template.replaceAll("{petName}", petName);
}

function formatAge(copy: AccountCopy, birthDate: string | null) {
  if (!birthDate) return null;

  const birth = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());
  if (beforeBirthday) years -= 1;
  if (years < 0) return null;

  return `${years} ${copy.dashboardPetAgeUnit}`;
}
