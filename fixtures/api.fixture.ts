import { test as base } from "@playwright/test";
import { UsersApi } from "../api/users.api.js";

if (!process.env.REQRES_API_KEY) {
  throw new Error("REQRES_API_KEY is not defined. Add it to the .env file.");
}

type ApiFixtures = {
  usersApi: UsersApi;
};

export const test = base.extend<ApiFixtures>({
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
});

export { expect } from "@playwright/test";
