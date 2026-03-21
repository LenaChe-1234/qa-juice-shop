import { test as base } from "@playwright/test";
import { PagesManager as Pages } from "../src/pages/PagesManager";
import { AuthApi } from "../src/api/AuthApi";

type Fixtures = {
  pages: Pages;
  api: AuthApi;
};

export const test = base.extend<Fixtures>({
  pages: async ({ page }, use) => {
    const pages = new Pages(page);
    await use(pages);
  },
  api: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
});

// export const test = base.extend<Fixtures>({
//   // Initialize AuthApi for each test

// });

export { expect } from "@playwright/test";
