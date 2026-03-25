import { expect, Locator, Page } from "@playwright/test";
import { Menu } from "../elements/Menu";
import { step } from "@src/utils/step";

export class Navbar {
  readonly page: Page;
  readonly accountButton: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly basketButton: Locator;
  accountMenu: Menu;

  constructor(page: Page) {
    this.page = page;
    this.accountButton = page.locator("#navbarAccount");
    this.searchButton = page.locator('[id="searchQuery"]');
    this.searchInput = page.getByRole("textbox");
    this.basketButton = page.locator(
      "button[aria-label*='Show the shopping cart'], button[aria-label*='shopping cart']",
    );
    this.accountMenu = new Menu(page, this.accountButton);
  }

  @step("Open search")
  async openSearch(): Promise<void> {
    await this.searchButton.click();
  }

  @step((term: string) => `Search for product: ${term}`)
  async search(term: string): Promise<void> {
    await this.openSearch();
    await this.searchInput.fill(term);
    await this.page.keyboard.press("Enter");
  }

  @step("Open basket")
  async openBasket(): Promise<void> {
    await expect(this.basketButton).toBeVisible();
    await this.basketButton.click();
  }

  @step("Verify user is logged in")
  async expectUserLoggedIn(email: string): Promise<void> {
    await this.accountMenu.expectUserEmail(email);
  }

  @step("Logout current user")
  async logout(): Promise<void> {
    await this.accountMenu.clickItem("#navbarLogoutButton");
  }

  @step("Verify user is logged out")
  async expectUserLoggedOut(email: string): Promise<void> {
    await this.accountMenu.expectContentNotPresent(email);
    const loginButton = this.accountMenu.panel
      .last()
      .getByRole("menuitem", { name: /login/i });
    await expect(loginButton).toBeVisible();
  }
}
