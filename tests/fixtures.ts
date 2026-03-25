import { test as base } from "@playwright/test";
import { ApiServices } from "@src/api/services";
import { HomePage } from "@src/pages/HomePage";
import { LoginPage } from "@src/pages/LoginPage";
import { BasketPage } from "@src/pages/BasketPage";

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  basketPage: BasketPage;
};

type TestFixtures = {
  pages: Pages;
  api: ApiServices;
};

export const test = base.extend<TestFixtures>({
  pages: async ({ page }, use) => {
    await use({
      homePage: new HomePage(page),
      loginPage: new LoginPage(page),
      basketPage: new BasketPage(page),
    });
  },

  api: async ({ request }, use) => {
    await use(new ApiServices(request));
  },
});

export { expect } from "@playwright/test";
