import { Locator, Page } from "@playwright/test";

export class Navbar {
  readonly page: Page;
  readonly accountButton: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountButton = page.getByRole("button", { name: /account|me/i });
    this.searchButton = page.getByRole("button", { name: /search/i });
    this.searchInput = page.getByRole("textbox");
  }

  async openSearch(): Promise<void> {
    await this.searchButton.click();
  }

  async search(term: string): Promise<void> {
    await this.openSearch();
    await this.searchInput.fill(term);
  }
}
