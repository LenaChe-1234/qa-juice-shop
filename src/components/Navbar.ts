import { expect, Locator, Page } from "@playwright/test";
import { Menu } from "../elements/Menu";

export class Navbar {
  readonly page: Page;
  readonly accountButton: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  accountMenu: Menu;

  constructor(page: Page) {
    this.page = page;
    this.accountButton = page.locator("#navbarAccount");
    this.searchButton = page.locator('[id="searchQuery"]');
    this.searchInput = page.getByRole("textbox");
    this.accountMenu = new Menu(page, this.accountButton);
  }

  async openSearch(): Promise<void> {
    await this.searchButton.click();
  }

  async search(term: string): Promise<void> {
    await this.openSearch();
    await this.searchInput.fill(term);
    await this.page.keyboard.press("Enter");
  }

  async expectUserLoggedIn(email: string): Promise<void> {
    await this.accountMenu.expectUserEmail(email);
  }

  async logout() {
    await this.accountMenu.clickItem("#navbarLogoutButton");
  }

  async goToOrders() {
    await this.accountMenu.selectItem("Orders & Payment");
  }

  async expectUserLoggedOut(email: string): Promise<void> {
    await this.accountMenu.expectContentNotPresent(email);
    const loginButton = this.accountMenu.panel
      .last()
      .getByRole("menuitem", { name: /login/i });

    await expect(loginButton).toBeVisible();
  }
}
