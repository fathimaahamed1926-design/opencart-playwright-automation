import { APIRequestContext, APIResponse } from "@playwright/test";
import { randomUUID } from "node:crypto";

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}

export class CustomerApiHelper {
  static generateCustomerData(): CustomerData {
    const uniqueId = randomUUID();

    return {
      firstName: "API",
      lastName: "Test",
      email: `api.test.${uniqueId}@example.com`,
      telephone: "0412345678",
      password: "Test@12345"
    }
  }

  static async registerCustomer(request: APIRequestContext, customerData: CustomerData): Promise<APIResponse> {
    return await request.post("index.php?route=account/register", {
      multipart: {
        customer_group_id: "1",
        firstname: customerData.firstName,
        lastname: customerData.lastName,
        email: customerData.email,
        telephone: customerData.telephone,
        password: customerData.password,
        confirm: customerData.password,
        newsletter: "0",
        agree: "1"
      }
    })


  }

}