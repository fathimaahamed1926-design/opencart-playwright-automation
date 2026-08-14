import { DatabaseHelper } from "./DatabaseHelper";

interface CustomerIdRow {
  customerId: number;
}

export class CustomerRepository {
  static async getCustomerId(customerEmail:string): Promise<number> {
    const rows = await DatabaseHelper.query<CustomerIdRow> (
      `SELECT customer_id AS customerId
      FROM oc_customer
      WHERE email =?`, [customerEmail]
    )
    if(rows.length===0){
      return 0;
    }
    return rows[0].customerId;
  }

  static async cleanupCustomer(customerEmail:string): Promise<void> {
    const customerId = await this.getCustomerId(customerEmail);
    
    if(!customerId){
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

