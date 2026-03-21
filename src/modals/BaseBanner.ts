import { expect, Locator, Page } from "@playwright/test";

export abstract class BaseBanner {
  constructor(
    protected page: Page,
    protected container: Locator,
  ) {}

  async closeIfVisible(closeButton: Locator): Promise<void> {
    if (!(await this.container.isVisible())) return;

    try {
      await closeButton.click({ force: true, timeout: 2000 });
      await this.container.waitFor({ state: "hidden", timeout: 2000 });
    } catch (error) {
      await this.forceRemove();
    }
  }

  private async forceRemove(): Promise<void> {
    console.warn(`[Banner]: Forced removal of ${this.container}`);
    await this.container.evaluate((node) => node.remove()).catch(() => {});
  }
}
