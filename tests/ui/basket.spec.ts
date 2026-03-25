import { users } from "@src/data/users";
import { TestData } from "@src/utils/TestData";
import { test } from "../fixtures";
import { Tags } from "../attributes/tags";

test.describe(`${Tags.join(Tags.TEST_TYPE.UI, Tags.FEATURE.BASKET, Tags.TEST_TYPE.REGRESSION)} Basket UI`, () => {
  let newUser: { email: string; password: string };

  test.beforeEach("Register test user via API", async ({ api }) => {
    newUser = {
      email: TestData.getUniqueEmail(),
      password: users.validUser.password,
    };

    await api.register(newUser);
  });

  test(`${Tags.join(
    Tags.TEST_TYPE.UI,
    Tags.FEATURE.BASKET,
    Tags.TEST_TYPE.SMOKE,
    Tags.SCENARIO.POSITIVE,
  )} should add product to basket and see it there`, async ({ pages }) => {
    await pages.homePage.open();
    await pages.loginPage.open();
    await pages.loginPage.login(newUser.email, newUser.password);
    await pages.homePage.expectLoaded();

    await pages.homePage.addProductToBasket("Carrot Juice");

    await pages.homePage.navbar.openBasket();
    await pages.basketPage.expectLoaded();
    await pages.basketPage.expectProductInBasket("Carrot Juice");
  });

  test(`${Tags.join(
    Tags.TEST_TYPE.UI,
    Tags.FEATURE.BASKET,
    Tags.TEST_TYPE.REGRESSION,
    Tags.SCENARIO.POSITIVE,
  )} should add and remove product to basket and see it empty`, async ({
    pages,
  }) => {
    await pages.homePage.open();
    await pages.loginPage.open();
    await pages.loginPage.login(newUser.email, newUser.password);
    await pages.homePage.expectLoaded();

    await pages.homePage.addProductToBasket("Carrot Juice");

    await pages.homePage.navbar.openBasket();
    await pages.basketPage.expectLoaded();
    await pages.basketPage.expectProductInBasket("Carrot Juice");

    await pages.basketPage.removeProduct("Carrot Juice");
    await pages.basketPage.expectBasketEmpty();
  });
});
