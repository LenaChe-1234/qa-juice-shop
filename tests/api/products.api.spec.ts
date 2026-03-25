import { expect, test } from "../fixtures";

test.describe("@api @products Products API", () => {
  test("@smoke @positive should return products", async ({ api }) => {
    const response = await api.products.getAll();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test("@positive should find apple product in search", async ({ api }) => {
    const response = await api.products.search("apple");

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test("@negative should return empty search result", async ({ api }) => {
    const response = await api.products.search("zzzzzzzz-no-such-product");

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(body.data).toEqual([]);
  });
});
