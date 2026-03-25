import { expect, test } from "../fixtures";

test.describe("@security @xss Input Validation", () => {
  test("@critical should not reflect raw script payload in products search API response", async ({
    api,
  }) => {
    const payload = `<script>alert('xss')</script>`;
    const response = await api.products.search(payload);

    expect(response.ok()).toBeTruthy();

    const rawBody = await response.text();
    expect(rawBody).not.toContain(payload);
    expect(rawBody.toLowerCase()).not.toContain("<script");
  });

  test("@critical should not execute script payload in UI search", async ({
    page,
    pages,
  }) => {
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
  });
});
