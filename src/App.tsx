import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { useLanguage } from "./hooks/useLanguage";
import { ClinicPage } from "./pages/ClinicPage";
import { LandingPage } from "./pages/LandingPage";
import { LegalPage } from "./pages/LegalPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { VercelTelemetry } from "./components/VercelTelemetry";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <VercelTelemetry />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const { language, setLanguage } = useLanguage();

  return (
    <Routes>
      <Route element={<AppLayout language={language} onLanguageChange={setLanguage} />}>
        <Route index element={<LandingPage language={language} />} />
        <Route path="privacy" element={<LegalPage language={language} pageKey="privacy" />} />
        <Route path="terms" element={<LegalPage language={language} pageKey="terms" />} />
        <Route path="medical-boundaries" element={<LegalPage language={language} pageKey="medical-boundaries" />} />
        <Route path="marketplace" element={<MarketplacePage language={language} />} />
        <Route path="clinics" element={<ClinicPage language={language} />} />
        <Route path="wave-2-exploration" element={<Navigate replace to="/marketplace" />} />
        <Route path="wave-3-research" element={<Navigate replace to="/clinics" />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}

type AppLayoutProps = {
  language: ReturnType<typeof useLanguage>["language"];
  onLanguageChange: ReturnType<typeof useLanguage>["setLanguage"];
};

function AppLayout({ language, onLanguageChange }: AppLayoutProps) {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/$/, "");
  const isLegalPage = normalizedPath === "/privacy" || normalizedPath === "/terms" || normalizedPath === "/medical-boundaries";

  return (
    <main className={`min-h-screen bg-white text-navy ${isLegalPage ? "" : "overflow-hidden"}`}>
      <SiteHeader language={language} onLanguageChange={onLanguageChange} />
      <Outlet />
      <SiteFooter language={language} />
    </main>
  );
}
