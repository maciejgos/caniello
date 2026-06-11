import { createSupabaseServiceRoleClient, readSupabaseServiceRoleConfig } from "@caniello/db";
import type { DocumentResponse, PetProfileResponse, ReminderResponse } from "@caniello/contracts";
import { readSharedCareCard } from "../../../features/account/server/share-links";
import { BrandWordmark } from "../../../features/marketing/components/BrandWordmark";

type SharePageProps = {
  params: {
    token: string;
  };
};

export default async function Page({ params }: SharePageProps) {
  const config = readSupabaseServiceRoleConfig();
  const result = config
    ? await readSharedCareCard(params.token, createSupabaseServiceRoleClient(config))
    : { ok: false as const, status: 503, message: "This care card link is unavailable." };

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-5 py-6 text-navy sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[980px]">
        <header className="flex flex-col gap-5 border-b border-[#e6e9ef] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <BrandWordmark small />
          <p className="w-fit rounded-md border border-[#dbe7dc] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#0d8b5f]">
            Udostepniona karta opieki
          </p>
        </header>

        {result.ok ? (
          <SharedCareCard
            documents={result.documents}
            expiresAt={result.expiresAt}
            pet={result.pet}
            reminders={result.reminders}
          />
        ) : (
          <section className="mt-10 rounded-lg border border-[#e6e9ef] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-black leading-tight tracking-[0] text-navy">
              Link jest niedostepny
            </h1>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-navy/70">
              Ta karta opieki mogla zostac odwolana, wygasnac albo miec nieprawidlowy adres. Nie pokazujemy danych zwierzecia ani wlasciciela, gdy link nie jest aktywny.
            </p>
          </section>
        )}

        <footer className="mt-8 rounded-lg border border-[#e6e9ef] bg-white p-5 text-sm font-semibold leading-6 text-navy/66">
          Caniello porzadkuje informacje zapisane przez opiekuna. Ta strona nie jest diagnoza, zaleceniem leczenia ani oficjalnym paszportem UE dla zwierzecia.
        </footer>
      </div>
    </main>
  );
}

function SharedCareCard({
  documents,
  expiresAt,
  pet,
  reminders
}: {
  documents: DocumentResponse[];
  expiresAt: string | null;
  pet: PetProfileResponse;
  reminders: ReminderResponse[];
}) {
  return (
    <article className="mt-10 rounded-lg border border-[#dbe7dc] bg-[#fbfffb] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-4 border-b border-[#dbe7dc] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#0d8b5f]">Karta opieki</p>
          <h1 className="mt-2 font-serif text-[clamp(2.3rem,5vw,4rem)] font-black leading-tight tracking-[0] text-navy">
            {pet.name}
          </h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-navy/66">
            {[pet.species, pet.breed, pet.birthDate].filter(Boolean).join(" · ") || "Podstawowe dane nie sa uzupelnione"}
          </p>
        </div>
        <p className="w-fit rounded-md border border-[#bae6d1] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#0d8b5f]">
          Tylko do odczytu
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <SharedField label="Mikrochip" value={pet.microchipNumber} />
        <SharedField label="Waga" value={pet.weightKg === null ? null : `${pet.weightKg} kg`} />
        <SharedField label="Alergie" value={pet.allergies} />
        <SharedField label="Leki" value={pet.medication} />
        <div className="md:col-span-2">
          <SharedField label="Wazne notatki" value={pet.importantNotes} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <SharedList title="Najblizsze przypomnienia" empty="Brak aktywnych przypomnien w tej karcie.">
          {reminders.map((reminder) => (
            <li className="rounded-md border border-[#e6e9ef] bg-white p-3" key={reminder.id}>
              <p className="text-sm font-black text-navy">{reminder.title}</p>
              <p className="mt-1 text-xs font-semibold text-navy/62">
                {formatReminderType(reminder.reminderType)} · {reminder.dueDate}
              </p>
            </li>
          ))}
        </SharedList>
        <SharedList title="Ostatnie dokumenty" empty="Brak metadanych dokumentow w tej karcie.">
          {documents.map((document) => (
            <li className="rounded-md border border-[#e6e9ef] bg-white p-3" key={document.id}>
              <p className="text-sm font-black text-navy">{document.title}</p>
              <p className="mt-1 text-xs font-semibold text-navy/62">
                {formatDocumentType(document.documentType)} · {document.documentDate}
              </p>
              {document.providerName ? <p className="mt-1 text-xs font-semibold text-navy/54">{document.providerName}</p> : null}
            </li>
          ))}
        </SharedList>
      </div>

      <p className="mt-6 rounded-md border border-[#e6e9ef] bg-white p-4 text-sm font-semibold leading-6 text-navy/66">
        {expiresAt ? `Link wygasa: ${expiresAt.slice(0, 10)}.` : "Ten link nie ma daty wygasniecia."} Wlasciciel moze odwolac dostep w Caniello.
      </p>
    </article>
  );
}

function SharedField({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-md border border-[#e6e9ef] bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-navy/54">{label}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-navy">{value?.trim() || "Brak danych"}</p>
    </div>
  );
}

function SharedList({ children, empty, title }: { children: React.ReactNode; empty: string; title: string }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <section className="min-w-0">
      <h2 className="font-serif text-xl font-black tracking-[0] text-navy">{title}</h2>
      {hasItems ? <ul className="mt-3 space-y-3">{children}</ul> : <p className="mt-3 rounded-md border border-dashed border-[#dce2ec] bg-white p-3 text-sm font-semibold leading-6 text-navy/62">{empty}</p>}
    </section>
  );
}

function formatReminderType(reminderType: ReminderResponse["reminderType"]): string {
  const labels = {
    vaccination: "Szczepienie",
    medication: "Leki",
    deworming: "Odrobaczanie",
    visit: "Wizyta",
    other: "Inne"
  };

  return labels[reminderType];
}

function formatDocumentType(documentType: DocumentResponse["documentType"]): string {
  const labels = {
    vaccination: "Szczepienie",
    lab_result: "Wynik badania",
    visit_summary: "Podsumowanie wizyty",
    prescription: "Recepta",
    insurance: "Ubezpieczenie",
    travel: "Podroz",
    other: "Inne"
  };

  return labels[documentType];
}
