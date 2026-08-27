   import { OrdersPage } from "../../pages/admin/orders/OrdersPage"
   import {test as customerBase} from "../customer.fixture"
   import {Page} from "@playwright/test"
   import { loginAsAdmin } from "../../utils/authentication/adminAuth"
   import { OrderDetailsPage } from "../../pages/admin/orders/OrderDetailsPage";

   type OrderVerificationFixtures = {
      adminPage:Page;
      ordersPage:OrdersPage;
      orderDetailsPage:OrderDetailsPage
   };

   export const test = customerBase.extend<OrderVerificationFixtures>({
      adminPage: async({browser}, use) => {
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      await loginAsAdmin(adminPage);
      await use(adminPage);
      await adminContext.close();
      },

      ordersPage: async({adminPage}, use)=> {
      await use(new OrdersPage(adminPage));
      },

      orderDetailsPage: async({adminPage},use)=> {
      await use(new OrderDetailsPage(adminPage));
      }
   });

   export {expect} from "@playwright/test";