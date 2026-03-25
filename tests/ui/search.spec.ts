import { test } from "../fixtures";
import { Tags } from "../attributes/tags";

test.describe(`${Tags.join(Tags.TEST_TYPE.UI, Tags.FEATURE.SEARCH, Tags.TEST_TYPE.REGRESSION)} Search UI`, () => {
  test(`${Tags.join(
    Tags.TEST_TYPE.UI,
    Tags.FEATURE.SEARCH,
    Tags.TEST_TYPE.SMOKE,
    Tags.SCENARIO.POSITIVE,
  )} should search for a product`, async ({ pages }) => {
    await pages.homePage.open();
    await pages.homePage.expectLoaded();
    await pages.homePage.navbar.search("OWASP Juice Shop Hoodie");
    await pages.homePage.expectProductVisible("OWASP Juice Shop Hoodie");
  });

  test(`${Tags.join(
    Tags.TEST_TYPE.UI,
    Tags.FEATURE.SEARCH,
    Tags.TEST_TYPE.REGRESSION,
    Tags.SCENARIO.NEGATIVE,
  )} should display no results found`, async ({ pages }) => {
    await pages.homePage.open();
    await pages.homePage.expectLoaded();
    await pages.homePage.navbar.search("NotFound");
    await pages.homePage.expectNoResultsFound();
  });
});
