import { step } from "@src/utils/step";
import { BaseBanner } from "./BaseBanner";

export class WelcomeBanner extends BaseBanner {
  readonly dialog = this.page.getByRole("dialog").filter({
    has: this.page.locator("app-welcome-banner"),
  });

  readonly container = this.page.locator("app-welcome-banner");

  readonly closeButton = this.page.getByLabel("Close Welcome Banner");

  @step("Check whether welcome banner is visible")
  async isVisible(): Promise<boolean> {
    return await this.isShown(this.closeButton);
  }

  @step("Dismiss welcome banner if visible")
  async closeIfVisible(): Promise<void> {
    if (!(await this.isVisible())) return;
    await this.clickAndWaitToDisappear(this.closeButton, this.dialog);
  }
}
