import { test as base } from "@playwright/test";
import { HomePage } from "../pages/customer/home/HomePage";
import { LoginPage } from "../pages/customer/login/LoginPage";
import { CheckoutPage } from "../pages/customer/cart/CheckoutPage";
import { ProductPage } from "../pages/customer/product/ProductPage";
import { ShoppingCartPage } from "../pages/customer/cart/ShoppingCartPage";
import { MyAccountPage } from "../pages/customer/myAccount/MyAccountPage";
import { RegisterPage } from "../pages/customer/register/RegisterPage";
import { PurchaseFlow } from "../flows/PurchaseFlow";

type guestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  productPage: ProductPage;
  shoppingCartPage: ShoppingCartPage;
  myAccountPage: MyAccountPage;
  registerPage: RegisterPage;
  purchaseFlow: PurchaseFlow;
}

export const test = base.extend<guestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },

  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  purchaseFlow: async ({ homePage, productPage, shoppingCartPage, checkoutPage }, use) => {
    await use(new PurchaseFlow(homePage, productPage, shoppingCartPage, checkoutPage));
  }

})

export { expect } from "@playwright/test";
