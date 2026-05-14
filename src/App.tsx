import type { LegalPageKey } from "./content";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { useLanguage } from "./hooks/useLanguage";
import { ClinicPage } from "./pages/ClinicPage";
import { LandingPage } from "./pages/LandingPage";
import { LegalPage } from "./pages/LegalPage";
import { MarketplacePage } from "./pages/MarketplacePage";

export default function App() {
  const { language, setLanguage } = useLanguage();
  const activeLegalPage = getActiveLegalPage();
  const isMarketplacePage = getIsMarketplacePage();
  const isClinicPage = getIsClinicPage();

  return (
    <main className={`min-h-screen bg-white text-navy ${activeLegalPage ? "" : "overflow-hidden"}`}>
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      {activeLegalPage ? (
        <LegalPage language={language} pageKey={activeLegalPage} />
      ) : isMarketplacePage ? (
        <MarketplacePage language={language} />
      ) : isClinicPage ? (
        <ClinicPage language={language} />
      ) : (
        <LandingPage language={language} />
      )}
      <SiteFooter language={language} />
    </main>
  );
}

function getActiveLegalPage(): LegalPageKey | null {
  if (typeof window === "undefined") {
    return null;
  }

  const path = window.location.pathname.replace(/\/$/, "");

  if (path === "/privacy") {
    return "privacy";
  }

  if (path === "/terms") {
    return "terms";
  }

  if (path === "/medical-boundaries") {
    return "medical-boundaries";
  }

  return null;
}

function getIsMarketplacePage(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.pathname.replace(/\/$/, "") === "/wave-2-exploration";
}

function getIsClinicPage(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.pathname.replace(/\/$/, "") === "/wave-3-research";
}
