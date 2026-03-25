import { defineConfig, devices } from "@playwright/test";
import { env } from "./src/utils/env";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!env.ci,
  retries: env.ci ? 1 : 0,
  workers: env.ci ? 1 : undefined,
  reporter: [["line"], ["html", { open: "never" }], ["allure-playwright"]],
  use: {
    baseURL: env.baseUrl,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
