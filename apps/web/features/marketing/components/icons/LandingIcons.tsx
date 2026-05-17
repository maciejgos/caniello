export function PawIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="18" cy="14" r="2" />
      <path d="M8.5 18.5c0-2.2 1.6-4 3.5-4s3.5 1.8 3.5 4c0 1.2-.8 2-2 2h-3c-1.2 0-2-.8-2-2Z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <path d="M6 11h12v9H6z" />
    </svg>
  );
}

export function LargePawIcon() {
  return (
    <svg className="h-20 w-20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
      <ellipse cx="21" cy="20" rx="6" ry="9" />
      <ellipse cx="33" cy="15" rx="6" ry="9" />
      <ellipse cx="45" cy="20" rx="6" ry="9" />
      <ellipse cx="15" cy="34" rx="6" ry="8" />
      <ellipse cx="50" cy="34" rx="6" ry="8" />
      <path d="M20 48c0-9 6-16 13-16s13 7 13 16c0 5-3 8-8 8H28c-5 0-8-3-8-8Z" />
    </svg>
  );
}

export function FutureWaveIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f3ff] text-navy">
        <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 10h16l-1.2-4H5.2L4 10Z" />
          <path d="M5 10v9h14v-9" />
          <path d="M9 19v-5h6v5" />
          <path d="M3.5 10c0 1.5 1.1 2.6 2.5 2.6S8.5 11.5 8.5 10" />
          <path d="M8.5 10c0 1.5 1.1 2.6 2.5 2.6s2.5-1.1 2.5-2.6" />
          <path d="M13.5 10c0 1.5 1.1 2.6 2.5 2.6s2.5-1.1 2.5-2.6" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f3ff] text-navy">
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 20V9l8-5 8 5v11" />
        <path d="M9 20v-6h6v6" />
        <path d="M12 8v4" />
        <path d="M10 10h4" />
        <circle cx="18" cy="17" r="3" />
        <path d="M18 15.7v2.6" />
        <path d="M16.7 17h2.6" />
      </svg>
    </span>
  );
}

export function FeatureIcon({ index }: { index: number }) {
  const className = "h-11 w-11";

  if (index === 1) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M15 17H9a3 3 0 0 1-3-3v-2a6 6 0 1 1 12 0v2a3 3 0 0 1-3 3Z" />
        <path d="M10 20h4" />
        <path d="M12 4V2" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M16 12a3.5 3.5 0 1 0 0-7" />
        <path d="M2.5 21a5.5 5.5 0 0 1 11 0" />
        <path d="M14.5 16.5A5 5 0 0 1 21.5 21" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3 4.5 6v5.5c0 4.5 3 7.8 7.5 9.5 4.5-1.7 7.5-5 7.5-9.5V6L12 3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h3" />
      <path d="M17 16v6" />
      <path d="M14 19h6" />
    </svg>
  );
}

export function BenefitIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="mt-1 h-8 w-8 shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m21 3-8.5 18-3-7.5L3 10.5 21 3Z" />
        <path d="m9.5 13.5 4.5-4.5" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="mt-1 h-8 w-8 shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 12v8H4v-8" />
        <path d="M2.5 7h19v5h-19z" />
        <path d="M12 7v13" />
        <path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5c0 1.4 1 2.5 1 2.5Z" />
        <path d="M12 7h3.5A2.5 2.5 0 1 0 13 4.5c0 1.4-1 2.5-1 2.5Z" />
      </svg>
    );
  }

  return (
    <svg className="mt-1 h-8 w-8 shrink-0 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20s-7-4.4-9.2-8.3C.9 8.2 2.9 5 6.2 5c1.8 0 3.2 1 3.9 2.1C10.8 6 12.2 5 14 5c3.3 0 5.3 3.2 3.4 6.7C15.2 15.6 12 20 12 20Z" />
    </svg>
  );
}
