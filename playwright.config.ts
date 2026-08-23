import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

const reqresApiKey = process.env.REQRES_API_KEY ?? "";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  ...(process.env.CI ? { workers: 1 } : {}),

  reporter: process.env.CI
    ? [["dot"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "https://www.saucedemo.com",
    testIdAttribute: "data-test",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: process.env.CI ? "retain-on-failure" : "off",
  },

  projects: [
    {
      name: "chromium",
      testIgnore: "**/api/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      testIgnore: "**/api/**/*.spec.ts",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      testIgnore: "**/api/**/*.spec.ts",
      use: {
        ...devices["Desktop Safari"],
      },
    },

    {
      name: "api",
      testMatch: "**/api/**/*.spec.ts",
      use: {
        baseURL: "https://reqres.in",
        extraHTTPHeaders: {
          Accept: "application/json",
          "x-api-key": reqresApiKey,
          "User-Agent": "playwright-api-tests/1.0",
          "X-Reqres-Env": "prod",
        },
      },
    },
  ],
});
