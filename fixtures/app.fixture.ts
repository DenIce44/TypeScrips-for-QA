import { test as base, expect } from "@playwright/test";

import { Header } from "../components/Header.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";

interface AppFixtures {
  header: Header;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutCompletePage: CheckoutCompletePage;
}

export const test = base.extend<AppFixtures>({
  header: async ({ page }, use) => {
    await use(new Header(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});

export { expect };
