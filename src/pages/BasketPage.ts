import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "../components/Navbar";
import { step } from "@src/utils/step";

export class BasketPage extends BasePage {
  readonly navbar: Navbar;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);
  }

  @step("Verify basket page is loaded")
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/basket/i);
  }

  @step(
    (productName: string) =>
      `Verify product is present in basket: ${productName}`,
  )
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

  @step((productName: string) => `Remove product from basket: ${productName}`)
  async removeProduct(productName: string): Promise<void> {
    const row = this.basketRow(productName);
    await expect(row).toBeVisible();

    const removeButton = row.locator("mat-cell.cdk-column-remove button");
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await expect(row).toHaveCount(0);
  }

  @step("Verify basket is empty")
  async expectBasketEmpty(): Promise<void> {
    await expect(this.page.locator("mat-row")).toHaveCount(0);
  }
}
