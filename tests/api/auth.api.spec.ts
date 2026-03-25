import { expect, test } from "../fixtures";

test.describe("@api @auth Auth API", () => {
  test("@smoke @positive should login existing user", async ({ api }) => {
    const response = await api.auth.login("demo@juice-sh.op", "demo123");

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.authentication).toBeDefined();
    expect(body.token || body.authentication.token).toBeTruthy();
  });

  test("@negative should not login with invalid password", async ({ api }) => {
    const response = await api.auth.loginNegative(
      "demo@juice-sh.op",
      "wrong-password",
    );

    expect([400, 401]).toContain(response.status());
  });
});
