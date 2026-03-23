import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "../components/Navbar";

export class BasketPage extends BasePage {
  readonly navbar: Navbar;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/basket/i);
  }

  async expectProductInBasket(productName: string): Promise<void> {
    await expect(this.basketRow(productName)).toBeVisible();
  }

  private basketRow(productName: string): Locator {
    return this.page.locator("mat-row").filter({
      has: this.page.locator("mat-cell.cdk-column-product", {
        hasText: productName,
      }),
    });
  }

  async removeProduct(productName: string): Promise<void> {
    const row = this.basketRow(productName);
    await expect(row).toBeVisible();

    const removeButton = row.locator("mat-cell.cdk-column-remove button");
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await expect(row).toHaveCount(0);
  }

  async expectBasketEmpty(): Promise<void> {
    await expect(this.page.locator("mat-row")).toHaveCount(0);
  }

  async expectProductQuantity(
    productName: string,
    quantity: number,
  ): Promise<void> {
    const row = this.basketRow(productName);
    const quantityCell = row.locator("mat-cell.cdk-column-quantity");
    await expect(quantityCell).toContainText(String(quantity));
  }

  async expectProductPrice(productName: string, price: string): Promise<void> {
    const row = this.basketRow(productName);
    const priceCell = row.locator("mat-cell.cdk-column-price");
    await expect(priceCell).toContainText(price);
  }

  async increaseQuantity(productName: string): Promise<void> {
    const row = this.basketRow(productName);
    const plusButton = row
      .locator("mat-cell.cdk-column-quantity button")
      .last();
    await plusButton.click();
  }

  async decreaseQuantity(productName: string): Promise<void> {
    const row = this.basketRow(productName);
    const minusButton = row
      .locator("mat-cell.cdk-column-quantity button")
      .first();
    await minusButton.click();
  }
}
