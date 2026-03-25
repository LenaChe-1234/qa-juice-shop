import { expect, Locator, Page } from "@playwright/test";

export abstract class BaseBanner {
  constructor(protected readonly page: Page) {}

  protected async isShown(locator: Locator): Promise<boolean> {
    return await locator.isVisible().catch(() => false);
  }

  protected async waitUntilGone(
    locator: Locator,
    timeout = 5000,
  ): Promise<void> {
    try {
      await locator.waitFor({ state: "hidden", timeout });
      return;
    } catch {}

    try {
      await locator.waitFor({ state: "detached", timeout });
      return;
    } catch {}

    await expect(locator).not.toBeVisible({ timeout });
  }

  protected async clickAndWaitToDisappear(
    button: Locator,
    container: Locator,
    timeout = 5000,
  ): Promise<void> {
    await expect(button).toBeVisible({ timeout });
    await expect(button).toBeEnabled({ timeout });
    await button.click();
    await this.waitUntilGone(container, timeout);
  }
}
