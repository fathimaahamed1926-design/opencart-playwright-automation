import { test as base } from '@playwright/test';
import { HomePage } from '../pages/customer/home/HomePage';
import { LogoutPage } from '../pages/customer/logout/LogoutPage';
import { ProductPage } from '../pages/customer/product/ProductPage';
import { ShoppingCartPage } from '../pages/customer/cart/ShoppingCartPage';
import { CheckoutPage } from '../pages/customer/cart/CheckoutPage';
import { MyAccountPage } from '../pages/customer/myAccount/MyAccountPage';
import { RegisterPage } from '../pages/customer/register/RegisterPage';

type customerFixtures = {
  homePage: HomePage;
  logoutPage: LogoutPage;
  productPage: ProductPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutPage: CheckoutPage;
  myAccountPage: MyAccountPage;
  registerPage: RegisterPage;
}

export const test = base.extend<customerFixtures>({
  homePage:async({page}, use)=> {
    await use(new HomePage(page));
  },
  /*loginPage:async({page},use) => {   //no need to instantiate loginpage as we use storage state authentication 
    await use(new LoginPage(page));
  },*/
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  registerPage: async({page}, use)=> {
    await use(new RegisterPage(page));
  }

})
export { expect } from "@playwright/test";

