import { expect, Locator, Page } from "@playwright/test";
import { BaseBanner } from "./BaseBanner";

export class WelcomeBanner extends BaseBanner {
  private readonly dialog: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    const dialogLocator = page
      .getByRole("dialog")
      .filter({ hasText: "Welcome" });

    super(page, dialogLocator);

    this.dialog = dialogLocator;
    this.closeButton = page.locator('[aria-label="Close Welcome Banner"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.dialog.isVisible().catch(() => false);
  }

  async close() {
    await this.closeIfVisible(this.closeButton);
  }
}
