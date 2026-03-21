import { test } from "../fixtures";

test.describe("Search UI", () => {
  test("should search for a product", async ({ pages }) => {
    await pages.homePage.open();
    await pages.homePage.expectLoaded();
    await pages.homePage.navbar.search("OWASP Juice Shop Hoodie");
    await pages.homePage.expectProductVisible("OWASP Juice Shop Hoodie");
  });

  test("should display no results found", async ({ pages }) => {
    await pages.homePage.open();
    await pages.homePage.expectLoaded();
    await pages.homePage.navbar.search("NotFound");
    await pages.homePage.expectNoResultsFound();
  });
});
