import { expect, Page } from "@playwright/test";

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async assertUrlContains(value: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(value);
  }
}
