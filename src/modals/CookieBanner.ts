import { expect, Locator, Page } from "@playwright/test";
import { step } from "@src/utils/step";

export class CookieBanner {
  readonly page: Page;
  readonly container: Locator;
  readonly acceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByLabel("cookieconsent");
    this.acceptButton = page.getByText("Me want it!", { exact: true });
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible().catch(() => false);
  }

  @step("Dismiss cookie banner if visible")
  async closeIfVisible(): Promise<void> {
    if (!(await this.isVisible())) return;

    await expect(this.acceptButton).toBeVisible({ timeout: 5000 });
    await this.acceptButton.click();
    await expect(this.container).toBeHidden({ timeout: 5000 });
  }
}
