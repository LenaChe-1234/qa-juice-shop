import { expect, test } from "../fixtures";
import { createTestUser } from "@src/data/factories/userFactory";

test.describe("@security @api @basket @access-control @idor Broken Access Control", () => {
  test("@critical should not allow accessing arbitrary basket by id without auth (IDOR)", async ({
    api,
  }) => {
    const response = await api.basket.getBasket(1);

    const status = response.status();
    expect(
      [401, 403].includes(status),
      `Expected 401 or 403, but got ${status}`,
    ).toBeTruthy();
  });

  test("@critical should not allow one user to access another user's basket (IDOR)", async ({
    api,
  }) => {
    const user1 = createTestUser();
    const auth1 = await api.auth.registerAndLogin(user1);

    const user2 = createTestUser();
    const auth2 = await api.auth.registerAndLogin(user2);

    const response = await api.basket.getBasket(auth1.basketId, auth2.token);

    const status = response.status();
    expect(
      [401, 403].includes(status),
      `Expected 401 or 403, but got ${status}`,
    ).toBeTruthy();
  });

  test("@critical should not allow one user to add item into another user's basket", async ({
    api,
  }) => {
    const user1 = createTestUser();
    const auth1 = await api.auth.registerAndLogin(user1);

    const user2 = createTestUser();
    const auth2 = await api.auth.registerAndLogin(user2);

    const response = await api.basket.addItem(auth1.token, {
      ProductId: 1,
      BasketId: auth2.basketId,
      quantity: 1,
    });

    const status = response.status();
    expect(
      [400, 401, 403].includes(status),
      `Expected 400, 401 or 403, but got ${status}`,
    ).toBeTruthy();
  });
});
