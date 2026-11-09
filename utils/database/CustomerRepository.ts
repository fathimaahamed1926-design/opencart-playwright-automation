import { DatabaseHelper } from "./DatabaseHelper";

interface CustomerIdRow {
  customerId: number;
}

interface CustomerDetailsRow {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

const TEST_EMAIL_PREFIX = "api.test.";
const TEST_EMAIL_DOMAIN = "@example.com"

export class CustomerRepository {

  private static isTestEmail(email: string): boolean {
    const value = email.toLowerCase();
    return value.startsWith(TEST_EMAIL_PREFIX) && value.endsWith(TEST_EMAIL_DOMAIN);
  }

  private static validateTestEmail(email:string): void {
    if (!this.isTestEmail(email)) {
      throw new Error(`Refusing to delete customer "${email}": not a test account.`);
    }
  }

  static async getCustomerId(customerEmail: string): Promise<number | null> {

    this.validateTestEmail(customerEmail);

    const rows = await DatabaseHelper.query<CustomerIdRow>(
      `SELECT customer_id AS customerId
      FROM oc_customer
      WHERE email =?`, [customerEmail]
    )
    if (rows.length === 0) {
      return null;
    }
    return rows[0].customerId;
  }

  static async getCustomerDataByEmail(customerEmail: string): Promise<CustomerDetailsRow | null> {

    this.validateTestEmail(customerEmail);
    
    const customerDetails = await DatabaseHelper.query<CustomerDetailsRow>(
      `SELECT customer_id AS customerId,
       firstname AS firstName,
       lastname AS lastName,
       email,
       telephone
       FROM oc_customer
       where email=?`, [customerEmail]
    );

    if ((customerDetails.length) === 0) {
      return null;
    }

    return customerDetails[0];

  }

  static async countByEmail(customerEmail: string): Promise<number> {
    const rows = await DatabaseHelper.query<{ total: number }>(`SELECT count(*) AS total from oc_customer WHERE email=?`, [customerEmail]);
    return Number(rows[0].total);
  }

  static async cleanupCustomer(customerEmail: string): Promise<void> {

    this.validateTestEmail(customerEmail);

    const customerId = await this.getCustomerId(customerEmail);

    if (!customerId) {
      return;
    }

    await DatabaseHelper.execute(
      `DELETE FROM oc_customer_wishlist
       WHERE customer_id=?`, [customerId]
    );

    await DatabaseHelper.execute(
      `DELETE FROM oc_customer_ip
       WHERE customer_id=?`, [customerId]
    );

    await DatabaseHelper.execute(
      `DELETE FROM oc_address
       WHERE customer_id=?`, [customerId]
    );

    await DatabaseHelper.execute(
      `DELETE FROM oc_cart
       WHERE customer_id=?`, [customerId]
    );

    await DatabaseHelper.execute(
      `DELETE FROM oc_customer
       WHERE customer_id=?`, [customerId]
    );
  }
}

