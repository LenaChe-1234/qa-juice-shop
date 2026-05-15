import { test as base } from "@playwright/test";
import { ApiServices } from "@src/api/services";
import { PagesManager } from "@src/pages/PagesManager";

type TestFixtures = {
  pages: PagesManager;
  api: ApiServices;
};

export const test = base.extend<TestFixtures>({
  pages: async ({ page }, use) => {
    await use(new PagesManager(page));
  },

  api: async ({ request }, use) => {
    await use(new ApiServices(request));
  },
});

export { expect } from "@playwright/test";
