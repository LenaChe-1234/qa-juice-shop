import { Page } from "@playwright/test";
import { step } from "@src/utils/step";
import { WelcomeBanner } from "../modals/WelcomeBanner";
import { CookieBanner } from "../modals/CookieBanner";

export class BasePage {
  protected readonly page: Page;
  readonly welcomeBanner: WelcomeBanner;
  readonly cookieBanner: CookieBanner;

  constructor(page: Page) {
    this.page = page;
    this.welcomeBanner = new WelcomeBanner(page);
    this.cookieBanner = new CookieBanner(page);
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  @step("Dismiss blocking banners")
  async dismissBlockingBanners(): Promise<void> {
    await this.welcomeBanner.closeIfVisible();
    await this.cookieBanner.closeIfVisible();
  }
}
