import { expect, test } from "@playwright/test";

test("landing page is Polish-first, switchable, and captures segmented leads with consent", async ({ page }, testInfo) => {
  const submissions: unknown[] = [];
  const validationEvents: unknown[] = [];

  await page.route("**/api/landing-leads", async (route) => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });
  await page.route("**/api/validation-events", async (route) => {
    validationEvents.push(route.request().postDataJSON());
    await route.fulfill({
      status: 202,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto("/?utm_source=e2e&utm_campaign=milestone0");

  await expect(page.getByRole("heading", { name: /Lepsza opieka\. Silniejsza więź/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Co dalej" })).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`landing-polish-${testInfo.project.name}.png`),
    fullPage: true
  });

  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.getByRole("heading", { name: /Better care\. Stronger bond/i })).toBeVisible();

  await page.getByLabel(/Email address/i).first().fill("owner@example.com");
  await page.getByRole("button", { name: /^Join$/i }).first().click();
  await expect(page.getByText(/Confirm consent/i)).toBeVisible();
  expect(submissions).toHaveLength(0);

  await page.getByRole("checkbox").first().check();
  await page.getByRole("button", { name: /^Join$/i }).first().click();
  await expect(page.getByText(/first Caniello version has been noted/i)).toBeVisible();

  await page.getByRole("button", { name: "I'm a pet service provider" }).click();
  let dialog = page.getByRole("dialog");
  await dialog.getByLabel(/Email address/i).fill("provider@example.com");
  await dialog.getByPlaceholder(/Business or service name/i).fill("Good Walks");
  await dialog.getByRole("checkbox").check();
  await dialog.getByRole("button", { name: "I'm a pet service provider" }).click();
  await expect(page.getByText(/Wave 2 research interest has been noted/i)).toBeVisible();
  await dialog.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "I'm a clinic or vet" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByLabel(/Email address/i).fill("clinic@example.com");
  await dialog.getByPlaceholder(/Clinic or organization name/i).fill("Vet Clinic");
  await dialog.getByRole("checkbox").check();
  await dialog.getByRole("button", { name: "I'm a clinic or vet" }).click();
  await expect(page.getByText(/Wave 3 research interest has been noted/i)).toBeVisible();
  await dialog.getByRole("button", { name: "Close" }).click();

  expect(submissions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: "owner@example.com",
        role: "pet_owner",
        interestWave: "wave_1",
        source: "landing_page_hero",
        utm: expect.objectContaining({ utm_source: "e2e", utm_campaign: "milestone0" })
      }),
      expect.objectContaining({
        email: "provider@example.com",
        role: "pet_service_provider",
        interestWave: "wave_2",
        source: "landing_page_wave2"
      }),
      expect.objectContaining({
        email: "clinic@example.com",
        role: "clinic_vet",
        interestWave: "wave_3",
        source: "landing_page_wave3"
      })
    ])
  );

  await page.getByRole("button", { name: /Allow/i }).click();
  await expect(page.getByLabel(/Help us measure interest/i)).toBeHidden();
  expect(validationEvents).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: "analytics_consent", analyticsConsent: true }),
      expect.objectContaining({ name: "page_view" })
    ])
  );

  await page.screenshot({
    path: testInfo.outputPath(`landing-segmented-success-${testInfo.project.name}.png`),
    fullPage: true
  });
});
