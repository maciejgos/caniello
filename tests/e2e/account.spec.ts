import { expect, test } from "@playwright/test";

test("account routes are Polish-first, switchable, and expose the mockup auth shell", async ({
  page,
}) => {
  await page.goto("/signup");

  await expect(
    page.getByRole("heading", { name: /Utwórz konto/i }),
  ).toBeVisible();
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    await expect(page.getByText(/Zdrowie Twojego pupila/i)).toBeVisible();
    await expect(page.getByText(/Masz już konto/i)).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "Zaloguj się" })).toHaveAttribute(
    "href",
    "/login",
  );
  await expect(page.getByRole("link", { name: "Prywatność" })).toHaveAttribute(
    "href",
    "/privacy",
  );
  await expect(page.getByRole("link", { name: "Regulamin" })).toHaveAttribute(
    "href",
    "/terms",
  );
  await expect(
    page.getByRole("button", {
      name: /Kontynuuj z Google - niedostępne lokalnie/i,
    }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", {
      name: /Kontynuuj z Apple - niedostępne lokalnie/i,
    }),
  ).toBeDisabled();
  await expect(
    page.getByText(/Logowanie Google i Apple jest wyłączone/i),
  ).toBeVisible();

  await page.getByRole("button", { name: "EN" }).click();
  await expect(
    page.getByRole("heading", { name: /Create your account/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: /Continue with Google - unavailable locally/i,
    }),
  ).toBeDisabled();
  await expect(
    page.getByText(/Google and Apple login are disabled/i),
  ).toBeVisible();
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    await expect(page.getByText(/All of your pet's health/i)).toBeVisible();
  }
});

test("signup validates locally and shows email verification guidance after API success", async ({
  page,
}) => {
  const submissions: unknown[] = [];
  await page.route("**/api/account/signup", async (route) => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, status: "verification_required" }),
    });
  });

  await page.goto("/signup");
  await page.getByRole("button", { name: /Utwórz konto/i }).click();
  await expect(page.getByText(/Wpisz imię i nazwisko/i)).toBeVisible();
  await expect(page.getByText(/Wpisz poprawny adres e-mail/i)).toBeVisible();
  expect(submissions).toHaveLength(0);

  await page.getByLabel(/Imię i nazwisko/i).fill("Jan Kowalski");
  await page.getByLabel(/Adres e-mail/i).fill("owner@example.com");
  await page
    .getByPlaceholder(/Utwórz hasło/i)
    .fill("correct horse battery staple");
  await page
    .getByPlaceholder(/Potwierdź hasło/i)
    .fill("correct horse battery staple");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Utwórz konto/i }).click();

  await expect(page.getByRole("status")).toContainText(
    /Sprawdź skrzynkę e-mail/i,
  );
  expect(submissions).toEqual([
    expect.objectContaining({
      fullName: "Jan Kowalski",
      email: "owner@example.com",
      language: "pl",
      acceptedTerms: true,
    }),
  ]);
});

test("protected owner app redirects unauthenticated visitors to login", async ({
  page,
}) => {
  await page.goto("/app");

  await expect(page).toHaveURL(/\/login\?next=%2Fapp$/);
  await expect(
    page.getByRole("heading", { name: /Witaj ponownie/i }),
  ).toBeVisible();
});
