import type { AccountLanguage } from "../content";
import { accountCopy } from "../content";
import { AppHomeDashboard } from "./AppHomeDashboard";
import { AppSidebar, MobileAppNav } from "./AppSidebar";
import { AppTopBar } from "./AppTopBar";

type AuthenticatedAppShellProps = {
  language: AccountLanguage;
  onLanguageChange: (language: AccountLanguage) => void;
};

export function AuthenticatedAppShell({ language, onLanguageChange }: AuthenticatedAppShellProps) {
  const copy = accountCopy[language];

  async function logout() {
    await fetch("/api/account/logout", { method: "POST" });
    window.location.assign("/login");
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-navy">
      <div className="min-h-screen lg:grid lg:grid-cols-[236px_1fr]">
        <AppSidebar copy={copy} />
        <div className="min-w-0 border-l border-[#e6e9ef] bg-white">
          <AppTopBar copy={copy} language={language} onLanguageChange={onLanguageChange} onLogout={logout} />
          <MobileAppNav copy={copy} />
          <AppHomeDashboard copy={copy} />
        </div>
      </div>
    </main>
  );
}
