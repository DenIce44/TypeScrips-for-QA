import type { Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly products: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.getByTestId("inventory-list");
    this.products = page.getByTestId("inventory-item");
    this.title = page.getByTestId("title");
  }

  productByName(productName: string): Locator {
    return this.products.filter({ hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.productByName(productName);

    await product.getByRole("button", { name: "Add to cart" }).click();
  }
}
