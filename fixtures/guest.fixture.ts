import {test as base} from "@playwright/test";
import { HomePage } from "../pages/customer/home/HomePage";
import { LoginPage } from "../pages/customer/login/LoginPage";
import { CheckoutPage } from "../pages/customer/cart/CheckoutPage";
import { ProductPage } from "../pages/customer/product/ProductPage";
import { ShoppingCartPage } from "../pages/customer/cart/ShoppingCartPage";

type guestFixtures = {
  homePage:HomePage;
  loginPage:LoginPage;
  checkoutPage:CheckoutPage;
  productPage:ProductPage;
  shoppingCartPage:ShoppingCartPage
}

export const test = base.extend<guestFixtures>({
  homePage:async({page}, use)=>{
    await use(new HomePage(page));
  },

  loginPage:async({page},use)=> {
    await use(new LoginPage(page));
  },
  
  checkoutPage:async({page},use)=> {
    await use(new CheckoutPage(page));
  },

  productPage:async({page},use)=> {
    await use(new ProductPage(page));
  },

  shoppingCartPage:async({page},use)=> {
    await use(new ShoppingCartPage(page));
  }

})

export {expect} from "@playwright/test";
