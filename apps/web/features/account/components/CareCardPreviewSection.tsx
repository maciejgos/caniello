"use client";

import type { DocumentResponse, DocumentsApiResponse, PetProfileApiResponse, PetProfileResponse, ReminderResponse, RemindersApiResponse } from "@caniello/contracts";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";

type CareCardPreviewSectionProps = {
  copy: AccountCopy;
  onPetsRequest: () => void;
};

type CareCardState = {
  pet: PetProfileResponse | null;
  reminders: ReminderResponse[];
  documents: DocumentResponse[];
};

const emptyCareCardState: CareCardState = {
  pet: null,
  reminders: [],
  documents: []
};

export function CareCardPreviewSection({ copy, onPetsRequest }: CareCardPreviewSectionProps) {
  const [careCard, setCareCard] = useState<CareCardState>(emptyCareCardState);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCareCard() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const [petResponse, remindersResponse, documentsResponse] = await Promise.all([
          fetch("/api/pets/profile"),
          fetch("/api/reminders"),
          fetch("/api/documents")
        ]);
        const petBody = (await petResponse.json()) as PetProfileApiResponse;
        const remindersBody = (await remindersResponse.json()) as RemindersApiResponse;
        const documentsBody = (await documentsResponse.json()) as DocumentsApiResponse;

        if (!petResponse.ok || !petBody.ok || !remindersResponse.ok || !remindersBody.ok || !documentsResponse.ok || !documentsBody.ok) {
          throw new Error("Care card load failed.");
        }

        if (!isMounted) return;
        setCareCard({
          pet: petBody.pet ?? remindersBody.pet ?? documentsBody.pet ?? null,
          reminders: remindersBody.reminders ?? [],
          documents: documentsBody.documents ?? []
        });
      } catch {
        if (isMounted) setLoadError(copy.careCardLoadError);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadCareCard();

    return () => {
      isMounted = false;
    };
  }, [copy.careCardLoadError]);

  const upcomingReminders = useMemo(
    () =>
      careCard.reminders
        .filter((reminder) => reminder.status === "active" || reminder.status === "suggested")
        .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
        .slice(0, 3),
    [careCard.reminders]
  );
  const recentDocuments = useMemo(
    () => [...careCard.documents].sort((first, second) => second.documentDate.localeCompare(first.documentDate)).slice(0, 3),
    [careCard.documents]
  );
  const petName = careCard.pet?.name || copy.careCardPetNameFallback;

  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="care-card-title">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e8f8f0] text-[#0d8b5f]" aria-hidden="true">
            <AppIcon name="users" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.careCardEyebrow}</p>
            <h1 id="care-card-title" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy">
              {copy.careCardTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-navy/78">{copy.careCardIntro}</p>
          </div>
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm font-bold text-navy/66" role="status">
            {copy.careCardLoading}
          </p>
        ) : null}
        {loadError ? <p className="mt-6 text-sm font-bold text-[#b42318]">{loadError}</p> : null}

        {!isLoading && !loadError && !careCard.pet ? (
          <div className="mt-8 rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{copy.careCardPetRequiredTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-navy/66">{copy.careCardPetRequiredBody}</p>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white" type="button" onClick={onPetsRequest}>
              {copy.careCardPetRequiredAction}
            </button>
          </div>
        ) : null}

        {!isLoading && !loadError && careCard.pet ? (
          <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <article className="min-w-0 rounded-lg border border-[#dbe7dc] bg-[#fbfffb] p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" aria-label={copy.careCardPreviewLabel}>
              <div className="flex flex-col gap-4 border-b border-[#dbe7dc] pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-black uppercase tracking-[0.08em] text-[#0d8b5f]">{copy.careCardPreviewBadge}</p>
                  <h2 className="mt-2 font-serif text-[clamp(1.8rem,2.6vw,2.6rem)] font-black leading-tight tracking-[0] text-navy">{petName}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{formatPetIdentity(copy, careCard.pet)}</p>
                </div>
                <span className="inline-flex w-fit rounded-md border border-[#bae6d1] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#0d8b5f]">
                  {copy.careCardOwnerOnlyBadge}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <CareCardField label={copy.petProfileMicrochip} value={careCard.pet.microchipNumber} missing={copy.careCardMissingValue} />
                <CareCardField label={copy.petProfileWeightKg} value={careCard.pet.weightKg === null ? null : `${careCard.pet.weightKg} kg`} missing={copy.careCardMissingValue} />
                <CareCardField label={copy.petProfileAllergies} value={careCard.pet.allergies} missing={copy.careCardMissingValue} />
                <CareCardField label={copy.petProfileMedication} value={careCard.pet.medication} missing={copy.careCardMissingValue} />
                <div className="md:col-span-2">
                  <CareCardField label={copy.petProfileImportantNotes} value={careCard.pet.importantNotes} missing={copy.careCardMissingValue} />
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <CareCardList title={copy.careCardRemindersTitle} empty={copy.careCardRemindersEmpty}>
                  {upcomingReminders.map((reminder) => (
                    <li className="rounded-md border border-[#e6e9ef] bg-white p-3" key={reminder.id}>
                      <p className="text-sm font-black text-navy">{reminder.title}</p>
                      <p className="mt-1 text-xs font-semibold text-navy/62">
                        {formatReminderType(copy, reminder.reminderType)} · {reminder.dueDate}
                      </p>
                    </li>
                  ))}
                </CareCardList>

                <CareCardList title={copy.careCardDocumentsTitle} empty={copy.careCardDocumentsEmpty}>
                  {recentDocuments.map((document) => (
                    <li className="rounded-md border border-[#e6e9ef] bg-white p-3" key={document.id}>
                      <p className="text-sm font-black text-navy">{document.title}</p>
                      <p className="mt-1 text-xs font-semibold text-navy/62">
                        {formatDocumentType(copy, document.documentType)} · {document.documentDate}
                      </p>
                      {document.providerName ? <p className="mt-1 text-xs font-semibold text-navy/54">{document.providerName}</p> : null}
                    </li>
                  ))}
                </CareCardList>
              </div>
            </article>

            <aside className="space-y-5">
              <div className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{copy.careCardUnavailableTitle}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-navy/66">{copy.careCardUnavailableBody}</p>
                <div className="mt-5 grid gap-3">
                  <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#dce2ec] bg-[#f8fafc] px-5 text-sm font-black text-navy/54" disabled type="button">
                    {copy.careCardShareLinkAction}
                  </button>
                  <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#dce2ec] bg-[#f8fafc] px-5 text-sm font-black text-navy/54" disabled type="button">
                    {copy.careCardPdfAction}
                  </button>
                </div>
              </div>
              <div className="rounded-lg border border-[#e6e9ef] bg-[#f8fafc] p-5">
                <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.careCardSafetyTitle}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-navy/66">{copy.careCardSafetyBody}</p>
              </div>
            </aside>
          </div>
        ) : null}

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </section>
  );
}

function CareCardField({ label, missing, value }: { label: string; missing: string; value: string | null }) {
  return (
    <div className="rounded-md border border-[#e6e9ef] bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-navy/54">{label}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-navy">{value?.trim() || missing}</p>
    </div>
  );
}

function CareCardList({ children, empty, title }: { children: ReactNode; empty: string; title: string }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <section className="min-w-0">
      <h3 className="font-serif text-xl font-black tracking-[0] text-navy">{title}</h3>
      {hasItems ? <ul className="mt-3 space-y-3">{children}</ul> : <p className="mt-3 rounded-md border border-dashed border-[#dce2ec] bg-white p-3 text-sm font-semibold leading-6 text-navy/62">{empty}</p>}
    </section>
  );
}

function formatPetIdentity(copy: AccountCopy, pet: PetProfileResponse): string {
  const parts = [pet.species, pet.breed, pet.birthDate].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : copy.careCardIdentityMissing;
}

function formatReminderType(copy: AccountCopy, reminderType: ReminderResponse["reminderType"]): string {
  const labels = {
    vaccination: copy.remindersTypeVaccination,
    medication: copy.remindersTypeMedication,
    deworming: copy.remindersTypeDeworming,
    visit: copy.remindersTypeVisit,
    other: copy.remindersTypeOther
  };

  return labels[reminderType];
}

function formatDocumentType(copy: AccountCopy, documentType: DocumentResponse["documentType"]): string {
  const labels = {
    vaccination: copy.documentsTypeVaccination,
    lab_result: copy.documentsTypeLabResult,
    visit_summary: copy.documentsTypeVisitSummary,
    prescription: copy.documentsTypePrescription,
    insurance: copy.documentsTypeInsurance,
    travel: copy.documentsTypeTravel,
    other: copy.documentsTypeOther
  };

  return labels[documentType];
}
