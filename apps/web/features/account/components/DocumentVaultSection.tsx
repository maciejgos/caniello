"use client";

import type { DocumentResponse, DocumentsApiResponse, DocumentType } from "@caniello/contracts";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AccountCopy } from "../content";
import { AppIcon } from "./AppIcon";

type DocumentVaultSectionProps = {
  copy: AccountCopy;
  onPetsRequest: () => void;
};

type DocumentFormState = {
  title: string;
  documentType: DocumentType;
  documentDate: string;
  providerName: string;
  originalFilename: string;
  mimeType: string;
  notes: string;
};

const emptyDocumentForm: DocumentFormState = {
  title: "",
  documentType: "vaccination",
  documentDate: "",
  providerName: "",
  originalFilename: "",
  mimeType: "",
  notes: ""
};

export function DocumentVaultSection({ copy, onPetsRequest }: DocumentVaultSectionProps) {
  const [form, setForm] = useState<DocumentFormState>(emptyDocumentForm);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasPetProfile, setHasPetProfile] = useState(false);
  const [petName, setPetName] = useState("");
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadDocuments() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/documents");
        const body = (await response.json()) as DocumentsApiResponse;

        if (!response.ok || !body.ok) {
          throw new Error(body.message || "Document load failed.");
        }

        if (!isMounted) return;
        setHasPetProfile(Boolean(body.pet));
        setPetName(body.pet?.name?.trim() || "");
        setDocuments(body.documents ?? []);
      } catch {
        if (isMounted) setLoadError(copy.documentsLoadError);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadDocuments();

    return () => {
      isMounted = false;
    };
  }, [copy.documentsLoadError]);

  const sortedDocuments = useMemo(
    () => [...documents].sort((first, second) => second.documentDate.localeCompare(first.documentDate)),
    [documents]
  );
  const isFormLocked = isLoading || isSaving || !hasPetProfile;
  const displayPetName = petName || copy.documentsPetNameFallback;

  function updateField(field: keyof DocumentFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setValidationError(null);
    setSaveError(null);
  }

  async function submitDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError(null);
    setValidationError(null);

    if (!form.title.trim()) {
      setValidationError(copy.documentsValidationTitle);
      return;
    }

    if (!form.documentDate) {
      setValidationError(copy.documentsValidationDate);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/documents", {
        method: editingDocumentId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editingDocumentId ? { id: editingDocumentId } : {}),
          ...createPayloadFromForm(form)
        })
      });
      const body = (await response.json()) as DocumentsApiResponse;

      if (!response.ok || !body.ok || !body.document) {
        throw new Error(body.message || "Document save failed.");
      }

      const savedDocument = body.document;
      setDocuments((current) => upsertDocument(current, savedDocument));
      resetForm();
    } catch {
      setSaveError(copy.documentsSaveError);
    } finally {
      setIsSaving(false);
    }
  }

  function editDocument(document: DocumentResponse) {
    setEditingDocumentId(document.id);
    setForm({
      title: document.title,
      documentType: document.documentType,
      documentDate: document.documentDate,
      providerName: document.providerName ?? "",
      originalFilename: document.originalFilename ?? "",
      mimeType: document.mimeType ?? "",
      notes: document.notes ?? ""
    });
    setValidationError(null);
    setSaveError(null);
  }

  function resetForm() {
    setEditingDocumentId(null);
    setForm(emptyDocumentForm);
    setValidationError(null);
    setSaveError(null);
  }

  return (
    <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16" aria-labelledby="document-vault-title">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef8ff] text-[#0876a8]" aria-hidden="true">
            <AppIcon name="document" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-navy/54">{copy.documentsEyebrow}</p>
            <h1 id="document-vault-title" className="mt-2 font-serif text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[0] text-navy">
              {formatPetCopy(copy.documentsTitle, displayPetName)}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-navy/78">{copy.documentsIntro}</p>
          </div>
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm font-bold text-navy/66" role="status">
            {copy.documentsLoading}
          </p>
        ) : null}
        {loadError ? <p className="mt-6 text-sm font-bold text-[#b42318]">{loadError}</p> : null}

        {!isLoading && !hasPetProfile ? (
          <div className="mt-8 rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{copy.documentsPetRequiredTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-navy/66">{copy.documentsPetRequiredBody}</p>
            <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white" type="button" onClick={onPetsRequest}>
              {copy.documentsPetRequiredAction}
            </button>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 rounded-lg border border-[#e6e9ef] bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            {sortedDocuments.length > 0 ? (
              <ul className="space-y-3">
                {sortedDocuments.map((document) => (
                  <DocumentListItem copy={copy} document={document} isBusy={isSaving} key={document.id} onEdit={editDocument} />
                ))}
              </ul>
            ) : (
              <div className="rounded-lg border border-dashed border-[#dce2ec] bg-[#f8fafc] p-5">
                <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.documentsEmptyTitle}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{formatPetCopy(copy.documentsEmptyBody, displayPetName)}</p>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <form className="rounded-lg border border-[#e6e9ef] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]" onSubmit={submitDocument}>
              <h2 className="font-serif text-2xl font-black tracking-[0] text-navy">{editingDocumentId ? copy.documentsFormTitleEdit : copy.documentsFormTitleCreate}</h2>
              <div className="mt-5 space-y-4">
                <DocumentTextField
                  disabled={isFormLocked}
                  label={copy.documentsTitleLabel}
                  name="title"
                  onChange={(value) => updateField("title", value)}
                  placeholder={copy.documentsTitlePlaceholder}
                  required
                  value={form.title}
                />
                <DocumentTypeSelect copy={copy} disabled={isFormLocked} onChange={(value) => updateField("documentType", value)} value={form.documentType} />
                <DocumentTextField
                  disabled={isFormLocked}
                  label={copy.documentsDateLabel}
                  name="documentDate"
                  onChange={(value) => updateField("documentDate", value)}
                  required
                  type="date"
                  value={form.documentDate}
                />
                <DocumentTextField
                  disabled={isFormLocked}
                  label={copy.documentsProviderLabel}
                  name="providerName"
                  onChange={(value) => updateField("providerName", value)}
                  placeholder={copy.documentsProviderPlaceholder}
                  value={form.providerName}
                />
                <DocumentTextField
                  disabled={isFormLocked}
                  label={copy.documentsFilenameLabel}
                  name="originalFilename"
                  onChange={(value) => updateField("originalFilename", value)}
                  placeholder={copy.documentsFilenamePlaceholder}
                  value={form.originalFilename}
                />
                <DocumentTextField
                  disabled={isFormLocked}
                  label={copy.documentsMimeTypeLabel}
                  name="mimeType"
                  onChange={(value) => updateField("mimeType", value)}
                  placeholder={copy.documentsMimeTypePlaceholder}
                  value={form.mimeType}
                />
                <DocumentTextareaField
                  disabled={isFormLocked}
                  label={copy.documentsNotesLabel}
                  name="notes"
                  onChange={(value) => updateField("notes", value)}
                  placeholder={copy.documentsNotesPlaceholder}
                  value={form.notes}
                />
              </div>

              {validationError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{validationError}</p> : null}
              {saveError ? <p className="mt-4 text-sm font-bold text-[#b42318]">{saveError}</p> : null}

              <div className="mt-5 flex flex-col gap-3">
                <button className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f172a] px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#94a3b8]" disabled={isFormLocked} type="submit">
                  {isSaving ? copy.documentsSavingAction : editingDocumentId ? copy.documentsUpdateAction : copy.documentsCreateAction}
                </button>
                {editingDocumentId ? (
                  <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-5 text-sm font-black text-navy" type="button" onClick={resetForm}>
                    {copy.documentsCancelEditAction}
                  </button>
                ) : null}
              </div>
            </form>

            <div className="rounded-lg border border-[#cbe7f7] bg-[#f2fbff] p-5">
              <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{copy.documentsUnavailableTitle}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">{copy.documentsUnavailableBody}</p>
              <button className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-[#b8dced] bg-white px-4 text-sm font-black text-navy/54" disabled type="button">
                {copy.documentsUnavailableAction}
              </button>
            </div>
          </aside>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-navy/62">{copy.documentsPrivacyNote}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-navy/62">{copy.medicalBoundary}</p>
      </div>
    </section>
  );
}

function DocumentListItem({
  copy,
  document,
  isBusy,
  onEdit
}: {
  copy: AccountCopy;
  document: DocumentResponse;
  isBusy: boolean;
  onEdit: (document: DocumentResponse) => void;
}) {
  return (
    <li
      className="grid gap-4 rounded-lg border border-[#e6e9ef] bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center"
      data-testid="document-vault-row"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 text-base font-black leading-6 text-navy">{document.title}</h3>
          <span className="rounded-full bg-[#eef8ff] px-2.5 py-1 text-xs font-black text-[#0876a8]">{getDocumentTypeLabel(copy, document.documentType)}</span>
          <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-xs font-black text-navy/62">{copy.documentsMetadataBadge}</span>
        </div>
        <p className="mt-2 text-sm font-bold text-navy/66">{document.documentDate}</p>
        {document.providerName ? <p className="mt-2 text-sm font-semibold text-navy/62">{document.providerName}</p> : null}
        {document.originalFilename ? <p className="mt-1 text-sm font-semibold text-navy/54">{document.originalFilename}</p> : null}
        {document.notes ? <p className="mt-2 text-sm leading-6 text-navy/62">{document.notes}</p> : null}
      </div>
      <button
        className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#dce2ec] bg-white px-4 text-sm font-black text-navy disabled:cursor-not-allowed disabled:text-navy/36"
        data-testid="document-vault-edit"
        disabled={isBusy}
        type="button"
        onClick={() => onEdit(document)}
      >
        {copy.documentsEditAction}
      </button>
    </li>
  );
}

function DocumentTextField({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value
}: {
  disabled?: boolean;
  label: string;
  name: keyof DocumentFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`document-vault-field-${name}`}>
      {label}
      <input
        className="mt-2 min-h-11 w-full rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#0876a8] focus:ring-2 focus:ring-[#dff4ff]"
        disabled={disabled}
        id={`document-vault-field-${name}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function DocumentTypeSelect({
  copy,
  disabled,
  onChange,
  value
}: {
  copy: AccountCopy;
  disabled?: boolean;
  onChange: (value: DocumentType) => void;
  value: DocumentType;
}) {
  const options: DocumentType[] = ["vaccination", "lab_result", "visit_summary", "prescription", "insurance", "travel", "other"];

  return (
    <label className="block text-sm font-black text-navy" htmlFor="document-vault-documentType">
      {copy.documentsTypeLabel}
      <select
        className="mt-2 min-h-11 w-full rounded-md border border-[#dce2ec] bg-white px-3 text-base font-semibold text-navy outline-none transition focus:border-[#0876a8] focus:ring-2 focus:ring-[#dff4ff]"
        disabled={disabled}
        id="document-vault-documentType"
        name="documentType"
        onChange={(event) => onChange(event.target.value as DocumentType)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {getDocumentTypeLabel(copy, option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function DocumentTextareaField({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  value
}: {
  disabled?: boolean;
  label: string;
  name: keyof DocumentFormState;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-black text-navy" htmlFor={`document-vault-field-${name}`}>
      {label}
      <textarea
        className="mt-2 min-h-24 w-full resize-y rounded-md border border-[#dce2ec] bg-white px-3 py-3 text-base font-semibold text-navy outline-none transition focus:border-[#0876a8] focus:ring-2 focus:ring-[#dff4ff]"
        disabled={disabled}
        id={`document-vault-field-${name}`}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function createPayloadFromForm(form: DocumentFormState) {
  return {
    title: form.title,
    documentType: form.documentType,
    documentDate: form.documentDate,
    providerName: form.providerName,
    originalFilename: form.originalFilename,
    mimeType: form.mimeType,
    notes: form.notes
  };
}

function upsertDocument(documents: DocumentResponse[], nextDocument: DocumentResponse) {
  const exists = documents.some((document) => document.id === nextDocument.id);
  const nextDocuments = exists
    ? documents.map((document) => (document.id === nextDocument.id ? nextDocument : document))
    : [...documents, nextDocument];

  return nextDocuments.sort((first, second) => second.documentDate.localeCompare(first.documentDate));
}

function getDocumentTypeLabel(copy: AccountCopy, type: DocumentType) {
  if (type === "vaccination") return copy.documentsTypeVaccination;
  if (type === "lab_result") return copy.documentsTypeLabResult;
  if (type === "visit_summary") return copy.documentsTypeVisitSummary;
  if (type === "prescription") return copy.documentsTypePrescription;
  if (type === "insurance") return copy.documentsTypeInsurance;
  if (type === "travel") return copy.documentsTypeTravel;
  return copy.documentsTypeOther;
}

function formatPetCopy(template: string, petName: string) {
  return template.replace("{petName}", petName);
}
