import type { LegalPageKey } from "./content";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { useLanguage } from "./hooks/useLanguage";
import { LandingPage } from "./pages/LandingPage";
import { LegalPage } from "./pages/LegalPage";
import { Wave2Page } from "./pages/Wave2Page";
import { Wave3Page } from "./pages/Wave3Page";

export default function App() {
  const { language, setLanguage } = useLanguage();
  const activeLegalPage = getActiveLegalPage();
  const isWave2Page = getIsWave2Page();
  const isWave3Page = getIsWave3Page();

  return (
    <main className={`min-h-screen bg-white text-navy ${activeLegalPage ? "" : "overflow-hidden"}`}>
      <SiteHeader language={language} onLanguageChange={setLanguage} />
      {activeLegalPage ? (
        <LegalPage language={language} pageKey={activeLegalPage} />
      ) : isWave2Page ? (
        <Wave2Page language={language} />
      ) : isWave3Page ? (
        <Wave3Page language={language} />
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

function getIsWave2Page(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.pathname.replace(/\/$/, "") === "/wave-2-exploration";
}

function getIsWave3Page(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location.pathname.replace(/\/$/, "") === "/wave-3-research";
}
