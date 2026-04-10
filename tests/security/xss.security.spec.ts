import { expect, test } from "../fixtures";
import { Tags } from "../attributes/tags";

test.describe("Input Validation", () => {
  test(
    "should not reflect raw script payload in products search API response",
    {
      tag: [
        Tags.TEST_TYPE.SECURITY,
        Tags.TEST_TYPE.API,
        Tags.FEATURE.XSS,
        Tags.FEATURE.INPUT_VALIDATION,
        Tags.PRIORITY.CRITICAL,
      ],
    },
    async ({ api }) => {
      const payload = `<script>alert('xss')</script>`;
      const response = await api.products.search(payload);

      expect(response.ok()).toBeTruthy();

      const rawBody = await response.text();
      expect(rawBody).not.toContain(payload);
      expect(rawBody.toLowerCase()).not.toContain("<script");
    },
  );

  test(
    "should not execute script payload in UI search",
    {
      tag: [
        Tags.TEST_TYPE.SECURITY,
        Tags.TEST_TYPE.UI,
        Tags.FEATURE.XSS,
        Tags.FEATURE.INPUT_VALIDATION,
        Tags.PRIORITY.CRITICAL,
      ],
    },
    async ({ page, pages }) => {
      const payload = `<img src=x onerror=alert('xss')>`;
      let dialogTriggered = false;

      page.on("dialog", async (dialog) => {
        dialogTriggered = true;
        await dialog.dismiss();
      });

      await pages.homePage.open();
      await pages.homePage.expectLoaded();
      await pages.homePage.navbar.search(payload);
      await pages.homePage.expectNoResultsFound();

      const html = await page.content();
      expect(dialogTriggered).toBeFalsy();
      expect(html).not.toContain("<script>alert('xss')</script>");
    },
  );
});
