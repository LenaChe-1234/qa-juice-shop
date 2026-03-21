import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "../components/Navbar";

export class HomePage extends BasePage {
  readonly navbar: Navbar;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);
    this.pageTitle = page.locator("body");
  }

  async open(): Promise<void> {
    await super.open("/");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/juice shop/i);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.page.getByText(productName, { exact: false }),
    ).toBeVisible();
  }
}
