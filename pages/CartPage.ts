import type { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.getByTestId("inventory-item");
    this.itemNames = page.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByTestId("checkout");
  }

  itemByName(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  async removeProduct(productName: string): Promise<void> {
    const item = this.itemByName(productName);

    await item.getByRole("button", { name: "Remove" }).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
