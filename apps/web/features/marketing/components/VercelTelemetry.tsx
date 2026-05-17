import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useState } from "react";
import { analyticsConsentChangedEvent, readAnalyticsConsent } from "../lib/validation-events";

export function VercelTelemetry() {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(() => (typeof window === "undefined" ? false : readAnalyticsConsent()));

  useEffect(() => {
    function syncAnalyticsConsent() {
      setHasAnalyticsConsent(readAnalyticsConsent());
    }

    window.addEventListener(analyticsConsentChangedEvent, syncAnalyticsConsent);
    window.addEventListener("storage", syncAnalyticsConsent);

    return () => {
      window.removeEventListener(analyticsConsentChangedEvent, syncAnalyticsConsent);
      window.removeEventListener("storage", syncAnalyticsConsent);
    };
  }, []);

  if (!hasAnalyticsConsent) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
