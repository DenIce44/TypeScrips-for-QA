import { test, expect } from "../fixtures/app.fixture.js";
import { invalidCredentials, users } from "../test-data/users.js";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test(
    "standard user can log in",
    {
      tag: ["@smoke", "@positive"],
    },
    async ({ page, loginPage, productsPage }) => {
      await loginPage.login(users.standard.username, users.standard.password);

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(productsPage.title).toHaveText("Products");
    },
  );

  test(
    "locked user cannot log in",
    {
      tag: ["@regression", "@negative"],
    },
    async ({ page, loginPage, productsPage }) => {
      await loginPage.login(users.locked.username, users.locked.password);

      await expect(page).toHaveURL("https://www.saucedemo.com/");

      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: Sorry, this user has been locked out.",
      );

      await expect(productsPage.title).not.toBeVisible();
    },
  );

  test(
    "username is required",
    {
      tag: ["@regression", "@negative"],
    },
    async ({ loginPage }) => {
      await loginPage.loginButton.click();

      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: Username is required",
      );
    },
  );

  test(
    "password is required",
    {
      tag: ["@regression", "@negative"],
    },
    async ({ loginPage }) => {
      await loginPage.usernameInput.fill(users.standard.username);
      await loginPage.loginButton.click();

      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: Password is required",
      );
    },
  );

  for (const credentials of invalidCredentials) {
    test(
      `login fails with ${credentials.caseName}`,
      {
        tag: ["@regression", "@negative"],
      },
      async ({ page, loginPage }) => {
        await loginPage.login(credentials.username, credentials.password);

        await expect(loginPage.errorMessage).toHaveText(
          credentials.expectedError,
        );

        await expect(page).toHaveURL("https://www.saucedemo.com/");
      },
    );
  }
});
