import { test, expect } from "../../fixtures/testData/customerApi.fixture";
import { CustomerRepository } from "../../utils/database/CustomerRepository";

test("Verify registered customer through API in database", async ({ registeredCustomer }) => {

  //Retrieve customer details registered using API from database
  const customer = await CustomerRepository.getCustomerDataByEmail(registeredCustomer.email);

  expect(customer).not.toBeNull();

  //Validate database values against API input using objects comparison

  const { password, ...expectedDetails } = registeredCustomer;  //comparing values except password

  expect(customer).toMatchObject(expectedDetails);
  expect(customer?.customerId).toBeGreaterThan(0);

});