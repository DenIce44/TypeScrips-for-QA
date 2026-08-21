import type { Locator, Page } from "@playwright/test";

export class ProductsPage {
	readonly page: Page;
	readonly inventoryList: Locator;
	readonly products: Locator;

	constructor(page: Page) {
		this.page = page;
		this.inventoryList = page.getByTestId("inventory-list");
		this.products = page.getByTestId("inventory-item");
	}

	productByName(productName: string): Locator {
		return this.products.filter({ hasText: productName });
	}

	async addProductToCart(productName: string): Promise<void> {
		const product = this.productByName(productName);

		await product
			.getByRole("button", { name: "Add to cart" })
			.click();
	}
}
