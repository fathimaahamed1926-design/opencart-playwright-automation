import { TestProduct } from "../types/types";
import { ProductDatabaseHelper } from "../utils/database/ProductDatabaseHelper";
import { RandomDataGenerator } from "../utils/randomDataGenerator";
import {test as adminTest } from "./admin.fixture";

type productFixtures= {
  disposableProduct: TestProduct;
  productTestData: TestProduct;
};

export const test= adminTest.extend<productFixtures>({
  disposableProduct:async({productsPage, addOrEditProductsPage}, use) => {
    const productName= RandomDataGenerator.generateRandomProductName();
    const model= RandomDataGenerator.generateRandomProductModel();

    await productsPage.addNewProduct();

    await addOrEditProductsPage.createProduct({
      productName: productName,
      model: model,
      metaTagTitle: productName
    });

    await use({productName,model});

    await ProductDatabaseHelper.deleteProduct(productName);
  },

  productTestData:async({productsPage, addOrEditProductsPage}, use) => {
    const product = {
      productName: RandomDataGenerator.generateRandomProductName(),
      model: RandomDataGenerator.generateRandomProductModel()
    };

    await use(product);

    await ProductDatabaseHelper.deleteProduct(product.productName);
   
  }
})

export {expect} from "@playwright/test";


