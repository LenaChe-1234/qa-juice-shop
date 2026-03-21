import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { AccountPage } from "./AccountPage";

export class Pages {
  constructor(private readonly page: Page) {}

  private _homePage?: HomePage;
  private _loginPage?: LoginPage;
  private _accountPage?: AccountPage;

  get homePage(): HomePage {
    if (!this._homePage) {
      this._homePage = new HomePage(this.page);
    }
    return this._homePage;
  }

  get loginPage(): LoginPage {
    if (!this._loginPage) {
      this._loginPage = new LoginPage(this.page);
    }
    return this._loginPage;
  }

  get accountPage(): AccountPage {
    if (!this._accountPage) {
      this._accountPage = new AccountPage(this.page);
    }
    return this._accountPage;
  }
}
