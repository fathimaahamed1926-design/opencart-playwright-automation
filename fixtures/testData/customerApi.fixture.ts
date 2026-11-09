import { test as base } from "@playwright/test";
import { CustomerRepository } from "../../utils/database/CustomerRepository";
import { CustomerApiHelper, CustomerData } from "../../utils/api/CustomerApiHelper";
import { CustomerApiAssertions } from "../../utils/api/CustomerApiAssertions";
import { RegistrationMessages } from "../../constants/customer/messages";

type CustomerApiFixtures = {
  registeredCustomer: CustomerData;
}

export const test = base.extend<CustomerApiFixtures>({
  registeredCustomer: async ({ request }, use) => {
    // Generate unique customer data
    const customerData = CustomerApiHelper.generateCustomerData();

    try {
      // Register customer through API
      const response = await CustomerApiHelper.registerCustomer(request, customerData);
      await CustomerApiAssertions.responseStatusIs(response,200);
      await CustomerApiAssertions.responseContainsExpectedMessage(response, RegistrationMessages.New_User_Registered);

      await use(customerData);

    } finally {
      // Cleanup after test execution even if assertions fail or test is interrupted
      await CustomerRepository.cleanupCustomer(customerData.email);
    }
  }
});

export { expect } from "@playwright/test";
