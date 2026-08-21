import { test, expect } from "../fixtures/app.fixture.js";
import { users } from "../test-data/users.js";

test.describe("Products", () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.open();

    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("products page displays the catalog", async ({ productsPage }) => {
    await expect(productsPage.inventoryList).toBeVisible();
    await expect(productsPage.products).toHaveCount(6);
    await expect(productsPage.title).toHaveText("Products");
  });

  test("user can add Sauce Labs Backpack to the cart", async ({
    page,
    cartPage,
    header,
    productsPage,
  }) => {
    const productName = "Sauce Labs Backpack";
    const backpack = productsPage.productByName(productName);

    await expect(backpack).toHaveCount(1);

    await productsPage.addProductToCart(productName);

    await expect(header.cartBadge).toHaveText("1");

    await header.openCart();

    await expect(page).toHaveURL(/cart\.html/);

    await expect(cartPage.itemByName(productName)).toHaveCount(1);
  });

  test("cart is empty at the beginning of a new test", async ({
    cartPage,
    header,
  }) => {
    await header.openCart();

    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test("user can remove a product from the cart", async ({
    cartPage,
    header,
    productsPage,
  }) => {
    const productName = "Sauce Labs Backpack";

    await productsPage.addProductToCart(productName);
    await header.openCart();

    await expect(cartPage.itemByName(productName)).toHaveCount(1);

    await cartPage.removeProduct(productName);

    await expect(cartPage.itemByName(productName)).toHaveCount(0);
    await expect(header.cartBadge).not.toBeVisible();
  });
});
