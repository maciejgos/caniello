import { expect, test } from "@playwright/test";

test("Polish landing page switches to English and accepts waitlist interest", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Lepsza opieka\. Silniejsza więź/i
    })
  ).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`landing-polish-${testInfo.project.name}.png`),
    fullPage: true
  });

  await page.getByRole("button", { name: "EN" }).click();
  await expect(
    page.getByRole("heading", {
      name: /Better care\. Stronger bond/i
    })
  ).toBeVisible();

  await page.getByLabel(/Email address/i).first().fill("owner@example.com");
  await page.getByRole("button", { name: /Join Waitlist/i }).first().click();
  await expect(page.getByText(/Your interest in the first Caniello version has been noted/i)).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`landing-english-success-${testInfo.project.name}.png`),
    fullPage: true
  });
});
