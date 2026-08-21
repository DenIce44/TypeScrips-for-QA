import { test, expect } from "@playwright/test";

test.describe("Products", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("products page displays the catalog", async ({ page }) => {
    await expect(page.getByTestId("title")).toHaveText("Products");
    await expect(page.getByTestId("inventory-list")).toBeVisible();

    const products = page.getByTestId("inventory-item");

    await expect(products).toHaveCount(6);
  });

  test("user can add Sauce Labs Backpack to the cart", async ({ page }) => {
    const backpack = page
      .getByTestId("inventory-item")
      .filter({ hasText: "Sauce Labs Backpack" });

    await expect(backpack).toHaveCount(1);

    await backpack.getByRole("button", { name: "Add to cart" }).click();

    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");

    await page.getByTestId("shopping-cart-link").click();

    await expect(page).toHaveURL(/cart\.html/);

    await expect(page.getByTestId("inventory-item-name")).toHaveText(
      "Sauce Labs Backpack",
    );
  });

  test("cart is empty at the beginning of a new test", async ({ page }) => {
    await expect(page.getByTestId("shopping-cart-badge")).not.toBeVisible();

    await page.getByTestId("shopping-cart-link").click();

    await expect(page.getByTestId("inventory-item")).toHaveCount(0);
  });
});
