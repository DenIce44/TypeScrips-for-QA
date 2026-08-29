import { expect, test as setup } from "../fixtures/app.fixture.js";
import { users } from "../test-data/users.js";

const authFile = "playwright/.auth/user.json";

setup("authenticate standard user", async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: authFile });
});
