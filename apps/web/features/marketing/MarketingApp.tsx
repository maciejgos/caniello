"use client";

import { useEffect } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { VercelTelemetry } from "./components/VercelTelemetry";
import { useLanguage } from "./hooks/useLanguage";
import { ClinicPage } from "./pages/ClinicPage";
import { LandingPage } from "./pages/LandingPage";
import { LegalPage } from "./pages/LegalPage";
import { MarketplacePage } from "./pages/MarketplacePage";

export type MarketingRoute = "home" | "privacy" | "terms" | "medical-boundaries" | "marketplace" | "clinics";

type MarketingAppProps = {
  route: MarketingRoute;
};

export function MarketingApp({ route }: MarketingAppProps) {
  const { language, setLanguage } = useLanguage();
  const isLegalPage = route === "privacy" || route === "terms" || route === "medical-boundaries";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [route]);

  return (
    <main className={`min-h-screen bg-white text-navy ${isLegalPage ? "" : "overflow-hidden"}`}>
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      <MarketingRouteView route={route} language={language} />
      <SiteFooter language={language} />
      <VercelTelemetry />
    </main>
  );
}

type MarketingRouteViewProps = {
  route: MarketingRoute;
  language: ReturnType<typeof useLanguage>["language"];
};

function MarketingRouteView({ route, language }: MarketingRouteViewProps) {
  if (route === "privacy" || route === "terms" || route === "medical-boundaries") {
    return <LegalPage language={language} pageKey={route} />;
  }

  if (route === "marketplace") {
    return <MarketplacePage language={language} />;
  }

  if (route === "clinics") {
    return <ClinicPage language={language} />;
  }

  return <LandingPage language={language} />;
}

