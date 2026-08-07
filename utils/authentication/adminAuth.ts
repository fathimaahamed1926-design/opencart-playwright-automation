import { Page } from "@playwright/test";
import { LoginPage } from "../../pages/admin/login/LoginPage";
import { Env } from "../environment";

export async function loginAsAdmin(page:Page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login({email:Env.ADMIN_USERNAME, password:Env.ADMIN_PASSWORD});
  await page.waitForURL(/route=common\/dashboard/);
}