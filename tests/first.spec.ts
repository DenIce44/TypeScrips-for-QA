import { test, expect } from "@playwright/test";

test("Playwright homepage has the correct title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveTitle(/Playwright/);
});

test("Get started link opens the installation page", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await page.getByRole("link", { name: "Get started" }).click();

  await expect(page).toHaveURL(/.*intro/);

  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
