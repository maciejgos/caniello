"use client";

import type {
  PetProfileApiResponse,
  PetProfileResponse,
} from "@caniello/contracts";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import petsImage from "../assets/auth-hero-pets.png";
import type { AccountCopy } from "../content";
import { OnboardingField, OnboardingSelectField } from "./OnboardingField";
import { OnboardingIcon } from "./OnboardingIcon";

type PetSetupPanelProps = {
  copy: AccountCopy;
  onPetSaved: (pet: PetProfileResponse) => void;
};

type OnboardingPetForm = {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  sexOrGender: string;
  weightKg: string;
};

const emptyForm: OnboardingPetForm = {
  name: "",
  species: "",
  breed: "",
  birthDate: "",
  sexOrGender: "",
  weightKg: "",
};

export function PetSetupPanel({ copy, onPetSaved }: PetSetupPanelProps) {
  const [form, setForm] = useState<OnboardingPetForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canSave = useMemo(
    () => form.name.trim().length > 0 && !isSaving,
    [form.name, isSaving],
  );

  function updateField(field: keyof OnboardingPetForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError(null);
  }

  async function submitPet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError(copy.petProfileValidationName);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/pets/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          species: form.species || null,
          breed: form.breed.trim() || null,
          birthDate: form.birthDate || null,
          sexOrGender: form.sexOrGender || null,
          weightKg: form.weightKg === "" ? null : Number(form.weightKg),
          microchipNumber: null,
          allergies: null,
          medication: null,
          importantNotes: null,
        }),
      });
      const body = (await response.json()) as PetProfileApiResponse;

      if (!response.ok || !body.ok || !body.pet) {
        throw new Error(body.message || "Pet profile save failed.");
      }

      onPetSaved(body.pet);
    } catch {
      setError(copy.petProfileSaveError);
    } finally {
      setIsSaving(false);
    }
  }

  const speciesOptions = [
    { value: "dog", label: copy.onboardingSpeciesDog },
    { value: "cat", label: copy.onboardingSpeciesCat },
    { value: "other", label: copy.onboardingSpeciesOther },
  ];
  const sexOptions = [
    { value: "female", label: copy.onboardingGenderFemale },
    { value: "male", label: copy.onboardingGenderMale },
    { value: "unknown", label: copy.onboardingGenderUnknown },
  ];

  return (
    <section
      className="rounded-lg border border-[#f0d9ba] bg-white p-5 shadow-[0_16px_45px_rgba(88,54,20,0.06)]"
      aria-labelledby="pet-form-title"
    >
      <PetPanelHeader copy={copy} />
      <form
        className="mt-8 grid gap-5 sm:grid-cols-2 2xl:grid-cols-3"
        onSubmit={submitPet}
      >
        <OnboardingField
          disabled={isSaving}
          label={copy.onboardingPetName}
          name="name"
          onChange={(value) => updateField("name", value)}
          placeholder={copy.onboardingPetNamePlaceholder}
          required
          value={form.name}
        />
        <OnboardingSelectField
          disabled={isSaving}
          label={copy.onboardingSpecies}
          name="species"
          onChange={(value) => updateField("species", value)}
          options={speciesOptions}
          placeholder={copy.onboardingSpeciesPlaceholder}
          value={form.species}
        />
        <OnboardingField
          disabled={isSaving}
          label={copy.onboardingBreed}
          name="breed"
          onChange={(value) => updateField("breed", value)}
          placeholder={copy.onboardingBreedPlaceholder}
          value={form.breed}
        />
        <OnboardingField
          disabled={isSaving}
          label={copy.onboardingBirthDate}
          name="birthDate"
          onChange={(value) => updateField("birthDate", value)}
          type="date"
          value={form.birthDate}
        />
        <OnboardingSelectField
          disabled={isSaving}
          label={copy.onboardingGender}
          name="sexOrGender"
          onChange={(value) => updateField("sexOrGender", value)}
          options={sexOptions}
          placeholder={copy.onboardingGenderPlaceholder}
          value={form.sexOrGender}
        />
        <OnboardingField
          disabled={isSaving}
          inputMode="decimal"
          label={copy.onboardingWeight}
          name="weightKg"
          onChange={(value) => updateField("weightKg", value)}
          placeholder={copy.onboardingWeightPlaceholder}
          type="number"
          value={form.weightKg}
        />
        <div className="rounded-lg border border-[#f2dfc7] bg-[#fff8ee] px-4 py-3 text-sm font-semibold leading-6 text-navy/72 sm:col-span-2 2xl:col-span-3">
          {copy.onboardingPetReassurance}
        </div>
        {error ? (
          <p
            className="text-sm font-bold text-[#b42318] sm:col-span-2 2xl:col-span-3"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <div className="flex justify-end sm:col-span-2 2xl:col-span-3">
          <button
            className="inline-flex min-h-12 min-w-[180px] items-center justify-center gap-3 rounded-md bg-navy px-6 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:bg-[#94a3b8]"
            disabled={!canSave}
            type="submit"
          >
            {isSaving
              ? copy.petProfileSavingAction
              : copy.onboardingSavePreview}
            <OnboardingIcon name="arrow" small />
          </button>
        </div>
      </form>
    </section>
  );
}

function PetPanelHeader({ copy }: { copy: AccountCopy }) {
  return (
    <div className="flex items-start gap-5">
      <span className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[#fff3e5]">
        <img
          className="h-full w-full object-cover object-[76%_46%]"
          src={typeof petsImage === "string" ? petsImage : petsImage.src}
          alt=""
        />
        <span
          className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#d8cfed] bg-white text-[#7651e6]"
          aria-hidden="true"
        >
          <OnboardingIcon name="edit" small />
        </span>
      </span>
      <div className="min-w-0 pt-1">
        <p className="text-sm font-black text-[#f59a23]">
          {copy.onboardingPetStepLabel}
        </p>
        <h2
          id="pet-form-title"
          className="mt-2 font-serif text-3xl font-black leading-tight tracking-[0] text-navy"
        >
          {copy.onboardingPetFormTitle}
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-navy/68">
          {copy.onboardingPetFormBody}
        </p>
      </div>
    </div>
  );
}
