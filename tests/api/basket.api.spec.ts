import { users } from "@src/data/users";
import { expect, test } from "../fixtures";

test.describe("@api @basket Basket API", () => {
  test("@positive should add item to basket for authorized user", async ({
    api,
  }) => {
    const login = await api.auth.registerAndLogin(users.demoUser);
    const token = login.token;

    const response = await api.basket.addItem(token, {
      ProductId: 1,
      quantity: 1,
    });

    expect([200, 201]).toContain(response.status());
  });

  test("@negative should not add item to basket without token", async ({
    api,
  }) => {
    const response = await api.basket.addItem("", {
      ProductId: 1,
      BasketId: 1,
      quantity: 1,
    });

    expect([401, 403]).toContain(response.status());
  });
});
