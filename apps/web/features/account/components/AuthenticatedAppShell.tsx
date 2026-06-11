import { useState } from "react";
import type { AccountLanguage } from "../content";
import { accountCopy } from "../content";
import { AppHomeDashboard } from "./AppHomeDashboard";
import { AppSidebar, MobileAppNav } from "./AppSidebar";
import { AppSectionEmptyState } from "./AppSectionEmptyState";
import { AppTopBar } from "./AppTopBar";
import { CareCardPreviewSection } from "./CareCardPreviewSection";
import { CareRemindersSection } from "./CareRemindersSection";
import { DocumentVaultSection } from "./DocumentVaultSection";
import { PetProfileSection } from "./PetProfileSection";

export type AppSection = "home" | "pets" | "timeline" | "documents" | "reminders" | "ask" | "sharing" | "settings";

type AuthenticatedAppShellProps = {
  language: AccountLanguage;
  onLanguageChange: (language: AccountLanguage) => void;
};

export function AuthenticatedAppShell({ language, onLanguageChange }: AuthenticatedAppShellProps) {
  const copy = accountCopy[language];
  const [activeSection, setActiveSection] = useState<AppSection>("home");

  async function logout() {
    await fetch("/api/account/logout", { method: "POST" });
    window.location.assign("/login");
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-navy">
      <div className="min-h-screen lg:grid lg:grid-cols-[236px_1fr]">
        <AppSidebar copy={copy} activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="min-w-0 border-l border-[#e6e9ef] bg-white">
          <AppTopBar copy={copy} language={language} onLanguageChange={onLanguageChange} onLogout={logout} />
          <MobileAppNav copy={copy} activeSection={activeSection} onSectionChange={setActiveSection} />
          {activeSection === "home" ? (
            <AppHomeDashboard copy={copy} />
          ) : activeSection === "pets" ? (
            <PetProfileSection copy={copy} />
          ) : activeSection === "documents" ? (
            <DocumentVaultSection copy={copy} onPetsRequest={() => setActiveSection("pets")} />
          ) : activeSection === "reminders" ? (
            <CareRemindersSection copy={copy} onPetsRequest={() => setActiveSection("pets")} />
          ) : activeSection === "sharing" ? (
            <CareCardPreviewSection copy={copy} onPetsRequest={() => setActiveSection("pets")} />
          ) : (
            <AppSectionEmptyState copy={copy} section={activeSection} />
          )}
        </div>
      </div>
    </main>
  );
}
