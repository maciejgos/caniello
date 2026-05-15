type AnalyticsConsentPopupProps = {
  text: {
    analyticsTitle: string;
    analyticsBody: string;
    analyticsAccept: string;
    analyticsDecline: string;
  };
  onSelect: (granted: boolean) => void;
};

export function AnalyticsConsentPopup({ text, onSelect }: AnalyticsConsentPopupProps) {
  return (
    <aside
      className="fixed bottom-4 left-4 right-4 z-40 rounded-lg border border-navy/10 bg-white p-4 text-sm leading-6 text-navy shadow-soft sm:bottom-6 sm:left-auto sm:right-6 sm:w-[380px]"
      aria-label={text.analyticsTitle}
    >
      <strong className="block">{text.analyticsTitle}</strong>
      <p className="mt-1 text-xs leading-5 text-navy/78">{text.analyticsBody}</p>
      <div className="mt-3 flex justify-end gap-2">
        <button className="rounded-md bg-navy px-4 py-2 text-sm font-bold text-white hover:bg-navySoft" type="button" onClick={() => onSelect(true)}>
          {text.analyticsAccept}
        </button>
        <button className="rounded-md border border-navy/20 bg-white px-4 py-2 text-sm font-bold text-navy hover:bg-cream" type="button" onClick={() => onSelect(false)}>
          {text.analyticsDecline}
        </button>
      </div>
    </aside>
  );
}
