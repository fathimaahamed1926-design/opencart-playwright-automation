import { DatabaseHelper } from "./DatabaseHelper";

interface ProductIdRow {
  productId: number;
}

interface ProductDetailsRow {
  productName: string;
  metaTitle: string;
  model: string;
  price: number;
  quantity: number;
  status: number;
}
export class ProductDatabaseHelper {
  static async getProductId(productName:string): Promise<number>{
  const rows= await DatabaseHelper.query<ProductIdRow>(
    `SELECT product_id AS productId FROM oc_product_description
     WHERE name = ?`,
     [productName]
  );
  if(rows.length===0){
    return 0;
  }

  return rows[0].productId;
  
  }

  static async deleteProduct(productName:string): Promise<void> {
    const productId = await this.getProductId(productName);

    if(productId===0){
      return;
    }

    await DatabaseHelper.execute(
      `DELETE FROM oc_product_description
       WHERE product_id = ?`,
       [productId]
    );

    await DatabaseHelper.execute(
      `DELETE FROM oc_product_to_store
       WHERE product_id = ?`,
       [productId]
    );

    await DatabaseHelper.execute(
      `DELETE FROM oc_product_to_layout
       WHERE product_id = ?`,
       [productId]
    );

    await DatabaseHelper.execute(
      `DELETE FROM oc_product
       WHERE product_id = ?`,
       [productId]
    );
  }

  static async getProductDetails(productName:string): Promise<ProductDetailsRow | null> {

    const productDetails = await DatabaseHelper.query<ProductDetailsRow> (
      `SELECT 
        pd.name AS productName,
        pd.meta_title AS metaTitle,
        p.model,
        p.quantity,
        p.price,
        p.status
       FROM oc_product p
       INNER JOIN oc_product_description pd
       ON p.product_id = pd.product_id 
       WHERE pd.name = ? `,
       [productName]
    );

    if(productDetails.length ==0){
      return null;
    }

    return productDetails[0];

  }

}