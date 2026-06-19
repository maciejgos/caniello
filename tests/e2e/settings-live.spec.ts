import { expect, test } from "@playwright/test";

const runSettingsLive = process.env.CANIELLO_RUN_SETTINGS_LIVE === "1";
const describeSettingsLive = runSettingsLive
  ? test.describe
  : test.describe.skip;

describeSettingsLive("live owner Settings", () => {
  test("renders the real privacy controls without mobile overflow", async ({
    page,
  }, testInfo) => {
    await page.goto("/login");
    await page
      .getByLabel(/Adres e-mail|Email address/i)
      .fill("akowalska@example.com");
    await page
      .getByPlaceholder(/Wpisz hasło|Enter your password/i)
      .fill("CanielloDemo123!");
    await page.getByRole("button", { name: /Zaloguj się|Log in/i }).click();

    await expect(page).toHaveURL(/\/app$/);
    await page
      .getByRole("button", { name: /^(Ustawienia|Settings)$/i })
      .click();

    await expect(
      page.getByRole("heading", {
        name: /Konto, zgody i dane|Account, consent, and data/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /^(Profil konta|Account profile)$/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /^(Zgody|Consent)$/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /^(Eksport danych|Data export)$/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /^(Usunięcie konta|Account deletion)$/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /^(Bezpieczeństwo|Security)$/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /^(Granice medyczne|Medical boundary)$/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByLabel(/Nazwa opiekuna|Owner display name/i),
    ).toHaveValue(/Anna/);

    const deletionButton = page.getByRole("button", {
      name: /Poproś o usunięcie konta|Request account deletion/i,
    });
    await expect(deletionButton).toBeDisabled();
    await page.getByLabel(/Wpisz DELETE|Type DELETE/i).fill("DELETE");
    await expect(deletionButton).toBeEnabled();

    const viewport = page.viewportSize();
    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(documentWidth).toBeLessThanOrEqual(viewport?.width ?? documentWidth);

    const screenshotPath = process.env.CANIELLO_SETTINGS_SCREENSHOT_PATH;
    if (screenshotPath) {
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.attachments.push({
        name: "settings-responsive",
        path: screenshotPath,
        contentType: "image/png",
      });
    }
  });

  test("captures the accepted prototype Settings reference", async ({
    page,
  }) => {
    await page.goto("/mvp-flow");
    await page.getByRole("button", { name: "Create account" }).click();
    await page.getByRole("button", { name: "Log in", exact: true }).click();
    await page.getByRole("button", { name: "Settings", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Settings", exact: true }),
    ).toBeVisible();

    const referencePath = process.env.CANIELLO_SETTINGS_REFERENCE_PATH;
    if (referencePath) {
      await page.screenshot({ path: referencePath, fullPage: true });
    }
  });
});
