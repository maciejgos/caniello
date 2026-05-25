import petsImage from "../assets/auth-hero-pets.png";
import type { AccountCopy } from "../content";
import { OnboardingField } from "./OnboardingField";
import { OnboardingIcon } from "./OnboardingIcon";

export function PetSetupPanel({ copy }: { copy: AccountCopy }) {
  return (
    <section className="rounded-lg border border-[#f0d9ba] bg-white p-5 shadow-[0_16px_45px_rgba(88,54,20,0.06)]" aria-labelledby="pet-form-title">
      <PetPanelHeader copy={copy} />
      <PetSkeletonForm copy={copy} />
    </section>
  );
}

function PetPanelHeader({ copy }: { copy: AccountCopy }) {
  return (
    <div className="flex items-start gap-5">
      <span className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#fff3e5]">
        <img className="h-full w-full object-cover object-[76%_46%]" src={typeof petsImage === "string" ? petsImage : petsImage.src} alt="" />
        <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#d8cfed] bg-white text-[#7651e6]" aria-hidden="true">
          <OnboardingIcon name="edit" small />
        </span>
      </span>
      <div className="min-w-0 pt-1">
        <p className="text-sm font-black text-[#f59a23]">{copy.onboardingPetStepLabel}</p>
        <h2 id="pet-form-title" className="mt-2 font-serif text-3xl font-black leading-tight tracking-[0] text-navy">{copy.onboardingPetFormTitle}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-navy/68">{copy.onboardingPetFormBody}</p>
      </div>
    </div>
  );
}

function PetSkeletonForm({ copy }: { copy: AccountCopy }) {
  return (
    <form className="mt-8 grid gap-5 sm:grid-cols-2 2xl:grid-cols-3" onSubmit={(event) => event.preventDefault()}>
      <OnboardingField label={copy.onboardingPetName} value={copy.onboardingPetNamePlaceholder} />
      <OnboardingField label={copy.onboardingSpecies} value={copy.onboardingSpeciesPlaceholder} trailingIcon="chevron" />
      <OnboardingField label={copy.onboardingBreed} value={copy.onboardingBreedPlaceholder} />
      <OnboardingField label={copy.onboardingBirthDate} value={copy.onboardingBirthDatePlaceholder} trailingIcon="calendar" />
      <OnboardingField label={copy.onboardingGender} value={copy.onboardingGenderPlaceholder} trailingIcon="chevron" />
      <OnboardingField label={copy.onboardingWeight} value={copy.onboardingWeightPlaceholder} />
      <div className="rounded-lg border border-[#f2dfc7] bg-[#fff8ee] px-4 py-3 text-sm font-semibold leading-6 text-navy/72 sm:col-span-2 2xl:col-span-3">
        {copy.onboardingPetReassurance}
      </div>
      <div className="flex justify-end sm:col-span-2 2xl:col-span-3">
        <button className="inline-flex min-h-12 min-w-[180px] items-center justify-center gap-3 rounded-md bg-navy px-6 text-sm font-black text-white opacity-55" disabled type="submit">
          {copy.onboardingSavePreview}
          <OnboardingIcon name="arrow" small />
        </button>
      </div>
    </form>
  );
}
