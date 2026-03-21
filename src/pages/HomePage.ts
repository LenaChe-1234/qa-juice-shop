import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "../components/Navbar";
import { WelcomeBanner } from "../modals/WelcomeBanner";
import { CookieBanner } from "../modals/CookieBanner";

export class HomePage extends BasePage {
  readonly navbar: Navbar;
  readonly pageTitle: Locator;
  readonly itemName: Locator;
  readonly welcomeBanner: WelcomeBanner;
  readonly cookieBanner: CookieBanner;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);
    this.pageTitle = page.locator("body");
    this.itemName = page.locator(".info-box .item-name");
    this.welcomeBanner = new WelcomeBanner(page);
    this.cookieBanner = new CookieBanner(page);
  }

  async open(): Promise<void> {
    await super.open("/");
    await this.cookieBanner.close();
    await this.welcomeBanner.close();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/juice shop/i);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.itemName).toContainText(productName);
  }

  async expectNoResultsFound(): Promise<void> {
    await expect(this.itemName).toBeHidden();
  }
}
