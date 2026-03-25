import { users } from "@src/data/users";
import { TestData } from "@src/utils/TestData";
import { test } from "../fixtures";
import { Tags } from "../attributes/tags";

test.describe(`${Tags.join(Tags.TEST_TYPE.UI, Tags.FEATURE.AUTH, Tags.TEST_TYPE.REGRESSION)} Login UI`, () => {
  let newUser: { email: string; password: string };

  test.beforeAll("Register new user via API", async ({ api }) => {
    newUser = {
      email: TestData.getUniqueEmail(),
      password: users.validUser.password,
    };

    await api.register(newUser);
  });

  test(`${Tags.join(
    Tags.TEST_TYPE.UI,
    Tags.FEATURE.AUTH,
    Tags.TEST_TYPE.SMOKE,
    Tags.SCENARIO.POSITIVE,
    Tags.PRIORITY.CRITICAL,
  )} should login existing user`, async ({ pages }) => {
    await pages.homePage.open();
    await pages.loginPage.open();
    await pages.loginPage.expectLoginPageLoaded();
    await pages.loginPage.login(newUser.email, newUser.password);
    await pages.homePage.navbar.expectUserLoggedIn(newUser.email);
  });

  test(`${Tags.join(
    Tags.TEST_TYPE.UI,
    Tags.FEATURE.AUTH,
    Tags.TEST_TYPE.REGRESSION,
    Tags.SCENARIO.POSITIVE,
  )} should login and then logout successfully`, async ({ pages }) => {
    await pages.homePage.open();
    await pages.loginPage.open();
    await pages.loginPage.login(newUser.email, newUser.password);
    await pages.homePage.navbar.expectUserLoggedIn(newUser.email);
    await pages.homePage.navbar.logout();
    await pages.homePage.navbar.expectUserLoggedOut(newUser.email);
  });
});
