import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Navbar } from "../components/Navbar";

export class AccountPage extends BasePage {
  readonly navbar: Navbar;

  constructor(page: Page) {
    super(page);
    this.navbar = new Navbar(page);
  }
}
