import { expect, test } from "../fixtures";

test.describe("@api @auth Auth API", () => {
  let user: { email: string; password: string };

  test.beforeAll("Create user via API", async ({ api }) => {
    user = await api.auth.createTestUser();
  });

  test("@smoke @positive should login existing user", async ({ api }) => {
    const response = await api.auth.login(user.email, user.password);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.authentication).toBeDefined();
    expect(body.token || body.authentication.token).toBeTruthy();
  });

  test("@negative should not login with invalid password", async ({ api }) => {
    const response = await api.auth.login(user.email, "wrong-password");
    const status = response.status();

    expect(
      [400, 401].includes(status),
      `Expected 400 or 401, but got ${status}`,
    ).toBeTruthy();
  });
});
