import { test, expect } from "../fixtures/app.fixture.js";
import { checkoutCustomer } from "../test-data/checkout.js";
import { users } from "../test-data/users.js";

test.describe("Checkout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
  });

  test("user can complete an order", async ({
    page,
    header,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage,
  }) => {
    const productName = "Sauce Labs Backpack";

    await test.step("Add product to the cart", async () => {
      await productsPage.addProductToCart(productName);

      await expect(header.cartBadge).toHaveText("1");
    });

    await test.step("Open the cart", async () => {
      await header.openCart();

      await expect(page).toHaveURL(/cart\.html/);
      await expect(cartPage.itemByName(productName)).toHaveCount(1);
    });

    await test.step("Enter customer information", async () => {
      await cartPage.proceedToCheckout();

      await expect(page).toHaveURL(/checkout-step-one\.html/);

      await checkoutPage.fillCustomerInformation(checkoutCustomer);
      await checkoutPage.continueCheckout();
    });

    await test.step("Check the order overview", async () => {
      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await expect(checkoutPage.summaryInfo).toBeVisible();
      await expect(cartPage.itemByName(productName)).toHaveCount(1);
    });

    await test.step("Finish the order", async () => {
      await checkoutPage.finishCheckout();

      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutCompletePage.completeContainer).toBeVisible();
      await expect(checkoutCompletePage.completeHeader).toHaveText(
        "Thank you for your order!",
      );
    });
  });

  test("first name is required", async ({
    page,
    header,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.addProductToCart("Sauce Labs Backpack");
    await header.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.lastNameInput.fill("Ishchuk");
    await checkoutPage.postalCodeInput.fill("10001");
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );

    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test("last name is required", async ({
    page,
    header,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.addProductToCart("Sauce Labs Backpack");
    await header.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.firstNameInput.fill("Denis");
    await checkoutPage.postalCodeInput.fill("10001");
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: Last Name is required",
    );

    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test("postal code is required", async ({
    page,
    header,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.addProductToCart("Sauce Labs Backpack");
    await header.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.firstNameInput.fill("Denis");
    await checkoutPage.lastNameInput.fill("Ishchuk");
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: Postal Code is required",
    );

    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test("user can return to products after completing an order", async ({
    page,
    header,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage,
  }) => {
    const productName = "Sauce Labs Bike Light";

    await productsPage.addProductToCart(productName);
    await header.openCart();

    await expect(cartPage.itemByName(productName)).toHaveCount(1);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInformation(checkoutCustomer);
    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutCompletePage.completeHeader).toHaveText(
      "Thank you for your order!",
    );

    await checkoutCompletePage.returnToProducts();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(productsPage.title).toHaveText("Products");
    await expect(header.cartBadge).not.toBeVisible();
  });
});
