import petsImage from "../assets/auth-hero-pets.png";
import type { AccountCopy } from "../content";
import { OnboardingIcon } from "./OnboardingIcon";

export function DocumentSetupPanel({ copy }: { copy: AccountCopy }) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-[#f0d9ba] bg-[#fffaf4] p-5 shadow-[0_16px_45px_rgba(88,54,20,0.06)]" aria-labelledby="first-document-title">
      <img className="pointer-events-none absolute bottom-0 right-[-48px] hidden h-56 w-72 object-cover object-[75%_72%] opacity-85 lg:block" src={typeof petsImage === "string" ? petsImage : petsImage.src} alt="" />
      <div className="relative">
        <DocumentPanelHeader copy={copy} />
        <DocumentPreviewFlow copy={copy} />
        <DocumentPreviewActions copy={copy} />
      </div>
    </section>
  );
}

function DocumentPanelHeader({ copy }: { copy: AccountCopy }) {
  return (
    <>
      <p className="text-sm font-black text-[#f59a23]">{copy.onboardingDocumentStepLabel}</p>
      <h2 id="first-document-title" className="mt-2 font-serif text-3xl font-black leading-tight tracking-[0] text-navy">{copy.onboardingDocumentTitle}</h2>
      <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-navy/68">{copy.onboardingDocumentBody}</p>
    </>
  );
}

function DocumentPreviewFlow({ copy }: { copy: AccountCopy }) {
  return (
    <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(150px,0.8fr)_86px_minmax(230px,1fr)] lg:items-center">
      <DocumentCard copy={copy} />
      <ExtractionStatus label={copy.onboardingExtracting} />
      <ReviewCard copy={copy} />
    </div>
  );
}

function DocumentPreviewActions({ copy }: { copy: AccountCopy }) {
  return (
    <>
      <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.72fr)]">
        <button className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-navy px-5 text-sm font-black text-white opacity-55" disabled type="button">
          <OnboardingIcon name="upload" small />
          {copy.onboardingUploadPreview}
        </button>
        <button className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#d8dee9] bg-white px-5 text-sm font-black text-navy/70" disabled type="button">
          <OnboardingIcon name="scan" small />
          {copy.onboardingScanPreview}
        </button>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-navy/58">
        <OnboardingIcon name="lock" small />
        {copy.onboardingDocumentPrivacy}
      </p>
    </>
  );
}

function DocumentCard({ copy }: { copy: AccountCopy }) {
  return (
    <div className="rounded-lg border border-[#d8cfed] bg-[#fbf9ff] p-4 shadow-[0_14px_34px_rgba(118,81,230,0.08)]">
      <h3 className="text-sm font-black leading-5 text-navy">{copy.onboardingDocumentCardTitle}</h3>
      <p className="mt-1 text-sm font-black text-navy">{copy.onboardingDocumentCardPet}</p>
      <p className="mt-2 text-xs font-semibold text-navy/58">{copy.onboardingDocumentCardDate}</p>
      <p className="text-xs font-semibold text-navy/58">{copy.onboardingDocumentCardProvider}</p>
      <div className="mt-4 overflow-hidden rounded-md border border-[#e1e5ee] bg-white text-[10px] font-semibold text-navy/72">
        {["Vaccine", "DHPP", "Bordetella", "Rabies"].map((row, index) => (
          <div className="grid grid-cols-2 border-b border-[#edf0f5] last:border-b-0" key={row}>
            <span className="px-2 py-1">{row}</span>
            <span className="border-l border-[#edf0f5] px-2 py-1">{index === 0 ? "Date" : copy.onboardingDocumentCardDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtractionStatus({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 lg:block">
      <span className="hidden flex-1 border-t border-dashed border-[#8d63f0] lg:block" aria-hidden="true" />
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[#bca8f4] bg-[#eee8ff] text-[#7651e6]" aria-hidden="true">
        <OnboardingIcon name="sparkle" />
      </span>
      <p className="mt-2 max-w-[96px] text-center text-xs font-black leading-5 text-navy">{label}</p>
      <span className="hidden flex-1 border-t border-dashed border-[#8d63f0] lg:block" aria-hidden="true" />
    </div>
  );
}

function ReviewCard({ copy }: { copy: AccountCopy }) {
  const rows = [
    [copy.onboardingReviewPet, copy.onboardingDocumentCardPet],
    [copy.onboardingReviewType, copy.onboardingDocumentCardTitle],
    [copy.onboardingReviewVisit, copy.onboardingDocumentCardDate],
    [copy.onboardingReviewProvider, copy.onboardingDocumentCardProvider]
  ];

  return (
    <div className="rounded-lg border border-[#d8dee9] bg-white p-4 shadow-[0_18px_42px_rgba(7,31,73,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xs font-black text-navy">{copy.onboardingReviewTitle}</h3>
        <span className="rounded-full bg-[#eaf6ef] px-3 py-1 text-[10px] font-black text-[#27764d]">{copy.onboardingReadyToSave}</span>
      </div>
      <dl className="grid gap-3">
        {rows.map(([label, value]) => (
          <div className="grid grid-cols-[92px_1fr] items-center gap-3 text-xs" key={label}>
            <dt className="font-black text-navy/58">{label}</dt>
            <dd className="min-h-8 rounded-md border border-[#e1e5ee] bg-white px-3 py-2 font-semibold text-navy/78">{value}</dd>
          </div>
        ))}
      </dl>
      <button className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#174c9f]" disabled type="button">
        <OnboardingIcon name="eye" small />
        {copy.onboardingPreviewDocument}
      </button>
    </div>
  );
}
