import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "@src/utils/step";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly eyeIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.locator(
      'input[type="password"], input[formcontrolname="password"]',
    );
    this.loginButton = page
      .getByRole("button", { name: /log in|login/i })
      .first();
    this.errorMessage = page.locator(
      '.error, .mat-mdc-snack-bar-container, [role="alert"]',
    );
    this.eyeIcon = page.getByRole("button", {
      name: /display the password/i,
    });
  }

  @step("Open login page")
  async open(): Promise<void> {
    await super.open("/#/login");
  }

  @step("Login with provided credentials")
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);

    if (await this.eyeIcon.isVisible().catch(() => false)) {
      await this.eyeIcon.click();
    }

    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  @step("Verify login page is loaded")
  async expectLoginPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  @step("Verify login error is displayed")
  async expectLoginError(): Promise<void> {
    await expect(this.errorMessage.first()).toBeVisible();
  }
}
