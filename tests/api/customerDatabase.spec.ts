import { test, expect } from "../../fixtures/testData/customerApi.fixture";
import { CustomerRepository } from "../../utils/database/CustomerRepository";
import { CustomerApiHelper } from "../../utils/api/CustomerApiHelper";
import { CustomerApiAssertions } from "../../utils/api/CustomerApiAssertions";
import { RegistrationMessages } from "../../constants/customer/messages";

test.describe("Customer Database Tests", () => {
  
  test("Retrieve existing customer by email", async ({ registeredCustomer }) => {

    const customer = await CustomerRepository.getCustomerDataByEmail(registeredCustomer.email);

    expect(customer).not.toBeNull();
    expect(customer?.email).toBe(registeredCustomer.email);
  });

  test("Retrieve nonexistent customer by email", async () => {

    const customer = await CustomerRepository.getCustomerDataByEmail(
      "nonexistent.customer@example.com"
    );
    expect(customer).toBeNull();

  });

  test("Duplicate registration is rejected", async ({ playwright, baseURL, registeredCustomer }) => {

    const anonymous = await playwright.request.newContext({ baseURL });

    try {
      const response = await CustomerApiHelper.registerCustomer(anonymous, registeredCustomer);
      await CustomerApiAssertions.responseStatusIs(response,200);
      await CustomerApiAssertions.responseContainsExpectedMessage(response, RegistrationMessages.Duplicate_User_Rejected);
      expect(await CustomerRepository.countByEmail(registeredCustomer.email)).toBe(1);
    } finally {
      await anonymous.dispose();
    }

  });
})