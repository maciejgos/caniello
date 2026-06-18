import { expect, test } from "@playwright/test";

const shouldRunLiveAuth = process.env.CANIELLO_RUN_LIVE_AUTH_E2E === "1";

test.describe("live local new-owner auth", () => {
  test.skip(
    !shouldRunLiveAuth,
    "Set CANIELLO_RUN_LIVE_AUTH_E2E=1 when local Supabase and Mailpit are running.",
  );

  test("signs up and reaches the protected app as a new local owner", async ({
    page,
  }, testInfo) => {
    const settings = await readAuthSettings();
    const timestamp = Date.now();
    const projectName = testInfo.project.name
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase();
    const email = `codex-new-owner-${projectName}-${timestamp}@example.com`;
    const password = "correct horse battery staple";

    await page.goto("/signup");
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

    await page.getByLabel(/Imię i nazwisko/i).fill("Codex New Owner");
    await page.getByLabel(/Adres e-mail/i).fill(email);
    await page.getByPlaceholder(/Utwórz hasło/i).fill(password);
    await page.getByPlaceholder(/Potwierdź hasło/i).fill(password);
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: /Utwórz konto/i }).click();

    if (settings.mailer_autoconfirm) {
      await page.waitForURL(/\/app$/);
      await expect(
        page.getByRole("heading", { name: /Panel opiekuna/i }),
      ).toBeVisible();
      return;
    }

    await expect(page.getByRole("status")).toContainText(
      /Sprawdź skrzynkę e-mail/i,
    );
    const confirmationUrl = await findConfirmationUrl(email);
    await page.goto(confirmationUrl);

    await page.goto("/login");
    await page.getByLabel(/Adres e-mail/i).fill(email);
    await page.getByLabel(/^Hasło$/i).fill(password);
    await page.getByRole("button", { name: /Zaloguj się/i }).click();

    await page.waitForURL(/\/app$/);
    await expect(
      page.getByRole("heading", { name: /Panel opiekuna/i }),
    ).toBeVisible();
  });
});

type SupabaseAuthSettingsResponse = {
  mailer_autoconfirm?: boolean;
};

type MailpitMessageSummary = {
  ID: string;
  To?: Array<{ Address?: string }>;
};

type MailpitMessagesResponse = {
  messages?: MailpitMessageSummary[];
};

type MailpitMessageResponse = {
  Text?: string;
  HTML?: string;
};

async function readAuthSettings(): Promise<SupabaseAuthSettingsResponse> {
  const response = await fetch("http://127.0.0.1:55321/auth/v1/settings");
  if (!response.ok) {
    throw new Error(`Supabase auth settings lookup failed: ${response.status}`);
  }

  return (await response.json()) as SupabaseAuthSettingsResponse;
}

async function findConfirmationUrl(email: string): Promise<string> {
  const message = await waitForSignupMessage(email);
  const detailResponse = await fetch(
    `http://127.0.0.1:54324/api/v1/message/${message.ID}`,
  );
  if (!detailResponse.ok) {
    throw new Error(
      `Mailpit message lookup failed for ${message.ID}: ${detailResponse.status}`,
    );
  }

  const detail = (await detailResponse.json()) as MailpitMessageResponse;
  const body = detail.Text || detail.HTML || "";
  const match = body.match(/https?:\/\/[^\s"'<>]+/);
  if (!match) {
    throw new Error(
      `No confirmation URL found in Mailpit message ${message.ID}.`,
    );
  }

  return match[0].replace(/&amp;/g, "&");
}

async function waitForSignupMessage(
  email: string,
): Promise<MailpitMessageSummary> {
  const deadline = Date.now() + 15000;

  while (Date.now() < deadline) {
    const response = await fetch("http://127.0.0.1:54324/api/v1/messages");
    if (!response.ok) {
      throw new Error(`Mailpit messages lookup failed: ${response.status}`);
    }

    const payload = (await response.json()) as MailpitMessagesResponse;
    const message = payload.messages?.find((item) =>
      item.To?.some((recipient) => recipient.Address === email),
    );
    if (message) return message;

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`No signup email found in Mailpit for ${email}.`);
}
