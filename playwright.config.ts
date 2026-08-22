import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

const reqresApiKey = process.env.REQRES_API_KEY;

if (!reqresApiKey) {
  throw new Error("REQRES_API_KEY is not defined. Add it to the .env file.");
}

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  ...(process.env.CI ? { workers: 1 } : {}),

  reporter: "html",

  use: {
    baseURL: "https://www.saucedemo.com",
    testIdAttribute: "data-test",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
