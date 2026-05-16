import { expect, test } from "@playwright/test";

test("direct application URLs return the SPA instead of 404", async ({ page }) => {
  const directPaths = ["/privacy", "/terms", "/medical-boundaries", "/marketplace", "/clinics"];

  for (const path of directPaths) {
    const response = await page.goto(path);

    expect(response?.status(), `${path} should return a successful SPA response`).toBeLessThan(400);
  }
});

test("route navigation resets scroll position to the top of the new page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("heading", { name: "Co dalej" }).scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page.getByRole("link", { name: "Poznaj rynek usług" }).click();

  await expect(page).toHaveURL(/\/marketplace$/);
  await expect(page.getByRole("heading", { name: /Zaufana pomoc/i }).first()).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("main landing page email capture validates input, requires consent, and submits every signup form", async ({ page }) => {
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

  await page.goto("/?utm_source=e2e&utm_medium=playwright&utm_campaign=email-capture&utm_term=owners&utm_content=landing");

  const heroForm = page.locator('form[data-source="landing_page_hero"]');
  await heroForm.getByRole("button", { name: /Dołącz/i }).click();
  await expect(heroForm.getByText("Wpisz poprawny adres e-mail.")).toBeVisible();
  expect(submissions).toHaveLength(0);

  await heroForm.getByLabel(/Adres e-mail/i).fill("not-an-email");
  await heroForm.getByRole("button", { name: /Dołącz/i }).click();
  await expect(heroForm.getByText("Wpisz poprawny adres e-mail.")).toBeVisible();
  expect(submissions).toHaveLength(0);

  await heroForm.getByLabel(/Adres e-mail/i).fill("owner@example.com");
  await heroForm.getByRole("button", { name: /Dołącz/i }).click();
  await expect(heroForm.getByText("Zaznacz zgodę, aby wysłać formularz.")).toBeVisible();
  expect(submissions).toHaveLength(0);

  await heroForm.getByRole("checkbox").check();
  await heroForm.getByRole("button", { name: /Dołącz/i }).click();
  await expect(heroForm.getByText("Dziękujemy. Zapisaliśmy Cię na listę Caniello.")).toBeVisible();

  const midForm = page.locator('form[data-source="landing_page_mid_cta"]');
  await midForm.getByLabel(/Adres e-mail/i).fill("mid@example.com");
  await midForm.getByRole("checkbox").check();
  await midForm.getByRole("button", { name: /Dołącz/i }).click();
  await expect(midForm.getByText("Dziękujemy. Zapisaliśmy Cię na listę Caniello.")).toBeVisible();

  const footerForm = page.locator('form[data-source="landing_page_footer"]');
  await footerForm.getByLabel(/Adres e-mail/i).fill("footer@example.com");
  await footerForm.getByRole("checkbox").check();
  await footerForm.getByRole("button", { name: /Dołącz/i }).click();
  await expect(footerForm.getByText("Dziękujemy. Zapisaliśmy Cię na listę Caniello.")).toBeVisible();

  expect(submissions).toEqual([
    expect.objectContaining({
      email: "owner@example.com",
      source: "landing_page_hero",
      leadConsent: true,
      language: "pl",
      utm: {
        utm_source: "e2e",
        utm_medium: "playwright",
        utm_campaign: "email-capture",
        utm_term: "owners",
        utm_content: "landing"
      }
    }),
    expect.objectContaining({
      email: "mid@example.com",
      source: "landing_page_mid_cta",
      leadConsent: true,
      language: "pl",
      utm: expect.objectContaining({ utm_campaign: "email-capture" })
    }),
    expect.objectContaining({
      email: "footer@example.com",
      source: "landing_page_footer",
      leadConsent: true,
      language: "pl",
      utm: expect.objectContaining({ utm_campaign: "email-capture" })
    })
  ]);
});

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
  await expect(page.getByRole("link", { name: "Poznaj rynek usług" })).toHaveAttribute("href", "/marketplace");
  await page.getByRole("link", { name: "Poznaj rynek usług" }).click();
  await expect(page).toHaveURL(/\/marketplace$/);
  await expect(page.getByRole("heading", { name: /Zaufana pomoc/i })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Co dalej" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Poznaj kliniki" })).toHaveAttribute("href", "/clinics");
  await page.getByRole("link", { name: "Poznaj kliniki" }).click();
  await expect(page).toHaveURL(/\/clinics$/);
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

  await page.goto("/marketplace?utm_source=e2e&utm_campaign=wave2");

  await expect(page.getByRole("heading", { name: /Zaufana pomoc/i }).first()).toBeVisible();
  await expect(page.getByText(/Badanie w toku/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /zaufany rynek usług razem z opiekunami/i })).toBeVisible();
  await expect(page.getByText("Wróć do etapu Dzisiaj")).toHaveCount(0);

  await page.screenshot({
    path: testInfo.outputPath(`wave2-exploration-${testInfo.project.name}.png`),
    fullPage: true
  });

  const wave2Form = page.locator('form[data-source="landing_page_wave2"]').first();
  await wave2Form.getByLabel(/Adres e-mail/i).fill("marketplace@example.com");
  await wave2Form.getByRole("checkbox").check();
  await wave2Form.getByRole("button", { name: /Dołącz do listy/i }).click();

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

  await page.goto("/clinics?utm_source=e2e&utm_campaign=wave3");

  await expect(page.getByRole("heading", { name: /Pełniejszy kontekst pacjenta/i })).toBeVisible();
  await expect(page.getByText(/Badanie w toku/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /współpracę z klinikami/i })).toBeVisible();
  await expect(page.getByText("Wróć do etapu Dzisiaj")).toHaveCount(0);

  await page.screenshot({
    path: testInfo.outputPath(`wave3-research-${testInfo.project.name}.png`),
    fullPage: true
  });

  const wave3Form = page.locator('form[data-source="landing_page_wave3"]').first();
  await wave3Form.getByLabel(/Adres e-mail/i).fill("clinic@example.com");
  await wave3Form.getByRole("checkbox").check();
  await wave3Form.getByRole("button", { name: /Dołącz do listy/i }).click();

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
