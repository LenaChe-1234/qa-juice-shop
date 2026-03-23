import { users } from "../../src/data/users";
import { TestData } from "../../src/utils/TestData";
import { test } from "../fixtures";

test.describe("Basket UI", () => {
  let newUser: any;

  test.beforeEach(`register and login new user`, async ({ api }) => {
    newUser = {
      email: TestData.getUniqueEmail(),
      password: users.validUser.password,
    };
    const test = await api.register(newUser);
  });

  test("should add product to basket and see it there", async ({ pages }) => {
    await pages.homePage.open();
    await pages.loginPage.open();
    await pages.loginPage.login(newUser.email, newUser.password);
    await pages.homePage.expectLoaded();

    await pages.homePage.addProductToBasket("Carrot Juice");

    await pages.homePage.navbar.openBasket();
    await pages.basketPage.expectLoaded();
    await pages.basketPage.expectProductInBasket("Carrot Juice");
  });

  test("should add and remove product to basket and see it empty", async ({
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
