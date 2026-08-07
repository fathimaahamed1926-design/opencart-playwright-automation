import {test, expect} from "@playwright/test"
import { Env } from "../../utils/environment";

test('Verify Opencart server is responding', async ({page})=> {

  await page.goto(Env.CUSTOMER_URL);

  await expect(page).toHaveURL(/opencart\/upload/);

  await expect(page).toHaveTitle(/Your Store/i);

  console.log("✅Opencart Server is responding successfully");
}) 

