import { users } from "../../src/data/users";
import { TestData } from "../../src/utils/TestData";
import { test } from "../fixtures";

test.describe("Login UI", () => {
  let newUser: any;

  test.beforeAll(`register newUser`, async ({ api }) => {
    newUser = {
      email: TestData.getUniqueEmail(),
      password: users.validUser.password,
    };
    const test = await api.register(newUser);
  });

  test("should login existing user", async ({ pages }) => {
    await pages.homePage.open();
    await pages.loginPage.open();
    await pages.loginPage.expectLoginPageLoaded();
    await pages.loginPage.login(newUser.email, newUser.password);
    await pages.homePage.navbar.expectUserLoggedIn(newUser.email);
  });

  test("should login and then logout successfully", async ({ pages }) => {
    await pages.homePage.open();
    await pages.loginPage.open();
    await pages.loginPage.login(newUser.email, newUser.password);
    await pages.homePage.navbar.expectUserLoggedIn(newUser.email);
    await pages.homePage.navbar.logout();
    await pages.homePage.navbar.expectUserLoggedOut(newUser.email);
  });
});
