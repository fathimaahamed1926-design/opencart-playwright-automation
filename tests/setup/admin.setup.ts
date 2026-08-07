//admin authentication setup file is currently not used as unique user token is generated for each login and cannot be reused for subsequent tests.
/*import {test as setup, expect} from '@playwright/test';
import { loginAsAdmin } from '../../utils/authentication/adminAuth';

setup('Authenticate Admin', async ({page})=> {
   await loginAsAdmin(page);
   console.log("URL after admin login:", page.url());
   await page.context().storageState({
    path: 'playwright/.auth/admin.json'
   });
   console.log("Admin Authentication state saved");
})*/