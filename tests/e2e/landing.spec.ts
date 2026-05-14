import { expect, test } from "@playwright/test";

test("landing page is Polish-first, switchable, and captures waitlist leads with consent", async ({ page }, testInfo) => {
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

  await expect(page.getByRole("heading", { name: /Cała opieka nad pupilem\. Zawsze pod ręką/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Co dalej" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Poznaj opiekę" })).toHaveAttribute("href", "/");
  await page.getByRole("link", { name: "Poznaj rynek usług" }).click();
  await expect(page.getByRole("heading", { name: /Zaufana pomoc/i })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Co dalej" })).toBeVisible();
  await page.getByRole("link", { name: "Poznaj kliniki" }).click();
  await expect(page.getByRole("heading", { name: /Pełniejszy kontekst pacjenta/i }).first()).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Co dalej" })).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`landing-polish-${testInfo.project.name}.png`),
    fullPage: true
  });

  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.getByRole("heading", { name: /Your pet's care\. Always within reach/i })).toBeVisible();

  await page.getByLabel(/Email address/i).first().fill("owner@example.com");
  await page.getByRole("button", { name: /^Join$/i }).first().click();
  await expect(page.getByText(/Confirm consent/i)).toBeVisible();
  expect(submissions).toHaveLength(0);

  await page.getByRole("checkbox").first().check();
  await page.getByRole("button", { name: /^Join$/i }).first().click();
  await expect(page.getByText(/You're on the Caniello waitlist/i)).toBeVisible();

  expect(submissions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: "owner@example.com",
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
    path: testInfo.outputPath(`landing-waitlist-success-${testInfo.project.name}.png`),
    fullPage: true
  });
});

test("Next exploration page presents marketplace research and captures a generic waitlist lead", async ({ page }, testInfo) => {
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

  await expect(page.getByRole("heading", { name: /Zaufana pomoc/i }).first()).toBeVisible();
  await expect(page.getByText(/Badanie w toku/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /zaufany rynek usług razem z opiekunami/i })).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`wave2-exploration-${testInfo.project.name}.png`),
    fullPage: true
  });

  await page.getByLabel(/Adres e-mail/i).fill("marketplace@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Dołącz do listy/i }).click();

  await expect(page.getByText(/Zapisaliśmy Cię na listę Caniello/i)).toBeVisible();
  expect(submissions).toEqual([
    expect.objectContaining({
      email: "marketplace@example.com",
      source: "landing_page_wave2"
    })
  ]);
  expect(submissions[0]).not.toHaveProperty("role");
  expect(submissions[0]).not.toHaveProperty("interestWave");
});

test("Future research page presents clinic collaboration and captures a generic waitlist lead", async ({ page }, testInfo) => {
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

  await expect(page.getByRole("heading", { name: /Pełniejszy kontekst pacjenta/i })).toBeVisible();
  await expect(page.getByText(/Badanie w toku/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /współpracę z klinikami/i })).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`wave3-research-${testInfo.project.name}.png`),
    fullPage: true
  });

  await page.getByLabel(/Adres e-mail/i).fill("clinic@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Dołącz do listy/i }).click();

  await expect(page.getByText(/Zapisaliśmy Cię na listę Caniello/i)).toBeVisible();
  expect(submissions).toEqual([
    expect.objectContaining({
      email: "clinic@example.com",
      source: "landing_page_wave3"
    })
  ]);
  expect(submissions[0]).not.toHaveProperty("role");
  expect(submissions[0]).not.toHaveProperty("interestWave");
});
