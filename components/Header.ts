import type { Locator, Page } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
