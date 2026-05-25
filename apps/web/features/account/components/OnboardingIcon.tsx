export type OnboardingIconName = "arrow" | "bulb" | "calendar" | "chat" | "chevron" | "document" | "edit" | "eye" | "lock" | "paw" | "scan" | "sparkle" | "upload";

type OnboardingIconProps = {
  name: OnboardingIconName;
  small?: boolean;
};

export function OnboardingIcon({ name, small = false }: OnboardingIconProps) {
  const size = small ? "h-4 w-4" : "h-7 w-7";

  if (name === "paw") {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7.2 10.1c-1.3-.1-2.2-1.5-2-3.1.1-1.5 1.2-2.7 2.5-2.6 1.3.1 2.2 1.5 2.1 3.1-.2 1.6-1.3 2.7-2.6 2.6Z" />
        <path d="M16.8 10.1c1.3-.1 2.2-1.5 2-3.1-.1-1.5-1.2-2.7-2.5-2.6-1.3.1-2.2 1.5-2.1 3.1.2 1.6 1.3 2.7 2.6 2.6Z" />
        <path d="M11.7 9.1c-1.2 0-2.1-1.2-2.1-2.7s.9-2.7 2.1-2.7 2.1 1.2 2.1 2.7-.9 2.7-2.1 2.7Z" />
        <path d="M7.3 18.1c.2-3.5 2.2-6.2 4.7-6.2s4.5 2.7 4.7 6.2c.1 1.5-1 2.6-2.4 2.2l-1.4-.4a3.4 3.4 0 0 0-1.8 0l-1.4.4c-1.4.4-2.5-.7-2.4-2.2Z" />
      </svg>
    );
  }

  if (name === "document") {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 3h7l4 4v14H7V3Z" />
        <path d="M14 3v5h4" />
        <path d="M9.5 12h5" />
        <path d="M9.5 16h5" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 18.5V7a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H9l-4 3.5Z" />
      </svg>
    );
  }

  if (name === "sparkle") {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 9.8 9.8 3 12l6.8 2.2L12 21l2.2-6.8L21 12l-6.8-2.2L12 3Z" />
        <path d="m18 4 .8 2.2L21 7l-2.2.8L18 10l-.8-2.2L15 7l2.2-.8L18 4Z" />
      </svg>
    );
  }

  if (name === "bulb") {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8.7 15.5c-1.7-1.1-2.8-3-2.8-5.1a6.1 6.1 0 1 1 12.2 0c0 2.1-1.1 4-2.8 5.1-.7.5-1.1 1.1-1.2 1.9H9.9c-.1-.8-.5-1.4-1.2-1.9Z" />
      </svg>
    );
  }

  const paths = {
    arrow: <path d="M5 12h13m-5-5 5 5-5 5" />,
    calendar: <><path d="M5 5h14v14H5z" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M5 9h14" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    edit: <><path d="m5 19 3.5-.8L18 8.7 15.3 6 5.8 15.5 5 19Z" /><path d="m14 7 3 3" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></>,
    lock: <><path d="M7 11V8a5 5 0 0 1 10 0v3" /><path d="M6 11h12v9H6z" /></>,
    scan: <><path d="M4 8V5h3" /><path d="M17 5h3v3" /><path d="M20 16v3h-3" /><path d="M7 19H4v-3" /><path d="M8 12h8" /></>,
    upload: <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></>
  }[name];

  return (
    <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths}
    </svg>
  );
}
