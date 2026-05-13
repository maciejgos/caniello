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
  await page.getByRole("link", { name: "Jestem usługodawcą" }).click();
  await expect(page.getByRole("heading", { name: /Zaufane usługi dla pupili/i })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Co dalej" })).toBeVisible();
  await page.getByRole("link", { name: "Jestem kliniką lub wet." }).click();
  await expect(page.getByRole("heading", { name: /Współpraca klinik/i }).first()).toBeVisible();
  await page.goBack();
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

  expect(submissions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: "owner@example.com",
        role: "pet_owner",
        interestWave: "wave_1",
        source: "landing_page_hero",
        utm: expect.objectContaining({ utm_source: "e2e", utm_campaign: "milestone0" })
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

test("Wave 2 exploration page presents provider research and captures interest", async ({ page }, testInfo) => {
  const submissions: unknown[] = [];

  await page.route("**/api/landing-leads", async (route) => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });
  await page.route("**/api/validation-events", async (route) => {
    await route.fulfill({
      status: 202,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto("/wave-2-exploration?utm_source=e2e&utm_campaign=wave2");

  await expect(page.getByRole("heading", { name: /Zaufane usługi dla pupili/i }).first()).toBeVisible();
  await expect(page.getByText(/Badanie w toku/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Pomóż ukształtować przyszłość opieki/i })).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`wave2-exploration-${testInfo.project.name}.png`),
    fullPage: true
  });

  await page.getByLabel(/Adres email/i).fill("provider@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Dołącz do listy/i }).click();

  await expect(page.getByText(/Zapisaliśmy zainteresowanie badaniem Wave 2/i)).toBeVisible();
  expect(submissions).toEqual([
    expect.objectContaining({
      email: "provider@example.com",
      role: "pet_service_provider",
      interestWave: "wave_2",
      source: "landing_page_wave2"
    })
  ]);
});

test("Wave 3 research page presents clinic collaboration and captures interest", async ({ page }, testInfo) => {
  const submissions: unknown[] = [];

  await page.route("**/api/landing-leads", async (route) => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });
  await page.route("**/api/validation-events", async (route) => {
    await route.fulfill({
      status: 202,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto("/wave-3-research?utm_source=e2e&utm_campaign=wave3");

  await expect(page.getByRole("heading", { name: /Współpraca klinik/i })).toBeVisible();
  await expect(page.getByText(/Badanie w toku/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Pomóż ukształtować przyszłość opieki/i })).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`wave3-research-${testInfo.project.name}.png`),
    fullPage: true
  });

  await page.getByLabel(/Adres email/i).fill("clinic@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Dołącz jako klinika/i }).click();

  await expect(page.getByText(/Zapisaliśmy zainteresowanie badaniem Wave 3/i)).toBeVisible();
  expect(submissions).toEqual([
    expect.objectContaining({
      email: "clinic@example.com",
      role: "clinic_vet",
      interestWave: "wave_3",
      source: "landing_page_wave3"
    })
  ]);
});
