import { expect, Locator, Page } from "@playwright/test";
import { step } from "@src/utils/step";

export class WelcomeBanner {
  readonly page: Page;
  readonly container: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByRole("dialog").filter({ hasText: "Welcome" });
    this.closeButton = page.locator('[aria-label="Close Welcome Banner"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible().catch(() => false);
  }

  @step("Dismiss welcome banner if visible")
  async closeIfVisible(): Promise<void> {
    if (!(await this.isVisible())) return;

    await expect(this.closeButton).toBeVisible({ timeout: 5000 });
    await this.closeButton.click();
    await expect(this.container).toBeHidden({ timeout: 5000 });
  }
}
