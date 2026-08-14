import { ProductNames } from "../../../constants/admin/const";
import { ProductMessages } from "../../../constants/admin/messages";
import { ProductStatus } from "../../../enums/enums";
import { test, expect } from "../../../fixtures/testData/product.fixture";
import { ProductDatabaseHelper } from "../../../utils/database/ProductDatabaseHelper";
import { RandomDataGenerator } from "../../../utils/randomDataGenerator";

test.describe("Admin Product Related Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.sidebar.openProducts();
    await productsPage.verifyProductPageLoaded();
  });

  test("Admin can filter products by name", async ({ productsPage }) => {
    await productsPage.filterProducts({ productName: ProductNames.MACBOOK });

    const displayedProductNames = await productsPage.getDisplayedProductNames();

    expect(displayedProductNames.length).toBeGreaterThan(0);

    for (const name of displayedProductNames) {
      expect(name).toContain(ProductNames.MACBOOK);
    }
  });

  test("Admin can filter products by status", async ({ productsPage }) => {
    await productsPage.filterProducts({status:ProductStatus.Enabled});

    const displayedProductStatusus= await productsPage.getDisplayedProductStatuses();

    expect(displayedProductStatusus.length).toBeGreaterThan(0);

    for(const status of displayedProductStatusus) {
      expect(status).toBe(ProductStatus.Enabled);
    }
  })

  test("Admin can add new product", async ({ productsPage, addOrEditProductsPage, productTestData }) => {
    await productsPage.addNewProduct();
    await addOrEditProductsPage.createProduct({
      productName: productTestData.productName,
      metaTagTitle: productTestData.productName,
      model: productTestData.model
    });
    console.log(`New product created: ${productTestData.productName} with model: ${productTestData.model}`);
    await productsPage.verifyProductExists(productTestData.productName, true); // Verify product exists after adding
  });

  test("Admin can read existing product details", async({productsPage, addOrEditProductsPage})=> {
    const [expectedProductName, expectedMetaTagTitle,expectedModel ]= ["iPod Classic", "iPod Classic", "product 20"];

    await productsPage.editProduct(expectedProductName);

    const actualProductName = await addOrEditProductsPage.getProductName();
    const actualMetaTagTitle = await addOrEditProductsPage.getMetaTitle();
    const actualModel = await addOrEditProductsPage.getModel();

    expect(actualProductName).toBe(expectedProductName);
    expect(actualMetaTagTitle).toBe(expectedMetaTagTitle);
    expect(actualModel).toBe(expectedModel);
  }); 

  test("Admin can update existing product details", async({productsPage, addOrEditProductsPage, disposableProduct})=> {
    
    const newModelName = RandomDataGenerator.generateRandomProductModel();
    await productsPage.editProduct(disposableProduct.productName);

    await addOrEditProductsPage.setModel(newModelName);
    await addOrEditProductsPage.saveDetails();

    await productsPage.editProduct(disposableProduct.productName);
    const updatedModelName = await addOrEditProductsPage.getModel();
    expect(updatedModelName).toBe(newModelName);
  });

  test("Admin can delete an existing product", async({productsPage, disposableProduct})=> {
    
    await productsPage.deleteProduct(disposableProduct.productName);
    await productsPage.alert.verifySuccessMessage(ProductMessages.PRODUCT_DELETED);
    await productsPage.verifyProductExists(disposableProduct.productName, false);
  });

});


test.describe("Admin UI-Database Integration", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.sidebar.openProducts();
    await productsPage.verifyProductPageLoaded();
  });

  test("Admin created product can be found in database", async({disposableProduct})=> {
    const adminCreatedProduct = disposableProduct.productName;
    const adminCreatedModel = disposableProduct.model;

    const dbProductDetails = await ProductDatabaseHelper.getProductDetails(adminCreatedProduct);
    expect(dbProductDetails).not.toBeNull();
    if(!dbProductDetails){
      throw new Error(
      `Product '${adminCreatedProduct}' was not found in database`
    );
  }
    expect(dbProductDetails.productName).toBe(adminCreatedProduct);
    expect(dbProductDetails.model).toBe(adminCreatedModel);
    expect(dbProductDetails.metaTitle).toBe(adminCreatedProduct);
    expect(Number(dbProductDetails.price)).toBe(0);
    expect(Number(dbProductDetails.quantity)).toBe(1);
    expect(dbProductDetails.status).toBe(1);

  });  

  test("Admin updated product details are reflected in database", async({productsPage, addOrEditProductsPage, disposableProduct})=> {
    const newModelName = RandomDataGenerator.generateRandomProductModel();
    await productsPage.editProduct(disposableProduct.productName);
    await addOrEditProductsPage.setModel(newModelName);
    await addOrEditProductsPage.saveDetails();

    const dbProductDetails = await ProductDatabaseHelper.getProductDetails(disposableProduct.productName);
    expect(dbProductDetails).not.toBeNull();
    if(!dbProductDetails){
      throw new Error(
      `Product '${disposableProduct.productName}' was not found in database`
    );  
  }
    expect(dbProductDetails.model).toBe(newModelName);

  });

  test("Admin deleted product removed from the database", async({productsPage, disposableProduct})=> {
     await productsPage.deleteProduct(disposableProduct.productName);
      const dbProductDetails = await ProductDatabaseHelper.getProductDetails(disposableProduct.productName);  
      expect(dbProductDetails).toBeNull();
  })
});