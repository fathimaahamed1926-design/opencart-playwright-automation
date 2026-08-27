import { DatabaseHelper } from "./DatabaseHelper";

interface OrderIdRow {
  order_id:number;
}

export class OrderDatabaseHelper {
  static async getRecentOrderId(customerId:number):Promise<number> {
    const rows=await DatabaseHelper.query<OrderIdRow>(
      `SELECT order_id
       FROM oc_order
       WHERE customer_id = ?
       ORDER BY order_id DESC
       LIMIT 1`,
       [customerId]
    );
    if(rows.length===0){
      return 0;
    }

    return rows[0].order_id;

  }
}