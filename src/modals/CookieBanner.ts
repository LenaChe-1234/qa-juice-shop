import { expect, Locator, Page } from "@playwright/test";
import { BaseBanner } from "./BaseBanner";

export class CookieBanner extends BaseBanner {
  private dialog: Locator;
  private acceptCookieButton: Locator;

  constructor(page: Page) {
    const dialogLocator = page.getByLabel("cookieconsent");

    super(page, dialogLocator);
    this.dialog = dialogLocator;
    this.acceptCookieButton = page.getByText("Me want it!");
  }

  async isVisible(): Promise<boolean> {
    return await this.dialog.isVisible().catch(() => false);
  }

  async close() {
    await this.closeIfVisible(this.acceptCookieButton);
  }
}
