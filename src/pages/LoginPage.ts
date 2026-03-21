import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly eyeIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.locator('[for="password"]');
    this.loginButton = page
      .getByRole("button", { name: /log in|login/i })
      .first();
    this.errorMessage = page.locator(
      '.error, .mat-mdc-snack-bar-container, [role="alert"]',
    );
    this.eyeIcon = page.getByRole("button", {
      name: "Button to display the password",
    });
  }

  async open(): Promise<void> {
    await super.open("/#/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.eyeIcon.click();
    // await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.eyeIcon).toBeVisible();
    // await expect(this.passwordInput).toBeVisible();
  }

  async expectLoginError(): Promise<void> {
    await expect(this.errorMessage.first()).toBeVisible();
  }
}
