import {test as setup, expect} from '@playwright/test';
import { loginAsCustomer } from '../../utils/authentication/customerAuth';

setup('Authenticate Customer', async ({page})=> {
   await loginAsCustomer(page);
   await page.context().storageState({
    path: 'playwright/.auth/customer.json'
   });
   console.log("Customer Authentication state saved");
})
