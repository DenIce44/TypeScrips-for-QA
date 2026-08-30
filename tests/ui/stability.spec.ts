import { expect, test } from "../../fixtures/app.fixture.js";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe("UI stability checks", () => {
  test(
    "shows an error for locked-out user",
    { tag: ["@regression", "@negative"] },
    async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.login("locked_out_user", "secret_sauce");

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(
        "Sorry, this user has been locked out.",
      );
    },
  );

  test(
    "opens inventory page after successful login",
    { tag: ["@regression", "@positive"] },
    async ({ loginPage, productsPage }) => {
      await loginPage.open();
      await loginPage.login("standard_user", "secret_sauce");

      await expect(productsPage.title).toHaveText("Products");
    },
  );
});
