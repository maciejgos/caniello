import { WaitlistForm } from "./WaitlistForm";
import type { Language } from "../content";
import { copy } from "../content";

type ResearchDialogProps = {
  language: Language;
  waveIndex: 0 | 1;
  onClose: () => void;
};

export function ResearchDialog({ language, waveIndex, onClose }: ResearchDialogProps) {
  const text = copy[language];
  const wave = text.futureWaves[waveIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/55 px-4 py-4 sm:items-center" role="presentation">
      <section
        className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-auto rounded-lg bg-white p-5 shadow-soft sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-dialog-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold">{wave.eyebrow}</p>
            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-navy" id="research-dialog-title">
              {wave.wave}: {wave.title}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-navy/75">{wave.note}</p>
          </div>
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-navy/10 text-xl font-bold text-navy hover:bg-cream focus:outline-none focus:ring-4 focus:ring-gold/20"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-6">
          <WaitlistForm
            language={language}
            role={waveIndex === 0 ? "pet_service_provider" : "clinic_vet"}
            interestWave={waveIndex === 0 ? "wave_2" : "wave_3"}
            source={waveIndex === 0 ? "landing_page_wave2" : "landing_page_wave3"}
            submitLabel={wave.cta}
            successMessage={wave.success}
            optionalFields={wave.fields}
          />
        </div>
      </section>
    </div>
  );
}
