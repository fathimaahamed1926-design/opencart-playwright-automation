import {test as base, Page} from "@playwright/test";
import { AddOrEditProductsPage } from "../pages/admin/products/AddOrEditProductsPage";
import { CategoriesPage } from "../pages/admin/categories/CategoriesPage";
import { DashboardPage } from "../pages/admin/dashboard/DashboardPage";
import { ForgotPasswordPage } from "../pages/admin/login/ForgotPasswordPage";
import { LoginPage } from "../pages/admin/login/LoginPage";
import { OrdersPage } from "../pages/admin/orders/OrdersPage";
import { ProductsPage } from "../pages/admin/products/ProductsPage";
import { loginAsAdmin } from "../utils/authentication/adminAuth";

type adminFixtures= {
  authenticatedAdminPage:Page;
  addOrEditProductsPage: AddOrEditProductsPage,
  categoriesPage: CategoriesPage,
  dashboardPage: DashboardPage,
  forgotPasswordPage: ForgotPasswordPage,
  loginPage: LoginPage,
  ordersPage: OrdersPage,
  productsPage: ProductsPage
}

export const test= base.extend<adminFixtures>({

  authenticatedAdminPage: async({page}, use)=> {
    await loginAsAdmin(page);
    await use(page);
  },

  addOrEditProductsPage: async({authenticatedAdminPage}, use)=>{
    await use(new AddOrEditProductsPage(authenticatedAdminPage));
  },

  categoriesPage: async({authenticatedAdminPage}, use)=> {
    await use(new CategoriesPage(authenticatedAdminPage));
  },

  dashboardPage: async({page}, use)=> {
    await use(new DashboardPage(page));
  },

  forgotPasswordPage: async ({page}, use)=> {
    await use(new ForgotPasswordPage(page));
  },

  loginPage: async({page}, use)=> {
    await use(new LoginPage(page));
  },

  ordersPage: async({authenticatedAdminPage}, use)=> {
    await use(new OrdersPage(authenticatedAdminPage));
  },

  productsPage: async({authenticatedAdminPage}, use) => {
    await use(new ProductsPage(authenticatedAdminPage));
  }
})

export {expect} from "@playwright/test";