import { Page } from "@playwright/test";
import { HomePage } from "../../pages/customer/home/HomePage";
import { LoginPage } from "../../pages/customer/login/LoginPage";
import { MyAccountPage } from "../../pages/customer/myAccount/MyAccountPage";
import { Env } from "../environment";

export async function loginAsCustomer(page:Page) {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const myAccountPage= new MyAccountPage(page);

  await homePage.openHomePage();
  await myAccountPage.customerAccount.header.clickLogin();
  await loginPage.login(Env.CUSTOMER_USERNAME, Env.CUSTOMER_PASSWORD);

}