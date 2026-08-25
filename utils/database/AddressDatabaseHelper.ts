import { DatabaseHelper } from "./DatabaseHelper";

interface AddressIdRow {
  customer_id:number,
  address_id:number
}

export class AddressDatabaseHelper {

  static async getAddressId(customerId:number, address1:string):Promise<number> {
    const addressRows= await DatabaseHelper.query<AddressIdRow>(
      `SELECT address_id
       FROM oc_address
       WHERE customer_Id = ?
       AND address_1 = ?
       LIMIT 1`,
       [customerId, address1]
    );
    if(addressRows.length===0){
      return 0;
    }
    return addressRows[0].address_id;
  }

  static async deleteAddress(customerId:number, address1:string):Promise<void> {
    const addressId= await this.getAddressId(customerId,address1)
    console.log(`🏠 Address ID: ${addressId}`);
    if(addressId===0) {
      console.log(`🧹 Cleanup: test address "${address1}" does not exist. Nothing to delete.`);
      return;
    }

    const result= await DatabaseHelper.execute(
      `DELETE FROM oc_address
       WHERE address_Id=?`,
       [addressId]
    );
    console.log(`🗑️ Cleanup: Rows ${result.affectedRows} address deleted. ID: ${addressId}`);
  }
}






/*static async getCustomerId(firstname:string):Promise<number> {
    console.log(`🔎 Looking for customer with first name: ${firstname}`);
  const rows= await DatabaseHelper.query<AddressIdRow>(
    `SELECT customer_id
     FROM oc_address
     WHERE firstname= ?
     LIMIT 1`,
     [firstname]
  );
  if(rows.length===0)  {
    return 0;
  }
  return rows[0].customer_id;
  }*/