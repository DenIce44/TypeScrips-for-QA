import type { Page, Locator } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeContainer: Locator;
  readonly completeHeader: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeContainer = page.getByTestId("checkout-complete-container");
    this.completeHeader = page.getByTestId("complete-header");
    this.backToProductsButton = page.getByTestId("back-to-products");
  }

  async returnToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
