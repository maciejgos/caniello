"use client";

import type { PetProfileApiResponse, PetProfileResponse } from "@caniello/contracts";
import type { FormEvent, HTMLAttributes } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";

type PetProfileSectionProps = {
  copy: AccountCopy;
};

type PetProfileFormState = {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  sexOrGender: string;
  weightKg: string;
  microchipNumber: string;
  allergies: string;
  medication: string;
  importantNotes: string;
};

const emptyForm: PetProfileFormState = {
  name: "",
  species: "",
  breed: "",
  birthDate: "",
  sexOrGender: "",
  weightKg: "",
  microchipNumber: "",
  allergies: "",
  medication: "",
  importantNotes: ""
};

export function PetProfileSection({ copy }: PetProfileSectionProps) {
  const [form, setForm] = useState<PetProfileFormState>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [savedPet, setSavedPet] = useState<PetProfileResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/pets/profile");
        const body = (await response.json()) as PetProfileApiResponse;

        if (!response.ok || !body.ok) {
          throw new Error(body.message || "Pet profile load failed.");
        }

        if (!isMounted) return;
        setSavedPet(body.pet ?? null);
        setForm(body.pet ? createFormFromPet(body.pet) : emptyForm);
      } catch {
        if (isMounted) setLoadError(copy.petProfileLoadError);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [copy.petProfileLoadError]);

  const statusTitle = savedPet ? copy.petProfileSavedTitle : copy.petProfileEmptyTitle;
  const canSave = useMemo(() => form.name.trim().length > 0 && !isLoading && !isSaving, [form.name, isLoading, isSaving]);
  const isFormLocked = isLoading || isSaving;

  function updateField(field: keyof PetProfileFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setValidationError(null);
    setSaveError(null);
  }

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError(null);
    setValidationError(null);

    if (!form.name.trim()) {
      setValidationError(copy.petProfileValidationName);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/pets/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createPayloadFromForm(form))
      });
      const body = (await response.json()) as PetProfileApiResponse;

      if (!response.ok || !body.ok || !body.pet) {
        throw new Error(body.message || "Pet profile save failed.");
      }

      setSavedPet(body.pet);
      setForm(createFormFromPet(body.pet));
    } catch {
      setSaveError(copy.petProfileSaveError);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="pet-profile-title">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fff3e5] text-[#d97706]" aria-hidden="true">
            <AppIcon name="paw" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.petProfileEyebrow}</p>
            <h1 id="pet-profile-title" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy">
              {copy.petProfileTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-navy/78">{copy.petProfileIntro}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <form className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" onSubmit={submitProfile}>
            {isLoading ? (
              <p className="text-sm font-bold text-navy/66" role="status">
                {copy.petProfileLoading}
              </p>
            ) : null}

            {loadError ? <p className="text-sm font-bold text-[#b42318]">{loadError}</p> : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <PetTextField
                disabled={isFormLocked}
                label={copy.petProfileName}
                name="name"
                onChange={(value) => updateField("name", value)}
                placeholder={copy.petProfileNamePlaceholder}
                required
                value={form.name}
              />
              <PetTextField
                disabled={isFormLocked}
                label={copy.petProfileSpecies}
                name="species"
                onChange={(value) => updateField("species", value)}
                placeholder={copy.petProfileSpeciesPlaceholder}
                value={form.species}
              />
              <PetTextField
                disabled={isFormLocked}
                label={copy.petProfileBreed}
                name="breed"
                onChange={(value) => updateField("breed", value)}
                placeholder={copy.petProfileBreedPlaceholder}
                value={form.breed}
              />
              <PetTextField
                disabled={isFormLocked}
                label={copy.petProfileBirthDate}
                name="birthDate"
                onChange={(value) => updateField("birthDate", value)}
                type="date"
                value={form.birthDate}
              />
              <PetTextField
                disabled={isFormLocked}
                label={copy.petProfileSexOrGender}
                name="sexOrGender"
                onChange={(value) => updateField("sexOrGender", value)}
                placeholder={copy.petProfileSexOrGenderPlaceholder}
                value={form.sexOrGender}
              />
              <PetTextField
                disabled={isFormLocked}
                inputMode="decimal"
                label={copy.petProfileWeightKg}
                name="weightKg"
                onChange={(value) => updateField("weightKg", value)}
                placeholder={copy.petProfileWeightPlaceholder}
                type="number"
                value={form.weightKg}
              />
              <div className="sm:col-span-2">
                <PetTextField
                  disabled={isFormLocked}
                  label={copy.petProfileMicrochip}
                  name="microchipNumber"
                  onChange={(value) => updateField("microchipNumber", value)}
                  placeholder={copy.petProfileMicrochipPlaceholder}
                  value={form.microchipNumber}
                />
              </div>
              <PetTextareaField
                disabled={isFormLocked}
                label={copy.petProfileAllergies}
                name="allergies"
                onChange={(value) => updateField("allergies", value)}
                placeholder={copy.petProfileAllergiesPlaceholder}
                value={form.allergies}
              />
              <PetTextareaField
                disabled={isFormLocked}
                label={copy.petProfileMedication}
                name="medication"
                onChange={(value) => updateField("medication", value)}
                placeholder={copy.petProfileMedicationPlaceholder}
                value={form.medication}
              />
              <div className="sm:col-span-2">
                <PetTextareaField
                  disabled={isFormLocked}
                  label={copy.petProfileImportantNotes}
                  name="importantNotes"
                  onChange={(value) => updateField("importantNotes", value)}
                  placeholder={copy.petProfileImportantNotesPlaceholder}
                  value={form.importantNotes}
                />
              </div>
            </div>

            {validationError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{validationError}</p> : null}
            {saveError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{saveError}</p> : null}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-navy/62">{copy.petProfilePrivacyNote}</p>
              <button
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#94a3b8]"
                disabled={!canSave}
                type="submit"
              >
                {isSaving ? copy.petProfileSavingAction : copy.petProfileSaveAction}
              </button>
            </div>
          </form>

          <aside className="rounded-lg border border-[#e6e9ef] bg-[#f8fafc] p-5">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{statusTitle}</p>
            <h2 className="mt-3 font-serif text-2xl font-black tracking-[0] text-navy">{savedPet?.name || copy.petProfileNamePlaceholder}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-navy/66">{copy.petProfileSavedBody}</p>
            {savedPet ? (
              <dl className="mt-5 space-y-3 text-sm">
                <PetSummaryItem label={copy.petProfileSpecies} value={savedPet.species} />
                <PetSummaryItem label={copy.petProfileBreed} value={savedPet.breed} />
                <PetSummaryItem label={copy.petProfileBirthDate} value={savedPet.birthDate} />
                <PetSummaryItem label={copy.petProfileWeightKg} value={savedPet.weightKg === null ? null : `${savedPet.weightKg} kg`} />
                <PetSummaryItem label={copy.petProfileMicrochip} value={savedPet.microchipNumber} />
              </dl>
            ) : null}
          </aside>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </section>
  );
}

function PetTextField({
  disabled,
  inputMode,
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value
}: {
  disabled?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  label: string;
  name: keyof PetProfileFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`pet-profile-${name}`}>
      {label}
      <input
        className="mt-2 min-h-11 w-full rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#ccfbf1]"
        disabled={disabled}
        id={`pet-profile-${name}`}
        inputMode={inputMode}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        step={type === "number" ? "0.1" : undefined}
        type={type}
        value={value}
      />
    </label>
  );
}

function PetTextareaField({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  value
}: {
  disabled?: boolean;
  label: string;
  name: keyof PetProfileFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`pet-profile-${name}`}>
      {label}
      <textarea
        className="mt-2 min-h-28 w-full resize-y rounded-md border border-[#dce2ec] bg-white px-3 py-3 text-base font-semibold text-navy outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#ccfbf1]"
        disabled={disabled}
        id={`pet-profile-${name}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function PetSummaryItem({ label, value }: { label: string; value: string | number | null }) {
  if (value === null || value === "") return null;

  return (
    <div>
      <dt className="font-black text-navy/54">{label}</dt>
      <dd className="mt-1 font-semibold text-navy">{value}</dd>
    </div>
  );
}

function createFormFromPet(pet: PetProfileResponse): PetProfileFormState {
  return {
    name: pet.name,
    species: pet.species ?? "",
    breed: pet.breed ?? "",
    birthDate: pet.birthDate ?? "",
    sexOrGender: pet.sexOrGender ?? "",
    weightKg: pet.weightKg === null ? "" : String(pet.weightKg),
    microchipNumber: pet.microchipNumber ?? "",
    allergies: pet.allergies ?? "",
    medication: pet.medication ?? "",
    importantNotes: pet.importantNotes ?? ""
  };
}

function createPayloadFromForm(form: PetProfileFormState) {
  const weight = form.weightKg.trim().replace(",", ".");

  return {
    name: form.name,
    species: form.species,
    breed: form.breed,
    birthDate: form.birthDate,
    sexOrGender: form.sexOrGender,
    weightKg: weight ? Number(weight) : null,
    microchipNumber: form.microchipNumber,
    allergies: form.allergies,
    medication: form.medication,
    importantNotes: form.importantNotes
  };
}
