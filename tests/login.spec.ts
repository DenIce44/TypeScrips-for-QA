import { test, expect } from "@playwright/test";

const invalidCredentials = [
  {
    caseName: "unknown username",
    username: "unknown_user",
    password: "secret_sauce",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    caseName: "incorrect password",
    username: "standard_user",
    password: "incorrect_password",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
];

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("standard user can log in", async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId("title")).toHaveText("Products");
  });

  test("locked user cannot log in", async ({ page }) => {
    await page.getByTestId("username").fill("locked_out_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("https://www.saucedemo.com/");

    await expect(page.getByTestId("error")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );

    await expect(page.getByTestId("title")).not.toBeVisible();
  });

  test("username is required", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("error")).toHaveText(
      "Epic sadface: Username is required",
    );

    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("password is required", async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("error")).toHaveText(
      "Epic sadface: Password is required",
    );

    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  for (const credentials of invalidCredentials) {
    test(`login fails with ${credentials.caseName}`, async ({ page }) => {
      await page.getByTestId("username").fill(credentials.username);
      await page.getByTestId("password").fill(credentials.password);
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByTestId("error")).toHaveText(
        credentials.expectedError,
      );
      await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
  }
});
